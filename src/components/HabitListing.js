import React from "react";

const HabitListing = props => {
  function handleClick() {
    console.log(props.id);
    debugger;
  }

  return (
    <div
      className="HabitListing"
      style={{ display: "grid", gridTemplateColumns: "2fr 8fr" }}
    >
      <span>
        <input type="checkbox" />
      </span>
      <span
        onClick={handleClick}
        style={{ display: "grid", gridTemplateColumns: "4fr 1fr 1fr 1fr" }}
      >
        <span>{props.habit}</span>
        <span>{props.quantity ? `${props.quantity} ${props.unit}` : null}</span>
        <span>{props.frequency}</span>
        <span>{`${props.hour}:${props.minute} ${props.ampm}`}</span>
      </span>
    </div>
  );
};

export default HabitListing;
