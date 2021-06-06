const Contract = require('../build/DigitalIdentity.json');
const SmartContract = require('./util/smart-contract');

class DigitalIdentity extends SmartContract {
  constructor(address, privateKey) {
    super();
    this.init(Contract, address, privateKey);
  }
  async retrieveIdentity(publicKey) {
    const value = await this.myContract.methods.identities(publicKey || this.address).call();
    return value;
  }
  async createIdentity(payload) {
    const ipfsResult = await this.addPayloadIPFS(payload);
    const transaction = this.myContract.methods.createIdentity(ipfsResult.path);
    const receipt = await this.signTransaction(transaction);
    return receipt;
  }
}

module.exports = new DigitalIdentity();
