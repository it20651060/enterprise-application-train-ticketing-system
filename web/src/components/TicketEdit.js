import React from 'react';
import '../App.css';
import swal from 'sweetalert';
import axios from 'axios';
import LocalIP from './LocalIP';

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
    Train: []
}

class TicketEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }
    
    handleChange = async(e) => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
        if(e.target.name=="noOfTicket"){
            var total = this.state.price*e.target.value
            if(total==0){
                total= await this.state.price
            }
            this.setState({total:total})
        }
        if(e.target.name=="trainId"){
            console.log(e.target.value)
            const url = LocalIP+"api/Train/"+e.target.value;
        axios.get(url)
        .then(response => {
            this.setState({tNumber:response['data']['tNumber'] , date: response['data']['date'],time:response['data']['time'],start:response['data']['start'],price:response['data']['price'],end:response['data']['end']})
        })
        }
    }

    componentDidMount() {
        const url = LocalIP+"api/Train/active"
        axios.get(url)
        .then(response =>{ 
            console.log(response['data'])
            this.setState({Train:response['data']})
        })
        const url1 = LocalIP+"api/Ticket/"+this.props.match.params.id;
        console.log(url1)
        axios.get(url1)
        .then(response => {
            this.setState({trainId:response['data']['trainId'],date:response['data']['date'],time:response['data']['time'],start:response['data']['start'],price:response['data']['price'],end:response['data']['end'],total:response['data']['total'],noOfTicket:response['data']['noOfTicket'],id:response['data']['id']})
        })
    }

    onClear(){
        this.setState(initialState);
    }

    validation = async() => {

        let trainIdError = "";
        let noOfTicketError = "";
        let totalError = "";

        if(!this.state.trainId){
            trainIdError="Train Required!"
        }

        if(!this.state.noOfTicket){
            noOfTicketError="Number Of Ticket Required!"
        }

        if(!this.state.total){
            totalError="Total Required!"
        }

        if( trainIdError || noOfTicketError || totalError){
            
            await this.setState({ trainIdError , noOfTicketError , totalError });
            
            return false;

        }else{

            await this.setState({ trainIdError , noOfTicketError , totalError });
            return true;
            
        }

    }

    SubmitForm = async(e) => {
        e.preventDefault();
        if(await this.validation()){
          console.log(this.state);
          const url = LocalIP+'api/Ticket/'+this.state.id;
          const data = JSON.stringify({ id:this.state.id , trainId: this.state.trainId , date: this.state.date , time:this.state.time, start: this.state.start , end: this.state.end , price: this.state.price, noOfTicket: this.state.noOfTicket , total: this.state.total ,userId: localStorage.getItem('id')});
          console.log(data);
          await axios.put(url,data,{
              headers: {'Content-Type': 'application/json'}
          })
          .then(res => {
              console.log(res.data);
              this.setState(initialState)
              swal("Success!", "Edit Successful!", "success")
              this.props.history.push("/ticket_all")
          })
        }
    }

    render (){
        const { Train } = this.state;
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="justify-content-center">
                    <h1>Ticket Edit</h1>
                    <div class="x_scroll">
                    <hr/>
                        <form autoComplete="off" onSubmit={this.SubmitForm}><div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Name</label>
                            <div class="col-md-6">
                                <select class="form-control" name="trainId" value={this.state.trainId} onChange={this.handleChange} >
                                    <option value="">Select Train</option>
                                    {
                            Train.map((res) =>
                            <option value={res.id}>{"Name: "+res.tNumber+" Start : "+res.start+" End : "+res.end}</option>
                            )}
                                </select>
                                <div style={{color : "red"}}>{this.state.trainIdError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Date</label>
                            <div class="col-md-6">
                                <input type="date" class="form-control" name="date" value={this.state.date} onChange={this.handleChange} disabled/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Time</label>
                            <div class="col-md-6">
                                <input type="time" class="form-control" name="time" value={this.state.time} onChange={this.handleChange} disabled/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Start Station</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="start" value={this.state.start} onChange={this.handleChange} disabled/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">End Station</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="end" value={this.state.end} onChange={this.handleChange} disabled/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Ticket Price</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control" name="time" value={this.state.price} disabled/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Number Of Ticket</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control" min="1" step="1" max="4" name="noOfTicket" value={this.state.noOfTicket} onChange={this.handleChange} />
                                <div style={{color : "red"}}>{this.state.noOfTicketError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Total</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="total" value={this.state.total} onChange={this.handleChange} disabled/>
                                <div style={{color : "red"}}>{this.state.totalError}</div>
                            </div>
                        </div>
                        <br/>
                        <div class="col-md-4 offset-md-4">
                            <input type="submit" class="btn btn-outline-primary" value="Submit" />
                            <input type="button" class="btn btn-outline-danger" value="Clear" onClick={() => this.onClear()} />
                        </div>
                        <br/><br/>   
                    </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default TicketEdit;
