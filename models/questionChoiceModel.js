import sql from "../db-connection";

// constructor
const QuestionChoice = function(questionId, choiceId) {
  this.question_id = questionId;
  this.choice_Id = choiceId;
};

QuestionChoice.create = (newQuestionChoice, result) => {
  sql.query("INSERT INTO question_choices SET ?", newQuestionChoice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created choice: ", { id: res.insertId, ...newQuestionChoice });
    result(null, { id: res.insertId, ...newQuestionChoice });
  });
};

QuestionChoice.getAll = result => {
    sql.query("SELECT * FROM question_choices", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("question_choices: ", res);
      result(null, res);
    });
  };


QuestionChoice.findById = (choiceId, result) => {
  sql.query(`SELECT * FROM question_choices WHERE id = ${choiceId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found choice: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Choice with the id
    result({ kind: "not_found" }, null);
  });
};



QuestionChoice.updateById = (id, choice, result) => {
  sql.query(
    "UPDATE question_choices SET name = ?, input_spec_id = ? WHERE id = ?",
    [choice.title, choice.input_spec_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Choice with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated choice: ", { id: id, ...choice });
      result(null, { id: id, ...choice });
    }
  );
};

QuestionChoice.remove = (id, result) => {
  sql.query("DELETE FROM question_choices WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Choice with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted choice with id: ", id);
    result(null, res);
  });
};

QuestionChoice.removeAll = result => {
  sql.query("DELETE FROM question_choices", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} question_choices`);
    result(null, res);
  });
};


export default QuestionChoice;