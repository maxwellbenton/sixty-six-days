import React from "react";

const FourthInputForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      Enter the quantity and unit of measure:{" "}
      <input
        style={{
          width: `${props.quantity.length * 15}px`,
          minWidth: "100px",
          textAlign: "center"
        }}
        className="mainInput"
        type="text"
        name="quantity"
        value={props.quantity}
        onChange={props.handleChange}
      />{" "}
      <select
        name="unit"
        className="dropdownInput"
        value={props.unit}
        onChange={props.handleChange}
      >
        {props.unitOptions()}
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

export default FourthInputForm;
