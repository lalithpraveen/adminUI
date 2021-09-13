import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./index.css";

const UserDetails = (props) => {
  const {
    userData,
    removable,
    editable,
    selectedUsersList,
    deleteUser,
  } = props;

  const userDetails = Object.values(userData);
  const isSelectedUser = selectedUsersList.includes(userData.id);
  const userClassName = isSelectedUser ? "user-selected" : "user-details";

  const deleteUserData = () => {
    deleteUser(userData.id);
  };

  return (
    <tr className={userClassName}>
      <td>
        <input type="checkbox" className="user-details-checkbox" />
      </td>
      {userDetails.map((eachData) => (
        <td key={`${eachData}${userDetails.id}`}>{eachData}</td>
      ))}
      <td>
        {editable && (
          <button type="button" className="edit-btn">
            <TiEdit className="edit-icon" />
          </button>
        )}
        {removable && (
          <button
            type="button"
            onClick={deleteUserData}
            className="delete-icon-btn"
          >
            <RiDeleteBin6Line className="delete-icon" />
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserDetails;
