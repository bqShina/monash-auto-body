import React, { ChangeEvent, FormEvent, useState } from "react";
import { Heading } from "../components/global/Heading";
import { NavBar } from "../components/global/NavBar";
import { Footer } from "../components/global/Footer";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { verifyUser } from "../dataStructures/repository";
import logo from "../assets/logo.png";

// interface Props {
//   loginUser: (username: string) => void;
// }

export const LoginPage = () => {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Generic change handler.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    if (!fields.username || !fields.password) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const verified = await verifyUser(fields.username, fields.password);

      if (verified) {
        navigate("/records");
        return;
      }

      const temp = { ...fields };
      temp.password = "";
      setFields(temp);
      // console.log("password wrong");
      setErrorMessage("Username or password invalid, please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <Heading title="Manager Login" />
      <div className="form-signin" style={{ paddingTop: "5vh" }}>
        <img src={logo} height="40" className="logo-signin" alt="Logo" />
        <Form onSubmit={handleSubmit} className="mb-3">
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
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={fields.password}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign in
          </Button>
        </Form>
        {errorMessage && (
          <div className="mb-3">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
        <Link to="/">
          <div className="back-btn-container">
            <button type="button" className="btn btn-link back-btn mb-3">
              Go back to form
            </button>
          </div>
        </Link>
      </div>

      <Footer />
    </>
  );
};
