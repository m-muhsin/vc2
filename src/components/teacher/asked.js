"use strict";

var React = require('react');
var Display = require('../common/display');
var io = require('socket.io-client');

var Asked = React.createClass({

    getInitialState: function () {
        return {
            choices: [], // to hold the choices 
            rightAanswer: undefined // to hold student's selection
        };
    },

    componentWillMount: function () { // when any props change
        this.setUpChoices();
        this.socket = io();
        this.socket.on('ask', this.resetRightAnswer);
    },
    resetRightAnswer: function () {
        this.setState({ rightAanswer: '' }); // storing current choice to state variable answer
        sessionStorage.rightAanswer = ''; // storing current choice to session
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
            rightAanswer: sessionStorage.rightAanswer // in case the student refreshes after answering a question
        });
    },

    select: function (choice) { // gets the student's choice and emits an event
        this.setState({ rightAanswer: choice }); // storing current choice to state variable answer
        sessionStorage.rightAanswer = choice; // storing current choice to session
        this.props.emit('teacheranswer', { // will be handled in app-server
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
            
            <div className="container-fluid" id="currentQuestion">

                <Display if={this.state.rightAanswer}>
                    <h3>{this.props.question.Q}</h3>
                    <h4>The right answer is: </h4>
                    <button
                        className="btn btn-success" type="button">
                        {this.state.rightAanswer}: {this.props.question[this.state.rightAanswer]}
                    </button>
                </Display>

                <Display if={!this.state.rightAanswer}>
                    <h3>{this.props.question.Q}</h3>
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

module.exports = Asked;