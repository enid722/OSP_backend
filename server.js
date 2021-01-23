import express from 'express';
import bodyParser from 'body-parser';
import surveyRoute from './routes/surveyRoute'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/api/surveys", surveyRoute);



app.listen(process.env.PORT, () => {console.log("Server started at http://"+process.env.HOST+":" + process.env.PORT)});