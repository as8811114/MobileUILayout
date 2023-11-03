import React, { Component } from "react";
import style from "./styles/ShowProduct.style";
import categoryTable from "./categoryTable";
class ShowProduct extends Component {
  constructor(props) {
    super(props);
  }
  handleTryOnClick = (item) => {
    this.props.handleSelectItem(item);
    this.props.setAllProductOpen(false);
  };
  render() {
    const { info } = this.props;
    return (
      <div style={style.mainContainter}>
        <div
          style={{
            ...style.productImg,
            backgroundImage: `url("${info.url}")`,
          }}
        ></div>
        <div style={style.productName}>
          {categoryTable[info.GUID.slice(0, -3)]}
        </div>
        <div style={style.productShadeName}>{info.name}</div>
        <div
          style={style.tryOnButton}
          onClick={() => {
            this.handleTryOnClick(info);
          }}
        >
          TRY ON
        </div>
      </div>
    );
  }
}

export default ShowProduct;
