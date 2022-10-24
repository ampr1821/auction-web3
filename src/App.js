import { useEffect } from 'react';
import './App.css';
import Auction from './Auction';
import { init } from './Web3Client';

function App() {

  useEffect(() => {
    init();
  }, []);
  
  return (
    <Auction></Auction>
  );
}

export default App;
