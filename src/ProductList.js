import React, { Component } from "react";
import style from "./styles/ProductList.style";
import ShowProduct from "./ShowProduct";
class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  state = {};
  render() {
    const { category } = this.props;
    return (
      <div style={style.mainContainter}>
        <div style={style.productsContainer}>
          {[0, 1, 2].map((d) => {
            return <ShowProduct></ShowProduct>;
          })}
        </div>
      </div>
    );
  }
}

export default ProductList;
