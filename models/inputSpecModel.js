import sql from "../db-connection";
import mysql from 'mysql2';

// constructor
const InputSpec = function (inputSpec) {
    this.name = inputSpec.name;
};

InputSpec.create = (newInputSpec, result) => {
    sql.query("INSERT INTO input_specs SET ?", newInputSpec, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created input_spec: ", {
            id: res.insertId,
            ...newInputSpec
        });
        result(null, {
            id: res.insertId,
            ...newInputSpec
        });
    });
};

InputSpec.getAll = result => {
    sql.query(`select i.id, i.name, 
                concat('[',group_concat(concat('{"id":"',c.id,'","name":"',c.name,'"}') separator ','),']') as choices 
                from choices c, input_specs i
                where c.input_spec_id = i.id
                GROUP BY i.id, i.name`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        res = res.map(row => (row.choices = JSON.parse(row.choices), row));
        console.log("input_specs: ", res);
        result(null, res);
    });
};


InputSpec.findById = (inputSpecId, result) => {
    sql.query(`select i.id, i.name, 
            concat('[',group_concat(concat('{"id":"',c.id,'","name":"',c.name,'"}') separator ','),']') as choices 
            from choices c, input_specs i
            where c.input_spec_id = i.id
            AND i.id = ${inputSpecId} 
            GROUP BY i.id, i.name`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            res = res.map(row => (row.choices = JSON.parse(row.choices), row));
            console.log("found inputSpec: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Question with the id
        result({
            kind: "not_found"
        }, null);
    });
};

export default InputSpec;
