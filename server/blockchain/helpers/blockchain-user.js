const { BLOCKCHAIN } = require('../../config/credentials');
const Web3 = require('web3');

class BlockchainUser {
  web3;
  constructor() {
    this.web3 = new Web3(BLOCKCHAIN.INFURA_URL);
  }
  async getAccounts() {
    const accountsArray = await this.web3.eth.getAccounts(); // you are getting 10 pre-funded accounts
    return accountsArray;
  }
  async addAccount() {
    const accounts = await this.web3.eth.getAccounts();
    const newAccount = await this.web3.eth.accounts.create();
    await this.web3.eth.getBalance(accounts[0], (err, bal) => {
      // console.log('Ganache balance', bal);
    });
    await this.web3.eth.sendTransaction({
      from: accounts[0],
      to: newAccount.address,
      value: this.web3.utils.toWei('1', 'ether'),
    });
    await this.web3.eth.getBalance(newAccount.address, (err, bal) => {
      // console.log('New Account balance', bal);
    });
    return newAccount;
  }
}

module.exports = new BlockchainUser();
