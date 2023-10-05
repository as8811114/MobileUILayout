import { Component } from "react";
import data from "./data.js";
import style from "./styles/App.styles.js";
import Header from "./Header.js";
import Frame from "./Frame.js";
import Product from "./Product.js";
import AllProducts from "./AllProducts.js";
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {};

  render() {
    return (
      <div style={style.mainContainer}>
        <Header></Header>
        <Frame></Frame>

        <Product></Product>
        <AllProducts></AllProducts>
      </div>
    );
  }
}
export default App;
