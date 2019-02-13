import React, { Component } from 'react';

export default class AddAddresses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressType: 'bitcoin',
      defaultMessage: '',
      useRandomNonce: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNonce = this.toggleNonce.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.newDefaultMessage = this.newDefaultMessage.bind(this);
  }

  handleSubmit(e) {
    // TODO
    e.preventDefault();
  }

  toggleNonce(e) {
    this.setState({useRandomNonce: e.target.checked});
  }

  handleMessageChange(e) {
    this.setState({defaultMessage: e.target.value});
  }

  newDefaultMessage() {
    return `${this.state.defaultMessage}+${AddAddresses.generateRandomString(30)}`
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

  render() {

    console.log(this.newDefaultMessage());
    return (<>
        <fieldset>
          <legend>Select options:</legend>
          <div className="row">

            <div className="col"><label>Type of address:
              <select id="address_type">
                <option>{this.state.addressType}</option>
              </select>
            </label></div>

            <div className="col-8"><label>Default message:
              <input
                id="default_message"
                type="Text"
                onChange={this.handleMessageChange}
              />
              <label>
              <input
                id="use_random_nonce"
                type="checkbox"
                onChange={this.toggleNonce}
              /> Add random nonce
              </label>
            </label></div>
          </div>
        </fieldset>

      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Addresses</legend>

          {/* last row  */}
          <div className="row">
            <div className="col">
              <input id="address_count" type="text" placeholder="Address" />
            </div>
            <div className="col">
              <input id="address_count" type="text" value={this.newDefaultMessage()} />
            </div>
          </div>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </>)
  }
}
