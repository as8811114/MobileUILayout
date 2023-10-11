import { Component } from "react";
import data from "./data.js";
import style from "./styles/App.styles.js";
import Header from "./Header.js";
import Frame from "./Frame.js";
import Product from "./Product.js";
import AllProducts from "./AllProducts.js";
import ProductInfo from "./ProductInfo.js";
import OpenProductButton from "./OpenProductButton.js";
class App extends Component {
  constructor(props) {
    super(props);
  }
  state = { isInfoOpen: false, isAllProductOpen: false, shadeSelected: {} };
  componentDidMount = () => {};
  setInfoOpen = (state) => {
    this.setState({ isInfoOpen: state });
  };
  setAllProductOpen = (state) => {
    this.setState({ isAllProductOpen: state });
  };

  handleSelectShade = (shade) => {
    console.log(shade);
    this.setState({ shadeSelected: shade });
  };
  getOptions = () => {
    let options = [];
    Object.keys(data).map((key) => {
      let products = [];

      data[key].map((product) => {
        products.push({ name: product.displayName });
      });
      options.push({ category: key, products: products });
    });
    console.log(options);
    return options;
  };
  render() {
    const { isInfoOpen, shadeSelected, isAllProductOpen } = this.state;
    return (
      <div style={style.mainContainer}>
        <Header></Header>
        <Frame></Frame>
        {isInfoOpen && (
          <ProductInfo setInfoOpen={this.setInfoOpen}></ProductInfo>
        )}
        <Product
          setInfoOpen={this.setInfoOpen}
          shadeSelected={shadeSelected}
          handleSelectShade={this.handleSelectShade}
        ></Product>
        <OpenProductButton
          setAllProductOpen={this.setAllProductOpen}
        ></OpenProductButton>
        {isAllProductOpen && (
          <AllProducts
            setAllProductOpen={this.setAllProductOpen}
            category={this.getOptions()}
          ></AllProducts>
        )}
      </div>
    );
  }
}
export default App;
