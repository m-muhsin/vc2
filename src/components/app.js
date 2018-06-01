/*eslint-disable strict */ //Disabling check because we can't run strict mode. Need global vars.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var io = require('socket.io-client');
var Header = require('./common/header');
var Footer = require('./common/footer');

var App = React.createClass({

    // initializing state variables - we must keep the state variables in sync between the client and the server
    getInitialState: function () {
        return {
            status: 'disconnected', // to manage connections status
            member: {}, // holds data of one member - the user of this socket
            students: [], // holds data of all students
            teacher: '', // the teacher - same for everyone's socket
            questions: [], // array to store questions
            currentQuestion: false, // stores the question asked by teacher
            results: {}, // object to hold the answers from students
            fulltitle: 'Waiting for teacher',
            rightAnswer: ''
        };
    },

    // defining socket behaviour
    // all incoming data from the server will be added to these listeners
    componentWillMount: function () {
        this.socket = io(); //this refers to an instance of the App component
        this.socket.on('connect', this.connect); // when a socket connects
        this.socket.on('disconnect', this.disconnect); // when a socket disconnects
        this.socket.on('welcome', this.updateState); // event emitted by app-server when a socket connects
        this.socket.on('joined', this.joined); // emitted by app-server on 'join'
        this.socket.on('loggedin', this.loggedin); // emitted by app-server on 'login'
        this.socket.on('loggedout', this.loggedout); // emitted by app-server on 'login'
        this.socket.on('students', this.updateStudents); // emitted to all sockets by app-server on 'join'
        this.socket.on('start', this.start); // when a teacher connects - emitted by JoinTeacherForm component
        this.socket.on('end', this.updateState); // when a teacher disconnects - emitted by app-server
        this.socket.on('ask', this.ask); // when the teacher asks a question
        this.socket.on('results', this.updateResults); // when a student answers a question
        this.socket.on('teacheranswered', this.setRightAnswer);
        this.getAllQuestions();
    },

    // gets all questions from API
    getAllQuestions: function () {
        $.ajax({
            url: '/allquestions',
            dataType: 'json',
            context: this,
            success: function (data) {
                if (this.isMounted()) {
                    this.setState({ questions: data });
                }
            },
            error: function () {
                if (this.isMounted()) {
                    this.setState({ loading: false, error: true });
                }
            }
        });
    },

    // the function that we are passing to the child component
    // all outgoing data to the server will come through here 
    emit: function (eventName, payload) {
        // when child or child's child component emits an event, this will actually get called
        this.socket.emit(eventName, payload);
    },

    connect: function () {
        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null; // short-hand if-else
        var fulltitle = (sessionStorage.fulltitle) ? sessionStorage.fulltitle : null;
        console.log('fulltitle: ' + fulltitle);
        console.log('member: ');
        console.log(member);
        if (member && member.type === 'student') {
            this.emit('join', member); // join is handled in app-server
        } else if (member && member.type === 'teacher') {
            this.emit('relogin', { member: member, fulltitle: fulltitle }); // start is handled in app-server
        }

        // changing state value - calling setState will automatically re invoke render
        this.setState({ status: 'connected' });
    },

    disconnect: function () {
        this.setState({
            status: 'disconnected',
            teacher: '',
            fulltitle: 'Disconnected'
        });
    },

    updateState: function (serverState) {
        // updating status, title, member, students, teacher, questions
        this.setState(serverState);
    },

    loggedin: function (loginTeacher, fulltitle) {

        sessionStorage.member = JSON.stringify(loginTeacher); // using sessionStorage to save info about connected member
        if (fulltitle) {
            sessionStorage.fulltitle = fulltitle;
            this.setState({
                fulltitle: fulltitle
            });
        }
        this.setState({
            member: loginTeacher,
            teacher: loginTeacher.name
        });
    },

    loggedout: function (teacher) {
        if (this.state.member.type === 'teacher') {
            this.state.member = {};
            sessionStorage.clear();
        }
        console.log('loggedout');
        this.setState({
            teacher: '',
            fulltitle: 'Waiting for teacher'
        });
    },

    joined: function (member) {
        console.log('joined');
        console.log(member);
        sessionStorage.member = JSON.stringify(member); // using sessionStorage to save info about connected member
        this.setState({ member: member }); // setting state variable member to one now created
    },

    updateStudents: function (newStudents) { // updating students array in state
        this.setState({ students: newStudents });
    },

    start: function (presentation) {
        console.log('presentation');
        console.log(presentation);
        if (this.state.member.type === 'teacher') {
            sessionStorage.fulltitle = presentation.fulltitle; // saving presentation title to session

        }
        this.setState({ fulltitle: presentation.fulltitle });
    },

    ask: function (question) {
        sessionStorage.answer = ''; // clears session when new question is asked
        this.setState({ currentQuestion: question, rightAnswer: '', results: { A: 0, B: 0, C: 0, D: 0 } });
    },

    updateResults: function (data) {
        this.setState({ results: data });
    },

    setRightAnswer: function (data) {
        this.setState({ rightAnswer: data });
    },
    // serving the page to user - RouteHandler will be the route i.e. student, teacher, scoreboard etc.
    // emit allows the functions such as join to be triggered
    // {...this.state} - spread operator, which passes the entire state down to the RouteHandler
    render: function () {
        return (
            <div>
                <Header {...this.state} />
                <div className="container-fluid">
                    <RouteHandler emit={this.emit} {...this.state} />
                </div>
                <Footer status={this.state.status} />
            </div>
        );
    }
});

module.exports = App;