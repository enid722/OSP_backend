import sql from "../db-connection";

// constructor
const Survey = function(survey) {
  this.title = survey.title;
  this.token = survey.token;
};

Survey.create = (newSurvey, result) => {
  sql.query("INSERT INTO surveys SET ?", newSurvey, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created survey: ", { id: res.insertId, ...newSurvey });
    result(null, { id: res.insertId, ...newSurvey });
  });
};

Survey.getAll = result => {
    sql.query("SELECT * FROM surveys", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("surveys: ", res);
      result(null, res);
    });
  };


Survey.findById = (surveyId, result) => {
  sql.query(`SELECT * FROM surveys WHERE id = ${surveyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found survey: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Survey with the id
    result({ kind: "not_found" }, null);
  });
};



Survey.updateById = (id, survey, result) => {
  sql.query(
    "UPDATE surveys SET title = ?, token = ? WHERE id = ?",
    [survey.title, survey.token, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Survey with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated survey: ", { id: id, ...survey });
      result(null, { id: id, ...survey });
    }
  );
};

Survey.remove = (id, result) => {
  sql.query("DELETE FROM surveys WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Survey with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted survey with id: ", id);
    result(null, res);
  });
};

Survey.removeAll = result => {
  sql.query("DELETE FROM surveys", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} surveys`);
    result(null, res);
  });
};


export default Survey;