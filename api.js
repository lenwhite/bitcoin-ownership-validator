const express = require('express');
const router = express.Router();
const bitcoinWallet = require('./models/BitcoinWallet');

router.get('/addresses', (req, res, next) => {
  bitcoinWallet.find()
    .then(data => res.json(data))
    .catch(next)
});

router.delete('addresses', (req, res) => {
  // TODO: for debug/development purposes only
  bitcoinWallet.collection.drop();
})

router.post('/addresses', (req, res, next) => {
  console.log(req.body);

  function handleValidationError(err) {
    // TODO: proper error message

    if (err.name === 'ValidationError') {
      console.error('Error Validating!', err);
      res.status(422).json(err);
    } else {
      next(err);
    }
  }

  if (req.body.address) {
    bitcoinWallet.findOne({'address': req.body.address})
      .then(data => {
        if (data == null) {
          bitcoinWallet.create(req.body)
            .then(data => res.json(data))
            .catch(handleValidationError)
        } else if (data.count === 1) {
          data[0].update(req.body)
            .then(data => res.json(data))
            .catch(handleValidationError)
        }
      })
      .catch(handleValidationError);
  } else {
    res.json({
      error: 'Address is not specified',
    });
  }
});

module.exports = router;


