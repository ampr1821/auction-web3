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
      let promise_obj = await auctionContract.methods.getItem(0).call({from: selectedAccount});
      items.push({highestBid: promise_obj.highestBid, highestBidder: promise_obj.highestBidder});
      document.getElementById(i + 1 + '-hbid').textContent = promise_obj.highestBid + ' ETH';
    }

    console.log(items);
    

    // greetContract.events.newMessage({}, (err, event_) => {
    //   console.log(event_.returnValues.msg);
    // })
    // .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
    //     console.log(error)
    // });

    // greetContract.methods.setValue(7535345).send({from: selectedAccount});
}

// export const placeBid = (item, price) => {
//   return auctionContract.methods.placeBid(item, price)
// }

// export const greet = () => {
//   return greetContract.methods.greet().send({from: selectedAccount});
// }

// export const getval = () => {
//   return greetContract.methods.getValue().call({from: selectedAccount});
// }