// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Auction {

    struct Item {
        uint256 highestBid;
        address highestBidder;
    }

    address private auctioneer;

    event itemBid(uint256 item_id, uint256 price);
    event auctionEnd();

    Item[] public items;

    constructor() {
        auctioneer = msg.sender;
        for(uint i = 0; i < 6; i++) {
            items.push(Item({
                highestBid: 0,
                highestBidder: address(0)
            }));
        }
    }

    function placeBid(uint256 item_id, uint256 price) public {
        require(price > items[item_id].highestBid, "The Current bid is lower than the highest bid!");
        
        emit itemBid(item_id, price);

        items[item_id].highestBid = price;
        items[item_id].highestBidder = msg.sender;
    }

    function getItem(uint256 item_id) public view returns (Item memory) {
        return items[item_id];
    }

    function endAuction() public {
        require(msg.sender == auctioneer, "Only the Auctioneer can end the auction!");
        emit auctionEnd();
    }

}