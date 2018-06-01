"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

//running the router
Router.run(routes, function(Handler) { // Handler will refer to student, teacher, board etc...
	React.render(<Handler />, document.getElementById('app'));
});