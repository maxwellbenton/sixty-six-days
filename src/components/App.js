import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData } from "../actions";
import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
import MainFormContainer from "./MainFormContainer";
import HabitList from "./HabitList";
import Board from "./Board";
import Welcome from "./Welcome";
import NavBar from "./NavBar";
import "../styles/App.css";
import isLoading from "../HoCs/isLoading";

class App extends Component {
  // componentDidMount() {
  //   this.props.getUserData();
  // }

  render() {
    // const LoadedForm = isLoading(
    //   MainFormContainer,
    //   this.props.dataLoaded,
    //   !!Object.keys(this.props.habits).length
    // );
    // const LoadedHabits = isLoading(
    //   HabitList,
    //   this.props.dataLoaded,
    //   !!Object.keys(this.props.habits).length
    // );
    console.log(this.props);
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Welcome />} />
          <Route path="/game" render={() => <Board />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ ...userData });

export default withRouter(connect(mapStateToProps, null)(App));
