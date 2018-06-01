"use strict";/*eslint no-script-url: 0, no-undef: 0*/

var React = require('react'); // using the commonjs pattern
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var SignUp = React.createClass({
    mixins: [Navigation],
    
    signup: function (e) {
        e.preventDefault();
        var newTeacher = {
            // _id: React.findDOMNode(this.refs._id).value,
            username: React.findDOMNode(this.refs.username).value,
            password: React.findDOMNode(this.refs.password).value,
            title: React.findDOMNode(this.refs.title).value,
            fname: React.findDOMNode(this.refs.fname).value,
            lname: React.findDOMNode(this.refs.lname).value
            
        };
        if (!newTeacher.username || !newTeacher.password || !newTeacher.title || !newTeacher.fname || !newTeacher.lname ) {
            toastr.error('Please fill all fields');
            return;
        }
        var nt = JSON.stringify(newTeacher);
        self = this;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8", // Try to add this
            url: '/signup',
            data: nt,
            success: function (response) {
                if (response.success) {
                    self.transitionTo("teacher");
                    toastr.success(response.message);
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (err) {
                toastr.error('Something went wrong: ' + err);
            }
        });
        // this.transitionTo("teacher");
    },
    
    render: function () {
        return (
            // className instead of class since class is a reserved word in JS
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4 col-xs-10 col-xs-offset-1">
                        <h3 className="heading text-center">VC2</h3>
                        <h4 className="heading text-center">SIGN UP</h4>

                        <form className="form-horizontal">

                            <div className="form-group">
                                <label htmlFor="username" className="control-label">Username</label>
                                <input ref="username" type="text" placeholder="Username..." className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="control-label">Password</label>
                                <input ref="password" type="password" placeholder="Password..." className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="title" className="control-label">Title</label>
                                <input ref="title" type="title" placeholder="Title..." className="form-control" />
                            </div>                            
                            <div className="form-group">
                                <label htmlFor="fname" className="control-label">First Name</label>
                                <input ref="fname" type="text" placeholder="First Name..." className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lname" className="control-label">Last Name</label>
                                <input ref="lname" type="text" placeholder="Last Name..." className="form-control" />
                            </div>
                            
                            <Link to="loginteacher" className="btn btn-primary" >Log In</Link>
                            <button id="signup" onClick={this.signup} className="btn btn-success pull-right" >Sign Up</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SignUp;