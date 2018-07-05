import React, { Component } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

class Ingredient extends Component {
  getItem() {
    return this.props.items.map(item => {
      return (
        <div className="item" key={item.name}>
          <img
            src={item.image}
            alt="Ingredient"
            className="item-image"
            height="75px"
            width="75px"
          />
          <p className="item-name form-group-item">
            {" "}
            Name: {item.name} => Type: {item.type}
          </p>
          <button
            className="btn btn-secondary delete"
            value="delete"
          >
            <span className="fas fa-trash-alt fa-lg" id={item.name} onClick={(e) => this.props.deleteItem(e)} />
          </button>
        </div>
      );
    });
  }

  getIndvItem(event) {
    event.preventDefault();
    let tempArray = [...this.props.items];
    let checkObject = tempArray.find(obj => {
      return obj.IngredientName === this.refs.newItem.value;
    });

    if (!checkObject && this.refs.newItem.value !== "") {
      let newItem = this.refs.newItem.value;
      this.props.addItem(newItem);
      this.refs.newItem.value = "";
    }
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="form-group items">
          {this.getItem()}
          <input type="text" ref="newItem" />
          <button
            type="submit"
            value="Get Recipes"
            onClick={this.getIndvItem.bind(this)}
            className="btn btn-primary"
          >
            Add Item
          </button>
        </div>
        <button type="submit" value="Get Recipes" className="btn btn-primary">
          {" "}
          Submit{" "}
        </button>

        <Link to="/capture">
          {" "}
          <button className="btn btn-warning"> Retake Picture </button>{" "}
        </Link>

        <Link to="/list">
          <button className="btn btn-primary"> See Receipes </button>
        </Link>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Ingredient;
