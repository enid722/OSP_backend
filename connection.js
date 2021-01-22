import mysql from 'mysql';
import config from './config.js';

var mysqlConnection = mysql.createConnection(config.databaseOptions);

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected");
})


export default mysqlConnection;