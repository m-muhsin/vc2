"use strict";

var React = require('react');
var Display = require('../common/display');

// the component that will display questions
var Questions = React.createClass({

    ask: function (question) {
        this.props.emit('ask', question);
    },

    // question represents a single item in questions array, i represents its index
    addQuestion: function (question, i) {
        // different className to adjust on every screen
        // null in place of this - since this is handled on a higher level
        return (
            <div key={i} className="col-xs-12 col-sm-6">
                <span onClick={this.ask.bind(null, question) }>{question.Q}</span>
            </div>
        );
    },

    render: function () {
        return (
            <div className="container-fluid">
                <div className="page-header">
                    <h2 className="heading text-center">Questions</h2>
                </div>
                
                <div id="questions" ref="questions" className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            {this.props.questions.map(this.addQuestion) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Questions;