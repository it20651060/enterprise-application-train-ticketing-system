import React from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

import bgImg from "../assets/01.png";

const initialState = {
  id: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
};

class Login extends React.Component {
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
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = "Email Required!";
    }

    if (!this.state.password) {
      passwordError = "Password Required!";
    }

    if (emailError || passwordError) {
      await this.setState({ emailError, passwordError });

      return false;
    } else {
      await this.setState({ emailError, passwordError });
      return true;
    }
  };

  SubmitForm = async (e) => {
    e.preventDefault();
    if (await this.validation()) {
      console.log(this.state);
      const url =
        LocalIP +
        "api/users/login/" +
        this.state.email +
        "/" +
        this.state.password;
      await axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.id) {
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("usertype", res.data.privilege);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("loginAccess", true);
            if (res.data.privilege === "office") {
              this.props.history.push("/office");
            } else if (res.data.privilege === "admin") {
              this.props.history.push("/admin");
            } else {
              this.props.history.push("/user");
            }
          } else if (res.data == "Activation Fail") {
            swal("Error!", "Activation Fail!", "error");
          } else if (res.data == "Unsuccessful") {
            swal("Error!", "Unsuccessful!", "error");
          }
          this.setState(initialState);
        });
    }
  };

  render() {
    const containerStyle = {
      padding: "50px", // Add padding to center the form
    };
    return (
      <div className="container" style={containerStyle}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <br />
            <br />
            <h1>
              <span style={{ color: "#EC5800" }}>L</span>
              <span style={{ color: "#0000A3" }}>ogin</span>
            </h1>
            <br />
            <form autoComplete="off" onSubmit={this.SubmitForm}>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Email address
                </label>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Enter email"
                  />
                  <div style={{ color: "gray" }}>{this.state.emailError}</div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Password
                </label>
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
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
