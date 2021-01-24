import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CropFreeIcon from '@material-ui/icons/CropFree';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {getSurveyList} from '../services/surveyService';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
function SurveysScreen (props){

    const [surveys, setSurveys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const getSurveyList = async () => {
      setError("");
      setIsLoading(true);
      await fetch('/api/surveys')
      .then( res => {
        if (!res.ok) { throw res }
        return res.json();
      })
      .then(surveys => setSurveys(surveys))
      .catch( err => {
        err.text().then( errorMessage => {
          setError(errorMessage)
        })})
      setIsLoading(false);
    };


    useEffect(() => {
      getSurveyList();
  },[])


  const classes = useStyles();

    return <div>
      
   <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon/>}
                component={ Link }
                to={"/newSurvey/"}
              >
                New Survey
              </Button>
              {isLoading? "Loading...":
        error? <div>{error}</div>:<div></div>}
    <div className="survey-list">
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Token</TableCell>
            <TableCell>Title</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {surveys.map((survey) => (
            <TableRow key={survey.id}>
              <TableCell component="th" scope="row">
                {survey.id}
              </TableCell>
              <TableCell>{survey.token}</TableCell>
              <TableCell>{survey.title}</TableCell>
              <TableCell align="right">
              <Button
                component={ Link }
                to={"/survey/" + survey.id}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AssessmentIcon />}
              >
                Report
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CropFreeIcon />}
              >
                QR code
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>

}

export default SurveysScreen;