import React, { Component } from "react";
import style from "./styles/ProductList.style";
import ShowProduct from "./ShowProduct";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.downYPosition = 0;
    this.currentYPosition = 0;
    this.offsetSpace = 0;
    this.oldTop = 0;
  }
  state = { isDragging: false };
  componentDidMount() {
    window.addEventListener("pointermove", this.handleSliderPointerMove);
  }
  componentWillUnmount() {
    window.removeEventListener("pointermove", this.handleSliderPointerMove);
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.list !== prevProps.list) {
      this.updateListSlider();
    }
  };
  updateListSlider = () => {
    const slider = document.getElementById("productSlider");
    const shades = document.getElementById("productContainer");
    if (!slider) return;
    this.downYPosition = 0;
    this.currentYPosition = 0;
    this.offsetSpace = 0;
    this.oldTop = 0;
    slider.style.top = "0%";
    shades.style.top = "0%";
    this.handleSliderShow("container", "enter");
  };
  handleSliderShow = (triggerContainer, action) => {
    const sliderContainer = document.getElementById("productSliderContainer");
    const slider = document.getElementById("productSlider");
    if (!sliderContainer || !slider) return;
    if (triggerContainer === "container") {
      const productContainer = document.getElementById("productContainer");
      //sliderHeight is based on the width of productContainer
      const viewPercentage =
        325 / parseInt(window.getComputedStyle(productContainer).height);
      const sliderHeight = (viewPercentage * 325).toFixed(2);

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

  handleSliderPointerDown = (e) => {
    this.setState({ isDragging: true });
    this.downYPosition = e.clientY;
  };
  handleSliderPointerUp = () => {
    this.setState({ isDragging: false });
    this.downYPosition = this.currentYPosition;
    const slider = document.getElementById("productSlider");
    this.oldTop = parseFloat(slider.style.top);
  };
  handleSliderPointerMove = (e) => {
    if (this.state.isDragging) {
      const slider = document.getElementById("productSlider");
      const shades = document.getElementById("productContainer");

      this.currentYPosition = e.clientY;
      //mouse offsetY
      const offsetY = this.currentYPosition - this.downYPosition;
      //covert offsetX to percentage
      const offsetPercent = ((offsetY / 325) * 100).toFixed(2);
      //set sliderPosition to oldOffsetX plus mouse offsetPercent
      let sliderPosition = (
        Number(this.oldTop) + Number(offsetPercent)
      ).toFixed(2);
      // if sliderPostiion is bigger than offsetSpace then set it to 0
      if (sliderPosition < 0) sliderPosition = 0;
      //if sliderPosition is bigger than offsetSpace then set it to biggest position
      else if (sliderPosition > (this.offsetSpace / 325) * 100) {
        sliderPosition = (this.offsetSpace / 325) * 100;
      }
      slider.style.top = sliderPosition + "%";

      const movePercentage = this.getMovePercentage();
      shades.style.top = -1 * (sliderPosition * movePercentage) + "%";
    }
  };
  handleSliderContainterDown = (e) => {
    if (e.target.id === "productSliderContainer") {
      const slider = document.getElementById("productSlider");
      const shades = document.getElementById("productContainer");
      const sliderPosition = (parseFloat(slider.style.top) * 325) / 100;
      const mousePosition = e.nativeEvent.offsetY;
      const movePercentage = this.getMovePercentage();
      const sliderBottom =
        ((325 - parseFloat(slider.style.height).toFixed(2)) / 325) * 100;
      let newSliderTop;
      if (sliderPosition < mousePosition) {
        if (
          parseFloat(parseFloat(slider.style.top) + 10).toFixed(2) >=
          sliderBottom
        ) {
          newSliderTop = sliderBottom;
        } else
          newSliderTop = parseFloat(parseFloat(slider.style.top) + 10).toFixed(
            2
          );
        slider.style.top = newSliderTop + "%";
        shades.style.top = -1 * newSliderTop * movePercentage + "%";
      } else {
        if (parseFloat(parseFloat(slider.style.top) - 10).toFixed(2) <= 0) {
          newSliderTop = 0;
        } else
          newSliderTop = parseFloat(parseFloat(slider.style.top) - 10).toFixed(
            2
          );
        slider.style.top = newSliderTop + "%";
        this.oldTop = newSliderTop;
        shades.style.top = -1 * newSliderTop * movePercentage + "%";
      }
    }
  };
  handleScrollSlider = (e) => {
    const slider = document.getElementById("productSlider");
    const shades = document.getElementById("productContainer");
    if (!slider) return;
    const sliderHeight = parseFloat(window.getComputedStyle(slider).height);

    let offsetPercent;
    // scoll up
    if (e.deltaY < 0) {
      offsetPercent = ((e.deltaY / 5) * sliderHeight) / 325;
    }
    // scoll down
    else if (e.deltaY > 0) {
      offsetPercent = ((e.deltaY / 5) * sliderHeight) / 325;
    }
    let sliderPosition = (Number(this.oldTop) + Number(offsetPercent)).toFixed(
      2
    );
    if (sliderPosition < 0) sliderPosition = 0;
    else if (sliderPosition > (this.offsetSpace / 325) * 100) {
      sliderPosition = (this.offsetSpace / 325) * 100;
    }
    this.oldTop = sliderPosition;
    slider.style.top = sliderPosition + "%";

    const movePercentage = this.getMovePercentage();

    shades.style.top = -1 * (sliderPosition * movePercentage) + "%";
  };
  getMovePercentage = () => {
    const slider = document.getElementById("productSlider");
    const shades = document.getElementById("productContainer");
    const viewOffsetSpace =
      parseFloat(window.getComputedStyle(shades).height).toFixed(2) - 325;
    const sliderOffsetSpace = 325 - parseFloat(slider.style.height).toFixed(2);
    return viewOffsetSpace / sliderOffsetSpace;
  };

  render() {
    const { list, setAllProductOpen, handleSelectItem } = this.props;
    return (
      <div
        onWheel={this.handleScrollSlider}
        onPointerEnter={() => {
          this.handleSliderShow("container", "enter");
        }}
        onPointerLeave={() => {
          this.handleSliderShow("container", "leave");
        }}
        style={style.mainContainter}
      >
        <div id={"productContainer"} style={style.productsContainer}>
          {list.map((info) => {
            return (
              <ShowProduct
                key={info.GUID}
                info={info}
                setAllProductOpen={setAllProductOpen}
                handleSelectItem={handleSelectItem}
              ></ShowProduct>
            );
          })}
        </div>
        <div
          id={"productSliderContainer"}
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
            id={"productSlider"}
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
