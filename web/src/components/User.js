import React from "react";
import "../App.css";

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const containerStyle = {
      padding: "10px", // Add padding to center the form
    };

    return (
      <div className="container" style={containerStyle}>
        <div className="col-lg-12">
          <br />
          <br />
          <div className="justify-content-center">
            <h1>
              <span style={{ color: "#EC5800" }}>Travel </span>
              <span style={{ color: "#0000A3" }}>Agent</span>
            </h1>
            <div class="x_scroll">
              <br />
              <div class="col-lg-12">
                <a
                  class="btn btn-outline-primary col-md-4"
                  href="/ticket"
                  style={{
                    backgroundColor: "#0000A3",
                    color: "white",
                    fontWeight: "bold",
                    transition: "background-color 0.3s", // Add a transition for smooth effect
                    ":hover": {
                      backgroundColor: "#EC5800",
                    },
                  }}
                >
                  Add Ticket
                </a>
              </div>
              <br />

              <br />
              <div class="col-lg-12">
                <a
                  class="btn btn-outline-primary col-md-4"
                  href="/ticket_all"
                  style={{
                    backgroundColor: "#0000A3",
                    color: "white",
                    fontWeight: "bold",
                    transition: "background-color 0.3s", // Add a transition for smooth effect
                    ":hover": {
                      backgroundColor: "#EC5800",
                    },
                  }}
                >
                  Purchase History
                </a>
              </div>
              <br />

              <br />
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
        </div>
      </div>
    );
  }
}

export default User;
