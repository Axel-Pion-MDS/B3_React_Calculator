import React from "react";

class CalcBtns extends React.Component {
	constructor(props) {
  	super(props);
    this.btns = props.buttons;
    this.state = {value: null};
  }

  getBtnValue = (e) => this.setState({
  	value: e.target.value
  });

  onFormSubmit = (e) => {
  	e.preventDefault();
    this.props.onBtnClick(this.state.value);
  };

  render() {
  	return (
    	<form onSubmit={this.onFormSubmit} className="CalcBtnForm">
        {this.btns.map((btn) => (
          <button type="submit" key={`key_${btn}`} value={btn} onClick={this.getBtnValue}>
            {btn}
          </button>
        ))}
      </form>
    )
  }
}

export default CalcBtns;