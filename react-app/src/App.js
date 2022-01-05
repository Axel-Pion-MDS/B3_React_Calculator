import "./App.css";

import React from "react";
import CalcBtns from "./CalcBtns/CalcBtns";
import CalcResult from "./CalcResult/CalcResult";

class App extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      choice: null,
      symbol: null,
      result: 0
    }
  }
  
  calculate = () => {
    if (this.state.symbol === "+") {
      this.setState({
        result: this.state.result + parseInt(this.state.choice)
      }, () => {});
    }
    if (this.state.symbol === "-") {
      this.setState({
        result: this.state.result - parseInt(this.state.choice)
      }, () => {});
    }
    if (this.state.symbol === "x") {
      this.setState({
        result: this.state.result * parseInt(this.state.choice)
      }, () => {});
    }
    if (this.state.symbol === "%") {
      this.setState({
        result: this.state.result / 100
      }, () => {});
    }
    if (this.state.symbol === "÷") {
      this.setState({
        result: this.state.result / parseInt(this.state.choice)
      }, () => {});
    }
    if (this.state.symbol === "±") {
      this.setState({
        result: this.state.result * -1
      }, () => {});
    }
  }

  onBtnClick = (value) => {
    console.log(value);
    const regExSymbol = /[\+\-\x\%\÷\±]/;
    const regExNumbers = /[0-9]/;
    if (regExSymbol.test(value) === true) {
      console.log("true");
      this.setState({
        symbol: value
      }, () => {});
    }
    if (regExNumbers.test(value) === true) {
      this.setState({
        choice: value
      }, () => {});
    }
    if (value === "AC") {
      this.setState({
        choice: null,
        symbol: null,
        result: 0
      }, () => {})
    }
    if (this.state.symbol && this.state.choice) {
      this.calculate();
    }
  }
  
  render() {
  const btns = ["AC", "±", "%", "÷", 
                7, 8, 9, "x", 
                4, 5, 6, "-", 
                1, 2, 3, "+", 
                0, ".", "="];
  	return (
    	<div className="calc">
        <div className="resultDiv">
          {console.log(this.state.result)}
    	    <CalcResult result={this.state.result} />
        </div>
        <div className="btnDiv">
          <CalcBtns buttons={btns} onBtnClick={this.onBtnClick.bind(this)} />
        </div>
    	</div>
    )
  }
}

export default App;
