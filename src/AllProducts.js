import Radium from "radium";
import React, { Component } from "react";
import cancleButton from "./productInfoClose.png";
import style from "./styles/AllProducts.style";
import ProductList from "./ProductList";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.categoryLength = 0;
  }
  state = {
    text: "All Products",
    isOpenOptions: false,
    search: "",
    length: 0,
  };
  windowClickHandler = (e) => {
    const input = document.getElementById("input");
    if (e.target.className === "select") {
      input.style.display = "block";
      input.value = "";
      input.focus();
      this.setState({ isOpenOptions: true });
    } else if (input) {
      input.value = "";
      input.style.display = "none";
      this.setState({ isOpenOptions: false, search: "" });
    }
  };
  componentDidMount = () => {
    window.addEventListener("click", this.windowClickHandler);
  };

  componentDidUpdate = () => {
    this.handleOptionContainer();
  };
  handleOptionContainer = () => {
    if (this.state.isOpenOptions) {
      const optionsContainer = document.getElementById("optionsContainer");

      this.categoryLength = 0;
      for (let x of optionsContainer.childNodes) {
        const height = window.getComputedStyle(x).getPropertyValue("height");
        this.categoryLength += parseInt(height);
      }
      if (this.categoryLength > 255) {
        optionsContainer.style.overflowY = "scroll";
      } else {
        optionsContainer.style.overflow = "hidden";
      }
    }
  };
  inputOnChange = (e) => {
    const selectCategory = document.getElementById("selectCategory");
    if (e.target.value.length > 0) {
      selectCategory.style.display = "none";
    } else {
      selectCategory.style.display = "block";
    }
    this.setState({ search: e.target.value });
  };
  inputOnBlur = (e) => {
    const selectCategory = document.getElementById("selectCategory");
    e.target.value = "";
    selectCategory.style.display = "block";
  };
  checkAllProduct = () => {
    return (
      this.state.search === "" ||
      "All Products".toUpperCase().includes(this.state.search.toUpperCase())
    );
  };
  filterCategory = () => {
    let result = this.props.category.filter(
      (c) =>
        c.products.filter((cp) =>
          cp.name.toUpperCase().includes(this.state.search.toUpperCase())
        ).length > 0
    );
    return result;
  };
  filterProduct = (products) => {
    let result = products.filter((cp) =>
      cp.name.toUpperCase().includes(this.state.search.toUpperCase())
    );
    return result;
  };
  selectOption = (e) => {
    this.setState({ text: e.target.innerHTML });
  };
  render() {
    const {
      setAllProductOpen,
      categorySelected,
      handleSelectCategory,
      handleSelectItem,
      productList,
    } = this.props;
    const { isOpenOptions } = this.state;
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
          <div
            id={"selectButton"}
            className={"select"}
            style={style.selectButton}
          >
            <div
              id={"selectCategory"}
              key="selectCategory"
              className={"select"}
              style={{
                ...style.selectCategory,
                cursor: isOpenOptions ? "text" : "default",
              }}
            >
              {categorySelected}
            </div>
            <input
              id={"input"}
              className={"select"}
              key="input"
              type="text"
              style={style.input}
              onChange={this.inputOnChange}
              onBlur={this.inputOnBlur}
            />
            <div
              id={"selectArrow"}
              className={"select"}
              style={style.selectArrow}
            ></div>
            {/* select button options */}
            {isOpenOptions && (
              <div
                id={"optionsContainer"}
                className={"select"}
                style={style.optionsContainer}
              >
                {this.filterCategory().length <= 0 &&
                  !this.checkAllProduct() && (
                    <div className={"select"} style={style.category}>
                      {"No results found"}
                    </div>
                  )}
                {this.checkAllProduct() && (
                  <div
                    onClick={handleSelectCategory}
                    style={style.allProductDiv}
                    name={"All Products"}
                  >
                    {"All Products"}
                  </div>
                )}
                {this.filterCategory().map((c, i) => {
                  return (
                    <div key={c.category + i}>
                      <div className={"select"} style={style.category}>
                        {c.category}
                      </div>
                      {this.filterProduct(c.products).map((p, j) => {
                        return (
                          <div
                            onClick={handleSelectCategory}
                            key={p.name + j}
                            style={style.productName}
                            name={p.name}
                          >
                            {p.name}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <ProductList
            list={productList}
            setAllProductOpen={setAllProductOpen}
            handleSelectItem={handleSelectItem}
          ></ProductList>
        </div>
      </div>
    );
  }
}

export default Radium(AllProducts);
