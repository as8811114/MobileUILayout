import React, { Component } from "react";
import style from "./styles/AllProducts.style";
import Arrow from "./arrow.png";
class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div style={style.mainContainer}>
        <div>ALL MAKEUP</div>
        <img src={Arrow}></img>
      </div>
    );
  }
}

export default AllProducts;
