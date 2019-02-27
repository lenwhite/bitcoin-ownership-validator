require("@babel/polyfill");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar';
import AddAddresses from './components/add-addresses';
import ValidateSignatures from './components/validate-signatures';
import { positions as alertPositions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

import './static/chota.css';

class App extends Component {
  constructor(props) {
    super(props);

    // is just a single page app, not using react-router for now
    this.state = {
      pages: ['Add Addresses', 'Validate Signatures'],
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
      case 'Add Addresses':
        Page = <AddAddresses />
        break;
      case 'Validate Signatures':
        Page = <ValidateSignatures />
        break;
      default:
        Page = <>{this.state.activePage}</>
    }

    return (
      <AlertProvider
        template={AlertTemplate}
        position={alertPositions.BOTTOM_CENTER}
        timeout={5000}
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
