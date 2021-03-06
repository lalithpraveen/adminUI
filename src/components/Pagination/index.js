import { Component } from "react";
import {
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
  FaForward,
  FaBackward,
} from "react-icons/fa";

import PageNumber from "../PageNumber";
import "./index.css";

class Pagination extends Component {
  state = {
    totalPages: [],
    startIndex: 1,
    lastIndex: "",
  };

  componentDidMount() {
    this.initialState();
  }

  initialState = () => {
    const { totalUsers, dataPerPage } = this.props;
    const pagesCount = Math.ceil(totalUsers / dataPerPage);
    const lastIndex = pagesCount;
    const totalPages = Array.from(Array(pagesCount));
    this.setState({ totalPages, lastIndex });
  };

  onClickNextPage = () => {
    const { totalPages } = this.state;
    const { currentPage, changePage } = this.props;
    let nextPage = currentPage + 1;
    const pagesCount = totalPages.length;

    if (nextPage <= pagesCount) {
      changePage(nextPage);
    }
  };

  onClickPreviousPage = () => {
    const { currentPage, changePage } = this.props;
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  gotoInitialPage = () => {
    const { changePage } = this.props;
    changePage(1);
  };

  gotoLastPage = () => {
    const { totalPages } = this.state;
    const { changePage } = this.props;
    changePage(totalPages.length);
  };

  setPresentPage = (currentPage) => {
    const { changePage } = this.props;
    changePage(currentPage);
  };

  render() {
    const { totalPages } = this.state;
    const { currentPage } = this.props;

    return (
      <div className="page-card">
        <FaBackward
          onClick={this.gotoInitialPage}
          className="special-icon page-icon"
        />
        <FaLongArrowAltLeft
          onClick={this.onClickPreviousPage}
          className="page-icon"
        />
        {totalPages.map((eachPage, index) => (
          <PageNumber
            currentPage={currentPage}
            pageNumber={index + 1}
            setPresentPage={this.setPresentPage}
            key={`page${index + 1}`}
          />
        ))}
        <FaLongArrowAltRight
          onClick={this.onClickNextPage}
          className="page-icon"
        />
        <FaForward
          onClick={this.gotoLastPage}
          className="special-icon page-icon"
        />
      </div>
    );
  }
}

export default Pagination;

