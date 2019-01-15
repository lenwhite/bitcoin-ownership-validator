require("@babel/polyfill");

import React, { Component }  from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends Component {
  render() {
    return <div>Hello World!</div>
  }
}

const App = () => <HelloWorld/>

ReactDOM.render(<App/>, document.getElementById('root'));