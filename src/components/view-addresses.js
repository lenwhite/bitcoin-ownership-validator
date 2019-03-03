import React, { Component } from 'react'

export default class ViewAddresses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addresses: null,
    }
  }

  componentWillMount() {
    fetch('/api/addresses')
      .then(res => res.json())
      .then(data => this.setState({ addresses: data }))
  }


  render() {
    if (!this.state.addresses) {
      return <>Loading...</>
    }

    return (<>
      {this.state.addresses.map((wallet, index) => {
        return (<div className="card" id={index}>
          <header><h4>
            <div className="row">
              <div className="col-2">
                {wallet.signature ?
                  <span class="tag is-full-width text-success is-text-center">Validated </span>
                  :
                  <span class="tag is-full-width text-error is-text-center">Not Validated </span>
                }
              </div>
              <div className="col">
                {wallet.address}
              </div>
            </div>
          </h4></header>
          <div>{wallet.message ?
            <>{wallet.message}</>
            :
            <span className="text-light">No message</span>
          }</div>
        </div>)
      })}

    </>)
  }
}
