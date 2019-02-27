# Key Signature Validator

Requires Node.JS and Heroku.

``` bash
npm install
heroku local web
```

This is a program that generates a nonce for a Bitcoin wallet address. It then takes in a signature and checks that:

1. The address is one that it has previously generated a nonce for
2. The message is the nonce that it had generated
3. The signature verifies that the message is signed by the private key corresponding to the Bitcoin address.

## Installation

TBD

## Deployment

``` bash
git push heroku master
```

## To-Do

* Heroku schedule to clear db periodically (although the capped collection would probably work on it's own?)
  * maybe a service that periodically calls `/api/addresses/drop`?
* Set nodemon to ignore changes in /src/, set webpack to --watch /src/ and rebuild to save on reloads
  * <https://itnext.io/auto-reload-a-full-stack-javascript-project-using-nodemon-and-webpack-dev-server-together-a636b271c4e>

<https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f>

* database (is it just exposed through a restful api on another microservice?)
  * <https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose>
  * <https://blog.cloudboost.io/creating-your-first-mern-stack-application-b6604d12e4d3>
  * <https://www.mongodb.com/blog/post/the-modern-application-stack-part-5-using-reactjs-es6-and-jsx-to-build-a-ui-the-rise-of-mern>
  * <https://restfulapi.net/security-essentials/>
  * <https://scotch.io/@deityhub/getting-started-with-the-mern-stack>
  * <https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274>
* Look into styled-components (or other methods of adding css to react?)
* Add support for Ethereum addresses.
* Typed hinting?
  * <https://templecoding.com/blog/2016/03/31/creating-typescript-typings-for-existing-react-components/>
  * <https://medium.com/javascript-scene/you-might-not-need-typescript-or-static-types-aa7cb670a77b>
  * <https://strongloop.com/strongblog/type-hinting-in-javascript/>
