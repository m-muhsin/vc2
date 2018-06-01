"use strict";

var React = require('react');
var Display = require('../common/display');
//var _ = require('lodash'); // to search in arrays etc.

var Ask = React.createClass({

    getInitialState: function () {
        return {
            choices: [], // to hold the choices 
            answer: undefined // to hold student's selection
        };
    },

    componentWillMount: function () { 
        this.setUpChoices();
    },

    // since choices was a null array
    componentWillReceiveProps: function () { // when any props change
        this.setUpChoices();
    },

    setUpChoices: function () { // doing dynamically to allow more than 4 choices
        var choices = Object.keys(this.props.question); // q, a, b, c, d
        choices.shift(); // a, b, c, d
        choices.pop(); // a, b, c, d
        this.setState({
            choices: choices,
            answer: sessionStorage.answer // in case the student refreshes after answering a question
        });
    },

    select: function (choice) { // gets the student's choice and emits an event
        this.setState({ answer: choice }); // storing current choice to state variable answer
        sessionStorage.answer = choice; // storing current choice to session
        this.props.emit('answer', { // will be handled in app-server
            question: this.props.question,
            choice: choice
        });
    },

    addChoiceButton: function (choice, i) { // current choice and its index
        var divStyle = {
            width: '100%',
            margin: '5px',
            padding: '10px 0'
        };

        return (
            <div key={i}
                className="col-xs-12 col-sm-6" >
                <button
                    className="btn btn-primary" style={divStyle} type="button"
                    onClick={this.select.bind(null, choice) }>
                    {choice}: {this.props.question[choice]}
                </button>
            </div>
        );
    },

    render: function () {
        return (
            <div id="currentQuestion">

                <Display if={this.state.answer}>

                    <h3 className="heading margin-top-4x">{this.props.question.Q}</h3>
                    <h4>You answered: </h4>
                    <button
                        className="btn btn-primary" type="button">
                        {this.state.answer}: {this.props.question[this.state.answer]}
                    </button>

                    <Display if={this.props.rightAnswer}>
                        <h4>The right answer is: </h4>
                        <button
                            className="btn btn-success" type="button">
                            {this.props.rightAnswer}: {this.props.question[this.props.rightAnswer]}
                        </button>
                    </Display>

                </Display>

                <Display if={!this.state.answer}>
                    <h3 className="heading margin-top-4x">{this.props.question.Q}</h3>
                    <div className="well">
                        <div className="row">
                            {this.state.choices.map(this.addChoiceButton) }
                        </div>
                    </div >
                </Display>

            </div>
        );
    }

});

module.exports = Ask;