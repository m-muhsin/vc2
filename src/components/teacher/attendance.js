"use strict";

var React = require('react');
var Counter = require('../common/counter');

// maintains student attendance in a table shown to teacher
var Attendance = React.createClass({

    // this function will return a row for each item in the students array
    //member represents one item in audience array, i represents index of that item
	addMemberRow: function (member, i) {
		return (
			<tr key={i}>
				<td>{member.name}</td>
				<td>{member.id}</td>
			</tr>
		);
	},

	render: function () {
		return (
			<div>
				<h2 className="heading text-center" >Participants</h2>
				
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Student Name</th>
							<th>Socket ID</th>
						</tr>
					</thead>
					<tbody>

						{this.props.students.map(this.addMemberRow) }

					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Attendance;