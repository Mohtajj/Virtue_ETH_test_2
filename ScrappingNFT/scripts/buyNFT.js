
require('dotenv').config();
const API_URL = process.env.ROPSTEN_URL;
const PUBLIC_KEY = process.env.ROPSTEN_PUBLIC;
const PRIVATE_KEY = process.env.ROPSTEN_PRIVATE;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/WesTer.sol/WesTer.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function buyNFT(tokenID, buyer, nonce) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 600000,
        'data': nftContract.methods.buyNFT(tokenID, buyer).encodeABI()
    };


    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                        return true;
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
}


// buyNFT(1,"0xffe8A61ADbf2CD86E56a5982084b5dd1E7D2cE2e");

module.exports = {
    buyNFT
}