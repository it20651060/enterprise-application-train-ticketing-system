import React from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";
import { Navigate } from "react-router";

const initialState = {
  id: "",
  tNumber: "",
  tNumberError: "",
  date: "",
  dateError: "",
  time: "",
  timeError: "",
  start: "",
  startError: "",
  end: "",
  endError: "",
  price: "",
  priceError: "",
};

class Train extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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
    let tNumberError = "";
    let dateError = "";
    let timeError = "";
    let priceError = "";
    let startError = "";
    let endError = "";

    if (!this.state.tNumber) {
      tNumberError = "Train Number Required!";
    }

    if (!this.state.date) {
      dateError = "Date Required!";
    }

    if (!this.state.time) {
      timeError = "Time Required!";
    }

    if (!this.state.price) {
      priceError = "Price Required!";
    }

    if (!this.state.start) {
      startError = "Start Station Required!";
    }

    if (!this.state.end) {
      endError = "End Station Required!";
    }

    if (
      tNumberError ||
      dateError ||
      timeError ||
      priceError ||
      startError ||
      endError
    ) {
      await this.setState({
        tNumberError,
        dateError,
        timeError,
        priceError,
        startError,
        endError,
      });

      return false;
    } else {
      await this.setState({
        tNumberError,
        dateError,
        timeError,
        priceError,
        startError,
        endError,
      });
      return true;
    }
  };

  SubmitForm = async (e) => {
    e.preventDefault();
    if (await this.validation()) {
      console.log(this.state);
      const url = LocalIP + "api/train/";
      const data = JSON.stringify({
        tNumber: this.state.tNumber,
        date: this.state.date,
        time: this.state.time,
        start: this.state.start,
        end: this.state.end,
        price: this.state.price,
        cancel: false,
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
          this.props.history.push("/office");
        });
    }
  };

  render() {
    return (
      <div class="container">
        <div className="col-lg-12">
          <br />
          <br />
          <div class="justify-content-center">
            <h1>Add Train</h1>
            <div class="x_scroll">
              <hr />
              <form autoComplete="off" onSubmit={this.SubmitForm}>
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right font-weight-bold">
                    Train Number
                  </label>
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      name="tNumber"
                      value={this.state.tNumber}
                      onChange={this.handleChange}
                    />
                    <div style={{ color: "red" }}>
                      {this.state.tNumberError}
                    </div>
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right font-weight-bold">
                    Date
                  </label>
                  <div class="col-md-6">
                    <input
                      type="date"
                      class="form-control"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleChange}
                    />
                    <div style={{ color: "red" }}>{this.state.dateError}</div>
                  </div>
                </div>
                <br />{" "}
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right font-weight-bold">
                    Time
                  </label>
                  <div class="col-md-6">
                    <input
                      type="time"
                      class="form-control"
                      name="time"
                      value={this.state.time}
                      onChange={this.handleChange}
                    />
                    <div style={{ color: "red" }}>{this.state.timeError}</div>
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right font-weight-bold">
                    Start Station
                  </label>
                  <div class="col-md-6">
                    <select
                      class="form-control"
                      name="start"
                      value={this.state.start}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Start Station</option>
                      <option>Colombo</option>
                      <option>Galle</option>
                      <option>Matara</option>
                    </select>
                    <div style={{ color: "red" }}>{this.state.startError}</div>
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right font-weight-bold">
                    End Station
                  </label>
                  <div class="col-md-6">
                    <select
                      class="form-control"
                      name="end"
                      value={this.state.end}
                      onChange={this.handleChange}
                    >
                      <option value="">Select End Station</option>
                      <option>Colombo</option>
                      <option>Galle</option>
                      <option>Matara</option>
                    </select>
                    <div style={{ color: "red" }}>{this.state.endError}</div>
                  </div>
                </div>
                <br />
                <div class="form-group row">
                  <label class="col-md-4 col-form-label text-md-right font-weight-bold">
                    Ticket Price
                  </label>
                  <div class="col-md-6">
                    <input
                      type="number"
                      class="form-control"
                      min="1"
                      name="price"
                      value={this.state.price}
                      onChange={this.handleChange}
                    />
                    <div style={{ color: "red" }}>{this.state.priceError}</div>
                  </div>
                </div>
                <br />
                <div class="col-md-4 offset-md-4">
                  <input
                    type="submit"
                    class="btn btn-outline-primary"
                    value="Submit"
                  />
                  <input
                    type="button"
                    class="btn btn-outline-danger"
                    value="Clear"
                    onClick={() => this.onClear()}
                  />
                </div>
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Train;
