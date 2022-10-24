import { useEffect } from 'react';
import './App.css';
import Card from './Card';

function App() {

  useEffect(() => {
    const x = document.getElementById('1-hbid');
    x.textContent = "0.05 ETH";
  }, []);
  
  return (
    <div class="grid grid-cols-3 p-2">
      <Card item="nft_images/img-1.png" hbid="1-hbid"></Card>
      <Card item="nft_images/img-2.png" hbid="2-hbid"></Card>
      <Card item="nft_images/img-3.png" hbid="3-hbid"></Card>
      <Card item="nft_images/img-4.png" hbid="4-hbid"></Card>
      <Card item="nft_images/img-5.jpg" hbid="5-hbid"></Card>
      <Card item="nft_images/img-6.jpg" hbid="6-hbid"></Card>
    </div>
    
    // <div className="App">
    //   <button class="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">My Tailwind Button</button>
    //   <div class="bg-blue-900 text-center py-4 lg:px-4">
    //       <div class="p-2 bg-blue-800 items-center text-blue-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    //           <span class="flex rounded-full bg-blue-500 uppercase font-bold px-2 py-1 text-xs mr-3">New</span>
    //           <span class="font-semibold mr-2 text-left flex-auto">Use Tailwind CSS to implement your own unique design!</span>
    //       </div>
    //   </div>
    // </div>
  );
}

export default App;
