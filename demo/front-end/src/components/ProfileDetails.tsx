import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Modal from "./global/Modal";
import { ChangePassword } from "./ChangePassword";
import { AddAccount } from "./AddAccount";
import {
  deleteUser,
  getUser,
  getUsers,
  setUser,
  updateUserInfo,
} from "../dataStructures/repository";
import { User } from "../dataStructures/dataTemplate";
import { useNavigate } from "react-router-dom";

export const ProfileDetails = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [addAcountOpen, setAddAcountOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    setIsEditable(!isEditable);
    console.log("work");
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    updateUserInfo(fields.username, fields);
    setShowAlert(true);
    setUser(fields);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const fetchProfile = async () => {
    const user = getUser();
    if (user) {
      setFields({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
      if (user.username === "admin") {
        setIsAdmin(true);
        const users = await getUsers();
        setAllUsers(users);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onDelete = (id: string) => {
    deleteUser(id);
    setDeleted(true);
    setShowAlert(true);
    // fetchRecords();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="profile-container">
      {showAlert && (
        <div className="alert alert-primary profile-alert" role="alert">
          You have {deleted ? "delete this account " : "updated profile "}
          successfully
        </div>
      )}

      <h2 className="profile-title">Profile</h2>
      <hr />
      <form className="profile-info" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3 column">
            <label htmlFor="firstname" className="form-label">
              First name:
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={fields.firstName}
              onChange={handleOnChange}
              readOnly={!isEditable}
            />
          </div>
          <div className="col-md-6 mb-3 column">
            <label htmlFor="lastname" className="form-label">
              Last name:
            </label>
            <input
              type="text"
              name="lastName"
              value={fields.lastName}
              onChange={handleOnChange}
              className="form-control"
              readOnly={!isEditable}
            />
          </div>
        </div>
        {isEditable && (
          <div className="profile-buttons">
            <button
              type="button"
              className="btn btn-primary btn-sm cancel-btn"
              onClick={() => {
                setIsEditable(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        )}
      </form>
      <div className="profile-buttons">
        {!isEditable && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleOnClick}
          >
            Edit
          </button>
        )}
      </div>
      <h2 className="profile-title">Services</h2>
      <hr />
      <div className="service-tags">
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            setChangePasswordOpen(true);
          }}
        >
          Change Password
        </button>
        <Modal
          isOpen={changePasswordOpen}
          onClose={() => {
            setChangePasswordOpen(false);
          }}
        >
          <ChangePassword />
        </Modal>
        {isAdmin && (
          <>
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                setAddAcountOpen(true);
              }}
            >
              Add New Account
            </button>
            <Modal
              isOpen={addAcountOpen}
              onClose={() => {
                setAddAcountOpen(false);
              }}
            >
              <AddAccount />
            </Modal>
          </>
        )}
      </div>

      {isAdmin && (
        <>
          <h2 className="profile-title">All Accounts</h2>
          <hr />
          {allUsers && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      {user.username !== "admin" && (
                        <button
                          className="btn btn-outline-danger btn-sm table-btn"
                          onClick={() => onDelete(user._id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};
