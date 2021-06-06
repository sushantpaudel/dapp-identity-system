const Contract = require('../build/DigitalIdentity.json');
const SmartContract = require('./util/smart-contract');

class DigitalIdentity extends SmartContract {
  checkParams() {
    if (!this.address && !this.privateKey) {
      throw new Error(`You cannot invoke these functions without initialization`);
    }
  }
  async initContract(address, privateKey) {
    this.checkParams();
    await this.init(Contract, address, privateKey);
  }
  async retrieveIdentity() {
    this.checkParams();
    const addr = await this.myContract.methods.identities(this.address).call();
    const value = await this.getPayloadIPFS(addr.contentAddress);
    return value;
  }
  async createIdentity(payload) {
    this.checkParams();
    const ipfsResult = await this.addPayloadIPFS(payload);
    const transaction = this.myContract.methods.createIdentity(ipfsResult.path);
    const receipt = await this.signTransaction(transaction);
    return receipt;
  }
}

module.exports = new DigitalIdentity();
