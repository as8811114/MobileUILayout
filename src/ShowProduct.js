import React, { Component } from "react";
import style from "./styles/ShowProduct.style";
import data from "./data";
const testData = data["Lip Color"][0]["items"][0];
const testCategory = data["Lip Color"][0];
class ShowProduct extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  state = {};

  render() {
    return (
      <div style={style.mainContainter}>
        <div
          style={{
            ...style.productImg,
            backgroundImage: `url("${testData.url}")`,
          }}
        ></div>
        <div style={style.productName}>{testCategory.displayName}</div>
        <div style={style.productShadeName}>{testData.name}</div>
        <div style={style.tryOnButton}>TRY ON</div>
      </div>
    );
  }
}

export default ShowProduct;
