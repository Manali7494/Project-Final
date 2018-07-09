import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class RecipeList extends Component {

  truncateTitle(str) {
    console.log(typeof str);
    if(str.length > 29) {
    let end = str.search('-');
    if(end === -1) {
      console.log(str.length, "<-- Length!");
      return str;
    }
    return str.substr(0, end);
    }
    return str;
  }

  getRecipe() {
    return Object.keys(this.props.recipeList).map(item => {
      let recipelist = this.props.recipeList;
      let completeLink = `/list/${recipelist[item].rid}`;
      let title = this.truncateTitle(recipelist[item].title);
      return (
        <div className="recipe" key={recipelist[item].rid}>
          <img src={recipelist[item].image} alt="" className="item-image" />
          <h3>{title}</h3>
          <p className="description">{recipelist[item].rating}</p>
          <p className="text-right">
            <Link to={completeLink} onClick={() => this.props.selectIDRecipe(recipelist[item].rid)} className="select-recipe btn btn-primary">
                <span className="fas fa-utensils"></span> Select
            </Link>
          </p>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="recipe-list">{this.getRecipe()}</section>
        <div className="actions">
          <Link to="/" className="btn btn-primary" onClick={this.props.clearStates}>
            Start Over
          </Link>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default RecipeList;
