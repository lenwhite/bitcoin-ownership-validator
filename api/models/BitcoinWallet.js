const mongoose = require('mongoose');

var bitcoinWalletScheme = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },

  message: String,
  signature: String,
});
/*
bitcoinWalletScheme.methods.validate = function(signedMessage) {
  // TODO: function stub
  console.log(`Validating ${this.address}`);
  return false;
}*/

bitcoinWalletScheme.index({ address: 1 });

bitcoinWalletScheme.pre('validate', function (next) {
  if (! /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(this.address)  ) {
    this.invalidate('address', `${this.address} is not a valid bitcoin address`, this.address);
  }

  if (this.signature) {
    console.log(`Validating ${this.address} signed message ${this.message} with signature ${this.signature}`);
    this.invalidate('signature', `Invalid signature`, this.signature)
  }

  next();
})

module.exports = mongoose.model('BitcoinWallet', bitcoinWalletScheme);
