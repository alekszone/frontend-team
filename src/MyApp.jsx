import React, { Component } from "react";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";

class MyApp extends Component {
  state = {
    authorizationKey: "dXNlcjE2OmM5V0VVeE1TMjk0aE42ZkY=",
    username: "segundara",
    showApp: true,
  };

  getAuthorization = (autho, username) => {
    localStorage.setItem("authorizationKey", autho);
    localStorage.setItem("username", username);
  };
  resetAuthorization = () => {
    localStorage.removeItem("authorizationKey");
    localStorage.removeItem("username");
    this.setState({ showApp: false, authorizationKey: "", username: "" });
  };

  showApp = () => {
    this.setState({
      authorizationKey: localStorage.getItem("authorizationKey"),
      username: localStorage.getItem("username"),
      showApp: true,
    });
  };

  render() {
    return (
      <>
        <Router>
          {this.state.showApp && this.state.authorizationKey !== null && (
            <App
              authoKey={this.state.authorizationKey}
              username={this.state.username}
            />
          )}
        </Router>
      </>
    );
  }
}

export default MyApp;
