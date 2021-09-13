import { Component } from "react";
import { BsSearch } from "react-icons/bs";

import "./index.css";

class Search extends Component {
  state = { searchInput: "" };

  checkSearchedText = (userData, searchText) => {
    const userValues = Object.values(userData);
    for (let value of userValues) {
      if (value.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  getSearchData = (isSearched) => {
    const { usersData, onSearch } = this.props;
    const { searchInput } = this.state;
    const filterData = usersData.filter((eachUser) =>
      this.checkSearchedText(eachUser, searchInput)
    );
    onSearch(filterData, isSearched);
  };

  onChangeSearchInput = (event) => {
    const searchInputValue = event.target.value;
    this.setState({ searchInput: searchInputValue }, this.getSearchData);
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search by name,email or role"
          onChange={this.onChangeSearchInput}
          //   onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    );
  }
}

export default Search;
