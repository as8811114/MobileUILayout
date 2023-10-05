import React, { Component } from "react";
import style from "./styles/Header.style";
import Logo from "./logo.png";
import Radium from "radium";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={style.mainContainer}>
        <img style={style.logoImg} src={Logo}></img>
      </div>
    );
  }
}

export default Radium(Header);
