import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
import Spinner from "react-spinkit";

class Capture extends Component {
  getCameraDiv(prop) {
    if (prop === "inline") {
      return (
        <div>
          <button>
            <span
              id="camera"
              style={{ display: this.props.displayStateProp.chooseFile }}
              className="fas fa-camera-retro fa-7x"
            />
            <span className="take-photo">Take Photo</span>
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <p className="how-to">Take a photo of the ingredients you want to cook with</p>
        <form
          className="form-group text-center add-photo"
        >
          {this.getCameraDiv(this.props.displayStateProp.chooseFile)}
          <input
            style={{
              display: this.props.displayStateProp.chooseFile
            }}
            type="file"
            accept="image/*"
            capture="camera"
            name="imgFile"
            onChange={this.props.showImage}
          />

          <img
            className="preview"
            style={{
              display: this.props.displayStateProp.image
            }}
            src={this.props.imageURL}
            alt=""
          />
          <Spinner
            style={{
              marginLeft: '50%',
              display: this.props.displayStateProp.loadingBar
            }}
            name="ball-spin-fade-loader"
          />
          <Link to="/ingredients">
            <button
              className="btn btn-primary submit"
              type="submit"
              style={{
                display: this.props.displayStateProp.submitPic
              }}
            >
              Submit
            </button>
          </Link>
        </form>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Capture;
