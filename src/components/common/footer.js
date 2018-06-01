"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Footer = React.createClass({

    render: function() {
        return (
            <footer className={"footer " + this.props.status}>
                <div className="container">
                </div>
            </footer>
        );
    }
});

module.exports = Footer;