import React, { Component } from 'react';
import { withAlert } from 'react-alert';

class AddAddresses extends Component {

  constructor(props) {

    super(props);
    this.state = {
      addressType: 'bitcoin',
      defaultMessage: '',
      message: null,
      useRandomNonce: true,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNonce = this.toggleNonce.bind(this);
    this.handleDefaultMessageChange = this.handleDefaultMessageChange.bind(this);
    this.message = this.message.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this)
  }

  handleSubmit(e) {

    e.preventDefault();
    e.persist();
    const fd = new FormData(e.target);

    const json = Array.from(fd.entries()).reduce((acc, pair) => ({
      ...acc,
      [pair[0]]: pair[1],
    }), {});


    let response = fetch('api/addresses/add', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(json),
    });

    let success;

    response.then(res => {
      success = res.ok;
      console.log(success);
      return res.json()
    }).then(json => {
      if (success) {
        this.props.alert.success(json.message);
        e.target.reset();
        this.setState( { message: null } );
      } else {
        this.props.alert.error(json.message);
      }
    })

  }

  toggleNonce(e) {
    this.setState({ useRandomNonce: e.target.checked });
  }

  handleDefaultMessageChange(e) {
    this.setState({ defaultMessage: e.target.value });
  }

  message() {
    if (this.state.message) {
      return this.state.message;
    } else if (this.state.useRandomNonce) {
      return `${this.state.defaultMessage}+${AddAddresses.generateRandomString(32)}`;
    } else {
      return this.state.defaultMessage;
    }
  }

  handleMessageChange(e) {
    this.setState( { message: e.target.value });
  }

  static generateRandomString(len) {
    // dec2hex :: Integer -> String
    function dec2hex(dec) {
      return ('0' + dec.toString(16)).substr(-2);
    }

    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  render() {

    let message = this.message();

    return (<form onSubmit={this.handleSubmit}>
      <fieldset>
        <legend>Select options:</legend>
        <div className="row">

          <div className="col-8"><label>Default message:
              <input
              id="default_message"
              type="Text"
              defaultValue={this.state.defaultMessage}
              onChange={this.handleDefaultMessageChange}
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
            <input id="address" name="address" type="text" placeholder="Address" required />
          </div>
          <div className="col">
            <input id="message" name="message" type="text" placeholder="Message" value={message} onChange={this.handleMessageChange} required />
          </div>
        </div>
        <input type="submit" value="Submit" /> <input type="reset" value="Clear" onClick={() => this.setState( { useRandomNonce: this.state.useRandomNonce, message: null })  }/>
      </fieldset>
    </form>)
  }
}

export default withAlert()(AddAddresses);
