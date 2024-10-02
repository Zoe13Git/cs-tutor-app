const express = require('express');
const { fetchAllTopics, fetchLessonsBySubtopicId, fetchQuestionsByQuizId, fetchQuizzesBySubtopicId, fetchSubtopicsByTopicId } = require('../controllers/loadData');

const router = express.Router();


router.get('/topics', fetchAllTopics);
router.get('/topics/:topicId/subtopics', fetchSubtopicsByTopicId);
router.get('/subtopics/:subtopicId/lessons', fetchLessonsBySubtopicId);
router.get('/subtopics/:subtopicId/quizzes', fetchQuizzesBySubtopicId);
router.get('/quizzes/:quizId/questions', fetchQuestionsByQuizId);

module.exports = router;