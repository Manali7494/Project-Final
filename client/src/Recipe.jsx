import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";
// To do list --> Add image.
//  Empty dont print. (loop through an array)
// Axios post -->

class Recipe extends Component {

  getIngredientList() {
    console.log(this.props)
    return this.props.selectedObj.ingredients.split('LOLOL').map(item => {
      return <li>{item}</li>;
    });
  }

  getInstructionList() {
    return this.props.selectedObj.steps.split('LOLOL').map(item => {
      return <li>{item}</li>;
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="recipe">
          <header>
            <h2>{this.props.selectedObj.title}</h2>
          </header>
          <div className="recipe-stats">
            <p>
              <strong>Prep Time:</strong> {this.props.selectedObj.prepTime} |{" "}
              <strong>Serves:</strong> {this.props.selectedObj.serves}
            </p>
          </div>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>{this.getIngredientList()}</ul>
          </div>

          <hr />

          <div className="instructions">
            <h3>Instructions</h3>
            <ol>{this.getInstructionList()}</ol>
          </div>
          <Link to="/list">
            <button> Go back to Recipe List </button>
          </Link>
        </section>
        <Link to="/">
          {" "}
          <button> Start Over </button>{" "}
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Recipe;
