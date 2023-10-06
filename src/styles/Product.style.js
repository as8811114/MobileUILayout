export default {
  mainContainer: {
    width: "375px",
    boxSizing: "border-box",
    height: "115px",
    position: "absolute",
    bottom: "45px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
  },
  productImage: {
    width: "70px",
    height: "70px",
    margin: "10px 5px 0px 10px",
    backgroundPosition: "center center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
  productInfo: {
    boxSizing: "border-box",
    height: "115px",
    width: "280px",
    minwidth: "280px",
    minheight: "115px",
  },
  titleInfoContainer: {
    width: "280px",
    height: "34px",
    display: "flex",
    fontFamily: "Gotham",
    boxSizing: "border-box",
    marginTop: "10px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    width: "183px",
    height: "34px",
    fontSize: "14px",
  },
  info: {
    display: "flex",
    height: "34px",
    width: "92px",
    backgroundColor: "#FFC558",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "12px",
    fontWeight: "325",
    cursor: "pointer",
  },
  shadeContainer: {
    height: "45px",
    width: "280px",
    position: "relative",
    overflow: "hidden",
  },
  shadeName: {
    height: "13px",
    width: "auto",
    color: "#666",
    fontFamily: "Gotham",
    fontSize: "11px",
    margin: "5px 0px",
  },

  shadeButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "14px",
    position: "absolute",
  },
  none: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "28px",
    width: "32px",
    cursor: "pointer",
  },
  shade: {
    height: "28px",
    width: "25px",
    cursor: "pointer",
    clipPath: "polygon(0 20%, 50% 0, 100% 20%, 100% 80%, 50% 100%, 0 80%)",
  },

  sliderContainer: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
    height: "10px",
    backgroundColor: "white",
    transition: "background-color 500ms linear",
  },

  slider: {
    position: "absolute",
    bottom: "0px",
    borderRadius: "10px",
    height: "5px",
    width: "100%",
    left: "0px",
    backgroundColor: "white",
    transition: "background-color 200ms linear, height 200ms linear",
  },
};
