"use strict";/*eslint no-script-url: 0, no-undef: 0*/

var React = require('react');
var Display = require('../common/display');

var AddQuestion = React.createClass({

    save: function (e) {

        e.preventDefault();
        var question = {
            _id: React.findDOMNode(this.refs._id).value,
            Q: React.findDOMNode(this.refs.Q).value,
            A: React.findDOMNode(this.refs.A).value,
            B: React.findDOMNode(this.refs.B).value,
            C: React.findDOMNode(this.refs.C).value,
            D: React.findDOMNode(this.refs.D).value
        };
        if (!question.A || !question.B || !question.C || !question.D) {
            toastr.error('Please fill all fields');
            return;
        }

        var q = JSON.stringify(question);
        self = this;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8", // Try to add this
            url: '/addquestion',
            data: q,
            success: function (response) {
                toastr.success(response.message);
                self.reset();
                var res = response.data;
                res = [].concat(res);
                res = res[0];
                var i = self.props.questions.findIndex(function (eq) {
                    return eq._id === res._id;
                });
                console.log('i: ' + i);
                if (i === -1) {
                    self.props.questions.push(res);
                } else {
                    self.props.questions[i] = res;
                }
                self.forceUpdate();
            },
            error: function (err) {
                console.log('error: ' + err);
            }
        });

    },

    reset: function () {
        React.findDOMNode(this.refs._id).value = "";
        React.findDOMNode(this.refs.Q).value = "";
        React.findDOMNode(this.refs.A).value = "";
        React.findDOMNode(this.refs.B).value = "";
        React.findDOMNode(this.refs.C).value = "";
        React.findDOMNode(this.refs.D).value = "";
    },

    delete: function (e) {
        e.preventDefault();
        var question = {
            _id: React.findDOMNode(this.refs._id).value
        };
        var q = JSON.stringify(question);
        self = this;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/deletequestion',
            data: q,
            success: function (response) {
                toastr.success(response.message);
                self.reset();
                var i = self.props.questions.findIndex(function (eq) {
                    return eq._id === question._id;
                });
                console.log('i: ' + i);
                self.props.questions.splice(i, 1);
                self.forceUpdate();
            },
            error: function (err) {
                console.log('error: ' + err);
            }
        });

    },
    ask: function (question) {
        React.findDOMNode(this.refs.Q).value = question.Q;
        React.findDOMNode(this.refs.A).value = question.A;
        React.findDOMNode(this.refs.B).value = question.B;
        React.findDOMNode(this.refs.C).value = question.C;
        React.findDOMNode(this.refs.D).value = question.D;
        React.findDOMNode(this.refs._id).value = question._id;
    },

    // question represents a single item in questions array, i represents its index
    addQuestion: function (question, i) {
        // different className to adjust on every screen
        // null in place of this - since this is handled on a higher level
        return (
            <div key={i} className="col-xs-12 col-sm-12">
                <span onClick={this.ask.bind(null, question) }>{question.Q}</span>
            </div>
        );
    },
    render: function () {
        return (
            <Display if={this.props.status === 'connected'}>

                <Display if={this.props.member.name && this.props.member.type === 'teacher'}>
                    <div className="container-fluid">
                        <div id="questions" ref="questions" className="row">
                            <div className="col-sm-6">
                                <div className="row">
                                    <h2>Questions</h2>
                                    {this.props.questions.map(this.addQuestion) }
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <h2>Details</h2>
                                </div>
                                <form>
                                    <div className="row">
                                        <input ref="_id" type="hidden" />
                                        <div className="form-group">
                                            <label>Question</label>
                                            <input ref="Q"
                                                className="form-control"
                                                placeholder="Enter question"
                                                required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br />
                                        <div className="form-group">
                                            <label>Choice A</label>
                                            <input ref="A"
                                                className="form-control"
                                                placeholder="Enter a Answer Choice A"
                                                required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br />
                                        <div className="form-group">
                                            <label>Choice B</label>
                                            <input ref="B"
                                                className="form-control"
                                                placeholder="Enter a Answer Choice B"
                                                required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br />
                                        <div className="form-group">
                                            <label>Choice C</label>
                                            <input ref="C"
                                                className="form-control"
                                                placeholder="Enter a Answer Choice C"
                                                required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br />
                                        <div className="form-group">
                                            <label>Choice D</label>
                                            <input ref="D"
                                                className="form-control"
                                                placeholder="Enter a Answer Choice D"
                                                required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <br />
                                        <div className="col-xs-3">
                                            <button id="save" onClick={this.save} className="btn btn-success">Save</button>
                                        </div>
                                        <div className="col-xs-4">
                                            <button id="delete" onClick={this.delete} className="btn btn-danger">Delete</button>
                                        </div>
                                        <div className="col-xs-3">
                                            <button id="delete" onClick={this.reset} className="btn btn-primary">New</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </Display>
            </Display>
        );
    }
});

module.exports = AddQuestion;