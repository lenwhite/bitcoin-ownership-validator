import React, { Component } from 'react';
import { withAlert } from 'react-alert';

class ValidateSignatures extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    e.persist();
    const fd = new FormData(e.target);

    const json = Array.from(fd.entries()).reduce((acc, pair) => ({
      ...acc,
      [pair[0]]: pair[1],
    }), {});


    let response = fetch('api/addresses/validate', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(json),
    });

    let success;

    response.then(res => {
      success = res.ok;
      console.log(response);
      return res.json()
    }).then(json => {
      if (success) {
        this.props.alert.success(json.message);
        e.target.reset();
      } else {
        this.props.alert.error(json.message);
      }
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

export default withAlert()(ValidateSignatures);
