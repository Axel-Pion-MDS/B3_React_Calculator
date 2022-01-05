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
      }, () => {});
    }
    if (this.state.symbol === "-") {
      this.setState({
        result: this.state.firstChoice - this.state.secondChoice,
        resultToShow: this.state.firstChoice - this.state.secondChoice,
      }, () => {});
    }
    if (this.state.symbol === "x") {
      this.setState({
        result: this.state.firstChoice * this.state.secondChoice,
        resultToShow: this.state.firstChoice * this.state.secondChoice,
      }, () => {});
    }
    if (this.state.symbol === "%") {
      this.setState({
        result: this.state.firstChoice / 100,
        resultToShow: this.state.firstChoice / 100,
      }, () => {});
    }
    if (this.state.symbol === "÷") {
      console.log("wesh");
      this.setState({
        result: this.state.firstChoice / this.state.secondChoice,
        resultToShow: this.state.firstChoice / this.state.secondChoice,
      }, () => {});
    }
    if (this.state.symbol === "±") {
      this.setState({
        result: this.state.firstChoice * -1,
        resultToShow: this.state.firstChoice * -1,
      }, () => {});
    }
    this.setState({
      symbol: null,
      firstChoice: null,
      secondChoice: null
    }, () => {});
  }

  onBtnClick = (value) => {
    console.log(value);
    const regExSymbol = /[\+\-\x\÷]/;
    const regExNumbers = /[0-9]/;

    // BRACE YOURSELF, HERE COMES THE ARMY OF IF !
    // https://www.youtube.com/watch?v=gWWk25YPS3s

    // Checkes for symbol matchs
    if (regExSymbol.test(value) === true) {
      this.setState({
        symbol: value
      }, () => {});

      // Checkes for number matchs
    } else if (regExNumbers.test(value) === true) {

      // { firstChoice: null, secondChoice: null, symbol: null, result: 0, resultToShow: 0 }
      if (!this.state.firstChoice && !this.state.symbol) {
        this.setState({
          firstChoice: parseInt(value),
          resultToShow: parseInt(value)
        }, () => {});

        // { firstChoice: 0, secondChoice: null, symbol: "+", result: 0, resultToShow: 0 }
      } else if ((this.state.firstChoice && !this.state.secondChoice) && this.state.symbol) {
        this.setState({
          secondChoice: parseInt(value),
          resultToShow: parseInt(value)
        }, () => {});

        // { firstChoice: null, secondChoice: null, symbol: "+", result: 0, resultToShow: 0 }
      } else if ((!this.state.firstChoice && !this.state.secondChoice) && this.state.symbol) {
        this.setState({
          firstChoice: this.state.result,
          secondChoice: parseInt(value),
          resultToShow: parseInt(value)
        }, () => {})
      }

      // { firstChoice: 0, secondChoice: 0, symbol: "AC", result: 0, resultToShow: 0 }
    } else if (value === "AC") {
      this.setState({
        firstChoice: null,
        secondChoice: null,
        symbol: null,
        result: 0,
        resultToShow: 0,
      }, () => {})

      // { firstChoice: null, secondChoice: null, symbol: "%", result: 0, resultToShow: 0 }
    } else if (value === "%" || value === "±") {

      // { firstChoice: null, secondChoice: null, symbol: "%", result: 0, resultToShow: 0 }
      if (!this.state.firstChoice) {
        console.log(value);
        this.setState({
          firstChoice: this.state.result,
          symbol: value
        }, () => {});

        // { firstChoice: 0, secondChoice: null, symbol: "%", result: 0, resultToShow: 0 }
      } else if (this.state.firstChoice) {
        console.log("pas bite");
        this.setState({
          symbol: value
        }, () => {});
      }

      // { firstChoice: null, secondChoice: null, symbol: "=", result: 0, resultToShow: 0 }
    } else if (value === "=") {
      this.calculate();
    }

    // { firstChoice: 0, secondChoice: 0, symbol: "+", result: 0, resultToShow: 0 }
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
