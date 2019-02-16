import React, { Component } from 'react';

export default class AddAddresses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressType: 'bitcoin',
      defaultMessage: '',
      useRandomNonce: false,
    }

    this.address = React.createRef();
    this.message = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNonce = this.toggleNonce.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.newDefaultMessage = this.newDefaultMessage.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);

    const json = Array.from(fd.entries()).reduce((acc, pair) => ({
      ...acc,
      [pair[0]]: pair[1],
    }), {});

    console.log(json);

    e.target.reset();

    fetch('api/addresses', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: AddAddresses.stringifyFormData(fd),
    });
  }

  toggleNonce(e) {
    this.setState({useRandomNonce: e.target.checked});
  }

  handleMessageChange(e) {
    this.setState({defaultMessage: e.target.value});
  }

  newDefaultMessage() {
    if (this.state.useRandomNonce) {
      return `${this.state.defaultMessage}+${AddAddresses.generateRandomString(30)}`;
    } else {
      return `${this.state.defaultMessage}`;
    }
  }

  static generateRandomString(len) {
    // dec2hex :: Integer -> String
    function dec2hex (dec) {
      return ('0' + dec.toString(16)).substr(-2);
    }

    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  static stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
      data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
  }

  render() {

    let defaultMessage = this.newDefaultMessage();

    return (<>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Select options:</legend>
          <div className="row">

            <div className="col-8"><label>Default message:
              <input
                id="default_message"
                type="Text"
                defaultValue={this.state.defaultMessage}
                onChange={this.handleMessageChange}
              />
              <label>
              <input
                id="use_random_nonce"
                type="checkbox"
                defaultChecked={this.state.useRandomNonce}
                onChange={this.toggleNonce}
              /> Add random nonce
              </label>
            </label></div>

            <div className="col"><label>Type of address:
              <select id="type">
                <option>{this.state.addressType}</option>
              </select>
            </label></div>

          </div>
        </fieldset>

        <fieldset>
          <legend>Addresses:</legend>

          {/* last row  */}
          <div className="row">
            <div className="col">
              <input id="address" name="address" type="text" placeholder="Address" ref={this.address} required />
            </div>
            <div className="col">
              <input id="message" name="message" type="text" placeholder="Message" ref={this.message} defaultValue={defaultMessage} />
            </div>
          </div>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </>)
  }
}
