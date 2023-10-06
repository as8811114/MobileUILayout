import React, { Component } from "react";
import style from "./styles/ProductInfo.style";
import cancelButton from "./productInfoClose.png";
import productImage from "./tempImg.jpg";
class ProductInfo extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
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
            <img src={productImage} style={style.productImage}></img>
            <div style={style.productNameShadeContainer}>
              <div style={style.productName}>
                Goodness Glows Tinted Moisturizer
              </div>
              <div style={style.productShade}>6 Shades</div>
            </div>
          </div>
          <div style={style.productDescription}>
            Looking for lightweight, sheer coverage plus all-day moisture? It’s
            here! Made with green tea and packed with vitamins and antioxidants,
            this tinted moisturizer is ideal for those looking for
            lighter-than-foundation coverage that hydrates and protects.
          </div>
        </div>
      </div>
    );
  }
}

export default ProductInfo;
