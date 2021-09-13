import { Component } from "react";
import Loader from "react-loader-spinner";

import Pagination from "../Pagination";
import Search from "../Search";
import UserTable from "../UserTable";
import "./index.css";

class WorkTable extends Component {
  state = {
    data: [],
    isLoading: true,
    displayedData: [],
    currentPage: 1,
    pageData: [],
    selectedUsersList: [],
    editableData: {},
  };

  componentDidMount() {
    this.initialStateStage();
  }

  initialStateStage = () => {
    const { usersData } = this.props;

    this.setState(
      {
        data: usersData,
        isLoading: false,
        editableData: usersData[0],
        displayedData: usersData,
      },
      this.filterDataByPagination
    );
  };

  deleteUser = (id) => {
    const { data } = this.state;
    const updatedData = data.filter((eachItem) => eachItem.id !== id);
    this.setState(
      { data: updatedData, displayedData: updatedData },
      this.filterDataByPagination
    );
  };

  //   sort order function by ascending or descending by user choice
  // logic in sorted order source => https://www.javascripttutorial.net/javascript-array-sort/
  sortByColumn = (column, sortOrder) => {
    // console.log(column, sortOrder);
    const { data } = this.state;

    const sortedData = data.sort((a, b) => {
      const sortCondition =
        sortOrder === "asc" ? a[column] > b[column] : a[column] < b[column];

      if (sortCondition) {
        return 1;
      } else {
        return -1;
      }
    });

    this.setState({ displayedData: sortedData }, this.filterDataByPagination);
  };

  //   update current page and then update page by filtering
  changePage = (currentPage) => {
    this.setState({ currentPage }, this.filterDataByPagination);
  };

  filterDataByPagination = () => {
    const { currentPage, displayedData } = this.state;
    const { dataPerPage } = this.props;
    const lastIndex = currentPage * dataPerPage;
    const startIndex = lastIndex - dataPerPage;

    const pageData = displayedData.slice(startIndex, lastIndex);
    this.setState({ pageData: pageData });
  };

  getSearchResults = (filteredData, isSearched) => {
    const { currentPage } = this.state;
    const { dataPerPage } = this.props;
    let updatedPage = isSearched ? 1 : currentPage;
    const totalPages = Math.ceil(filteredData.length / dataPerPage);
    if (currentPage > totalPages) {
      updatedPage = totalPages;
    }
    if (currentPage === 0) {
      updatedPage = 1;
    }
    this.setState(
      { displayedData: filteredData, currentPage: updatedPage },
      this.filterDataByPagination
    );
  };

  renderUsersTable = () => {
    const { pageData, selectedUsersList } = this.state;
    const { removable, editable } = this.props;

    return (
      <>
        <UserTable
          tableData={pageData}
          removable={removable}
          editable={editable}
          selectedUsersList={selectedUsersList}
          deleteUser={this.deleteUser}
          sortByColumn={this.sortByColumn}
        />
        {removable && (
          <button
            className="delete-btn"
            //   onClick={this.deleteAllSelectedItems}
          >
            Delete All
          </button>
        )}
      </>
    );
  };

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#0E69D7" height={80} width={80} />
    </div>
  );

  render() {
    const { data, isLoading, displayedData, currentPage } = this.state;
    const { dataPerPage } = this.props;
    const totalUsers = displayedData.length;

    return (
      <>
        <div className="work-table-container">
          <Search usersData={data} onSearch={this.getSearchResults} />
          {isLoading ? (
            this.renderLoadingView()
          ) : (
            <>
              {this.renderUsersTable()}
              <Pagination
                totalUsers={totalUsers}
                dataPerPage={dataPerPage}
                changePage={this.changePage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

WorkTable.defaultProps = {
  dataPerPage: 10,
  removable: true,
  editable: true,
};

export default WorkTable;
