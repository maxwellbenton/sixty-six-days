import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../actions";
import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
import MainFormContainer from "./MainFormContainer";
import HabitList from "./HabitList";
import NavBar from "./NavBar";
import "../styles/App.css";
import isLoading from "../HoCs/isLoading";

class App extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    const LoadedForm = isLoading(
      MainFormContainer,
      this.props.dataLoaded,
      !!Object.keys(this.props.habits).length
    );
    const LoadedHabits = isLoading(
      HabitList,
      this.props.dataLoaded,
      !!Object.keys(this.props.habits).length
    );
    console.log(this.props);
    return (
      <div className="App">
        <div className="logo">
          Sixty Six Days
          <div style={{ fontSize: "50%", margin: "1em" }}>
            {this.props.location.pathname === "/new_habit" ? (
              <Link to="/habits">Habits</Link>
            ) : (
              <Link to="/new_habit">New Habit</Link>
            )}
          </div>
        </div>

        <Switch>
          <Route exact path="/" render={() => <LoadedForm />} />
          <Route path="/new_habit" component={MainFormContainer} />
          <Route exact path="/new_user" render={() => <div>Sign Up</div>} />
          <Route exact path="/habits" render={() => <LoadedHabits />} />
          />
          <Route exact path="/profile" render={() => <div>Profile</div>} />
          <Redirect to="/new_habit/error" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ ...userData });

export default withRouter(connect(mapStateToProps, { getUserData })(App));
