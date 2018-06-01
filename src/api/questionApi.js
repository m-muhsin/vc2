"use strict";/* eslint no-undef: 0, new-cap: 0 */

var _ = require('lodash'); // a library to make interacting with data sets easier
var express = require('express');
var bodyParser = require('body-parser');
var QuestionApi = express.Router();

QuestionApi.use(bodyParser.json());

var Datastore = require('nedb');
// You can issue commands right away

var db = {};

db.questions = new Datastore('data/questions.db');

// You need to load each database (here we do it asynchronously)
db.questions.loadDatabase();

QuestionApi.get('/allquestions', function (req, res) {
    db.questions.find({}, function (err, docs) {
        if (err) {
            console.log('Error in fetching questions: ' + err);
            return;
        }
        if (_.size(docs)) {
            res.json(docs);
            return;
        }
        res.send('Empty ');
    });
});

QuestionApi.post('/addquestion', function (req, res) {
    var q = req.body;
    console.log(q);

    if (q._id) {
        db.questions.update({ _id: q._id }, { $set: q }, { multi: true }, function (err, newDocs) {
            if (err) {
                console.log('err: ' + err);
                res.json({
                    success: false,
                    message: err
                });
                return;
            }
        });
        db.questions.find({ _id: q._id }, function (err, docs) {
            if (err) {
                console.log('Error in fetching questions: ' + err);
                return;
            }
            res.json({
                success: true,
                message: 'Question updated successfully!',
                data: docs
            });
        });
    }
    else {
        var newQuestion = {
            Q: q.Q,
            A: q.A,
            B: q.B,
            C: q.C,
            D: q.D
        };
        db.questions.insert(newQuestion, function (err, newDocs) {
            if (err) {
                console.log('err: ' + err);
                res.json({
                    success: false,
                    message: err
                });
            }
            res.json({
                success: true,
                message: 'Question inserted successfully!',
                data: newDocs
            });
        });
    }
});

QuestionApi.post('/deletequestion', function (req, res) {
    console.log(req.body);

    db.questions.remove(
        { "_id": req.body._id },
        function (err, numRemoved) {
            if (err) {
                console.log('err: ' + err);
                res.json({
                    success: false,
                    message: err
                });
            }
            res.json({
                success: true,
                message: 'Question deleteted successfully'
            });
            console.log('deleteted successfully');
        }

    );
});

// //static questions
// var questionData = require('./questionData');

// // removes all data from db file
// db.questions.remove({}, { multi: true }, function (err, numRemoved) {
//     console.log(numRemoved + ' records removed');
// });

// // insert all data from questionData into db
// db.questions.insert(questionData, function (err, newDocs) {
//     console.log(newDocs.length + ' records inserted');
//     // Two documents were inserted in the database
//     // newDocs is an array with these documents, augmented with their _id
// });

// db.questions.find({}, function (err, docs) {
//     // console.log(docs);
// });


module.exports = QuestionApi;