import express from 'express';
import surveys from '../controllers/surveyController'
import questions from '../controllers/questionController'

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


export default router;