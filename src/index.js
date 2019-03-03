require("@babel/polyfill");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/navbar';

import AddAddresses from './components/add-addresses';
import ValidateSignatures from './components/validate-signatures';
import ViewAddresses from './components/view-addresses';

import { positions as alertPositions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/alert';

import './static/chota.css';

class App extends Component {
  constructor(props) {
    super(props);

    // is just a single page app, not using react-router for now
    this.state = {
      pages: ['Add Address', 'Validate Signature', 'List Addresses'],
    };

    this.state.activePage = this.state.pages[0];

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    this.setState({ activePage: page });
  }

  render() {

    let Page;

    switch (this.state.activePage) {
      case 'Add Address':
        Page = <AddAddresses />
        break;
      case 'Validate Signature':
        Page = <ValidateSignatures />
        break;
      case 'List Addresses':
        Page = <ViewAddresses />
        break;
      default:
        Page = <>{this.state.activePage}</>
    }

    return (
      <AlertProvider
        template={AlertTemplate}
        position={alertPositions.BOTTOM_CENTER}
        timeout={15000}
      >
        <div className="container">
          <NavBar
            pages={this.state.pages}
            active={this.state.activePage}
            appName='Wallet Validator'
            onPageChange={this.handlePageChange}
          />
          {Page}
        </div>
      </AlertProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
