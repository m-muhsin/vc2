"use strict";// Tells the browser to evaluate everything we are doing in strict mode

var React = require('react'); // using the commonjs pattern
var Router = require('react-router');
var Link = Router.Link;
var Display = require('../common/display');
var TeacherHome = require('./teacherHome');
var Login = require('./login');

// using ES5
var Teacher = React.createClass({
	//required on any React component
	render: function () {
		return (
			<Display if={this.props.status === 'connected'}>
                <Display if={this.props.member.type === 'teacher'}>
					<TeacherHome emit={this.props.emit} />
				</Display>
				<Display if={this.props.member.type !== 'teacher'}>
					<Login emit={this.props.emit} />
				</Display>
			</Display>
		);
	}
});

module.exports = Teacher;