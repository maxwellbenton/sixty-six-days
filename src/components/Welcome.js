import React from "react";
import { Link } from "react-router-dom";
class Welcome extends React.Component {
  handleStart = () => {};

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

export default Welcome;
