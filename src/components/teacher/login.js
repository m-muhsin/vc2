"use strict";/*eslint no-script-url: 0, no-undef: 0*/

var React = require('react'); // using the commonjs pattern
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var Login = React.createClass({
    mixins: [Navigation],

    login: function (e) {

        e.preventDefault();
        var teacher = {
            // _id: React.findDOMNode(this.refs._id).value,
            username: React.findDOMNode(this.refs.username).value,
            password: React.findDOMNode(this.refs.password).value
        };
        if (!teacher.username || !teacher.password ) {
            toastr.error('Please fill all fields');
            return;
        }
        var t = JSON.stringify(teacher);
        self = this;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: '/login',
            data: t,
            success: function (response) {
                if (response.success) {
                    console.dir(response);
                    var res = response.data[0];
                    self.props.emit('login', res);
                    toastr.success(response.message);
                    // self.transitionTo("teacher");
                } else {
                    toastr.error(response.message);
                }
            },
            error: function (err) {
                toastr.error('Something went wrong. ' + err);
            }
        });
        // this.transitionTo("teacher");
    },

    //required on any React component
    render: function () {
        return (
            // className instead of class since class is a reserved word in JS
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4 col-xs-10 col-xs-offset-1">
                        <h3 className="heading text-center">VC2</h3>
                        <h4 className="heading text-center">LOG IN</h4>

                        <form className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="username" className="control-label">Username</label>
                                <input type="text" ref="username" placeholder="Username..." className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pasword" className="control-label">Password</label>
                                <input type="password" ref="password" placeholder="Password..." className="form-control" />
                            </div>
                            <button id="login" onClick={this.login} className="btn btn-primary">Log In</button>
                            <Link to="signupteacher" className="btn btn-success pull-right" >Sign Up</Link>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;