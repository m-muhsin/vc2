"use strict";/*eslint no-script-url: 0*/
// to ignore form action url error

var React = require('react');

// form for teacher to join and manage class
var JoinTeacherForm = React.createClass({

    start: function () {
        // var teacherName = React.findDOMNode(this.refs.name).value;
        var lectureTitle = React.findDOMNode(this.refs.lectureTitle).value;
        this.props.emit('start', { lectureTitle: lectureTitle });
    },

    render: function () {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h3 className="heading text-center">Start the lecture!</h3> <br />

                        <form action="javascript:void(0)" onSubmit={this.start} className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="lectureTitle" className="control-label">Lecture Title</label>
                                <input type="text" ref="lectureTitle" placeholder="Enter a title for this Lecture" className="form-control" />
                            </div>
                            <button className="btn btn-primary btn-block">START CLASS</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }

});

module.exports = JoinTeacherForm;