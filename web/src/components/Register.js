import React from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

import { useForm } from "react-hook-form";
import bgImg from "../assets/01.png";
import backgroundImg from "../assets/img01.png";

const initialState = {
  id: "",
  fname: "",
  fnameError: "",
  lname: "",
  lnameError: "",
  nic: "",
  nicError: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  cPassword: "",
  cPasswordError: "",
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (localStorage.getItem("usertype") === "admin") {
      window.location.href = "/admin";
    } else if (localStorage.getItem("usertype") === "seller") {
      window.location.href = "/seller";
    } else if (localStorage.getItem("usertype") === "user") {
      window.location.href = "/user";
    }
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onClear() {
    this.setState(initialState);
  }

  validation = async () => {
    let fnameError = "";
    let lnameError = "";
    let nicError = "";
    let emailError = "";
    let passwordError = "";
    let cPasswordError = "";

    if (!this.state.fname) {
      fnameError = "First Name Required!";
    }

    if (!this.state.lname) {
      lnameError = "Last Name Required!";
    }

    if (!this.state.nic) {
      nicError = "Nic Required!";
    }

    if (!this.state.email) {
      emailError = "Email Required!";
    }

    if (!this.state.password) {
      passwordError = "Password Required!";
    }

    if (!this.state.cPassword) {
      cPasswordError = "Confirm Password Required!";
    }

    if (this.state.cPassword !== this.state.password) {
      cPasswordError = "Password & Confirm Password Not Match!";
    }

    if (
      fnameError ||
      lnameError ||
      nicError ||
      emailError ||
      passwordError ||
      cPasswordError
    ) {
      await this.setState({
        fnameError,
        lnameError,
        nicError,
        emailError,
        passwordError,
        cPasswordError,
      });

      return false;
    } else {
      await this.setState({
        fnameError,
        lnameError,
        nicError,
        emailError,
        passwordError,
        cPasswordError,
      });
      return true;
    }
  };

  SubmitForm = async (e) => {
    e.preventDefault();
    if (await this.validation()) {
      console.log(this.state);
      const url = LocalIP + "api/Users/";
      const data = JSON.stringify({
        lname: this.state.lname,
        fname: this.state.fname,
        phone: this.state.phone,
        nic: this.state.nic,
        email: this.state.email,
        password: this.state.password,
        privilege: "User",
        activation: true,
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          this.setState(initialState);
          swal("Success!", "Add Successful!", "success");
        });
    }
  };

  render() {
    const containerStyle = {
      padding: "20px", // Add padding to center the form
    };

    return (
      <div className="container" style={containerStyle}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <br />
            <br />
            <h1>
              <span style={{ color: "#EC5800" }}>R</span>
              <span style={{ color: "#0000A3" }}>egister</span>
            </h1>
            {/* Change header color to white */}
            <form autoComplete="off" onSubmit={this.SubmitForm}>
              {/* First Name */}
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  First Name
                </label>{" "}
                {/* Change label color to white and make it bold */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.handleChange}
                    placeholder="First Name"
                  />
                  <div style={{ color: "gray" }}>{this.state.fnameError}</div>
                </div>
              </div>

              {/* Last Name */}
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Last Name
                </label>{" "}
                {/* Change label color to white and make it bold */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.handleChange}
                    placeholder="Last Name"
                  />
                  <div style={{ color: "gray" }}>{this.state.lnameError}</div>
                </div>
              </div>

              {/* NIC */}
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  NIC
                </label>{" "}
                {/* Change label color to white and make it bold */}
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="nic"
                    value={this.state.nic}
                    onChange={this.handleChange}
                    placeholder="NIC"
                  />
                  <div style={{ color: "gray" }}>{this.state.nicError}</div>
                </div>
              </div>

              {/* Email */}
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Email
                </label>{" "}
                {/* Change label color to white and make it bold */}
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Email"
                  />
                  <div style={{ color: "gray" }}>{this.state.emailError}</div>
                </div>
              </div>

              {/* Password */}
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Password
                </label>{" "}
                {/* Change label color to white and make it bold */}
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                  <div style={{ color: "gray" }}>
                    {this.state.passwordError}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Confirm Password
                </label>{" "}
                {/* Change label color to white and make it bold */}
                <div className="col-md-6">
                  <input
                    type="password"
                    className="form-control"
                    name="cPassword"
                    value={this.state.cPassword}
                    onChange={this.handleChange}
                    placeholder="Confirm Password"
                  />
                  <div style={{ color: "gray" }}>
                    {this.state.cPasswordError}
                  </div>
                </div>
              </div>

              {/* Submit and Clear Buttons */}
              <div className="col-md-4 offset-md-4 pt-3">
                <input
                  type="submit"
                  className="btn btn-primary py-2"
                  value="Submit"
                  style={{
                    backgroundColor: "#0000A3",
                    color: "white",
                    marginRight: "15px",
                  }}
                />
                <input
                  type="button"
                  className="btn btn-danger ml-2 py-2"
                  value="Clear"
                  onClick={() => this.onClear()}
                  style={{ backgroundColor: "#FF5733", color: "white" }}
                />
              </div>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>

        </div>
      </div>
    );
  }
}

export default Register;
