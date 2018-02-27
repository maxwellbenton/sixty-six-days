import React from "react";

const SecondInputForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      I would like to do this{" "}
      <select
        style={{ width: `${props.frequency.length * 12 + 35}px` }}
        name="frequency"
        className="dropdownInput"
        value={props.frequency}
        onChange={props.handleChange}
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
          width: `${props.daysOfTheWeek[props.days[0]].length * 14 + 15}px`
        }}
        name="days"
        className="dropdownInput"
        value={props.days[0]}
        onChange={props.handleChange}
      >
        {props.dateOptions()}
      </select>{" "}
      at{" "}
      <select
        style={{ width: "auto" }}
        name="hour"
        className="dropdownInput"
        value={props.hour}
        onChange={props.handleChange}
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
        value={props.minute}
        onChange={props.handleChange}
      >
        <option value=":00">:00</option>
        <option value=":15">:15</option>
        <option value=":30">:30</option>
        <option value=":45">:45</option>
      </select>{" "}
      <select
        name="ampm"
        className="dropdownInput"
        value={props.ampm}
        onChange={props.handleChange}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      <div>
        <input type="submit" value="Continue" className="formButton" />
        <button onClick={props.handleGoBack} className="formButton">
          Go Back
        </button>
      </div>
    </form>
  );
};

export default SecondInputForm;
