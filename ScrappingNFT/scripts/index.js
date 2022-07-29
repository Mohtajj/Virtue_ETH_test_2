const { constants } = require('buffer');
const csv = require('csv-parser');
const { resolve } = require('dns');
const fs = require('fs');
const { buyNFT } = require('./buyNFT');
const { mintNFT } = require('./mintNFT');
const {temp} = require('./getNonce');


const mint = [];
const sell = [];


const flushMint = (filename, nonce)=>{
    fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
        mint.push(row);
        
        // setTimeout(mintNFT(row.tokenURI),5000);
      })
    .on('end',  async () => {
      // mint.forEach(async (row) => {
      //   //  setTimeout(()=>{mintNFT(row.tokenURI)},5000);
      //    let value = await new Promise(resolve => setTimeout(function() {mintNFT(row.tokenURI) } , 2000));
      //    console.log(value);
      // });

      const size = mint.length;
      let count = 0;
      while(count<size){
        // const curr = await new Promise(resolve => setTimeout(function() {mintNFT(mint[count].tokenURI) } , 1000));

        // curr.then(() => count++).catch(err=>console.log(err));
        mintNFT(mint[count].tokenURI, nonce+count)
        count++;
      }

  });
};

const flushBuy = (filename, nonce)=>{
    fs.createReadStream(filename)
    .pipe(csv())
    .on('data',  (row) => {
        console.log(row); 
        sell.push(row);       
        
        // setTimeout(buyNFT(row.tokenID, row.buyer),5000);
      })
    .on('end', async () => {
      // sell.forEach(async (row) => {
      //   //  setTimeout(()=>{buyNFT(row.tokenID, row.buyer)},5000);
      //    let value = await new Promise(resolve => setTimeout(function() {buyNFT(row.tokenID, row.buyer) } , 2000));
      //    console.log(value);
      // });

      const size = sell.length;
      let count = 0;
      while(count<size){
        // const curr = await new Promise(resolve => setTimeout(function() {buyNFT(sell[count].tokenID, sell[count].buyer)} , 1000));

        // curr.then(() => count++).catch(err=>console.log(err));
        buyNFT(sell[count].tokenID, sell[count].buyer, nonce+count)
        count++
      }
  });
};




// setTimeout(flushMint("mint.csv"),3000);
temp().then(res => {
  
  // flushMint("mint.csv", res)
  flushBuy("sell.csv", res)

});
// setTimeout(flushBuy("sell.csv"),3000);
