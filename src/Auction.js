import Card from './Card';

function Auction() {
    return (
        <div class="grid grid-cols-3 p-2">
            <Card item="nft_images/img-1.png" hbid="1-hbid"></Card>
            <Card item="nft_images/img-2.png" hbid="2-hbid"></Card>
            <Card item="nft_images/img-3.png" hbid="3-hbid"></Card>
            <Card item="nft_images/img-4.png" hbid="4-hbid"></Card>
            <Card item="nft_images/img-5.jpg" hbid="5-hbid"></Card>
            <Card item="nft_images/img-6.jpg" hbid="6-hbid"></Card>
        </div>
    );
}

export default Auction;