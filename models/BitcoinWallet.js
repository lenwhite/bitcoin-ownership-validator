const mongoose = require('mongoose');

var bitcoinWalletScheme = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: address => {
        // TODO: validator for addresses
        return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address);
      },
      message: props => `${props.value} is not a valid bitcoin address!`
    }
  },

  message: String,
  signedMessage: {
    type: String,
    validate: {
      validator: signedMessage => {
        // TODO: validator for signature
        return true;
      }
    }
  }
}, {
  capped: 65536,
});
/*
bitcoinWalletScheme.methods.validate = function(signedMessage) {
  // TODO: function stub
  console.log(`Validating ${this.address}`);
  return false;
}*/

bitcoinWalletScheme.index({ address: 1 });

module.exports = mongoose.model('BitcoinWallet', bitcoinWalletScheme);
