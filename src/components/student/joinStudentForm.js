"use strict";/*eslint no-script-url: 0, no-undef: 0*/
// to ignore form action url error

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

// form for student details when joining
// TODO - login auth
var JoinStudentForm = React.createClass({

    // invoked when the form is submitted
    join: function () {
        var memberName = React.findDOMNode(this.refs.name).value; // from the input tag in form
        if (!memberName) {
            toastr.error('Please fill all fields');
            return;
        }
        this.props.emit('join', { name: memberName }); // emitting a 'join' event - passing audience name to app-server
        toastr.success('Welcome to the lecture!');
    },

    // action="javascript:void(0)" - won't do anything like server side postback when we submit the form
    render: function () {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h3 className="heading text-center">Welcome to the class!</h3> <br />


                        <form action="javascript:void(0)" onSubmit={this.join} className="form-horizontal">

                            <div className="form-group">
                                <label htmlFor="name" className="control-label">Full Name</label>
                                <input type="text" ref="name" placeholder="Enter your full name" className="form-control" />
                            </div>

                            <button id="login" className="btn btn-primary btn-block">JOIN CLASS</button>

                        </form>

                    </div>
                </div>
            </div>
        );
    }

});

module.exports = JoinStudentForm;