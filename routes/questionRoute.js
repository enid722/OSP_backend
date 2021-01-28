import express from 'express';
import responses from '../controllers/responsesController'
import questions from '../controllers/questionController'


const router = express.Router();



// Retrieve all responses with questionId
router.get("/:questionId/responses", responses.findAllByQuestionId);

// Create a set of choices with questionId
router.post("/:questionId/choices", questions.createChoicesByQuestionId);

// Delete a question with questionId
router.delete("/:questionId/choices", questions.removeChoicesByQuestionId);

// Update a question with questionId
router.put("/:questionId", questions.update);

// Delete a question with questionId
router.delete("/:questionId/", questions.delete);


export default router;