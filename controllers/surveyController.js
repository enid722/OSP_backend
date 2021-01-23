import Survey from "../models/surveyModel"

exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty."
      });
    }
  
    // Create a Survey
    const survey = new Survey({
      title: req.body.title,
      token: req.body.token
    });
  
    // Save Survey in the database
    await Survey.create(survey, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Survey."
        });
      else res.send(data);
    });
  };

// Retrieve all Surveys from the database.
exports.findAll = async (req, res) => {
    await Survey.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving surveys."
        });
      else res.send(data);
    });
  };


  // Find a single Survey with a surveyId
exports.findOne = async (req, res) => {
    await Survey.findById(req.params.surveyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Survey with id ${req.params.surveyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Survey with id " + req.params.surveyId
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a Survey identified by the surveyId in the request
  exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    await Survey.updateById(
      req.params.surveyId,
      new Survey(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Survey with id ${req.params.surveyId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Survey with id " + req.params.surveyId
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a Survey with the specified surveyId in the request
  exports.delete = async (req, res) => {
    await Survey.remove(req.params.surveyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Survey with id ${req.params.surveyId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Survey with id " + req.params.surveyId
          });
        }
      } else res.send({ message: `Survey was deleted successfully!` });
    });
  };
  
  // Delete all Surveys from the database.
  exports.deleteAll = async (req, res) => {
    await Survey.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all surveys."
        });
      else res.send({ message: `All Surveys were deleted successfully!` });
    });
  };