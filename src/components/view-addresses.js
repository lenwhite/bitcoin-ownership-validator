import React, { Component } from 'react';
import { withAlert } from 'react-alert';

class ViewAddresses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addresses: null,
    }

    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    fetch('/api/addresses')
      .then(res => res.json())
      .then(data => this.setState({ addresses: data }))
  }

  handleDelete() {
    this.setState({ addresses: null });
    fetch('api/addresses', {
      method: 'DELETE',
    }).then(this.fetchData());
  }


  render() {
    if (!this.state.addresses) {
      return <>Loading...</>
    }

    if (this.state.addresses.length === 0) {
      return <>No addresses.</>
    }

    return (<>
      {this.state.addresses.map((wallet, index) => {
        return (<div className="card" key={index}>
          <header><h4>
            <div className="row">
              <div className="col-2">
                {wallet.signature ?
                  <span className="tag is-full-width text-success is-text-center">Validated </span>
                  :
                  <span className="tag is-full-width text-error is-text-center">Not Validated </span>
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
      <hr />
      <p>
        <button onClick={this.handleDelete}>Delete All</button>
      </p>

    </>)
  }
}

export default withAlert()(ViewAddresses);
