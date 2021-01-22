import dotenv from 'dotenv';
dotenv.config();

export default {
    databaseOptions:{
    host: process.env.HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    multipleStatements: true
}
}