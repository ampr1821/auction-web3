import Card from './Card';

function Auction() {
    return (
        <div class="grid grid-cols-3 p-2">
            <Card item="nft_images/img-1.png" hbid="1-hbid" item_id="0" hbidname="1-name"></Card>
            <Card item="nft_images/img-2.png" hbid="2-hbid" item_id="1" hbidname="2-name"></Card>
            <Card item="nft_images/img-3.png" hbid="3-hbid" item_id="2" hbidname="3-name"></Card>
            <Card item="nft_images/img-4.png" hbid="4-hbid" item_id="3" hbidname="4-name"></Card>
            <Card item="nft_images/img-5.jpg" hbid="5-hbid" item_id="4" hbidname="5-name"></Card>
            <Card item="nft_images/img-6.jpg" hbid="6-hbid" item_id="5" hbidname="6-name"></Card>
        </div>
    );
}

export default Auction;