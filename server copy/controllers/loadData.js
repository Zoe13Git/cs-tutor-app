const express = require('express');
const router = express.Router();
const db = require('../db');

// Function to fetch all topics
const fetchAllTopics = (req, res) => {
    console.log("Fetch Topics");
    db.query('SELECT * FROM Topic', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
  
// Function to fetch subtopics by topic ID
const fetchSubtopicsByTopicId = (req, res) => {
    console.log("Fetch SubTopics");
    const { topicId } = req.params;
    db.query('SELECT * FROM Subtopic WHERE topic_id = ?', [topicId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Function to fetch lessons by subtopic ID
const fetchLessonsBySubtopicId = (req, res) => {
    console.log("Fetch Lessons");
    const { subtopicId } = req.params;
    db.query('SELECT * FROM Lesson WHERE subtopic_id = ?', [subtopicId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Function to fetch quizzes by subtopic ID
const fetchQuizzesBySubtopicId = (req, res) => {
    const { subtopicId } = req.params;
    db.query('SELECT * FROM Quiz WHERE subtopic_id = ?', [subtopicId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Function to fetch questions by quiz ID
const fetchQuestionsByQuizId = (req, res) => {
    const { quizId } = req.params;
    db.query('SELECT * FROM Question WHERE quiz_id = ?', [quizId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = { fetchAllTopics, fetchLessonsBySubtopicId, fetchQuestionsByQuizId, fetchQuizzesBySubtopicId, fetchSubtopicsByTopicId }