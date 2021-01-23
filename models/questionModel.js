import sql from "../db-connection";

// constructor
const Question = function (question) {
    this.title = question.title;
    this.input_type = question.input_type;
    this.input_spec_id = question.input_spec_id;
    this.input_survey_id = question.input_survey_id;
};

Question.create = (newQuestion, result) => {
    sql.query("INSERT INTO questions SET ?", newQuestion, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created question: ", {
            id: res.insertId,
            ...newQuestion
        });
        result(null, {
            id: res.insertId,
            ...newQuestion
        });
    });
};

Question.getAll = result => {
    sql.query("SELECT * FROM questions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("questions: ", res);
        result(null, res);
    });
};

Question.getAllBySurveyId = (surveyId,result) => {
    sql.query(`SELECT questions.* FROM questions, surveys WHERE surveys.id = ${surveyId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("questions: ", res);
        result(null, res);
    });
};

Question.findById = (questionId, result) => {
    sql.query(`SELECT * FROM questions WHERE id = ${questionId}`, (err, res) => {
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

        // not found Question with the id
        result({
            kind: "not_found"
        }, null);
    });
};


Question.updateById = (id, survey, result) => {
    sql.query("UPDATE questions SET title = ?, token = ? WHERE id = ?", [
        survey.title, survey.token, id
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) { // not found Question with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("updated survey: ", {
            id: id,
            ...survey
        });
        result(null, {
            id: id,
            ...survey
        });
    });
};

Question.remove = (id, result) => {
    sql.query("DELETE FROM questions WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) { // not found Question with the id
            result({
                kind: "not_found"
            }, null);
            return;
        }

        console.log("deleted survey with id: ", id);
        result(null, res);
    });
};

Question.removeAll = result => {
    sql.query("DELETE FROM questions", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${
            res.affectedRows
        } questions`);
        result(null, res);
    });
};


export default Question;
