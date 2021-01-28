import sql from "../db-connection";

// constructor
const Response = function(response) {
  this.question_choice_id = response.question_choice_id;
};

Response.create = (newResponse, result) => {
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

Response.getAll = result => {
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


  Response.getAllByQuestionId = (questionId, result) => {
    sql.query(`SELECT t1.id, t1.name, COUNT(question_choice_id) as count FROM
            (SELECT qc.id as id, c.name FROM questions q, question_choices qc, choices c
              WHERE q.id = qc.question_id 
              AND c.id = qc.choice_id
              AND q.id = ${questionId}) as t1
            LEFT JOIN responses r ON r.question_choice_id = t1.id
            GROUP BY t1.id`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("responses: ", res);
      result(null, res);
    });
  };
  
  

Response.findById = (responseId, result) => {
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



Response.updateById = (id, response, result) => {
  sql.query(
    "UPDATE responses SET question_choice_id = ? WHERE id = ?",
    [response.question_choice_id, id],
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

Response.remove = (id, result) => {
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

Response.removeAll = result => {
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


export default Response;