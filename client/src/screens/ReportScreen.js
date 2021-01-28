import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';

import { detailsSurvey } from '../actions/surveyActions';
import { listQuestions } from '../actions/questionActions';
import { listResponse } from '../actions/responseActions';
//import BarChart from '../components/BarChart';


function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


function ReportScreen (props){

    const surveyDetails = useSelector(state => state.surveyDetails);
    const questionList = useSelector(state => state.questionList);
    const responseList = useSelector(state => state.responseList);
    const {survey, loading, error} = surveyDetails;
    const {questions, loading: loadingQuestionList, error: errorQuestionList} = questionList;
    const {responses, loading: loadingResponseList, error: errorResponseList} = responseList;


    const dispatch = useDispatch();

    const classes = useStyles();
    const [value, setValue] = useState(0);

      useEffect(async () => {
          await Promise.all([
            dispatch(detailsSurvey(props.match.params.id)),
            dispatch(listQuestions(props.match.params.id)),
          ])
        return () => {
            //
        };
    },[])

    useEffect(() => {
      questions.length > 0 && dispatch(listResponse(questions[0].id));
      return () => {
          //
      };
  },[questions])

    const handleChange = (event, newValue) => {
      setValue(newValue);
      dispatch(listResponse(questions[newValue].id));
    };

    return loading? <div>Loading...</div>:
    error?<div>{error}</div>:<div className={classes.root}>
      <h3>Survey Title: {survey.title}</h3>
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {[...Array(questions.length).keys()].map(x => <Tab key={x} label={x+1} {...a11yProps(x)} />)}
      </Tabs>
    </AppBar>
        <Box p={3} component={Paper}>
          <Typography>{questions.length > 0 && questions[value].title}</Typography>
          {responses.length > 0 && responses.map((response)=>(
            <Typography key={response.id}>{response.name}: {response.count}</Typography>
          ))}
          
        </Box>
    

      
      
  </div>

}

export default ReportScreen;