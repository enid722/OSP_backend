import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CropFreeIcon from '@material-ui/icons/CropFree';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { listSurveys } from '../actions/surveyActions';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
function SurveysScreen (props){


    const surveyList = useSelector(state => state.surveyList);
    const {surveys, loading, error} = surveyList;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(listSurveys());
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
    {loading? <div>Loading...</div>:
      error?<div>{error}</div>:""}
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