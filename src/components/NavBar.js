import React, { Component } from "react";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    return (
      <div className="NavBar">
        <span>|||</span>
        <span />
        <span>User</span>
      </div>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ ...userData });

export default connect(mapStateToProps)(NavBar);
