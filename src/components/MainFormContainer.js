import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createHabit } from "../actions";
import FirstInputForm from "./forms/FirstInputForm";
import SecondInputForm from "./forms/SecondInputForm";
import ThirdInputForm from "./forms/ThirdInputForm";
import FourthInputForm from "./forms/FourthInputForm";

class MainFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habit: "",
      user_id: props.id,
      frequency: "everyday",
      days: [new Date().getDay()],
      hour:
        new Date().getHours() > 12
          ? "0" + new Date().getHours() - 11
          : "0" + new Date().getHours() + 1,
      minute: ":00",
      ampm: new Date().getHours() > 12 ? "pm" : "am",
      logType: "checkIn",
      quantity: "5",
      unit: "minutes",
      top: 0,
      unitOptions: ["minutes", "hours", "times", "ounces", "lbs", "reps"],
      daysOfTheWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    };
  }

  unitOptions = () =>
    this.state.unitOptions.map((unit, i) => (
      <option key={i} value={unit}>
        {unit}
      </option>
    ));

  dateOptions = () =>
    this.state.daysOfTheWeek.map((d, i) => {
      let day;
      new Date().getDay() + i < 7
        ? (day = new Date().getDay() + i)
        : (day = new Date().getDay() + i - 7);
      return (
        <option key={i} value={day}>
          {this.state.daysOfTheWeek[day]}
        </option>
      );
    });

  handleChange = event => {
    console.log(event.target.name, event.target.value);
    if (!event.target.name.includes("days")) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      event.persist();
      this.setState(pState => {
        let d = pState.days;
        d[event.target.id] = event.target.value;
        return {
          days: d
        };
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.top > -40 ||
      (this.state.top > -60 && this.state.logType === "logQuantity")
    ) {
      this.setState(pState => {
        return { top: pState.top - 20 };
      });
    } else {
      this.props.createHabit({ ...this.state, user_id: this.props.user.id });
      this.props.history.push("/habits");
    }
  };

  handleGoBack = event => {
    event.preventDefault();
    this.setState(pState => {
      if (pState.top < 0) {
        return { top: pState.top + 20 };
      }
      return pState;
    });
  };

  formSections = () => {
    return [
      <FirstInputForm
        habit={this.state.habit}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />,
      <SecondInputForm
        {...this.state}
        dateOptions={this.dateOptions}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleGoBack={this.handleGoBack}
      />,
      <ThirdInputForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleGoBack={this.handleGoBack}
      />,
      <FourthInputForm
        {...this.state}
        unitOptions={this.unitOptions}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleGoBack={this.handleGoBack}
      />
    ];
  };
  render() {
    console.log(this.state.days);
    return (
      <div className="formContainer">
        <div className="mainForm" style={{ top: `${this.state.top}vh` }}>
          {this.formSections()}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(({ userData }) => ({ user: userData.user }), {
    createHabit
  })(MainFormContainer)
);
