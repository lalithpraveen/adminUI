import "./index.css";

const PageNumber = (props) => {
  const { currentPage, pageNumber, setPresentPage } = props;
  const isPageSelected = currentPage === pageNumber;
  const pageClassName = isPageSelected ? "active-page" : "page";

  const changePage = () => {
    setPresentPage(pageNumber);
  };

  return (
    <span className={`${pageClassName}`} onClick={changePage}>
      {pageNumber}
    </span>
  );
};

export default PageNumber;
