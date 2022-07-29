
require('dotenv').config();
const API_URL = process.env.ROPSTEN_URL;
const PUBLIC_KEY = process.env.ROPSTEN_PUBLIC;
const PRIVATE_KEY = process.env.ROPSTEN_PRIVATE;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/WesTer.sol/WesTer.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI, nonce) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 600000,
        'data': nftContract.methods.mintNFT(tokenURI).encodeABI()
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


mintNFT("https://gateway.pinata.cloud/ipfs/QmdwP3F1V7rR5vHkWcBV41oaqaQGhkqCziH7j8DEZs8QQv?preview=1");

module.exports = {
    mintNFT
}