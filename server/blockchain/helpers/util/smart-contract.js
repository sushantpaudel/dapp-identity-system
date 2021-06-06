const { BLOCKCHAIN } = require('../../../config/credentials');
const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client');

class SmartContract {
  web3;
  networkId;
  myContract;
  ipfs;
  address = BLOCKCHAIN.ADDRESS;
  infuraUrl = BLOCKCHAIN.INFURA_URL;
  privateKey = BLOCKCHAIN.PRIVATE_KEY;
  async init(Contract, address, privateKey) {
    this.address = address || this.address;
    this.privateKey = privateKey || this.privateKey;
    this.web3 = new Web3(BLOCKCHAIN.INFURA_URL);
    this.networkId = await this.web3.eth.net.getId();
    this.myContract = new this.web3.eth.Contract(Contract.abi, Contract.networks[this.networkId].address);
    this.ipfs = ipfsClient.create({
      host: BLOCKCHAIN.IPFS_URL,
      port: BLOCKCHAIN.IPFS_PORT,
      protocol: BLOCKCHAIN.IPFS_PROTOCOL,
    });
  }
  async addPayloadIPFS(payload) {
    var buf = Buffer.from(JSON.stringify(payload));
    const result = await this.ipfs.add(buf);
    return result;
  }
  async getPayloadIPFS(hash) {
    const result = await this.ipfs.get(hash);
    return result;
  }
  async signTransaction(transaction) {
    const gas = await transaction.estimateGas({ from: this.address });
    const gasPrice = await this.web3.eth.getGasPrice();
    const data = transaction.encodeABI();
    const nonce = await this.web3.eth.getTransactionCount(this.address);
    const signedTx = await this.web3.eth.accounts.signTransaction(
      {
        to: this.myContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: this.networkId,
      },
      this.privateKey,
    );
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt;
  }
}

module.exports = SmartContract;
