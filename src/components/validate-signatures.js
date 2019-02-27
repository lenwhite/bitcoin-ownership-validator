import React, { Component } from 'react';

export default class ValidateSignatures extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    const json = Array.from(fd.entries()).reduce((acc, pair) => ({
      ...acc,
      [pair[0]]: pair[1],
    }), {});

    console.log(json);

    //e.target.reset();

    fetch('api/addresses', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(json),
    });

  }

  render() {
    return (<>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Insert signed message:</legend>

          <div className="row">
            <div className="col">
              <input id="address" name="address" type="text" placeholder="Address" ref={this.address} required />
            </div>
            <div className="col">
              <input id="message" name="message" type="text" placeholder="Message" ref={this.message} required />
            </div>
          </div>

          <div className="row">
            <div className="col"><label>Signature
              <textarea
                rows="3"
                id="signature"
                name="signature"
                type="text"
              />
            </label></div>
          </div>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    </>)
  }
}
