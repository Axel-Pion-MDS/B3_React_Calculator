import React from "react";

class CalcResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 className="result">{this.props.result}</h1>
    );
  }
}

export default CalcResult;