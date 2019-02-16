import React, { Component } from 'react';

export default class ValidateSignatures extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (<>
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Insert signed message:</legend>
          <div className="row">
            <div className="col"><label>Signature
              <textarea
                rows="5"
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
