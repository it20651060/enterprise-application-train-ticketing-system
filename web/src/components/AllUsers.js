import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MaterialTable from "material-table";
import LocalIP from "./LocalIP";

const initialState = {
    users: [],
    columns: [
        { title: "First Name", field: "fname"},
        { title: "Last Name", field: "lname"},
        { title: "NIC", field: "nic"},
        { title: "Email", field: "email"},
        { title: "User Privilege", field: "privilege" , lookup: { "admin": "Travel Agent", "office": "Backoffice", "User": "User" }},
        { title: "System Access", field: "activation" , lookup: { true: "Allow", false: "Deny" }},
    ]
}

class AllUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = async() => {
        const url = LocalIP+"api/users";
        await axios.get(url).then(async(response) => await this.setState({users:response['data']}))
    }
    
    SubmitForm = async(newRow, oldRow) => {
        const url = LocalIP+"api/users/" + oldRow["id"];
        console.log(newRow["activation"]+"")
        const booleanValue = newRow["activation"] === "true" ? true : false;
      const data = JSON.stringify({
        id: oldRow["id"],
        fname: newRow["fname"],
        lname: newRow["lname"],
        nic: newRow["nic"],
        email: newRow["email"],
        password: oldRow["password"],
        privilege: newRow["privilege"],
        activation: booleanValue
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async(res) => {
          console.log(res.data);
          swal("Success!", "Update Successful!", "success");
            await this.componentDidMount()
        });
    }

    onDelete= async(id)=>{
        await swal({
            title: "Are you sure?",
            text: "Delete this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const url = LocalIP+'api/users/';
                axios.delete(url+id)
                .then(async(res) =>{
              swal("Success!", "Delete Successful!", "success");
                    await this.componentDidMount();
                });
            }
          })
    }
   
    render (){
        const { users , columns } = this.state;
        return (
            
    <div>
    <br />
    <MaterialTable
        tableRef={this.componentDidMount}
      title="Users Table"
      columns={columns}
      data={users}
      style={{
        maxWidth: "80%",
        padding: "20px 5px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
      options={{
        filtering: false,
        sorting: false,
        actionsColumnIndex: -1,
      }}
      editable={{
        onRowUpdate: (newRow, oldRow) =>
          new Promise(async (resolve, reject) => {
            this.SubmitForm(newRow, oldRow);
            console.log(oldRow.id);
            setTimeout(() => resolve(), 300);
          }),
        onRowDelete: (selectedRow) =>
          new Promise((resolve, reject) => {
            console.log(selectedRow);
            this.onDelete(selectedRow.id);
            setTimeout(() => resolve(), 300);
          }),
      }}
    />
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

export default AllUsers;
