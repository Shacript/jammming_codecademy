import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: localStorage.getItem("search_term") || "",
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search() {
    this.props.onSearch(this.state.term);
  }
  handleTermChange(e) {
    localStorage.setItem("search_term",e.target.value);
    this.setState({ term: e.target.value });
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          value={this.state.term}
        />
        <button className="SearchButton" onClick={this.search}>
          SEARCH
        </button>
      </div>
    );
  }
}
