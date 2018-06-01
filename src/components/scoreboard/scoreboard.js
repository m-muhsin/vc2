"use strict";// Tells the browser to evaluate everything we are doing in strict mode

var React = require('react'); // using the commonjs pattern
var Display = require('../common/display');
var BarChart = require('react-d3').BarChart;
var Counter = require('../common/counter');

// using ES5
var Scoreboard = React.createClass({

    barGraphData: function (results) {
        return Object.keys(results).map(function (choice) {
            return {
                label: choice,
                value: results[choice]
            };
        });
    },
    
    //required on any React component
    render: function () {
        return (
            // className instead of class since class is a reserved word in JS
            <div className="container score-container" id="scoreboard">
                <Counter students={this.props.students} results={this.props.results} />
                <div className="page-header">
                    <h2 className="heading text-center">VC2 Scoreboard</h2>
                </div>
                <div>
                    <Display if={this.props.status === 'connected' && this.props.currentQuestion}>
                        <BarChart data={this.barGraphData(this.props.results) }
                            title={this.props.currentQuestion.Q}
                            height={window.innerHeight * 0.7}
                            width={window.innerWidth * 0.9} />
                    </Display>

                    <Display if={this.props.status === 'connected' && !this.props.currentQuestion}>
                        <h3>Waiting for a question</h3>
                    </Display>
                </div>



            </div>
        );
    }
});

module.exports = Scoreboard;