// feedback.route.js

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');

router.post('/addFeedback', feedbackController.addFeedback);
router.get('/getFeedbackForDoctor', feedbackController.getFeedbackForDoctor);
router.get('/getFeedback', feedbackController.getFeedback);
// router.delete('/deleteFeedback', feedbackController.deleteFeedback);

module.exports = router;
