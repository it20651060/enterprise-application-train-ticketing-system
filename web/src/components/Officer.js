import React from 'react';
import '../App.css';

class Officer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="container">
                <div className="col-lg-12">
                    <br /><br />
                    <div class="justify-content-center">
                        <h1>BackOffice</h1>
                        <div class="x_scroll">
                            <hr />
                            <div class="col-lg-12">
                                <a class="btn btn-outline-primary col-md-4" href="/train" >Train</a>
                            </div>
                            <br />
                            <br />
                            <div class="col-lg-12">
                                <a class="btn btn-outline-primary col-md-4" href="/train_all" >Train All</a>
                            </div>
                            <br />
                            <br />
                            <div class="col-lg-12">
                                <a class="btn btn-outline-primary col-md-4" href="/allusers" >User Management</a>
                            </div>
                            <br />
                        </div>
                    </div>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    
                </div>
            </div>
        );
    }
}

export default Officer;
