import React, { Component } from "react";
import { connect } from "react-redux";
import HabitListing from "./HabitListing";
// import { updateHabit } from "../actions";

class HabitList extends Component {
  habits = () => {
    console.log(this.props);
    // return this.props.habits.map(habit => (
    //   <HabitListing key={habit.id} {...habit} />
    // ));
  };

  render = () => <div className="HabitList">{this.habits()}</div>;
}

export default connect(({ userData }) => ({ ...userData }), null)(HabitList);
