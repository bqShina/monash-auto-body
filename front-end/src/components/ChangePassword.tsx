import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updatePassword } from "../dataStructures/repository";

export const ChangePassword = () => {
  const [fields, setFields] = useState({
    oldPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    if (
      fields.newPassword === "" ||
      fields.oldPassword === "" ||
      fields.passwordConfirm === ""
    ) {
      setErrorMessage("Please fill in all fields.");
      return false;
    } else if (fields.newPassword !== fields.passwordConfirm) {
      setErrorMessage("New password does not meet the criteria");
      return false;
    } else if (fields.newPassword === fields.oldPassword) {
      setErrorMessage("New password cannot be same as old password");
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(
        fields.newPassword
      )
    ) {
      setErrorMessage("New password does not meet the criteria");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const responseData = await updatePassword(fields);
      if (!responseData) {
        setErrorMessage("Old password is incorrect.");
        return;
      }
      setShowAlert(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="password-form-container">
      {showAlert && (
        <div className="alert alert-primary add-acount-alert" role="alert">
          You have updated password successfully
        </div>
      )}
      <h1 className="mb-3">Change Password</h1>
      <ul className="list-group mb-3 password-criteria">
        <li className="list-group-item">Minimum 8 characters</li>
        <li className="list-group-item">At least one uppercase letter</li>
        <li className="list-group-item">At least one lowercase letter</li>
        <li className="list-group-item">At least one number</li>
        <li className="list-group-item">
          At least one special character (@$!%*#?&)
        </li>
      </ul>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter old password"
            name="oldPassword"
            value={fields.oldPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            name="newPassword"
            value={fields.newPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password again"
            name="passwordConfirm"
            value={fields.passwordConfirm}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
      {errorMessage !== null && (
        <div className="form-group mb-3">
          <span className="text-danger">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
