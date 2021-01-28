import mysql from 'mysql2';
import config from './config';
/*
var mysqlConnection = mysql.createConnection(config.databaseOptions);

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Successfully connected to the database");
})


export default mysqlConnection;*/

var pool = mysql.createPool(config.databaseOptions);



export default pool;