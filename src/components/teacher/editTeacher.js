"use strict";/*eslint no-script-url: 0, no-undef: 0*/

var React = require('react'); // using the commonjs pattern
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var EditTeacher = React.createClass({

    componentDidMount: function () {
        var _id = this.props.member._id;
        console.log('_id ');
        console.log(_id);
        self = this;
        if (_id) {
            $.ajax({
                type: "GET",
                // contentType: "application/json; charset=utf-8", // Try to add this
                url: '/teacher/' + _id,

                success: function (response) {
                    console.log('response');
                    console.log(response);
                    var res = response[0];
                    // if (response.success) {
                    React.findDOMNode(self.refs._id).value = res._id;
                    React.findDOMNode(self.refs.username).value = res.username;
                    React.findDOMNode(self.refs.password).value = res.password;
                    React.findDOMNode(self.refs.title).value = res.title;
                    React.findDOMNode(self.refs.fname).value = res.fname;
                    React.findDOMNode(self.refs.lname).value = res.lname;
                    // } else {
                    //     toastr.error(response.message);
                    // }
                },
                error: function (err) {
                    toastr.error('Something went wrong: ' + err);
                }
            });
        }
    },
    mixins: [Navigation],

    update: function (e) {
        e.preventDefault();
        var newTeacher = {
            _id: React.findDOMNode(this.refs._id).value,
            username: React.findDOMNode(this.refs.username).value,
            password: React.findDOMNode(this.refs.password).value,
            title: React.findDOMNode(this.refs.title).value,
            fname: React.findDOMNode(this.refs.fname).value,
            lname: React.findDOMNode(this.refs.lname).value

        };
        if (!newTeacher.username || !newTeacher.password || !newTeacher.title || !newTeacher.fname || !newTeacher.lname) {
            toastr.error('Please fill all fields');
            return;
        }
        var nt = JSON.stringify(newTeacher);
        self = this;

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8", // Try to add this
            url: '/updateteacher',
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
                        <h3 className="heading text-center">Check your profile</h3>
                        
                        <form className="form-horizontal">
                            <input ref="_id" type="hidden"/>
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

                            <button id="update" onClick={this.update} className="btn btn-success pull-left" >Update</button>
                            <Link to="teacher" className="btn btn-danger pull-right" >Cancel</Link>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = EditTeacher;