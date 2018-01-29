import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../actions";
import { Switch, Route, Redirect } from "react-router-dom";
import MainForm from "./MainForm";
import HabitList from "./HabitList";
import NavBar from "./NavBar";
import "../styles/App.css";

class App extends Component {
  // componentDidMount() {
  //   this.props.getUserData();
  // }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div className="logo">Sixty Six Days</div>
                <MainForm />
                <HabitList />
              </div>
            )}
          />
          <Route exact path="/new_user" render={() => <div>Sign Up</div>} />
          <Route
            exact
            path="/start_task"
            render={() => <div>Start Form</div>}
          />
          <Route exact path="/profile" render={() => <div>Profile</div>} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ ...userData });

export default connect(mapStateToProps, { getUserData })(App);
