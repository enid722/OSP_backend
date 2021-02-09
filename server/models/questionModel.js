import sql from "../db-connection";

// constructor
const Question = function (question) {
    this.title = question.title;
    this.input_type = question.input_type;
    this.input_spec_id = question.input_spec_id;
    this.survey_id = question.survey_id;
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

Question.createChoicesByQuestionId = (questionId, choices, result) =>{

    var sql_insert_choices = "INSERT INTO choices (name, input_spec_id) VALUES ?";
    console.log("createChoicesByQuestionId Model");
    console.log(questionId);
    console.log(choices);
    const newChoices = choices.map(c => [c.name, c.input_spec_id]);
    console.log(newChoices);
    //create choices
    sql.query(sql_insert_choices, [newChoices], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        const createdChoices = choices.map((c,index) => c = {...c, id: res.insertId+index});
        const newQuestionChoices = createdChoices.map(c => [Number(questionId), c.id]);
        console.log("created choices: ", {
            id: res.insertId,
            ...newQuestionChoices
        });

        var sql_insert_question_choices = "INSERT INTO question_choices (question_id, choice_id) VALUES ?";
        //create question_choices
        sql.query(sql_insert_question_choices, [newQuestionChoices], function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            const createdQuestionChoices = newQuestionChoices.map((qc,index) => qc = {question_id:qc[0], choice_id:qc[1], id: res.insertId+index});
            console.log("created question choices: ", createdQuestionChoices);
            result(null, {questionChoices:createdQuestionChoices, choices:createdChoices});
        });


        //result(null, createdChoices); 
    });

}


Question.createQuestionChoicesByInputSpecId = (questionId, inputSpecId, result) => {
    console.log("createQuestionChoicesByInputSpecId Model");
    console.log(questionId);
    console.log(inputSpecId);
    sql.query(`INSERT INTO question_choices (question_id,choice_id) (SELECT ${questionId} as question_id, c.id as choice_id FROM choices c, input_specs i
        WHERE c.input_spec_id = i.id
        AND input_spec_id = ${inputSpecId})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created questionChoices: ", {
            res
        });
        result(null, res);
    });

}

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
    sql.query(`SELECT t1.id, t1.title, t1.input_type, t1.input_spec_id, 
    concat('[',group_concat(concat('{"id":',t2.id,',"name":"',t2.name,'"}') separator ','),']') as choices
    FROM
    (SELECT q.id, q.title, q.input_type, q.input_spec_id FROM questions q WHERE q.survey_id = ${surveyId}) as t1
    LEFT JOIN 
    (SELECT qc.question_id, c.id, c.name FROM question_choices qc, OSP.choices c 
    WHERE qc.choice_id = c.id) as t2
    ON t1.id = t2.question_id
    GROUP BY t1.id, t1.title, t1.input_type, t1.input_spec_id`, (err, res) => {
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


Question.updateById = (id, update, oridinal, result) => {
    console.log(update);
    const newTitle = typeof update.title === 'undefined'?oridinal.title: update.title;
    const newInputSpecId = typeof update.input_spec_id === 'undefined'?oridinal.input_spec_id: update.input_spec_id;
    const newInputType = typeof update.input_type === 'undefined'?oridinal.input_type: update.input_type;
    const newQuestion = {
        title: newTitle,
        input_spec_id: newInputSpecId,
        input_type: newInputType
    };

    console.log(newQuestion);
    console.log(id);
    sql.query("UPDATE questions SET title = ?, input_spec_id = ?, input_type = ? WHERE id = ?", [
        newTitle, newInputSpecId, newInputType, id
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
            ...newQuestion
        });
        result(null, {
            id: id,
            ...newQuestion
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

Question.removeChoicesByQuestionId = (questionId, choices, result) =>{

    console.log(questionId);
    console.log(choices);
    //delete choices
    sql.query(`DELETE FROM choices WHERE id IN (${choices})`, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log("removed choices: ", choices);
        result(null, res); 
    });

}

Question.removeQuestionChoicesByInputSpecId = (questionId, inputSpecId, result) =>{

    console.log(questionId);
    console.log(inputSpecId);
    //delete questionchoices
    
    sql.query(`DELETE question_choices FROM question_choices 
    inner join  (SELECT ${questionId} as question_id, c.id as choice_id FROM choices c WHERE input_spec_id = ${inputSpecId}) as t1 
    on question_choices.question_id = t1.question_id and question_choices.choice_id = t1.choice_id`, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log("removed question choices: ", inputSpecId);
        result(null, res); 
    });
}


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
