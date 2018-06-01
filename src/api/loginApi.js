"use strict";/* eslint no-undef: 0, new-cap: 0 */

var _ = require('lodash'); // a library to make interacting with data sets easier
var express = require('express');
var LoginApi = express.Router();

var Datastore = require('nedb');
var db = {};
db.teachers = new Datastore('data/teachers.db');
db.teachers.loadDatabase();

LoginApi.post('/login', function (req, res) {
    var t = req.body;
    console.log(t);
    db.teachers.find({ "username": t.username, "password": t.password }, function (err, docs) {
        if (err) {
            console.log('err: ' + err);
            res.json({
                success: false,
                message: err
            });
            return;
        }
        if (_.size(docs)) {
            res.json({
                success: true,
                message: 'Login successful!',
                data: docs
            });
            return;
        }
        res.json({
            success: false,
            message: 'Login falied. User not found!'
        });
    });
});

LoginApi.post('/signup', function (req, res) {
    console.log('inside signup');
    var nt = req.body;

    db.teachers.find({ "username": nt.username, "password": nt.password }, function (err, docs) {
        if (err) {
            console.log('err: ' + err);
            res.json({
                success: false,
                message: err
            });
            return;
        }
        if (_.size(docs)) {
            res.json({
                success: false,
                message: 'User already exists!'
            });
            return;
        } else {
            console.log('new user inside signup');
            db.teachers.insert(nt, function (err2, newDocs) {
                if (err2) {
                    console.log('err2: ' + err2);
                    res.json({
                        success: false,
                        message: err2
                    });
                    return;
                }
                res.json({
                    success: true,
                    message: 'Sign up successful!'
                });
            });

        }
    });

});

LoginApi.get('/teacher/:_id', function (req, res) {
    var teacherId = req.params._id;
    console.log('teacherId');
    console.log(teacherId);
    db.teachers.find({ _id: teacherId }, function (err, data) {
        if (err) {
            res.status(404).json(err);
        }
        res.json(data);
    });
});

LoginApi.post('/updateteacher', function (req, res) {
    var t = req.body;
    console.log(t);

    db.teachers.update({ _id: t._id }, { $set: t }, { multi: true }, function (err, newDocs) {
        if (err) {
            console.log('err: ' + err);
            res.json({
                success: false,
                message: err
            });
            return;
        } else {
            res.json({
                success: true,
                message: 'Profile updated successfully!'
            });
        }
    });

});

// // removes all data from db file
// db.teachers.remove({}, { multi: true }, function (err, numRemoved) {
//     console.log(numRemoved + ' records removed');
// });

// // insert all data from questionData into db
// var teacherData = require('./teacherData');
// db.teachers.insert(teacherData, function (err, newDocs) {
// console.log(newDocs.length + ' records inserted');
// });

// db.teachers.find({}, function (err, docs) {
//     console.log(docs);
// });


module.exports = LoginApi;