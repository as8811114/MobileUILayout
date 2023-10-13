import React, { Component } from "react";
import style from "./styles/ProductList.style";
import ShowProduct from "./ShowProduct";
class ProductList extends Component {
  constructor(props) {
    super(props);
  }
  handleSliderShow = (triggerContainer, action) => {
    const sliderContainer = document.getElementById("sliderContainer");
    const slider = document.getElementById("slider");
    if (!sliderContainer || !slider) return;

    if (triggerContainer === "container") {
      const productContainer = document.getElementById("productContainer");
      //sliderHeight is based on the width of productContainer
      console.log(
        parseInt(window.getComputedStyle(productContainer).height) / 325
      );
      const sliderHeight = (
        325 -
        (parseInt(window.getComputedStyle(productContainer).height) / 325 - 1) *
          325
      ).toFixed(2);
      this.offsetSpace = 325 - sliderHeight;

      console.log(sliderHeight);
      if (action === "enter") {
        slider.style.height = sliderHeight + "px";
        slider.style.backgroundColor = "gray";
      } else if (action === "leave" && !this.state.isDragging) {
        slider.style.backgroundColor = "white";
      }
    } else if (triggerContainer === "slider") {
      if (action === "enter") {
        sliderContainer.style.backgroundColor = "#F4F4F4";
        slider.style.width = "11px";
      } else if (action === "leave" && !this.state.isDragging) {
        sliderContainer.style.backgroundColor = "white";
        slider.style.width = "5px";
      }
    }
  };
  state = { isDragging: false };
  render() {
    const { category } = this.props;
    return (
      <div
        onPointerEnter={() => {
          this.handleSliderShow("container", "enter");
        }}
        onPointerLeave={() => {
          this.handleSliderShow("container", "leave");
        }}
        style={style.mainContainter}
      >
        <div id={"productContainer"} style={style.productsContainer}>
          {[0, 1, 2, 3, 4, 5].map((d) => {
            return <ShowProduct></ShowProduct>;
          })}
        </div>
        <div
          id={"sliderContainer"}
          style={style.sliderContainer}
          onPointerEnter={() => {
            this.handleSliderShow("slider", "enter");
          }}
          onPointerLeave={() => {
            this.handleSliderShow("slider", "leave");
          }}
          onPointerDown={(e) => {
            this.handleSliderContainterDown(e);
          }}
        >
          <div
            id={"slider"}
            style={style.slider}
            onPointerDown={(e) => {
              this.handleSliderPointerDown(e);
            }}
            onPointerUp={() => {
              this.handleSliderPointerUp();
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default ProductList;
