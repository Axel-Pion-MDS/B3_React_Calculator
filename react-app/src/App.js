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
    // 0 + 0
    if (this.state.symbol === "+") {
      // ! WORKS WHEN this.state.firstChoice && this.state.secondChoice ONLY ONCE
      // ! MUST CORRECT IT
      // If number is a float
      if ((this.state.firstChoice || this.state.secondChoice) % 1 !== 0) {
        this.setState({
          result: !this.state.firstChoice && !this.state.secondChoice ? 
            (parseFloat(this.state.result) + parseFloat(this.state.result)).toFixed(2) : 
            (parseFloat(this.state.firstChoice) + parseFloat(this.state.secondChoice)).toFixed(2),
          resultToShow: !this.state.firstChoice && !this.state.secondChoice ? 
            (parseFloat(this.state.result) + parseFloat(this.state.result)).toFixed(2) : 
            (parseFloat(this.state.firstChoice) + parseFloat(this.state.secondChoice)).toFixed(2)
        }, () => {});
      // If number is not a float
      } else {
        this.setState({
          result: !this.state.firstChoice && !this.state.secondChoice ? 
          this.state.result + this.state.result : parseInt(this.state.firstChoice) + parseInt(this.state.secondChoice),
          resultToShow: !this.state.firstChoice && !this.state.secondChoice ? 
          this.state.result + this.state.result : parseInt(this.state.firstChoice) + parseInt(this.state.secondChoice),
        }, () => {});
      }
    }

    // 0 - 0
    if (this.state.symbol === "-") {
      this.setState({
        result: !this.state.firstChoice && !this.state.secondChoice ? 
          this.state.result - this.state.result : parseInt(this.state.firstChoice) - parseInt(this.state.secondChoice),
        resultToShow: !this.state.firstChoice && !this.state.secondChoice ? 
          this.state.result - this.state.result : parseInt(this.state.firstChoice) - parseInt(this.state.secondChoice),
      }, () => {});
    }

    // 0 * 0
    if (this.state.symbol === "x") {
      this.setState({
        result: !this.state.firstChoice ? 
        this.state.result * this.state.result : parseInt(this.state.firstChoice) * parseInt(this.state.secondChoice),
        resultToShow: !this.state.firstChoice ? 
        this.state.result * this.state.result : parseInt(this.state.firstChoice) * parseInt(this.state.secondChoice),
      }, () => {});
    }

    // 0 / 100
    if (this.state.symbol === "%") {
      this.setState({
        result: parseInt(this.state.firstChoice) / 100,
        resultToShow: parseInt(this.state.firstChoice) / 100,
      }, () => {});
    }

    // 0 / 0
    if (this.state.symbol === "÷") {
      this.setState({
        result: !this.state.firstChoice && !this.state.secondChoice ? 
          this.state.result / this.state.result : parseInt(this.state.firstChoice) / parseInt(this.state.secondChoice),
        resultToShow: !this.state.firstChoice && !this.state.secondChoice ? 
        this.state.result / this.state.result : parseInt(this.state.firstChoice) / parseInt(this.state.secondChoice),
      }, () => {});
    }

    // +/- 0
    if (this.state.symbol === "±") {
      this.setState({
        result: parseInt(this.state.firstChoice) * -1,
        resultToShow: parseInt(this.state.firstChoice) * -1,
      }, () => {});
    }
    this.setState({
      symbol: null,
      firstChoice: null,
      secondChoice: null
    }, () => {});
  }

  onBtnClick = (value) => {
    const regExSymbol = /[\+\-\x\÷]/;
    const regExNumbers = /(?:\d+(?:\.\d*)?|\.\d+)/;

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
          firstChoice: value,
          resultToShow: value
        }, () => {});

      // { firstChoice: 111111, secondChoice: null, symbol: null, result: 0, resultToShow: 111111 }
      } else if (this.state.firstChoice && !this.state.symbol) {
        this.setState({
          firstChoice: this.state.firstChoice === 0 ? value : this.state.firstChoice + value,
          resultToShow: this.state.resultToShow === 0 ? value : this.state.resultToShow + value
        }, () => {});

        // { firstChoice: 0, secondChoice: null, symbol: "+", result: 0, resultToShow: 0 }
      } else if ((this.state.firstChoice && !this.state.secondChoice) && this.state.symbol) {
        this.setState({
          secondChoice: value,
          resultToShow: value
        }, () => {});

        // { firstChoice: 11111, secondChoice: 11111, symbol: "+", result: 0, resultToShow: 111111 }
      } else if ((this.state.firstChoice && this.state.secondChoice) && this.state.symbol) {
        this.setState({
          secondChoice: this.state.secondChoice === 0 ? value : this.state.secondChoice + value,
          resultToShow: this.state.resultToShow === 0 ? value : this.state.resultToShow + value
        }, () => {});

        // { firstChoice: null, secondChoice: null, symbol: "+", result: 0, resultToShow: 0 }
      } else if ((!this.state.firstChoice && !this.state.secondChoice) && this.state.symbol) {
        this.setState({
          firstChoice: this.state.result,
          secondChoice: value,
          resultToShow: value
        }, () => {})

      // { firstChoice: null, secondChoice: 11111, symbol: "+", result: 0, resultToShow: 11111 }
      } else if ((!this.state.firstChoice && this.state.secondChoice) && this.state.symbol) {
        this.setState({
          secondChoice: this.state.secondChoice === 0 ? value : this.state.secondChoice + value,
          resultToShow: this.state.resultToShow === 0 ? value : this.state.resultToShow + value
        }, () => {});
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
        this.setState({
          firstChoice: this.state.result,
          symbol: value
        }, () => {});

        // { firstChoice: 0, secondChoice: null, symbol: "%", result: 0, resultToShow: 0 }
      } else if (this.state.firstChoice) {
        this.setState({
          symbol: value
        }, () => {});
      }

      // { firstChoice: null, secondChoice: null, symbol: "=", result: 0, resultToShow: 0 }
    } else if (value === "=") {
      this.calculate();

      // { firstChoice: 0.0, secondChoice: null, symbol: null, result: 0, resultToShow: 0 }
    } else if (value === ".") {
      this.setState({
        firstChoice: this.state.firstChoice + value,
        resultToShow: this.state.resultToShow + value
      }, () => {console.log(this.state)});
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
