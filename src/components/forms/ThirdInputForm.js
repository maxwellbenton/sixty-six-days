import React from "react";

const ThirdInputForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <select
        name="logType"
        className="dropdownInput clearDropMenu"
        value={props.logType}
        onChange={props.handleChange}
      >
        <option value="logQuantity">
          I want to log a quantity for this habit
        </option>
        <option value="checkIn">I just want to check in for this habit</option>
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

export default ThirdInputForm;
