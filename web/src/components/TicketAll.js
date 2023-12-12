import React from "react";
import "../App.css";
import swal from "sweetalert";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import LocalIP from "./LocalIP";

const initialState = {
  id: "",
  search: "",
  Ticket: [],
};

class TicketAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = LocalIP + "api/Ticket/user/" + localStorage.getItem("id");
    axios
      .get(url)
      .then((response) => this.setState({ Ticket: response["data"] }));
  }

  onDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Delete this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const url = LocalIP + "api/Ticket/";
        axios.delete(url + id).then((res) => {
          swal("Delete Successful!", {
            icon: "success",
          });
          this.componentDidMount();
        });
      }
    });
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  render() {
    const { Ticket } = this.state;
    return (
      <div className="container">
        <br />
        <br />
        <div className="justify-content-center">
          <h2>
            <span style={{ color: "#0000A3" }}>Ticket</span>
            <span style={{ color: "#EC5800" }}> Management</span>
          </h2>
          <hr />
          <div className="x_scroll">
            <div className="form-group row">
              <label
                className="col-1 col-form-label text-md-left font-weight-bold"
                style={{ color: "white" }}
              >
                Search
              </label>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="x_scroll">
            <table className="table">
              <thead>
                <tr>
                  <th className="tableTh">Date</th>
                  <th className="tableTh">Time</th>
                  <th className="tableTh">Start Station</th>
                  <th className="tableTh">End Station</th>
                  <th className="tableTh">Price</th>
                  <th className="tableTh">Number Of Ticket</th>
                  <th className="tableTh">Total</th>
                  <th className="tableTh">Edit</th>
                  <th className="tableTh">Remove</th>
                </tr>
              </thead>
              <tbody>
                {Ticket.filter((data) => {
                  if (this.state.search == null) return data;
                  else if (
                    data.start
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase()) ||
                    data.end
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())
                  ) {
                    return data;
                  }
                }).map((res) => (
                  <tr key={res.id}>
                    <td className="tableTh">{res.date}</td>
                    <td className="tableTh">{res.time}</td>
                    <td className="tableTh">{res.start}</td>
                    <td className="tableTh">{res.end}</td>
                    <td className="tableTh">{res.price}</td>
                    <td className="tableTh">{res.noOfTicket}</td>
                    <td className="tableTh">{res.total}</td>
                    <td className="tableTh">
                      <a
                        href={"ticket_edit/" + res.id}
                        className="btn btn-outline-success"
                      >
                        Edit
                      </a>
                    </td>
                    <td className="tableTh">
                      <button
                        type="button"
                        onClick={() => this.onDelete(res.id)}
                        className="btn btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    );
  }
}

export default TicketAll;
