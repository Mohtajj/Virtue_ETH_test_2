
require('dotenv').config();
const API_URL = process.env.ROPSTEN_URL;
const PUBLIC_KEY = process.env.ROPSTEN_PUBLIC;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);



const temp = async () => {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

    return nonce;
}

console.log(temp().then(nonce => console.log(nonce)))

module.exports = {
    temp
}