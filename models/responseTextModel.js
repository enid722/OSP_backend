import sql from "../db-connection";

// constructor
const ResponseText = function(response) {
  this.text = response.text;
  this.question_id = response.question_id;
};

ResponseText.create = (newResponse, result) => {
  sql.query("INSERT INTO responses SET ?", newResponse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created response: ", { id: res.insertId, ...newResponse });
    result(null, { id: res.insertId, ...newResponse });
  });
};

ResponseText.getAll = result => {
    sql.query("SELECT * FROM responses", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("responses: ", res);
      result(null, res);
    });
  };


  ResponseText.getAllByQuestionId = (questionId, result) => {
    sql.query(`SELECT rt.id, rt.text FROM OSP.response_texts rt WHERE rt.question_id = ${questionId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("responses: ", res);
      result(null, res);
    });
  };
  
  

ResponseText.findById = (responseId, result) => {
  sql.query(`SELECT * FROM responses WHERE id = ${responseId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found response: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Response with the id
    result({ kind: "not_found" }, null);
  });
};



ResponseText.updateById = (id, response, result) => {
  sql.query(
    "UPDATE responses SET text = ?, question_id = ? WHERE id = ?",
    [response.text, response.questionid, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Response with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated response: ", { id: id, ...response });
      result(null, { id: id, ...response });
    }
  );
};

ResponseText.remove = (id, result) => {
  sql.query("DELETE FROM responses WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Response with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted response with id: ", id);
    result(null, res);
  });
};

ResponseText.removeAll = result => {
  sql.query("DELETE FROM responses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} responses`);
    result(null, res);
  });
};


export default ResponseText;