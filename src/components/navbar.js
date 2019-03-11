import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class NavBar extends Component {

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
            {this.props.routes.map((route, index) => {
              if (route.path === this.props.location.pathname) {
                  return <a key={index} className="active">{route.text}</a>
                } else {
                  return <Link key={index} to={route.path}>{route.text}</Link>
                }
            })}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);