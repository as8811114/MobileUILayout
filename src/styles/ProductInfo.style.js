export default {
  mainContainer: {
    position: "absolute",
    top: "0px",
    height: "495px",
    width: "375px",
    zIndex: "1000",
  },
  upperBackground: {
    height: "217px",
    width: "375px",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  productInfo: {
    height: "278px",
    width: "375px",

    backgroundColor: "rgba(255,255,255,1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: "15px 15px 0px 15px",
    boxSizing: "border-box",
  },
  title: {
    fontFamily: "Gotham",
    fontSize: "16px",
    textAlign: "center",
  },
  cancelButtonContainer: {
    height: "15px",
    width: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "15px",
    top: "13.7px",
    cursor: "pointer",
  },
  imageTitleContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "5px",
    justifyContent: "start",
  },
  productNameShadeContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    width: "270px",
    gap: "5px",
  },
  productImage: {
    width: "70px",
    height: "70px",
  },
  productName: {
    fontFamily: "Gotham",
    fontSize: "14px",
    lineHeight: "20px",
  },
  productShade: {
    fontFamily: "Gotham",
    fontSize: "11px",
    color: "#666",
  },
  productDescription: {
    marginTop: "5px",
    fontFamily: "Gotham",
    fontSize: "13px",
  },
};
