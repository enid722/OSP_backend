import Response from "../models/responseModel"


exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty."
      });
    }
  
    // Create a Response
    const response = new Response({
      res_text: req.body.title,
      question_choice_id: req.body.question_choice_id
    });
  
    // Save Response in the database
    await Response.create(response, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Response."
        });
      else res.send(data);
    });
  };


// Retrieve all Responses by a questionId.
exports.findAllByQuestionId = async (req, res) => {
  await Response.getAllByQuestionId(req.params.questionId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving responses."
      });
    else res.send(data);
  });
};

// Retrieve all Responses from the database.
exports.findAll = async (req, res) => {
    await Response.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving surveys."
        });
      else res.send(data);
    });
  };


  // Find a single Response with a questionId
exports.findOne = async (req, res) => {
    await Response.findById(req.params.questionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Response with questionId ${req.params.questionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Response with questionId " + req.params.questionId
          });
        }
      } else res.send(data);
    });
  };
  
  // Update a Response identified by the surveyId in the request
  exports.update = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    await Response.updateById(
      req.params.surveyId,
      new Response(
        {
          title: req.body.title,
          token: randomToken(8)
        }),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Response with id ${req.params.surveyId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Response with id " + req.params.surveyId
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a Response with the specified surveyId in the request
  exports.delete = async (req, res) => {
    await Response.remove(req.params.surveyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Response with id ${req.params.surveyId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Response with id " + req.params.surveyId
          });
        }
      } else res.send({ message: `Response was deleted successfully!` });
    });
  };
  
  // Delete all Responses from the database.
  exports.deleteAll = async (req, res) => {
    await Response.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all surveys."
        });
      else res.send({ message: `All Responses were deleted successfully!` });
    });
  };