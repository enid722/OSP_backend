import InputSpec from "../models/inputSpecModel"

// Retrieve all InputSpec from the database.
exports.findAll = async (req, res) => {
    await InputSpec.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving inputSpecs."
        });
      else res.send(data);
    });
  };

  // Find a single InputSpec with a inputSpecId
  exports.findOne = async (req, res) => {
    await InputSpec.findById(req.params.inputSpecId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found InputSpec with id ${req.params.inputSpecId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving InputSpec with id " + req.params.inputSpecId
          });
        }
      } else res.send(data);
    });
  };
