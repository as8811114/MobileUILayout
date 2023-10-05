import React, { Component } from "react";
import style from "./styles/Frame.style";
import background from "./background.jpg";
class Frame extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div style={style.mainContainer}>
        <img style={style.backgroundImage} src={background}></img>
      </div>
    );
  }
}

export default Frame;
