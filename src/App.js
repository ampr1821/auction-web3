import { useEffect } from 'react';
import './App.css';
import Auction from './Auction';
import { init, endAuct } from './Web3Client';
// import { endAuct } from './Web3Client';

function App() {

  useEffect(() => {
    init();
  }, []);
  
  return (
    <p>
      <div class="text-center mt-5">
        <button class="px-3 py-3 bg-blue-500 hover:bg-blue-700 rounded text-sm font-semibold text-white" onClick={() => endAuct()}>
        End Auction
        </button>
      </div>
      <Auction></Auction>
    </p>
  );
}

export default App;
