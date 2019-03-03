# Key Signature Validator

Requires Node.JS and Heroku. Can probably work perfectly fine without Heroku, in which case set up your own MongoDB in the environmental config ```MONGODB_URL```

``` bash
npm install
heroku local web
```

This is a simple tool to validate ownership of a bitcoin wallet address (e.g. if you want to do an audit and obtain proof-of-ownership).

Specify a message for a bitcoin wallet address, and then verify that the provided signature matches that stored message and address.

## Deployment

``` bash
git push heroku master
```
