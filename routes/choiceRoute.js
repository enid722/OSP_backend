import express from 'express';
import choices from '../controllers/choiceController'



const router = express.Router();


// Update a set of choices
router.put("/", choices.update);

export default router;