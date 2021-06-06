const Contract = require('../build/DigitalIdentity.json');
const SmartContract = require('./util/contract');

class DigitalIdentity extends SmartContract {
  constructor() {
    super();
    this.init(Contract);
  }
  // async verifierEntity(verifierData) {
  //   //this.setState({loading: true});
  //   const did = await this.state.identity.methods.identities(verifierData.publicKey).call();
  //   this.setState({ loading: false });
  //   if (did.contentAddress) {
  //     let data = await ipfs.get(did.contentAddress);
  //     let d = JSON.parse(data[0].content.toString());
  //     if (this.verify(d)) {
  //       let data = JSON.parse(d.message);

  //       var details = {};
  //       details.publicKey = verifierData.publicKey;
  //       if (verifierData.fn !== '') details.fn = verifierData.fn;

  //       if (verifierData.ln !== '') details.ln = verifierData.ln;

  //       if (verifierData.age !== '') details.age = verifierData.age;

  //       if (verifierData.aadhar !== '') details.aadhar = verifierData.aadhar;

  //       if (verifierData.mail !== '') details.mail = verifierData.mail;

  //       if (verifierData.phone !== '') details.phone = verifierData.phone;
  //       console.log(data);

  //       this.fn(details, data.data)
  //         .then(() => {
  //           return this.ln(details, data.data);
  //         })
  //         .then(() => {
  //           return this.mail(details, data.data);
  //         })
  //         .then(() => {
  //           return this.phone(details, data.data);
  //         })
  //         .then(() => {
  //           return this.aadhar(details, data.data);
  //         })
  //         .then(() => {
  //           return this.age(details, data.data);
  //         })
  //         .then(() => {
  //           window.alert('Identity Verified Successfully...\n');
  //         })
  //         .catch(error => {
  //           window.alert(error);
  //         });
  //     }
  //   } else {
  //     window.alert('Invalid Digital Signature');
  //   }
  // }

  async createIdentity(payload) {
    // const ipfsResult = await this.addPayloadIPFS(payload);
    const ipfsResult = await this.getPayloadIPFS('QmYR12jxri1ACJMLdAdz94qU5AWFsTCUeBZNsqXyoA3KXf');
    const transaction = this.myContract.methods.createIdentity('QmYR12jxri1ACJMLdAdz94qU5AWFsTCUeBZNsqXyoA3KXf');
    const receipt = await this.signTransaction(transaction);
    console.log(receipt);
  }
}

module.exports = new DigitalIdentity();
