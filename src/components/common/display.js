"use strict";

var React = require('react');

var Display = React.createClass({
    // a reusable component - to display items when a condition is true
    // (condition) ? "true" : "false";
    // {this.props.children} is a reference to the child components
	render: function() {
		return (this.props.if) ? <div>{this.props.children}</div> : null;
	}
});

module.exports = Display;