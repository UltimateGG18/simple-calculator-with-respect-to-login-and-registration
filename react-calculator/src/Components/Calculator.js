import React, { Component } from 'react';
import '../Styles/Calculator.css';
import ResultComponent from './ResultComponent';
import KeyPadComponent from "./KeyPadComponent";
import { withRouter } from 'react-router-dom';

class Calculator extends Component {
    constructor(){
        super();

        this.state = {
            result: ""
        }
    }

    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    goToHome = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1 style ={{color : "#192f60",fontFamily: "Poppins" }}>Simple Calculator</h1>
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                    <div style ={{color : "green",fontFamily: "Poppins",marginTop:"10%" }} onClick ={this.goToHome}>Go To Home</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Calculator);