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
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {

    let addressList = [];

    return (<>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Select options:</legend>
          <div class="row">

            <div class="col"><label>Type of address:
              <select id="address_type">
                <option>{this.state.addressType}</option>
              </select>
            </label></div>

            <div class="col-8"><label>Default message:
              <input id="default_message" type="Text" defaultValue={this.state.addressCount} />
              <label>
              <input id="use_random_nonce" type="checkbox" /> Add random nonce
              </label>
            </label></div>
          </div>

          <input type="submit" value="Submit" />
        </fieldset>
      </form>

      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Select options:</legend>
          <div class="row">
            <div class="col">
            <label>Number of addresses:
              <input id="address_count" type="number" defaultValue={this.state.addressCount} />
            </label>
            </div>
            <div class="col">
            <label>Type of address:
              <select id="address_type">
                <option>{this.state.addressType}</option>
              </select>
            </label>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </>)
  }
}
