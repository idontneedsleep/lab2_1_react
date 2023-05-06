import React from "react";

export class Number extends React.Component {
    static defaultProps = {
        min : 1,
        max : 1000,
    };
    constructor(props) {
        super(props);
        this.state = {
            value : props.value,
            min : props.min,
            max : props.max,
            result : props.result,
        };
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleNewGame() {
        this.setState(
            (state, props) => {
                return {
                    value: Math.floor(Math.random() * (1000 - 1 + 1)) + 1
                };
            }
        )
    }

    handleCheck() {
        this.setState(
            (state, props) => {
                if (document.getElementById('getNumber').value===this.state.value)
                return {
                    result : 'true'
                };
                else 
                    return {
                        result : 'nuh-uh'
                    }
            }
        )
    }

    render() {
        return (
            <div class="container">
                <button type="button" onClick={this.handleNewGame}>New Game</button>
                <input type="text" id="getNumber"/>
                <button type="button" onClick={this.handleCheck}>Check</button>
                <div>Information:</div>
                <div>Random number {this.state.value}</div>
                <div>Attempts:</div>
                <div>Result:</div>
                <div>{this.state.result}</div>
            </div>
        )
    }
}