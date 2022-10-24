import Web3 from 'web3';

import AuctionBuild from 'contracts/Auction.json';

let selectedAccount;
let auctionContract;
const providerUrl = 'ws://localhost:7545';

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

    const networkId = await web3.eth.net.getId();

    auctionContract = new web3.eth.Contract(AuctionBuild.abi, AuctionBuild.networks[networkId].address);

    for(let i = 0; i < 6; i++) {
      let promise_obj = await auctionContract.methods.getItem(i).call({from: selectedAccount});
      items.push({highestBid: Number(promise_obj.highestBid), highestBidder: promise_obj.highestBidder});
      document.getElementById(i + 1 + '-hbid').textContent = Number(promise_obj.highestBid) / 1000 + ' ETH';
    }

    console.log(items);

    auctionContract.events.itemBid({}, (err, event_) => {
      updateItems(event_);
    })
    .on('error', (error, receipt) => {
      console.log(error);
    });
    

    // greetContract.events.newMessage({}, (err, event_) => {
    //   console.log(event_.returnValues.msg);
    // })
    // .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    //     console.log(error)
    // });

    // greetContract.methods.setValue(7535345).send({from: selectedAccount});
}

async function updateItems(event_data) {
  console.log(event_data.returnValues);
  let t_item = items[event_data.returnValues.item_id];
  t_item.highestBid = Number(event_data.returnValues.item.highestBid) / 1000;
  let t_item_id = Number(event_data.returnValues.item_id) + 1 + '-hbid';
  document.getElementById(t_item_id).textContent = t_item.highestBid + ' ETH';

}

export const placeBid = (item_id) => {
  console.log('Placing bid')
  if(items.length) {
    items[item_id].highestBid += 5;
    auctionContract.methods.placeBid(item_id, items[item_id].highestBid).send({from: selectedAccount});
  }
}

// export const greet = () => {
//   return greetContract.methods.greet().send({from: selectedAccount});
// }

// export const getval = () => {
//   return greetContract.methods.getValue().call({from: selectedAccount});
// }