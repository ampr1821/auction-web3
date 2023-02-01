import Web3 from 'web3';

import AuctionBuild from 'contracts/Auction.json';

let selectedAccount;
let auctionContract;
let networkId;
let pay_lock = false;

let items = [];
let bidderName;

async function collectFunds() {
  console.log('Auction ended!');
  console.log(`Account address: ${selectedAccount}`);
  if(pay_lock === false) {
    pay_lock = true;
    for(let i = 0; i < 6; i++) {
      let promise_obj = await auctionContract.methods.getItem(i).call({from: selectedAccount});
      items[i].highestBid = Number(promise_obj.highestBid);
      items[i].highestBidder = promise_obj.highestBidder;
      items[i].highestBidderName = promise_obj.highestBidderName;
      console.log(`Highest bidder address: ${promise_obj.highestBidder}`);
      updateCards(i);
      
      if(promise_obj.highestBidder.toLowerCase() === selectedAccount && items[i].paid === false) {

        let amt_hex = Number(promise_obj.highestBid) / 1000;
        amt_hex = (amt_hex * Math.pow(10, 18)).toString(16);

        let tx = {
          'from': selectedAccount,
          'to': AuctionBuild.networks[networkId].address,
          'value': amt_hex,
          'data': auctionContract.methods.pay(i).encodeABI()
        }
        // auctionContract.methods.pay(i).send({from: selectedAccount, value: promise_obj.highestBid});
        let res = await window.ethereum.request({method: 'eth_sendTransaction', params: [tx]});
        updateCards(i);
        console.log(res);
        items[i].paid = true;
      }
    }
  }
}

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

  const web3 = new Web3(Web3.givenProvider || "http://ganache:7545");

  networkId = await web3.eth.net.getId();

  auctionContract = new web3.eth.Contract(AuctionBuild.abi, AuctionBuild.networks[networkId].address);

  for(let i = 0; i < 6; i++) {
    let promise_obj = await auctionContract.methods.getItem(i).call({from: selectedAccount});
    items[i] = {highestBid: Number(promise_obj.highestBid), highestBidder: promise_obj.highestBidder, paid: promise_obj.isPaid, highestBidderName: promise_obj.highestBidderName};
    document.getElementById(i + 1 + '-hbid').textContent = Number(promise_obj.highestBid) / 1000 + ' ETH';
    document.getElementById(i + 1 + '-name').textContent = promise_obj.highestBidderName;
  }

  // console.log(items);
  if(bidderName===undefined) {
    bidderName = prompt("Enter Name");    
  }

  auctionContract.events.itemBid({}, (err, event_) => {
    updateItems(event_);
  })
  .on('error', (error, receipt) => {
    console.log(error);
  });

  auctionContract.events.auctionEnd({}, (err, event_) => {
    collectFunds();
  })
  .on('error', (error, receipt) => {
    console.log(error);
  });

  if(await auctionContract.methods.auctionStatus().call({from: selectedAccount}) === '1') {
    collectFunds();
  }
}

function updateCards(t_item_id) {
  let t_item = Number(t_item_id) + 1 + '-hbid';
  let t_text = Number(items[t_item_id].highestBid) / 1000;
  let t_bidderName = Number(t_item_id) + 1 + '-name';
  // console.log(t_bidderName);
  document.getElementById(t_item).textContent = t_text + ' ETH';
  document.getElementById(t_bidderName).textContent = items[t_item_id].highestBidderName;
}

async function updateItems(event_data) {
  console.log(event_data.returnValues);
  let t_item = items[event_data.returnValues.item_id];
  t_item.highestBid = Number(event_data.returnValues.item.highestBid);
  t_item.highestBidder = event_data.returnValues.item.highestBidder;
  t_item.paid = event_data.returnValues.item.isPaid;
  t_item.highestBidderName = event_data.returnValues.item.highestBidderName;
  updateCards(event_data.returnValues.item_id);
}

export const placeBid = (item_id) => {
  console.log('Placing bid')
  if(items.length) {
    console.log(items[item_id]);
    items[item_id].highestBid += 5;
    auctionContract.methods.placeBid(item_id, Math.round(items[item_id].highestBid),bidderName).send({from: selectedAccount}).catch((err) => console.log(err));
  }
}

export const endAuct = () => {
  auctionContract.methods.endAuction().send({from: selectedAccount}).catch((err) => alert(JSON.parse("{" + err.message.match(/"reason":"[a-zA-Z0-9 !]*/) + "\"}").reason));
}