"use strict";// Tells the browser to evaluate everything we are doing in strict mode

var React = require('react'); // using the commonjs pattern
var Router = require('react-router');
var Link = Router.Link;

// using ES5
var Home = React.createClass({
	//required on any React component
	render: function () {
		return (
			// className instead of class since class is a reserved word in JS
			<div className="container">

				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<div className="page-header">
							<h2 className="heading text-center">Welcome to VC2</h2>
						</div>
						<p>
							<Link to="student" className="btn btn-success btn-lg btn-block">Student</Link>
						</p>
						<p>
							<Link to="teacher" className="btn btn-primary btn-lg btn-block">Teacher</Link>
						</p>
						<p>
							<Link to="scoreboard" className="btn btn-danger btn-lg btn-block">Scoreboard</Link>
						</p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Home;