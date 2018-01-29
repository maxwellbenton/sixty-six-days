import React from "react";

const HabitListing = props => {
  function handleClick() {
    console.log(props.id);
    debugger;
  }

  return (
    <div className="HabitListing">
      <span>
        <input type="checkbox" />
      </span>
      <span onClick={handleClick}>
        <span>{props.habit}</span>
        <span>{props.frequency}</span>
        <span>{`${props.hour}:${props.minute} ${props.ampm}`}</span>
        <span>{props.quantity ? `${props.quantity} ${props.unit}` : null}</span>
      </span>
    </div>
  );
};

export default HabitListing;
