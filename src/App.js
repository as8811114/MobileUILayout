import { Component } from "react";
import data from "./data.js";
import seriesTable from "./seriesTable.js";
import categoryTable from "./categoryTable.js";
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
  state = {
    isInfoOpen: false,
    isAllProductOpen: false,
    shadeSelected: {},
    categorySelected: "All Products",
    seriesSelected: data[seriesTable["LS"]][1],
    productList: [],
  };
  componentDidMount = () => {
    this.setProductList("All Products");
  };
  setProductList = (category) => {
    console.log(category);
    let categoryID = Object.keys(categoryTable).find(
      (key) => categoryTable[key] === category
    );
    console.log(categoryID);
    let list = [];
    for (let x of Object.keys(data)) {
      for (let y of data[x]) {
        const pushItem = y.items.filter((item) =>
          item.GUID.includes(categoryID)
        );

        list.push(...pushItem);
      }
    }
    console.log(list);
    this.setState({ productList: list });
  };
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
  handleSelectCategory = (e) => {
    const category = e.target.getAttribute("name");

    this.setProductList(category);
    this.setState({ categorySelected: category });
  };
  handleSelectItem = (item) => {
    let category = categoryTable[item.GUID.slice(0, -3)];
    let series = seriesTable[item.GUID.split("_")[2]];
    let productInfo = data[series].find((d) => d.displayName === category);
    this.handleSelectShade(item);
    this.setState({ seriesSelected: productInfo });
    console.log(`series:${series}\ncategory:${category}`);
    console.log(productInfo);
    console.log(item);
  };
  //handle select button options
  getOptions = () => {
    let options = [];
    Object.keys(data).map((key) => {
      let products = [];
      data[key].map((product) => {
        products.push({ name: product.displayName });
      });
      options.push({ category: key, products: products });
    });
    return options;
  };
  render() {
    const {
      isInfoOpen,
      shadeSelected,
      isAllProductOpen,
      seriesSelected,
      categorySelected,
      productList,
    } = this.state;
    return (
      <div style={style.mainContainer}>
        <Header></Header>
        <Frame></Frame>
        {isInfoOpen && (
          <ProductInfo
            setInfoOpen={this.setInfoOpen}
            seriesSelected={seriesSelected}
          ></ProductInfo>
        )}
        <Product
          setInfoOpen={this.setInfoOpen}
          shadeSelected={shadeSelected}
          seriesSelected={seriesSelected}
          handleSelectShade={this.handleSelectShade}
        ></Product>
        <OpenProductButton
          setAllProductOpen={this.setAllProductOpen}
        ></OpenProductButton>
        {isAllProductOpen && (
          <AllProducts
            setAllProductOpen={this.setAllProductOpen}
            categorySelected={categorySelected}
            handleSelectCategory={this.handleSelectCategory}
            category={this.getOptions()}
            productList={productList}
            handleSelectItem={this.handleSelectItem}
          ></AllProducts>
        )}
      </div>
    );
  }
}
export default App;
