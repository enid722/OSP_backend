//import Survey from "../models/surveyModel"
import Question from "../models/questionModel"

exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty."
      });
    }
  
    // Create a Question
    const question = new Question({
      title: req.body.title,
      input_type: req.body.input_type,
      input_spec_id: req.body.input_type,
      input_survey_id: req.body.input_type
    });
  
    // Save Question in the database
    await Question.create(question, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Question."
        });
      else res.send(data);
    });
  };

// Retrieve all Questions from the database.
exports.findAll = async (req, res) => {
    await Question.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving questions."
        });
      else res.send(data);
    });
  };

// Find all Questions with a surveyId
exports.findAllBySurveyId = async (req, res) => {
  await Question.getAllBySurveyId(req.params.surveyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Question with surveyId ${req.params.surveyId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Question with surveyId " + req.params.surveyId
        });
      }
    } else res.send(data);
  });
};


  // Find a single Question with a questionId
exports.findOne = async (req, res) => {
    await Question.findById(req.params.questionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.questionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Question with id " + req.params.questionId
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a Question identified by the questionId in the request
  exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    await Question.updateById(
      req.params.questionId,
      new Question(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Question with id ${req.params.questionId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Question with id " + req.params.questionId
            });
          }
        } else res.send(data);
      }
    );
  };
  

    // Update a set of Questions identified by the surveyId in the request
    exports.updateMultipleById = async (req, res) => {
      // Validate Request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      console.log(req.body);
    
      await Question.updateMultipleById(
        req.params.surveyId,
        req.body,
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Question with surveyId ${req.params.surveyId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Question with surveyId " + req.params.surveyId
              });
            }
          } else res.send(data);
        }
      );
    };
    
  // Delete a Question with the specified questionId in the request
  exports.delete = async (req, res) => {
    await Question.remove(req.params.questionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Question with id ${req.params.questionId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Question with id " + req.params.questionId
          });
        }
      } else res.send({ message: `Question was deleted successfully!` });
    });
  };
  
  // Delete all Questions from the database.
  exports.deleteAll = async (req, res) => {
    await Question.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all questions."
        });
      else res.send({ message: `All Questions were deleted successfully!` });
    });
  };