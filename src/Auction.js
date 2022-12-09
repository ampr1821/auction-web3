import Card from './Card';

function Auction() {
    return (
        <div class="grid grid-cols-3 p-2">
            <Card item="nft_images/img-1.png" hbid="1-hbid" item_id="0" hbidname="name1"></Card>
            <Card item="nft_images/img-2.png" hbid="2-hbid" item_id="1" hbidname="name2"></Card>
            <Card item="nft_images/img-3.png" hbid="3-hbid" item_id="2" hbidname="name3"></Card>
            <Card item="nft_images/img-4.png" hbid="4-hbid" item_id="3" hbidname="name4"></Card>
            <Card item="nft_images/img-5.jpg" hbid="5-hbid" item_id="4" hbidname="name5"></Card>
            <Card item="nft_images/img-6.jpg" hbid="6-hbid" item_id="5" hbidname="name6"></Card>
        </div>
    );
}

export default Auction;