import React from "react";

const FirstInput = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      I would like to{" "}
      <input
        style={{
          width: `${props.habit.length * 13 + 10}px`,
          minWidth: "100px"
        }}
        className="mainInput"
        type="text"
        name="habit"
        value={props.habit}
        onChange={props.handleChange}
        autoComplete="off"
      />
      <div>
        <input type="submit" value="Continue" className="formButton" />
      </div>
    </form>
  );
};

export default FirstInput;
