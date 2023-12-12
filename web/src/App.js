import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Officer from "./components/Officer";
import Register from "./components/Register";
import Ticket from "./components/Ticket";
import TicketEdit from "./components/TicketEdit";
import TicketAll from "./components/TicketAll";
import Train from "./components/Train";
import TrainEdit from "./components/TrainEdit";
import TrainAll from "./components/TrainAll";
import Admin from "./components/Admin";
import User from "./components/User";
import Login from "./components/Login";
import AllUsers from "./components/AllUsers";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

import imagess from "./assets/img1.jpg"

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundColor: "#5aa4ef",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/ticket" component={Ticket}></Route>
          <Route path="/ticket_edit/:id" component={TicketEdit}></Route>
          <Route path="/ticket_all" component={TicketAll}></Route>
          <Route path="/train" component={Train}></Route>
          <Route path="/train_edit/:id" component={TrainEdit}></Route>
          <Route path="/train_all" component={TrainAll}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/allusers" component={AllUsers}></Route>
          <Route path="/office" component={Officer}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/" component={Register}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
