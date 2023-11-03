import React, { Component } from "react";
import style from "./styles/ProductInfo.style";
import cancelButton from "./productInfoClose.png";

class ProductInfo extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    const { seriesSelected } = this.props;
    return (
      <div style={style.mainContainer}>
        <div style={style.upperBackground}></div>
        <div style={style.productInfo}>
          <div
            onClick={() => {
              this.props.setInfoOpen(false);
            }}
            style={style.cancelButtonContainer}
          >
            <img src={cancelButton}></img>
          </div>
          <div style={style.title}>PRODUCT INFO</div>
          <div style={style.imageTitleContainer}>
            <div
              style={{
                ...style.productImage,
                backgroundImage: `url(${seriesSelected.items[0].url})`,
              }}
            ></div>

            <div style={style.productNameShadeContainer}>
              <div style={style.productName}>{seriesSelected.fullName}</div>
              <div
                style={style.productShade}
              >{`${seriesSelected.items.length} Shades`}</div>
            </div>
          </div>
          <div style={style.productDescription}>
            {seriesSelected.description}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductInfo;
