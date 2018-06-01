"use strict";

var React = require('react');
var Display = require('../common/display');
var JoinTeacherForm = require('./joinTeacherForm');
var Attendance = require('./attendance');
var Questions = require('./questions');
var Asked = require('./asked');
var Counter = require('../common/counter');

// screen for teacher to join and create/manage the class
var JoinTeacher = React.createClass({
	render: function () {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>
					<Counter students={this.props.students} results={this.props.results} />
					<Display if={this.props.fulltitle !== "Waiting for teacher"}>
						<Questions questions={this.props.questions} emit={this.props.emit} />
						<Display if={this.props.currentQuestion}>
                            <Asked question={this.props.currentQuestion} emit={this.props.emit} />
                        </Display>
						<Attendance students={this.props.students} results={this.props.results} />
					</Display>

					<Display if={this.props.fulltitle === 'Waiting for teacher'}>
						<JoinTeacherForm emit={this.props.emit} />
					</Display>

				</Display>
			</div>
		);
	}
});

module.exports = JoinTeacher;