"use strict";

var React = require('react');
var Display = require('../common/display');
var JoinStudentForm = require('./joinStudentForm');
var Ask = require('./ask');
var Counter = require('../common/counter');

// screen to join a student
var JoinStudent = React.createClass({
	render: function () {
        // using the Display component
        // nothing will appear if the socket is disconnected
		return (
			<div>
				<Display if={this.props.status === 'connected'}>

					<Display if={this.props.member.name && this.props.member.type === 'student'}>

						<Counter students={this.props.students} results={this.props.results} /><br />
                        <Display if={!this.props.currentQuestion}>


							<div className="page-header">
								<h2 className="heading text-center">Hello {this.props.member.name}!</h2>
							</div>
								<h4 className="heading">Questions will appear here.</h4>

                        </Display>

                        <Display if={this.props.currentQuestion}>
                            <Ask rightAnswer={this.props.rightAnswer} question={this.props.currentQuestion} emit={this.props.emit} />
                        </Display>

                    </Display>

					<Display if={!this.props.member.name}>
						<JoinStudentForm emit={this.props.emit} />
					</Display>

				</Display>
			</div>
		);
	}
});

module.exports = JoinStudent;