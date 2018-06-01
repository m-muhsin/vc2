"use strict";

var express = require('express'); // routing library for server side
var _ = require('lodash'); // to search in arrays etc.
var app = express();

var connections = []; // array to hold all connected sockets
var lectureTitle = ''; // title of the lecture
var fulltitle = 'Waiting for teacher';
var students = []; // array to hold all students
var teacher = {}; // teacher object - the teacher
var questionApi = require('./src/api/questionApi');
var loginApi = require('./src/api/loginApi');
var currentQuestion = false; // stores the question asked by teacher
var results = { // object to hold the answers from students
    A: 0,
    B: 0,
    C: 0,
    D: 0
};
var rightAnswer = '';

app.use(express.static('./dist')); // serves files from this location
app.use(questionApi); // body-parser is a dependency here
app.use(loginApi); // affects here as well

app.set('port', 3000);

var server = app.listen(app.get('port')); // node server listens to this port
var io = require('socket.io').listen(server); // creating socket server, which also listens on 3000

// when there is a socket connection
io.sockets.on('connection', function (socket) {

    // when a socket gets disconnected
    socket.once('disconnect', function () {

        var member = _.find(students, { id: this.id }); // to find the socket that just disconnected

        if (member) { // if socket is an students
            students.splice(students.indexOf(member), 1);
            io.sockets.emit('students', students); // broadcasting an event to all the sockets
            console.log("Left: %s (%s students members)", member.name, students.length);
        } else if (this.id === teacher.id) { // if socket is a teacher
            console.log("%s has left. '%s' is over.", teacher.name, lectureTitle);
            teacher = {};
            lectureTitle = '';
            fulltitle = 'Waiting for teacher';
            io.sockets.emit('end', { fulltitle: fulltitle, teacher: '' });
        }

        connections.splice(connections.indexOf(socket), 1); // removing socket from connections array
        socket.disconnect(); // to ensure the server fully disconnects the socket
        console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    // when a member connects - emitted by JoinStudentForm component
    socket.on('join', function (payload) {
        var newMember = {
            id: this.id, // this refers to the current socket
            name: payload.name,
            type: 'student'
        };
        this.emit('joined', newMember); // broadcasted to current socket
        students.push(newMember);
        io.sockets.emit('students', students); // broadcasting an event to all the sockets
        console.log("Student Joined: %s", payload.name);
    });

    // when the teacher logs in - emitted by Login component
    socket.on('login', function (payload) {
        var newTeacher = {
            id: this.id,
            _id: payload._id,
            name: payload.title + ' ' + payload.fname + ' ' + payload.lname,
            type: 'teacher',
        }
        teacher = newTeacher;
        console.log("Login successful: %s", teacher.name);
        this.emit('loggedin', teacher);

    });

    socket.on('logout', function () {
        console.log("Logging out %s", teacher.name);

        fulltitle = 'Waiting for teacher';
        io.sockets.emit('loggedout', teacher);
        teacher = {};

    });

    socket.on('relogin', function (oldTeacher) {

        teacher = oldTeacher.member;
        fulltitle = oldTeacher.fulltitle;
        this.emit('loggedin', teacher, fulltitle);
        console.log("Re Login successful: %s", teacher.name);
    });

    // when a (teacher) teacher connects - emitted by JoinTeacherForm component
    socket.on('start', function (payload) {
        //teacher.name = payload.name
        //teacher.id = this.id;
        //teacher.type = 'teacher';
        lectureTitle = payload.lectureTitle;
        fulltitle = lectureTitle + ' by ' + teacher.name;
        io.sockets.emit('start', { fulltitle: fulltitle });
        console.log("Presentation Started: '%s' by %s", lectureTitle, teacher);
    });

    socket.on('ask', function (question) {
        currentQuestion = question;
        results = { A: 0, B: 0, C: 0, D: 0 };
        io.sockets.emit('ask', currentQuestion); // broadcasting to all connected sockets
        console.log("Question Asked: '%s'", question.Q);
    });

    socket.on('answer', function (payload) { // emitted when a student a question
        results[payload.choice]++; // results[a] will be be +1 if someone answers a
        io.sockets.emit('results', results); // broadcast event when users answer a question
        console.log("Answer: '%s' - %j", payload.choice, results); //%j represents a json object
    });

    socket.on('teacheranswer', function (payload) { // 
        rightAnswer = payload.choice; // 
        io.sockets.emit('teacheranswered', rightAnswer); // 
        console.log(" The right answer is: %s", rightAnswer); //
    });

    // send welcome event with the lectureTitle - default is '[Untitled]'
    socket.emit('welcome', {
        students: students,
        teacher: teacher.name,
        //questions: questions,
        currentQuestion: currentQuestion, // so that students get the question even if they connect in the middle of a question
        results: results, // sending the results to any newly connected sockets - the board
        fulltitle: fulltitle
    });

    // add connected socket to connections array
    connections.push(socket);
    console.log("Connected: %s sockets connected.", connections.length);
});

// getting the IP address of Server
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('VC2 server is running at http://:%s:%s', add, app.get('port'));
});