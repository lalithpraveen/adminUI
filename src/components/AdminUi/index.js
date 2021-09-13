import { Component } from "react";
import Loader from "react-loader-spinner";

import { GET_USERS_DATA_URL } from "../../constants";
import WorkTable from "../WorkTable";
import "./index.css";

class AdminUi extends Component {
  state = {
    usersData: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    const apiUrl = GET_USERS_DATA_URL;
    const response = await fetch(apiUrl);
    let fetchedData = [];
    if (response.ok === true) {
      fetchedData = await response.json();
      //   console.log(fetchedData);
    }
    this.setState({ usersData: fetchedData, isLoading: false });
  };

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#0E69D7" height={80} width={80} />
    </div>
  );

  render() {
    const { usersData, isLoading } = this.state;

    return (
      <>
        <div className="app-container">
          <div className="logo-container">
            <img
              src="https://geektrust.sgp1.cdn.digitaloceanspaces.com/assets/images/adminui-badge.png"
              className="logo-img"
              alt="admin-logo"
            />
            <h1 className="admin-heading">Admin Ui</h1>
          </div>
          <div className="users-list-container">
            {isLoading ? (
              this.renderLoadingView()
            ) : (
              <WorkTable
                dataPerPage={10}
                usersData={usersData}
                removable={true}
                editable={true}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default AdminUi;
