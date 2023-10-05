import React, { Component } from "react";
import style from "./styles/Product.style";
import TempImg from "./tempImg.jpg";
import Radium from "radium";
import none from "./none.png";
const colors = [
  "#898176",
  "#F4F4F4",
  "#7F7679",
  "#332F2C",
  "#FFA420",
  "#5E2129",
  "#5E2129",
];
class Product extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  handleSliderShow = (triggerContainer, action) => {
    const sliderContainer = document.getElementById("sliderContainer");
    const slider = document.getElementById("slider");
    if (!sliderContainer || !slider) return;

    if (triggerContainer === "shade") {
      const buttonContainer = document.getElementById("shadeButtonContainer");
      const sliderWidth = (
        280 -
        (parseInt(window.getComputedStyle(buttonContainer).width) / 280 - 1) *
          280
      ).toFixed(2);
      console.log(sliderWidth);
      if (action === "enter") {
        slider.style.width = sliderWidth + "px";
        slider.style.backgroundColor = "gray";
      } else if (action === "leave") {
        slider.style.backgroundColor = "white";
      }
    } else if (triggerContainer === "slider") {
      if (action === "enter") {
        sliderContainer.style.backgroundColor = "#F4F4F4";
        slider.style.height = "13px";
      } else if (action === "leave") {
        sliderContainer.style.backgroundColor = "white";
        slider.style.height = "5px";
      }
    }
  };

  render() {
    return (
      <div style={style.mainContainer}>
        <img style={style.productImage} src={TempImg}></img>
        <div style={style.productInfo}>
          <div style={style.titleInfoContainer}>
            <div style={style.title}>{"Goodness Glows Tinted Mositurizer"}</div>
            <div style={style.info}>
              <div>MORE INFO</div>
            </div>
          </div>
          <div style={style.shadeName}>Strawberry Cream</div>

          <div
            onMouseEnter={() => {
              this.handleSliderShow("shade", "enter");
            }}
            onMouseLeave={() => {
              this.handleSliderShow("shade", "leave");
            }}
            style={style.shadeContainer}
          >
            <div id={"shadeButtonContainer"} style={style.shadeButtonContainer}>
              <div style={style.none}>
                <img src={none}></img>
              </div>
              {colors.map((color, i) => {
                return (
                  <div
                    key={color + i}
                    style={{ ...style.shade, backgroundColor: `${color}` }}
                  ></div>
                );
              })}
            </div>
            <div
              id={"sliderContainer"}
              style={style.sliderContainer}
              onMouseEnter={() => {
                this.handleSliderShow("slider", "enter");
              }}
              onMouseLeave={() => {
                this.handleSliderShow("slider", "leave");
              }}
            >
              <div id={"slider"} style={style.slider}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Product);
