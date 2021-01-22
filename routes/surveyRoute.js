import express from 'express';
import mysqlConnection from '../connection.js'


const router = express.Router();


router.get("/", (req, res)=>{ 
    mysqlConnection.query("SELECT * from surveys", (err, rows, fields) => {
        if (!err)
            {
                res.send(rows);
            }
        else{
            console.log(err);
        }
    })
});

export default router;