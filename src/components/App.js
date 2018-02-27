import React, { Component } from "react";
import { connect } from "react-redux";
import { createHabit } from "../actions";
import { Switch, Route, Redirect } from "react-router-dom";
import MainFormContainer from "./MainFormContainer";
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
                <MainFormContainer />
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

export default connect(mapStateToProps, { createHabit })(App);
