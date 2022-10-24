import Web3 from 'web3';

import AuctionBuild from 'contracts/Auction.json';

let selectedAccount;
let auctionContract;
const providerUrl = 'ws://localhost:7545';
let networkId;

let items = [];

export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
      // Metamask is installed

      provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log('Selected account is ' + selectedAccount);
      })
      .catch((err) => {
        console.log(err);
      });

      window.ethereum.on('accountsChanged', function(accounts) {
        selectedAccount = accounts[0];
        console.log('Selected account changed to ' + selectedAccount);
      });
    }

    const web3 = new Web3(providerUrl);

    networkId = await web3.eth.net.getId();

    auctionContract = new web3.eth.Contract(AuctionBuild.abi, AuctionBuild.networks[networkId].address);

    for(let i = 0; i < 6; i++) {
      let promise_obj = await auctionContract.methods.getItem(i).call({from: selectedAccount});
      items.push({highestBid: Number(promise_obj.highestBid), highestBidder: promise_obj.highestBidder, paid: false});
      document.getElementById(i + 1 + '-hbid').textContent = Number(promise_obj.highestBid) / 1000 + ' ETH';
    }

    console.log(items);

    auctionContract.events.itemBid({}, (err, event_) => {
      updateItems(event_);
    })
    .on('error', (error, receipt) => {
      console.log(error);
    });

    auctionContract.events.auctionEnd({}, async (err, event_) => {
      console.log('Auction ended!');
      console.log(`Account address: ${selectedAccount}`);
        for(let i = 0; i < 6; i++) {
          let promise_obj = await auctionContract.methods.getItem(i).call({from: selectedAccount});
          items[i].highestBid = Number(promise_obj.highestBid);
          items[i].highestBidder = promise_obj.highestBidder;
          console.log(`Highest bidder address: ${promise_obj.highestBidder}`);
          updateCards(i);
          
          if(promise_obj.highestBidder.toLowerCase() === selectedAccount && items[i].paid == false) {

            let amt_hex = Number(promise_obj.highestBid) / 1000;
            amt_hex = (amt_hex * Math.pow(10, 18)).toString(16);

            let tx = {
              'from': selectedAccount,
              'to': AuctionBuild.networks[networkId].address,
              'value': amt_hex,
              'gas' : '31944',
              'data': auctionContract.methods.pay(i).encodeABI()
            }
            // auctionContract.methods.pay(i).send({from: selectedAccount, value: promise_obj.highestBid});
            await window.ethereum.request({method: 'eth_sendTransaction', params: [tx]});
            items[i].paid = true;
          }
        }
    })
    .on('error', (error, receipt) => {
      console.log(error);
    });
}

function updateCards(t_item_id) {
  let t_item = Number(t_item_id) + 1 + '-hbid';
  let t_text = Number(items[t_item_id].highestBid) / 1000;
  document.getElementById(t_item).textContent = t_text + ' ETH';
}

async function updateItems(event_data) {
  console.log(event_data.returnValues);
  let t_item = items[event_data.returnValues.item_id];
  t_item.highestBid = Number(event_data.returnValues.item.highestBid);
  t_item.highestBidder = event_data.returnValues.item.highestBidder;
  updateCards(event_data.returnValues.item_id);
}

export const placeBid = (item_id) => {
  console.log('Placing bid')
  if(items.length) {
    console.log(items[item_id]);
    items[item_id].highestBid += 5;
    auctionContract.methods.placeBid(item_id, Math.round(items[item_id].highestBid)).send({from: selectedAccount}).catch((err) => console.log(err));
  }
}