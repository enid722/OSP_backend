import express from 'express';
import inputSpecs from '../controllers/inputSpecController'

const router = express.Router();


// Retrieve all Surveys
router.get("/", inputSpecs.findAll);

// Retrieve a single Survey with surveyId
router.get("/:inputSpecId", inputSpecs.findOne);

export default router;