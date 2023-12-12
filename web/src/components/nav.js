import React from "react";
import "../App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  cursor: "pointer",
  margin: "5px",
};

const navigateTo = (path) => {
  window.location.href = path;
};

class nav extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    if (localStorage.getItem("loginAccess") !== "true") {
      return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo" width="100" height="50" />
              <span style={{ color: "#FF5733", fontWeight: "bold" }}>
                Ticket For You..
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div class="navbar-nav ml-auto">
              {/* <a href="/login" class="nav-item nav-link">Login</a>
                <a href="/register" class="nav-item nav-link">Register</a> */}

              <button style={buttonStyle} onClick={() => navigateTo("/")}>
                Home
              </button>
              <button style={buttonStyle} onClick={() => navigateTo("/login")}>
                Login
              </button>
              <button
                style={buttonStyle}
                onClick={() => navigateTo("/register")}
              >
                Register
              </button>
            </div>
          </Container>
        </Navbar>
      );
    } else {
      return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">
              <img src={logo} alt="Logo" width="100" height="50" />
              <span style={{ color: "#FF5733", fontWeight: "bold" }}>
                Ticket For You..
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div class="navbar-nav ml-auto">
              {/* <a href="/user" class="nav-item nav-link">
                Dashboard
              </a> */}
              <button style={buttonStyle} onClick={() => navigateTo("/user")}>
              Dashboard
              </button>
              <button style={buttonStyle} onClick={() => this.Logout()}>
              Logout
              </button>
              {/* <a onClick={() => this.Logout()} class="nav-item nav-link">
                Logout
              </a> */}
            </div>
          </Container>
        </Navbar>
      );
    }
  }
}

export default nav;
