import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalIP from './LocalIP';

const initialState = {
    id: "",
    search: "",
    Train: [],
}

class TrainAll extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const url = LocalIP + "api/Train/"
        axios.get(url)
            .then(response => {
                console.log(response['data'])
                this.setState({ Train: response['data'] })
            })
    }

    handleEdit = (reservationDate, reservationId) => {
        // Convert the reservation date and current date to JavaScript Date objects
        const currentDate = new Date();
        const reservationDateObj = new Date(reservationDate);

        // Calculate the date difference in milliseconds
        const dateDifference = reservationDateObj - currentDate;

        // Calculate the number of days
        const daysDifference = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 5) {
            // Date gap is less than 5 days, show an error alert
            alert("You can't edit this reservation. Date gap is less than 5 days.");
        } else {
            // Date gap is 5 days or more, redirect to the "train_edit" route
            window.location.href = "train_edit/" + reservationId;
        }
    };

    onDelete(id) {
        swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const url = LocalIP + 'api/Train/';
                    axios.delete(url + id)
                        .then(res => {
                            console.log(res.data)
                            if (res.data == "Ticket already book") {
                                swal("Error!", "Ticket already book!", "error");
                            } else {
                                swal("Delete Successful!", {
                                    icon: "success",
                                })
                                this.componentDidMount()
                            }
                        });
                }
            })
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    render() {
        const { Train } = this.state;
        return (
            <div class="container">
                <br /><br />
                <div class="justify-content-center">
                    <h2>Train Management</h2>
                    <hr />
                    <div class="x_scroll">
                        <div class="form-group row">
                            <label class="col-1 col-form-label text-md-left font-weight-bold">Search</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" name="search" value={this.state.search} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div class="x_scroll">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="tableTh">Train Number</th>
                                    <th class="tableTh">Date</th>
                                    <th class="tableTh">Time</th>
                                    <th class="tableTh">Start Station</th>
                                    <th class="tableTh">End Station</th>
                                    <th class="tableTh">Price</th>
                                    <th class="tableTh">Cancel</th>
                                    <th class="tableTh">Edit</th>
                                    <th class="tableTh">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Train.filter((data) => {
                                        if (this.state.search == null)
                                            return data
                                        else if (data.tNumber.toLowerCase().includes(this.state.search.toLowerCase()) || data.start.toLowerCase().includes(this.state.search.toLowerCase()) || data.end.toLowerCase().includes(this.state.search.toLowerCase())) {
                                            return data
                                        }
                                    }).map((res) =>

                                        <tr>
                                            <td class="tableTh">{res.tNumber}</td>
                                            <td class="tableTh">{res.date}</td>
                                            <td class="tableTh">{res.time}</td>
                                            <td class="tableTh">{res.start}</td>
                                            <td class="tableTh">{res.end}</td>
                                            <td class="tableTh">{res.price}</td>
                                            <td class="tableTh">{res.cancel === true ? "Canceled" : "Running"}</td>
                                            {/* <td class="tableTh"><a href={"train_edit/" + res.id} class="btn btn-outline-success">Edit</a></td> */}
                                            <td class="tableTh">
                                                <button
                                                    type='button'
                                                    onClick={() => this.handleEdit(res.date, res.id)}
                                                    class="btn btn-outline-success"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td class="tableTh"><button type='button' onClick={() => this.onDelete(res.id)} class="btn btn-outline-danger">Delete</button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
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
            </div>
        );
    }
}

export default TrainAll;
