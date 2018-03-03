import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotes } from "../actions";
// import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
// import MainFormContainer from "./MainFormContainer";
// import HabitList from "./HabitList";
// import Board from "./Board";
import NotePad from "./NotePad";
// import NavBar from "./NavBar";
import "../styles/App.css";
// import isLoading from "../HoCs/isLoading";

class App extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    return (
      <div className="App">
        <NotePad />
      </div>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ ...userData });

export default connect(mapStateToProps, { getNotes })(App);
