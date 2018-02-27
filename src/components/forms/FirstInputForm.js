import React from "react";

class FirstInputForm extends React.Component {
  componentDidMount() {
    this.firstInput.focus();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        I would like to{" "}
        <input
          style={{
            width: `${this.props.habit.length * 13 + 10}px`,
            minWidth: "100px"
          }}
          ref={input => {
            this.firstInput = input;
          }}
          className="mainInput"
          type="text"
          name="habit"
          value={this.props.habit}
          onChange={this.props.handleChange}
          autoComplete="off"
        />
        <div>
          <input type="submit" value="Continue" className="formButton" />
        </div>
      </form>
    );
  }
}

export default FirstInputForm;
