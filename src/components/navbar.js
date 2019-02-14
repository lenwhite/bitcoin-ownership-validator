import React, { Component } from 'react';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(e){
    e.preventDefault();
    this.props.onPageChange(e.target.innerText);
  }

  render() {
    return (
      <nav className="nav">
        <div className="nav-left">
          <div className="brand">{this.props.appName}</div>
          <div className="tabs">
            {this.props.pages.map((page, index) => {
                if (page === this.props.active) {
                  return <a href="#" onClick={this.handleNavigation} key={index} className="active">{page}</a>
                } else {
                  return <a href="#" onClick={this.handleNavigation} key={index}>{page}</a>
                }
            })}
          </div>
        </div>
      </nav>
    );
  }
}
