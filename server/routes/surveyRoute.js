import express from 'express';
import surveys from '../controllers/surveyController'
import questions from '../controllers/questionController'
import responses from '../controllers/responsesController'

const router = express.Router();


// Retrieve all Surveys
router.get("/", surveys.findAll);

//Create a new survey
router.post("/", surveys.create);

// Retrieve a single Survey with surveyId
router.get("/:surveyId", surveys.findOne);

// Update a Survey with surveyId
router.put("/:surveyId", surveys.update);

// Delete a Survey with surveyId
router.delete("/:surveyId", surveys.delete);

// Delete all surveys
router.delete("/", surveys.deleteAll);

// Retrieve all questions in a Survey with surveyId
router.get("/:surveyId/questions/", questions.findAllBySurveyId);


// Create a new question
router.post("/:surveyId/questions/", questions.create);

// Retrieve all responses in a Question with questionId
//router.get("/questions/:questionId/responses", responses.findAllByQuestionId);





export default router;