"use strict";// Tells the browser to evaluate everything we are doing in strict mode

var React = require('react'); // using the commonjs pattern
var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

// using ES5
var TeacherHome = React.createClass({
    mixins: [Navigation],

	logout: function () {
		this.props.emit('logout', {});
	},
	//required on any React component
	render: function () {
		return (
			// className instead of class since class is a reserved word in JS
			<div className="container">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<div className="page-header">
							<h2 className="heading text-center">VC2 Teacher</h2>
						</div>
						<p>
							<Link to="jointeacher" className="btn btn-success btn-lg btn-block">Create Class</Link>
						</p>
						<p>
							<Link to="addquestion" className="btn btn-primary btn-lg btn-block">Create Questions</Link>
						</p>
						<p>
							<Link to="editteacher" className="btn btn-warning btn-lg btn-block">Check Profile</Link>
						</p>
						<p>
							<button onClick={this.logout} className="btn btn-danger btn-lg btn-block">Log out</button>
						</p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = TeacherHome;