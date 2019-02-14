const mongoose = require('mongoose');

var bitcoinWalletScheme = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: address => {
        // TODO: validator for addresses
        return true;
      },
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
  _id: false,
});

bitcoinWalletScheme.methods.validate = function(signedMessage) {
  // TODO: function stub
  console.log(`Validating ${this.address}`);
  return false;
}

bitcoinWalletScheme.index({ address: 1 });

module.exports = mongoose.model('BitcoinWallet', bitcoinWalletScheme);
