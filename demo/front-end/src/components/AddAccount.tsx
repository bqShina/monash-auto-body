import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addUser } from "../dataStructures/repository";
export const AddAccount = () => {
  const [fields, setFields] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      fields.username === "" ||
      fields.firstName === "" ||
      fields.lastName === "" ||
      fields.password === "" ||
      fields.password !== fields.passwordConfirm
    ) {
      setErrorMessage("Please fill in all fields and ensure passwords match.");
      return false;
    }
    setErrorMessage("");
    return true;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addUser(fields);
      setShowAlert(true);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  return (
    <div className="account-form-container">
      {showAlert && (
        <div className="alert alert-primary add-acount-alert" role="alert">
          You have added this account successfully
        </div>
      )}
      <h3 className="mb-3">Add New Account</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={fields.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={fields.firstName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={fields.lastName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={fields.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            name="passwordConfirm"
            value={fields.passwordConfirm}
            onChange={handleInputChange}
          />
        </Form.Group>
        {errorMessage !== null && (
          <div className="form-group mb-3">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}

        <Button variant="primary" type="submit">
          Add Account
        </Button>
      </Form>
    </div>
  );
};
