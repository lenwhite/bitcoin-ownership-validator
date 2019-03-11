require("@babel/polyfill");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import NavBar from './components/navbar';

import AddAddresses from './components/add-addresses';
import ValidateSignatures from './components/validate-signatures';
import ViewAddresses from './components/view-addresses';

import { positions as alertPositions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/alert';

import './static/chota.css';

const routes = [
  {
    path: "/",
    exact: true,
    text: <>Add Addresses</>,
    page: AddAddresses
  },
  {
    path: "/validate",
    exact: true,
    text: <>Validate Addresses</>,
    page: ValidateSignatures
  },
  {
    path: "/list",
    exact: true,
    text: <>List Addresses</>,
    page: ViewAddresses
  },
];

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <AlertProvider
          template={AlertTemplate}
          position={alertPositions.BOTTOM_CENTER}
          timeout={15000}
        >
          <div className="container">
            <NavBar
              routes={routes}
              appName='Wallet Validator'
            />
            <p>
              This is a simple tool to validate ownership of a bitcoin wallet address (e.g. if you want to do an audit and obtain proof-of-ownership). Specify a message for a bitcoin wallet address, and then verify that the provided signature matches that stored message and address.
            <br />
              <a href="https://github.com/lenwhite/wallet-signature-validator">GitHub</a>
            </p>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.page} />
            ))}
          </div>
        </AlertProvider>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
