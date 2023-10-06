import React, { Component } from "react";
import style from "./styles/AllProducts.style";
import cancleButton from "./productInfoClose.png";
class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    window.addEventListener("click", (e) => {
      if (e.target.id === "selectButton" || e.target.id === "input")
        this.setState({ clickedSelect: true });
      else this.setState({ clickedSelect: false });
    });
  };
  state = {
    clickedSelect: false,
  };
  render() {
    const { setAllProductOpen } = this.props;
    const { clickedSelect } = this.state;
    return (
      <div style={style.mainContainer}>
        <div style={style.blackBackground}></div>
        <div style={style.whiteBackground}>
          <div
            style={style.cancleButton}
            onClick={() => {
              setAllProductOpen(false);
            }}
          >
            <img src={cancleButton}></img>
          </div>
          <div>ALL MAKEUP</div>
          <div id={"selectButton"} style={style.selectButton}>
            {clickedSelect && (
              <input id={"input"} style={style.input} type="text" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AllProducts;
