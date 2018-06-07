import React, { Component } from "react";
import { connect } from "react-redux";
import { getInitialLocationAndData, getLocation } from "../actions";
import { Switch, Route, withRouter } from "react-router-dom";
// import MainFormContainer from "./MainFormContainer";
// import HabitList from "./HabitList";
import Board from "./Board";
import Welcome from "./Welcome";
// import NavBar from "./NavBar";
import "../styles/App.css";
// import isLoading from "../HoCs/isLoading";

class App extends Component {
  state = {
    intervalId: null
  };

  componentDidMount() {
    this.props.getInitialLocationAndData();
    var intervalId = setInterval(() => this.props.getLocation(), 30000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
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

export default withRouter(
  connect(null, { getInitialLocationAndData, getLocation })(App)
);
