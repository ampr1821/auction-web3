// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Auction {

    struct Item {
        uint256 highestBid;
        address highestBidder;
        bool isPaid;
    }

    address payable private auctioneer;

    event itemBid(uint256 item_id, Item item);
    event auctionEnd();

    Item[] public items;

    constructor() {
        auctioneer = payable(msg.sender);
        for(uint i = 0; i < 6; i++) {
            items.push(Item({
                highestBid: 0,
                highestBidder: address(0),
                isPaid: false
            }));
        }
    }

    function placeBid(uint256 item_id, uint256 price) public {
        require(price > items[item_id].highestBid, "The Current bid is lower than the highest bid!");

        items[item_id].highestBid = price;
        items[item_id].highestBidder = msg.sender;

        emit itemBid(item_id, items[item_id]);
    }

    function getItem(uint256 item_id) public view returns (Item memory) {
        return items[item_id];
    }

    function endAuction() public {
        require(msg.sender == auctioneer, "Only the Auctioneer can end the auction!");
        emit auctionEnd();
    }

    function pay(uint256 item_id) public payable {
        require(
            items[item_id].highestBidder == msg.sender,
            "Only the highest bidder can pay for this item!"
        );
        
        (bool success, ) = auctioneer.call{value: msg.value}("");
        require(success, "Failed to send Ether");
        items[item_id].isPaid = true;
    }

}