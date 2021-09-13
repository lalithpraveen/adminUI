import { Component } from "react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

import UserDetails from "../UserDetails";
import "./index.css";

class UserTable extends Component {
  state = { isSelected: false };

  render() {
    const {
      tableData,
      removable,
      editable,
      selectedUsersList,
      deleteUser,
      sortByColumn,
    } = this.props;

    if (tableData.length < 1) {
      return <p>No data found</p>;
    }

    const tableHeaders = Object.keys(tableData[0]);
    const modifiedHeaders = tableHeaders;

    return (
      <div className="user-table-container">
        <table className="main-table" width="100%">
          <thead>
            <tr className="user-table-header">
              <th>
                <input
                  className="user-table-header-checkbox "
                  type="checkbox"
                />
              </th>
              {modifiedHeaders.map((eachItem) => (
                <th key={eachItem}>
                  {eachItem.toUpperCase()}
                  <br />
                  <BiSortDown
                    onClick={() => sortByColumn(eachItem, "asc")}
                    className="sort-icon"
                  />
                  <BiSortUp
                    onClick={() => sortByColumn(eachItem, "des")}
                    className="sort-icon"
                  />
                </th>
              ))}
              {(removable || editable) && <th>action</th>}
            </tr>
          </thead>

          <tbody>
            {tableData.map((eachUser) => (
              <UserDetails
                key={eachUser.id}
                userData={eachUser}
                removable={removable}
                editable={editable}
                selectedUsersList={selectedUsersList}
                deleteUser={deleteUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
