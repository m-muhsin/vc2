"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({


    // to close nav collapse when an item is clicked 
    componentDidMount: function () {
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
    },

    render: function () {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed {this.props.status}" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="app" className="navbar-brand">
                            {this.props.fulltitle}
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li><Link to="app">VC2</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="student">Student</Link></li>
                            <li><Link to="teacher">Teacher</Link></li>
                            <li><Link to="scoreboard">Scoreboard</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Header;