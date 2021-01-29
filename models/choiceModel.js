import sql from "../db-connection";

// constructor
const Choice = function(choice) {
  this.name = choice.name;
  this.input_spec_id = choice.input_spec_id;
};

Choice.create = (newChoice, result) => {
  sql.query("INSERT INTO choices SET ?", newChoice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created choice: ", { id: res.insertId, ...newChoice });
    result(null, { id: res.insertId, ...newChoice });
  });
};

Choice.getAll = result => {
    sql.query("SELECT * FROM choices", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("choices: ", res);
      result(null, res);
    });
  };


Choice.findById = (choiceId, result) => {
  sql.query(`SELECT * FROM choices WHERE id = ${choiceId}`, (err, res) => {
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



Choice.updateMultiple = (choices, result) => {


    //update choices

    var sql_update_choices = "";
    //todo: the sql should not include "AND input_spec_id != null", need to handle in questionAction
    choices.map(c => sql_update_choices += `UPDATE choices SET name = "${c.name}" WHERE id = ${c.id} AND input_spec_id is null;`);
    console.log(sql_update_choices);

    sql.query(sql_update_choices, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);

        console.log("updated choices: ", choices);
        result(err, choices);
        return;
      });
};

Choice.remove = (id, result) => {
  sql.query("DELETE FROM choices WHERE id = ?", id, (err, res) => {
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

Choice.removeAll = result => {
  sql.query("DELETE FROM choices", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} choices`);
    result(null, res);
  });
};


export default Choice;