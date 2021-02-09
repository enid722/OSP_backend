import dotenv from 'dotenv';
dotenv.config();

export default {
    databaseOptions:{
    host: process.env.MYSQL_HOST_IP, 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}
}