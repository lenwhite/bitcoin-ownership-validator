import React, { Component } from 'react';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
  }

  renderButton(button) {
    return (button) => {
      if (button === this.props.active) {
        return <a href={button.link} className="active" key={button.text}>{button.text}</a>
      } else {
        return <a href={button.link} key={button.text}>{button.text}</a>
      }
    }
  }

  renderName() {
    return <a className="brand" href="#">{this.props.name}</a>
  }



  render() {
    return (
      <nav className="nav">
        <div className="nav-left">
          {this.renderName()}
          <div className="tabs">
            {this.props.buttons.map(this.renderButton())}
          </div>
        </div>
        <div className="nav-right">
          <a className="button outline">Button</a>
        </div>
      </nav>
    );
  }
}