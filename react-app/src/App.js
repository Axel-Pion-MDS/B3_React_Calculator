import "./App.css";

import React from "react";
import CalcBtns from "./CalcBtns/CalcBtns";
import CalcResult from "./CalcResult/CalcResult";

class App extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
      firstChoice: null,
      secondChoice: null,
      symbol: null,
      result: 0,
      resultToShow: 0
    }
  }
  
  calculate = () => {
    console.log(this.state);
    if (this.state.symbol === "+") {
      this.setState({
        result: this.state.firstChoice + this.state.secondChoice,
        resultToShow: this.state.firstChoice + this.state.secondChoice,
        symbol: null,
        firstChoice: null
      }, () => {});
    }
    if (this.state.symbol === "-") {
      this.setState({
        result: this.state.firstChoice - this.state.secondChoice,
        resultToShow: this.state.firstChoice - this.state.secondChoice,
        symbol: null
      }, () => {});
    }
    if (this.state.symbol === "x") {
      this.setState({
        result: this.state.firstChoice * this.state.secondChoice,
        resultToShow: this.state.firstChoice * this.state.secondChoice,
        symbol: null
      }, () => {});
    }
    if (this.state.symbol === "%") {
      this.setState({
        result: this.state.result / 100,
        resultToShow: this.state.result / 100,
        symbol: null
      }, () => {});
    }
    if (this.state.symbol === "÷") {
      this.setState({
        result: this.state.result / this.state.choice,
        resultToShow: this.state.result / this.state.choice,
        symbol: null
      }, () => {});
    }
    if (this.state.symbol === "±") {
      this.setState({
        result: this.state.result * -1,
        resultToShow: this.state.result * -1,
        symbol: null
      }, () => {});
    }
  }

  onBtnClick = (value) => {
    console.log(value);
    const regExSymbol = /[\+\-\x\÷]/;
    const regExNumbers = /[0-9]/;
    
    // BRACE YOURSELF, HERE COMES THE ARMY OF IF !
    if (regExSymbol.test(value) === true) {
      this.setState({
        symbol: value
      }, () => {});
    } else if (regExNumbers.test(value) === true) {
      if (this.state.firstChoice === null && this.state.symbol === null) {
        this.setState({
          firstChoice: parseInt(value),
          resultToShow: parseInt(value)
        }, () => {});
      } else if (!this.state.choice) {
        this.setState({
          secondChoice: parseInt(value),
          resultToShow: parseInt(value)
        }, () => {});
      }
    } else if (value === "AC") {
      this.setState({
        firstChoice: null,
        secondChoice: null,
        symbol: null,
        result: 0,
        resultToShow: 0,
      }, () => {})
    } else if (value === "%" || value === "±") {
      if (!this.state.firstChoice) {
        this.setState({
          firstChoice: this.state.result,
        }, () => {});
      }
      this.calculate();
    } else if (value === "=") {
      if (!this.state.secondChoice && this.state.symbol) {
        this.setState({
          firstChoice: this.state.result,
          secondChoice: this.state.resultToShow,
        }, () => {})
        this.calculate();
      } else if (this.state.secondChoice && this.state.symbol) {
        this.calculate();
      }
    }

    console.log(this.state);
    if (this.state.symbol && this.state.choice && this.state.secondChoice) {
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
    	    <CalcResult result={this.state.resultToShow} />
        </div>
        <div className="btnDiv">
          <CalcBtns buttons={btns} onBtnClick={this.onBtnClick.bind(this)} />
        </div>
    	</div>
    )
  }
}

export default App;
