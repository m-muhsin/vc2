"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
	<Route name="app" path="/" handler={require('./components/app')}>
		<DefaultRoute handler={require('./components/homePage')} />
		<Route name="student" handler={require('./components/student/joinStudent')} />
		<Route name="teacher" handler={require('./components/teacher/teacher')} />
		<Route name="jointeacher" handler={require('./components/teacher/joinTeacher')} />
		<Route name="loginteacher" handler={require('./components/teacher/login')} />
		<Route name="signupteacher" handler={require('./components/teacher/signup')} />
		<Route name="editteacher" handler={require('./components/teacher/editTeacher')} />
		<Route name="addquestion" handler={require('./components/teacher/addQuestion')} />
		<Route name="scoreboard" handler={require('./components/scoreboard/scoreboard')} />
		<NotFoundRoute handler={require('./components/notFoundPage')} />
	</Route>
);

module.exports = routes;