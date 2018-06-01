"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	render: function() {
		return (
            <div className="container">
				
				<div className="row">
					<div className="col-xs-6 col-xs-offset-3"></div>
					<div className="col-xs-6 col-xs-offset-3">
                        <div className="page-header">
                            <h1>404 Page Not Found</h1>
                        </div>
                        <h2>Sorry there is nothing special here</h2>
						<p><Link to="app">Back to VC2 Home</Link></p>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = NotFoundPage;