import React from "react";
import {isDisabled} from "@testing-library/user-event/dist/utils";

export class Number extends React.Component {
    static defaultProps = {
        min : 1,
        max : 1000,
        info : ' ',
        attemptAmount : 10,
        result : '',
    };
    constructor(props) {
        super(props);
        this.state = {
            value : props.value,
            min : props.min,
            max : props.max,
            info : props.info,
            attemptAmount : props.attemptAmount,
            result : props.result,
        };
        this.handleNewGame = this.handleNewGame.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }

    componentDidMount() {
        document.getElementById('check').disabled = true;
    }

    componentWillUnmount() {
    }

    handleNewGame() {
        document.getElementById('newGame').disabled = true
        document.getElementById('check').disabled = false
        this.setState(
            (state, props) => {
                return {
                    info : props.info,
                    attemptAmount : props.attemptAmount,
                    result : props.result,
                    value: Math.floor(Math.random() * (1000 - 1 + 1)) + 1
                };
            }
        )
    }

    handleCheck() {
        this.setState(
            (state, props) => {
                this.showInfo()
                if (parseInt(document.getElementById('getNumber').value)===state.value
                    && state.attemptAmount>0) {
                    document.getElementById('newGame').disabled = false;
                    document.getElementById('check').disabled = true;
                    return {
                        result : 'You win'
                    };
                }

                if (parseInt(document.getElementById('getNumber').value)!==state.value
                && state.attemptAmount===1) {
                    document.getElementById('newGame').disabled = false;
                    document.getElementById('check').disabled = true;
                    return {
                        result : 'Game over'
                    };
                }
            }
        )
    }

    showInfo() {
        this.setState(
            (state, props) => {
                if (parseInt(document.getElementById('getNumber').value) < state.value
                    && state.attemptAmount>0) {
                    return {
                        info: this.state.info + 'N > ' + document.getElementById('getNumber').value + ' ',
                        attemptAmount : state.attemptAmount - 1,
                    }
                }
                if (parseInt(document.getElementById('getNumber').value) > state.value
                    && state.attemptAmount>0) {
                    return {
                        info: this.state.info + 'N < ' + document.getElementById('getNumber').value.toString() + ' ',
                        attemptAmount : state.attemptAmount - 1,
                    }
                }
            }
        )
    }

    render() {
        return (
            <div class="container">
                <button type="button" class="bp4-button bp4-outlined bp4-large" id='newGame' onClick={this.handleNewGame}>New Game</button>
                <input type="number" id="getNumber" class="bp4-input"/>
                <button type="button" class="bp4-button bp4-outlined bp4-large" id='check' onClick={this.handleCheck}>Check</button>
                <div class="container_info">
                    <div>Information: {this.state.info}</div>
                    <div>Attempts: {this.state.attemptAmount}</div>
                    <div>Result: {this.state.result}</div>
                </div>
            </div>
        )
    }
}