import { useEffect } from 'react';
import './App.css';
import Auction from './Auction';
import { init } from './Web3Client';

function App() {

  useEffect(() => {
    init();
    const x = document.getElementById('1-hbid');
    x.textContent = "0.05 ETH";
  }, []);
  
  return (
    <Auction></Auction>
  );
}

export default App;
