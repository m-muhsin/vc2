"use strict";

var React = require('react');
var io = require('socket.io-client');

// maintains student count
var Counter = React.createClass({

    getInitialState: function () {
        return {
            resultsCount: 0
        };
    },

    componentWillMount: function () {
        this.socket = io();
        this.socket.on('results', this.updateResultsCount);
        this.socket.on('ask', this.resetResultsCount);
    },

    updateResultsCount: function (data) {
        console.log('results: ');
        console.log(data);
        var newCount = data.A + data.B + data.C + data.D;
        this.setState({ resultsCount: newCount });
    },
    
    resetResultsCount: function () {
        this.setState({ resultsCount: 0 });
    },
    
    render: function () {
        var divStyle = {
            paddingBottom: '10px'
        };
        return (
            <div>
               
                <div>
                    <div state={divStyle} className="heading pull-right">
                        <h4>
                            <span className="badge">{this.props.students.length}</span> students
                            &nbsp;&nbsp;<span className="badge">{this.state.resultsCount}</span> answers
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Counter;