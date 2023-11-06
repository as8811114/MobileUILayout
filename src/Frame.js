import React, { Component } from "react";
import style from "./styles/Frame.style";
import background from "./background.jpg";
import back from "./top_back.png";
import cancel from "./top_cancel.png";
import reset from "./bt-reset.png";
import compare from "./bt-compare.png";
class Frame extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { handleSelectShade } = this.props;
    return (
      <div style={style.mainContainer}>
        <img style={style.backgroundImage} src={background}></img>
        <div
          style={{ ...style.backButton, backgroundImage: `url(${back})` }}
        ></div>
        <div
          style={{ ...style.cancelButton, backgroundImage: `url(${cancel})` }}
        ></div>
        <div
          onClick={() => {
            handleSelectShade({});
          }}
          style={{ ...style.resetButton, backgroundImage: `url(${reset})` }}
        ></div>
        <div
          style={{ ...style.compareButton, backgroundImage: `url(${compare})` }}
        ></div>
      </div>
    );
  }
}

export default Frame;
