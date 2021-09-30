const { BLOCKCHAIN } = require('../../../config/credentials');
const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client');
const BufferList = require('bl');
const blockchainUser = require('../blockchain-user');
const RSAAlgorithm = require('./rsa-algorithm');

class SmartContract extends RSAAlgorithm {
  web3;
  networkId;
  myContract;
  ipfs;
  address = BLOCKCHAIN.ADDRESS;
  infuraUrl = BLOCKCHAIN.INFURA_URL;
  privateKey = BLOCKCHAIN.PRIVATE_KEY;
  async init(Contract, address, privateKey, contractAddress) {
    if (!Contract || !address || !privateKey) {
      throw new Error(`Missing parameters while initializing Smart Contract`);
    }
    this.ipfs = ipfsClient.create({
      host: BLOCKCHAIN.IPFS_URL,
      port: BLOCKCHAIN.IPFS_PORT,
      protocol: BLOCKCHAIN.IPFS_PROTOCOL,
    });
    this.address = address;
    this.privateKey = privateKey;
    this.web3 = new Web3(BLOCKCHAIN.INFURA_URL);
    this.networkId = await this.web3.eth.net.getId();
    const contractAddressStored = contractAddress || Contract.networks[this.networkId].address;
    this.myContract = new this.web3.eth.Contract(Contract.abi, contractAddressStored);
    return this.myContract.options.address;
  }
  async deploy(Contract, address, privateKey) {
    if (!Contract || !address || !privateKey) {
      throw new Error(`Missing parameters while initializing Smart Contract`);
    }
    this.ipfs = ipfsClient.create({
      host: BLOCKCHAIN.IPFS_URL,
      port: BLOCKCHAIN.IPFS_PORT,
      protocol: BLOCKCHAIN.IPFS_PROTOCOL,
    });
    const newAccount = await blockchainUser.addAccount();
    this.address = newAccount.address;
    this.privateKey = newAccount.privateKey;
    this.web3 = new Web3(BLOCKCHAIN.INFURA_URL);
    this.myContract = await new this.web3.eth.Contract(Contract.abi).deploy({ data: Contract.bytecode }).send({
      from: this.address,
      gas: 6721975,
      gasPrice: 100,
    });
    return this.myContract.options.address;
  }
  async addPayloadIPFS(payload) {
    const ipfsPayload = this.encryptStringWithRsaPublicKey(JSON.stringify(payload), this.address);
    var buf = Buffer.from(ipfsPayload);
    const result = await this.ipfs.add(buf);
    return result;
  }
  async getPayloadIPFS(hash) {
    try {
      const content = new BufferList();
      for await (const file of this.ipfs.get(hash)) {
        for await (const chunk of file.content) {
          content.append(chunk);
        }
      }
      const ipfsPayload = content.toString();
      const result = this.decryptStringWithRsaPrivateKey(ipfsPayload, this.privateKey);
      return JSON.parse(result);
    } catch (err) {
      return {};
    }
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
