import React, { Component } from "react";
import style from "./styles/OpenProductButton.style";
import Arrow from "./arrow.png";
class OpenProductButton extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { setAllProductOpen } = this.props;
    return (
      <div
        onClick={() => {
          setAllProductOpen(true);
        }}
        style={style.mainContainer}
      >
        <div>ALL MAKEUP</div>
        <img src={Arrow}></img>
      </div>
    );
  }
}

export default OpenProductButton;
