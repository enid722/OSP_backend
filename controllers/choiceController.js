import Choice from "../models/choiceModel"


exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty."
      });
    }
  
    // Create a Choice
    const choice = new Choice({
      name: req.body.name,
      input_spec_id: req.body.input_spec_id
    });
  
    // Save Choice in the database
    await Choice.create(choice, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Choice."
        });
      else res.send(data);
    });
  };


// Retrieve all Choices by a questionId.
exports.findAllByQuestionId = async (req, res) => {
  await Choice.getAllByQuestionId(req.params.questionId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving responses."
      });
    else res.send(data);
  });
};

// Retrieve all Choices from the database.
exports.findAll = async (req, res) => {
    await Choice.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving surveys."
        });
      else res.send(data);
    });
  };


  // Find a single Choice with a questionId
exports.findOne = async (req, res) => {
    await Choice.findById(req.params.questionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Choice with questionId ${req.params.questionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Choice with questionId " + req.params.questionId
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a Choice identified by the surveyId in the request
  exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("choice update controller req.body");
    console.log(req.body);
  
    await Choice.updateMultiple(
      req.body,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Choice with id ${req.params.surveyId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Choice with id " + req.params.surveyId
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete Choices with the specified questionId in the request
  exports.delete = async (req, res) => {
    await Choice.remove(req.params.questionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Choice with id ${req.params.questionId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Choice with id " + req.params.questionId
          });
        }
      } else res.send({ message: `Choice was deleted successfully!` });
    });
  };
  
  // Delete all Choices from the database.
  exports.deleteAll = async (req, res) => {
    await Choice.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all surveys."
        });
      else res.send({ message: `All Choices were deleted successfully!` });
    });
  };