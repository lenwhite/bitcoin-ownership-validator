const express = require('express');
const router = express.Router();
const bitcoinWallet = require('./models/BitcoinWallet');

router.get('/addresses', (req, res, next) => {
  bitcoinWallet.find()
    .then(data => res.json(data))
    .catch(next)
});

router.post('/addresses', (req, res, next) => {
  if (req.body.address) {

    bitcoinWallet.findOne({'address': req.body.address})
      .then(data => {
        if (data.count === 1) {
          data[0].update(req.body)
            .then(data => res.json(data))
            .catch(next)
        } else {
          bitcoinWallet.create(req.body)
            .then(data => res.json(data))
            .catch(next)
        }
      })
  } else {
    res.json({
      error: 'Address is not specified',
    });
  }
});

module.exports = router;