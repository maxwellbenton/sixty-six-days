import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLocation } from "../actions";

class Welcome extends React.Component {
  handleStart = () => {
    this.props.getLocation();
  };

  render() {
    return (
      <div>
        <Link to="/game">
          <button onClick={this.handleStart}>Start New Game</button>
        </Link>
      </div>
    );
  }
}

export default connect(null, { getLocation })(Welcome);
