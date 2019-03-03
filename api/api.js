const express = require('express');
const router = express.Router();
const bitcoinWallet = require('./models/BitcoinWallet');
const ValidationError = require('mongoose').Error.ValidationError;

router.get('/addresses', (req, res, next) => {
  bitcoinWallet.find()
    .then(data => res.json(data))
    .catch(next)
});

router.delete('/addresses', (req, res, next) => {

  console.log(`Deleting all saved addresses`);

  bitcoinWallet.collection.drop()
    .then(() => res.status(200).end())
    .catch(next)
})

router.post('/addresses/add', (req, res, next) => {
  console.log(req.body);

  function handleValidationError(err) {
    // TODO: proper error message

    if (err instanceof ValidationError) {
      console.error('Error Validating!', err);

      res.status(422).json({
        message: Object.keys(err.errors).map((key, index) => {
          return err.errors[key].message
        }).join()
      });
    } else {
      next(err);
    }
  }

  if (req.body.address) {

    if (req.body.signature) {
      res.status(422).json({
        message: 'Cannot add signature with message'
      });
      next();
    }

    bitcoinWallet.findOne({ 'address': req.body.address })
      .then((data) => {
        if (data == null) {
          bitcoinWallet.create(req.body)
            .then(data => res.json({
              message: `${req.body.address} added`
            }))
            .catch(handleValidationError)
        } else {
          data.updateOne(req.body)
            .then(data => res.json({
              message: `${req.body.address} updated`
            }))
            .catch(handleValidationError)
        }
      })
      .catch(next);
  } else {
    res.status(422).json({
      message: 'Address required',
    });
  }
});

router.put('/addresses/validate', (req, res, next) => {
  console.log(req.body);

  function handleValidationError(err) {
    // TODO: proper error message

    if (err instanceof ValidationError) {
      console.error('Error Validating!', err);

      res.status(422).json({
        message: Object.keys(err.errors).map((key, index) => {
          return err.errors[key].message
        }).join()
      });
    } else {
      next(err);
    }
  }

  if (req.body.address && req.body.signature && req.body.message) {

    bitcoinWallet.findOne({ 'address': req.body.address })
      .then((doc) => {
        if (doc == null) {
          res.status(422).json({
            message: `<${req.body.address}> not found`
          })
        } else if (doc.message != req.body.message) {
          res.status(422).json({
            message: `Wrong message signed`
          })
        } else {
          doc.signature = req.body.signature;
          doc.save()
            .then(doc => res.json({
              message: `<${req.body.address}> validated`
            }))
            .catch(handleValidationError)
        }
      })
      .catch(next);
  } else {
    res.status(422).json({
      message: 'Address, Signature & Message required',
    });
  }
});

module.exports = router;


