import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { getUser, removeUser } from "../../dataStructures/repository";

export const NavBar = () => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const logoutUser = () => {
    removeUser();
    navigate("/login");
  };

  useEffect(() => {
    setUser(getUser());
  }, []);
  return (
    <header className="header">
      <Navbar expand="lg custom-navbar">
        <Container>
          <Link to="/" className="text-start custom-brand">
            <Navbar.Brand className="text-start custom-brand">
              <img src={logo} height="20" className="logo-icon" alt="Logo" />
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="custom-toggle"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto custom-item">
              {user !== null && (
                <>
                  <Link to="/" className="nav-item-link">
                    Form
                  </Link>

                  <Link to="/records" className="nav-item-link">
                    Records
                  </Link>
                  <Link to="/profile" className="nav-item-link">
                    Profile
                  </Link>
                </>
              )}
            </Nav>

            <Nav className="navbar-end text-end">
              {user === null ? (
                <Link to="/login">
                  <div>
                    <Button className="login-btn">
                      <span className="login-text">LOGIN</span>
                    </Button>
                  </div>
                </Link>
              ) : (
                <div>
                  <Button className="logout-btn" onClick={logoutUser}>
                    <span className="login-text">LOGOUT</span>
                  </Button>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
