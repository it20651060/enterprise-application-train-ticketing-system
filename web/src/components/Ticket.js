import React from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import LocalIP from "./LocalIP";

const initialState = {
  id: "",
  trainId: "",
  trainIdError: "",
  date: "",
  time: "",
  start: "",
  end: "",
  price: "",
  noOfTicket: "",
  noOfTicketError: "",
  total: "",
  totalError: "",
  Train: [],
};

class Ticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = async (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
    if (e.target.name == "noOfTicket") {
      var total = this.state.price * e.target.value;
      if (total == 0) {
        total = await this.state.price;
      }
      this.setState({ total: total });
    }
    if (e.target.name == "trainId") {
      console.log(e.target.value);
      const url = LocalIP + "api/Train/" + e.target.value;
      axios.get(url).then((response) => {
        this.setState({
          tNumber: response["data"]["tNumber"],
          date: response["data"]["date"],
          time: response["data"]["time"],
          start: response["data"]["start"],
          price: response["data"]["price"],
          end: response["data"]["end"],
        });
      });
    }
  };

  componentDidMount() {
    const url = LocalIP + "api/Train/active";
    axios.get(url).then((response) => {
      console.log(response["data"]);
      this.setState({ Train: response["data"] });
    });
  }

  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  validation = async () => {
    let trainIdError = "";
    let noOfTicketError = "";
    let totalError = "";

    if (!this.state.trainId) {
      trainIdError = "Train Required!";
    }

    if (!this.state.noOfTicket) {
      noOfTicketError = "Number Of Ticket Required!";
    }

    if (!this.state.total) {
      totalError = "Total Required!";
    }

    if (trainIdError || noOfTicketError || totalError) {
      await this.setState({ trainIdError, noOfTicketError, totalError });

      return false;
    } else {
      await this.setState({ trainIdError, noOfTicketError, totalError });
      return true;
    }
  };

  // SubmitForm = async (e) => {
  //   e.preventDefault();
  //   if (await this.validation()) {
  //     console.log(this.state);
  //     const url = LocalIP + "api/ticket/";
  //     const data = JSON.stringify({
  //       trainId: this.state.trainId,
  //       date: this.state.date,
  //       time: this.state.time,
  //       start: this.state.start,
  //       end: this.state.end,
  //       price: this.state.price,
  //       noOfTicket: this.state.noOfTicket,
  //       total: this.state.total,
  //       userId: localStorage.getItem("id"),
  //     });
  //     console.log(data);
  //     await axios
  //       .post(url, data, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         this.setState(initialState);
  //         swal("Success!", "Add Successful!", "success");
  //         this.props.history.push("/user");
  //       });
  //   }
  // };

  // SubmitForm = async (e) => {
  //   e.preventDefault();
    
  //   // Get the current date
  //   const currentDate = new Date();
  
  //   // Get the selected date from the state
  //   const selectedDate = new Date(this.state.date);
  
  //   // Calculate the date difference in milliseconds
  //   const dateDifference = selectedDate - currentDate;
  
  //   // Calculate the number of days
  //   const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
  
  //   if (daysDifference > 30) {
  //     // Date gap is more than 30 days, allow form submission
  //     if (await this.validation()) {
  //       console.log(this.state);
  //       const url = LocalIP + "api/ticket/";
  //       const data = JSON.stringify({
  //         trainId: this.state.trainId,
  //         date: this.state.date,
  //         time: this.state.time,
  //         start: this.state.start,
  //         end: this.state.end,
  //         price: this.state.price,
  //         noOfTicket: this.state.noOfTicket,
  //         total: this.state.total,
  //         userId: localStorage.getItem("id"),
  //       });
  //       console.log(data);
  //       await axios
  //         .post(url, data, {
  //           headers: { "Content-Type": "application/json" },
  //         })
  //         .then((res) => {
  //           console.log(res.data);
  //           this.setState(initialState);
  //           swal("Success!", "Add Successful!", "success");
  //           this.props.history.push("/user");
  //         });
  //     }
  //   } else {
  //     // Date gap is less than or equal to 30 days, show an error alert
  //     alert("You can't submit the form. Date gap is less than 30 days.");
  //   }
  // };

  SubmitForm = async (e) => {
    e.preventDefault();
  
    // Get the current date
    const currentDate = new Date();
  
    // Get the selected date from the state
    const selectedDate = new Date(this.state.date);
  
    // Calculate the date difference in milliseconds
    const dateDifference = selectedDate - currentDate;
  
    // Calculate the number of days
    const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));

    console.log('xxxx', daysDifference);
  
    if (daysDifference < 30) {
      // Date gap is more than 30 days, allow form submission
      if (await this.validation()) {
        const url = LocalIP + "api/ticket";
        const data = {
          trainId: this.state.trainId,
          date: this.state.date,
          time: this.state.time,
          start: this.state.start,
          end: this.state.end,
          price: this.state.price,
          noOfTicket: this.state.noOfTicket,
          total: this.state.total,
          userId: localStorage.getItem("id"),
        };
  
        try {
          const response = await axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
          });
  
          console.log(response.data);
          this.setState(initialState);
          swal("Success!", "Add Successful!", "success");
          this.props.history.push("/user");
        } catch (error) {
          console.error("Error submitting the form:", error);
          // Handle the error as needed
        }
      }
    } else {
      // Date gap is less than or equal to 30 days, show an error alert
      alert("You can't submit the form. Date gap is less than 30 days.");
    }
  };
  

  render() {
    const { Train } = this.state;

    const containerStyle = {
      padding: "10px", // Add padding to center the form
    };

    return (
      <div className="container" style={containerStyle}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <br />
            <br />
            <h1>
              <span style={{ color: "#EC5800" }}>T</span>
              <span style={{ color: "#0000A3" }}>icket</span>
            </h1>
            <br />
            <form autoComplete="off" onSubmit={this.SubmitForm}>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Name
                </label>
                <div className="col-md-6">
                  <select
                    className="form-control"
                    name="trainId"
                    value={this.state.trainId}
                    onChange={this.handleChange}
                  >
                    <option value="">Select Train</option>
                    {Train.map((res) => (
                      <option value={res.id}>
                        {"Name: " +
                          res.tNumber +
                          " Start : " +
                          res.start +
                          " End : " +
                          res.end}
                      </option>
                    ))}
                  </select>
                  <div style={{ color: "gray" }}>{this.state.trainIdError}</div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Date
                </label>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Time
                </label>
                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    value={this.state.time}
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Start Station
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="start"
                    value={this.state.start}
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  End Station
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="end"
                    value={this.state.end}
                    onChange={this.handleChange}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Ticket Price
                </label>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={this.state.price}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Number Of Ticket
                </label>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    step="1"
                    max="4"
                    name="noOfTicket"
                    value={this.state.noOfTicket}
                    onChange={this.handleChange}
                  />
                  <div style={{ color: "gray" }}>
                    {this.state.noOfTicketError}
                  </div>
                </div>
              </div>
              <div className="form-group row mb-3">
                <label
                  className="col-md-4 col-form-label text-md-right font-weight-bold"
                  style={{ color: "white" }}
                >
                  Total
                </label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="total"
                    value={this.state.total}
                    onChange={this.handleChange}
                    disabled
                  />
                  <div style={{ color: "gray" }}>{this.state.totalError}</div>
                </div>
              </div>
              <div className="col-md-4 offset-md-4">
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
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;
