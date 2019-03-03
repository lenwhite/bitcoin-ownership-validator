const mongoose = require('mongoose');
var Message = require('bitcore-message');

var bitcoinWalletScheme = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
  },

  message: {
    type: String,
    required: true,
  },
  signature: String,
});

bitcoinWalletScheme.index({ address: 1 });

bitcoinWalletScheme.pre('validate', function (next) {
  console.log('validation hook');

  if (! /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(this.address)  ) {
    this.invalidate('address', `<${this.address}> is not a valid bitcoin address`, this.address);
  }

  if (this.signature) {
    console.log(`Validating ${this.address} signed message ${this.message} with signature ${this.signature}`);

    let verified = false;
    try {
      verified = new Message(this.message).verify(this.address, this.signature);
    } catch(err) {
      verified = false;
    }

    if (!verified) {
      this.invalidate('signature', `<${this.signature}> does not match message <${this.message}> signed by <${this.address}>`, this.signature);
    }
  }

  next();
})

bitcoinWalletScheme.pre('update', function (next) {
  console.log('update hook')
  this.setOptions.runValidators = true;
  this.setOptions.context = 'query';
  next();
})

bitcoinWalletScheme.pre('updateOne', function (next) {
  console.log('updateOne hook')
  this.setOptions.runValidators = true;
  this.setOptions.context = 'query';
  next();
})


bitcoinWalletScheme.pre('findOneAndUpdate', function (next) {
  console.log('findOneAndUpdate hook')
  this.setOptions.runValidators = true;
  this.setOptions.context = 'query';
  next();
})

module.exports = mongoose.model('BitcoinWallet', bitcoinWalletScheme);
