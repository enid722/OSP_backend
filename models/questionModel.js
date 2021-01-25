import sql from "../db-connection";
import mysql from 'mysql2';

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
/*
Question.getAllBySurveyId = (surveyId,result) => {
    sql.query(`SELECT * FROM questions WHERE questions.survey_id = ${surveyId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("questions: ", res);
        result(null, res);
    });
};*/

Question.getAllBySurveyId = (surveyId,result) => {
    sql.query(`select q.id, q.title, q.input_type, q.input_spec_id, 
                concat('[',group_concat(concat('{"id":"',c.id,'","name":"',c.name,'"}') separator ','),']') as choices 
                from questions q, choices c, question_choices qc, input_specs i
                where q.id = qc.question_id
                AND c.id = qc.choice_id
                AND i.id = q.input_spec_id
                AND q.survey_id = ${surveyId} 
                GROUP BY q.id, q.title, q.input_type, q.input_spec_id `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        res = res.map(row => (row.choices = JSON.parse(row.choices), row));
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


Question.updateById = (id, question, result) => {
    sql.query("UPDATE questions SET title = ?, input_spec_id = ?, input_type = ? WHERE id = ?", [
        question.title, question.input_spec_id, question.input_type, id
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

        console.log("updated question: ", {
            id: id,
            ...question
        });
        result(null, {
            id: id,
            ...survey
        });
    });
};

Question.updateMultipleById = (surveyId, questions, result) => {

    var queries = '';
    console.log(surveyId, questions);
    questions.forEach(function (question) {
        queries += sql.format("UPDATE questions SET title = ?, input_spec_id = ?, input_type = ? WHERE id = ?; ", [question.title, question.input_spec_id, question.input_type, question.id]);
      });

    sql.query(queries, (err, res) => {
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

        console.log("updated question: ", questions);
        result(null, questions);
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
