import mysql from 'mysql2';
import config from './config';
/*
var mysqlConnection = mysql.createConnection(config.databaseOptions);

mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Successfully connected to the database");
})


export default mysqlConnection;*/

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



export default pool;