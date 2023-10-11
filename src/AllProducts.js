import Radium from "radium";
import React, { Component } from "react";
import cancleButton from "./productInfoClose.png";
import style from "./styles/AllProducts.style";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.categoryLength = 999;
  }
  state = {
    text: "All Products",
    isOpenOptions: false,
    search: "",
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
  inputOnChange = (e) => {
    const selectCategory = document.getElementById("selectCategory");
    if (e.target.value.length > 0) {
      selectCategory.style.display = "none";
    } else {
      selectCategory.style.display = "";
    }
    this.setState({ search: e.target.value });
  };
  inputOnBlur = () => {
    const selectCategory = document.getElementById("selectCategory");
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
    this.categoryLength = result.length;

    return result;
  };
  filterProduct = (products) => {
    let result = products.filter((cp) =>
      cp.name.toUpperCase().includes(this.state.search.toUpperCase())
    );
    this.categoryLength += result.length;
    return result;
  };
  optionIsOverContain = () => {
    const optionsContainer = document.getElementById("optionsContainer");
    console.log(optionsContainer);
  };
  render() {
    const { setAllProductOpen } = this.props;
    const { text, isOpenOptions } = this.state;
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
              {text}
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
            {isOpenOptions && (
              <div
                id={"optionsContainer"}
                className={"select"}
                style={{
                  ...style.optionsContainer,
                  overflowY: this.categoryLength >= 9 ? "scroll" : "hidden",
                }}
              >
                {this.filterCategory().length <= 0 && (
                  <div className={"select"} style={style.category}>
                    {"No results found"}
                  </div>
                )}
                {this.checkAllProduct() && (
                  <div style={style.allProductDiv}>{"All Products"}</div>
                )}
                {this.filterCategory().map((c, i) => {
                  return (
                    <div key={c.category + i}>
                      <div className={"select"} style={style.category}>
                        {c.category}
                      </div>
                      {this.filterProduct(c.products).map((p, i) => {
                        return (
                          <div key={p.name + i} style={style.productName}>
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
        </div>
      </div>
    );
  }
}

export default Radium(AllProducts);
