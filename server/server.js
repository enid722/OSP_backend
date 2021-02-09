import express from 'express';
import bodyParser from 'body-parser';
import surveyRoute from './routes/surveyRoute'
import inputSpecRoute from './routes/inputSpecRoute'
import questionRoute from './routes/questionRoute'
import choiceRoute from './routes/choiceRoute'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());

app.use("/api/surveys", surveyRoute);
app.use("/api/input_specs", inputSpecRoute);
app.use("/api/questions", questionRoute);
app.use("/api/choices", choiceRoute);

/* 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });*/

app.listen(process.env.PORT, () => {console.log("Server started at http://"+process.env.HOST+":" + process.env.REACT_APP_SERVER_PORT )});