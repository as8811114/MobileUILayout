import Radium from "radium";
import React, { Component } from "react";
import none from "./none.png";
import style from "./styles/Product.style";
class Product extends Component {
  constructor(props) {
    super(props);
    this.downXPosition = 0;
    this.currentXPosition = 0;
    this.offsetSpace = 0;
    this.oldLeft = 0;
  }
  state = { isDragging: false };
  componentDidMount() {
    window.addEventListener("pointermove", this.handleSliderPointerMove);
  }
  componentWillUnmount = () => {
    window.removeEventListener("pointermove", this.handleSliderPointerMove);
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.seriesSelected !== prevProps.seriesSelected) {
      this.updateListSlider();
    }
  };
  updateListSlider = () => {
    const slider = document.getElementById("slider");
    const shades = document.getElementById("shadeButtonContainer");
    this.downXPosition = 0;
    this.currentXPosition = 0;
    this.offsetSpace = 0;
    this.oldLeft = 0;
    if (slider) slider.style.left = "0%";
    if (shades) shades.style.left = "0%";
    this.handleSliderShow("shade", "enter");
    this.handleSliderShow("shade", "leave");
  };
  handleSliderShow = (triggerContainer, action) => {
    const sliderContainer = document.getElementById("sliderContainer");
    const slider = document.getElementById("slider");
    if (!sliderContainer || !slider) return;

    if (triggerContainer === "shade") {
      const buttonContainer = document.getElementById("shadeButtonContainer");
      console.log(window.getComputedStyle(buttonContainer).width);
      //sliderWidth is based on the width of buttonContainer
      const viewPercentage =
        280 / parseInt(window.getComputedStyle(buttonContainer).width);
      const sliderWidth = (viewPercentage * 280).toFixed(2);
      this.offsetSpace = 280 - sliderWidth;

      console.log(sliderWidth);
      if (action === "enter") {
        slider.style.width = sliderWidth + "px";
        slider.style.backgroundColor = "gray";
      } else if (action === "leave" && !this.state.isDragging) {
        slider.style.backgroundColor = "white";
      }
    } else if (triggerContainer === "slider") {
      if (action === "enter") {
        sliderContainer.style.backgroundColor = "#F4F4F4";
        slider.style.height = "11px";
      } else if (action === "leave" && !this.state.isDragging) {
        sliderContainer.style.backgroundColor = "white";
        slider.style.height = "5px";
      }
    }
  };
  handleSliderPointerDown = (e) => {
    this.setState({ isDragging: true });
    this.downXPosition = e.clientX;
  };
  handleSliderPointerUp = () => {
    this.setState({ isDragging: false });
    // this.downXPosition = this.currentXPosition;
    const slider = document.getElementById("slider");
    this.oldLeft = parseFloat(slider.style.left);
  };
  handleSliderPointerMove = (e) => {
    if (this.state.isDragging) {
      const slider = document.getElementById("slider");
      const shades = document.getElementById("shadeButtonContainer");
      console.log(slider.style.width);
      this.currentXPosition = e.clientX;
      //mouse offsetX
      const offsetX = this.currentXPosition - this.downXPosition;
      //covert offsetX to percentage
      const offsetPercent = ((offsetX / 280) * 100).toFixed(2);
      //set sliderPosition to oldOffsetX plus mouse offsetPercent
      let sliderPosition = (
        Number(this.oldLeft) + Number(offsetPercent)
      ).toFixed(2);
      // if sliderPostiion is bigger than offsetSpace then set it to 0
      if (sliderPosition < 0) sliderPosition = 0;
      //if sliderPosition is bigger than offsetSpace then set it to biggest position
      else if (sliderPosition > (this.offsetSpace / 280) * 100) {
        sliderPosition = (this.offsetSpace / 280) * 100;
      }
      slider.style.left = sliderPosition + "%";

      const movePercentage = this.getMovePercentage(slider, shades);
      shades.style.left = -1 * (sliderPosition * movePercentage) + "%";
    }
  };
  handleSliderContainterDown = (e) => {
    if (e.target.id === "sliderContainer") {
      const slider = document.getElementById("slider");
      const shades = document.getElementById("shadeButtonContainer");
      const sliderPosition = (parseFloat(slider.style.left) * 280) / 100;
      const mousePosition = e.nativeEvent.offsetX;
      const movePercentage = this.getMovePercentage(slider, shades);
      const sliderBottom =
        ((280 - parseFloat(slider.style.width).toFixed(2)) / 280) * 100;
      let newSliderLeft;
      if (sliderPosition < mousePosition) {
        if (
          parseFloat(parseFloat(slider.style.left) + 10).toFixed(2) >=
          sliderBottom
        ) {
          newSliderLeft = sliderBottom;
        } else
          newSliderLeft = parseFloat(
            parseFloat(slider.style.left) + 10
          ).toFixed(2);
        slider.style.left = newSliderLeft + "%";
        shades.style.left = -1 * newSliderLeft * movePercentage + "%";
      } else {
        if (parseFloat(parseFloat(slider.style.left) - 10).toFixed(2) <= 0) {
          newSliderLeft = 0;
        } else
          newSliderLeft = parseFloat(
            parseFloat(slider.style.left) - 10
          ).toFixed(2);
        slider.style.left = newSliderLeft + "%";
        this.oldLeft = newSliderLeft;
        shades.style.left = -1 * newSliderLeft * movePercentage + "%";
      }
    }
  };
  getMovePercentage = (slider, shades) => {
    const viewOffsetSpace =
      parseFloat(window.getComputedStyle(shades).width).toFixed(2) - 280;
    const sliderOffsetSpace = 280 - parseFloat(slider.style.width).toFixed(2);
    return viewOffsetSpace / sliderOffsetSpace;
  };
  render() {
    const { shadeSelected, handleSelectShade, seriesSelected } = this.props;
    return (
      <div style={style.mainContainer}>
        <div
          style={{
            ...style.productImage,
            backgroundImage: `url(${seriesSelected.items[0].url})`,
          }}
        ></div>
        <div style={style.productInfo}>
          <div style={style.titleInfoContainer}>
            <div style={style.title}>{seriesSelected.fullName}</div>
            <div
              onClick={() => {
                this.props.setInfoOpen(true);
              }}
              style={style.info}
            >
              <div>MORE INFO</div>
            </div>
          </div>
          <div style={style.shadeName}>{shadeSelected.name}</div>

          <div
            onPointerEnter={() => {
              this.handleSliderShow("shade", "enter");
            }}
            onPointerLeave={() => {
              this.handleSliderShow("shade", "leave");
            }}
            style={style.shadeContainer}
          >
            <div id={"shadeButtonContainer"} style={style.shadeButtonContainer}>
              {!shadeSelected.GUID && (
                <div
                  style={{
                    backgroundColor: "#FFCC66",
                    clipPath: "circle(45%)",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      clipPath: "circle(40%)",
                    }}
                  >
                    <div
                      onClick={() => {
                        handleSelectShade({});
                      }}
                      style={{ ...style.none, transform: "scale(0.7)" }}
                    >
                      <img src={none} alt={""}></img>
                    </div>
                  </div>
                </div>
              )}
              {shadeSelected.GUID && (
                <div
                  onClick={() => {
                    handleSelectShade({});
                  }}
                  style={{ ...style.none }}
                >
                  <img src={none} alt={""}></img>
                </div>
              )}
              {seriesSelected.items.map((shade, i) => {
                if (shade.GUID === shadeSelected.GUID) {
                  return (
                    <div
                      onClick={() => {
                        handleSelectShade(shade);
                      }}
                      key={shade + i}
                      style={{
                        ...style.shade,
                        backgroundColor: `#FFCC66`,
                      }}
                    >
                      <div
                        style={{
                          ...style.shade,
                          transform: "scale(0.9)",
                          backgroundColor: `white`,
                        }}
                      >
                        <div
                          style={{
                            ...style.shade,
                            transform: "scale(0.85)",
                            backgroundColor: `${shade.color}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      onClick={() => {
                        handleSelectShade(shade);
                      }}
                      key={shade + i}
                      style={{
                        ...style.shade,
                        backgroundColor: `${shade.color}`,
                      }}
                    ></div>
                  );
                }
              })}
            </div>
            {seriesSelected.items.length > 6 && (
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Product);
