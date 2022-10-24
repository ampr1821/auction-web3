import { placeBid } from "./Web3Client";

function Card(props) {
    return (
        <div class="pt-5 m-5">
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div class="px-6 py-4">
                    <img src={props.item} style={{ width: 300, height: 300 }} alt="NFT"></img>
                </div>
                <div class="px-6 py-4 text-center">
                    <span class="font-semibold text-gray-700 mr-2">Highest Bid: </span>
                    <span class="font-semibold text-gray-700 mr-2" id={props.hbid}></span>
                </div>
                <div class="px-4 py-4 text-center">
                    <button class="px-3 py-3 bg-green-500 hover:bg-green-700 rounded text-sm font-semibold text-white" onClick={() => placeBid(props.item_id)}> Bid Higher! </button>
                </div>
            </div>
        </div>
    );
}

export default Card;