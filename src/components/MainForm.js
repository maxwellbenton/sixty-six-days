import React, { Component } from "react";
import { connect } from "react-redux";
import { createHabit } from "../actions";

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      habit: "",
      user_id: props.id,
      frequency: "everyday",
      days: [new Date().getDay()],
      hour: "8",
      minute: ":00",
      ampm: "am",
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

  componentDidMount() {
    this.firstInput.focus();
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
      this.props.createHabit(this.state);
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

  render() {
    console.log(this.state.days);
    return (
      <div className="formContainer">
        <div className="mainForm" style={{ top: `${this.state.top}vh` }}>
          <form onSubmit={this.handleSubmit}>
            I would like to{" "}
            <input
              style={{
                width: `${this.state.habit.length * 13 + 10}px`,
                minWidth: "100px"
              }}
              ref={input => {
                this.firstInput = input;
              }}
              className="mainInput"
              type="text"
              name="habit"
              value={this.state.habit}
              onChange={this.handleChange}
              autoComplete="off"
            />
            <div>
              <input type="submit" value="Continue" className="formButton" />
            </div>
          </form>
          <form onSubmit={this.handleSubmit}>
            I would like to do this{" "}
            <select
              style={{ width: `${this.state.frequency.length * 12 + 35}px` }}
              name="frequency"
              className="dropdownInput"
              value={this.state.frequency}
              onChange={this.handleChange}
            >
              <option value="everyday">everyday,</option>
              <option value="every other day">every other day,</option>
              <option value="every weekday">every weekday,</option>
              <option value="once a week">once a week,</option>
              <option value="twice a week">twice a week,</option>
              <option value="three times a week">three times a week,</option>
              <option value="four times a week">four times a week,</option>
              <option value="five times a week">five times a week,</option>
              <option value="six times a week">six times a week,</option>
            </select>{" "}
            starting on{" "}
            <select
              id="0"
              style={{
                width: `${this.state.daysOfTheWeek[this.state.days[0]].length *
                  14 +
                  15}px`
              }}
              name="days"
              className="dropdownInput"
              value={this.state.days[0]}
              onChange={this.handleChange}
            >
              {this.dateOptions()}
            </select>{" "}
            at{" "}
            <select
              style={{ width: `${this.state.hour.length * 15}px` }}
              name="hour"
              className="dropdownInput"
              value={this.state.hour}
              onChange={this.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select
              name="minute"
              className="dropdownInput"
              value={this.state.minute}
              onChange={this.handleChange}
            >
              <option value=":00">:00</option>
              <option value=":15">:15</option>
              <option value=":30">:30</option>
              <option value=":45">:45</option>
            </select>{" "}
            <select
              name="ampm"
              className="dropdownInput"
              value={this.state.ampm}
              onChange={this.handleChange}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <div>
              <input type="submit" value="Continue" className="formButton" />
              <button onClick={this.handleGoBack} className="formButton">
                Go Back
              </button>
            </div>
          </form>
          <form onSubmit={this.handleSubmit}>
            <select
              name="logType"
              className="dropdownInput clearDropMenu"
              value={this.state.logType}
              onChange={this.handleChange}
            >
              <option value="logQuantity">
                I want to log a quantity for this habit
              </option>
              <option value="checkIn">
                I just want to check in for this habit
              </option>
            </select>
            <div>
              <input type="submit" value="Continue" className="formButton" />
              <button onClick={this.handleGoBack} className="formButton">
                Go Back
              </button>
            </div>
          </form>
          <form onSubmit={this.handleSubmit}>
            Enter the quantity and unit of measure:{" "}
            <input
              style={{
                width: `${this.state.quantity.length * 15}px`,
                minWidth: "100px",
                textAlign: "center"
              }}
              className="mainInput"
              type="text"
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            />{" "}
            <select
              name="unit"
              className="dropdownInput"
              value={this.state.unit}
              onChange={this.handleChange}
            >
              {this.unitOptions()}
            </select>
            <div>
              <input type="submit" value="Continue" className="formButton" />
              <button onClick={this.handleGoBack} className="formButton">
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(({ userData }) => ({ ...userData.user }), {
  createHabit
})(MainForm);
