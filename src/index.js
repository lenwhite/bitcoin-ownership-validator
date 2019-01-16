require("@babel/polyfill");

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/navbar';
import './static/chota.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let navButtons = [{
      text: 'Page 1',
      link: 'Link 1'
    }, {
      text: 'Page 2',
      link: 'Link 2'
    }];

    return (
      <>
        <NavBar buttons={navButtons} active={navButtons[0]} name='Wallet Validator' />
        <div>Hello World!</div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));