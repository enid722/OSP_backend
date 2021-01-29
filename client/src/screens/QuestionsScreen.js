import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
import { v4 as uuidv4 } from 'uuid';
import { detailsSurvey, saveSurvey } from '../actions/surveyActions';
import { listInputSpecs, listQuestions, saveQuestions } from '../actions/questionActions';
import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      //margin: theme.spacing(1),
      width: '100%',
    },
  }));
  
function QuestionsScreen (props){

    const [isSurveySave, setIsSurveySave] = useState(false);
    const [surveyFields, setSurveyFields] = useState({});
    const [questionFields, setQuestionFields] = useState([
        { id: uuidv4(), title: '', input_type:'textbox', input_spec_id:null, choices:null},
      ]);
    const [inputSpecFields, setInputSpecFields] = useState([
        { id: '', name: ''},
      ]);  
    const surveyDetails = useSelector(state => state.surveyDetails);
    const surveySave = useSelector(state=>state.surveySave);
    const questionList = useSelector(state => state.questionList);
    const questionSave = useSelector(state => state.questionSave);
    const inputSpecList = useSelector(state => state.inputSpecList);
    const {survey, loading: loadingSurveyDetails, error: errorSurveyDetails} = surveyDetails;
    const { loading: loadingSave, success: successSave, error: errorSave, survey: successSaveSurvey} = surveySave;
    const {questions, loading: loadingQuestionList, error: errorQuestionList} = questionList;
    const {inputSpecs, loading: loadingInputSpecList, error: errorInputSpecList} = inputSpecList;
    const { loading: loadingSaveQuestion, success: successSaveQuestion, error: errorSaveQuestion} = questionSave;

    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(async () => {
      if (props.match.params.id){
        await Promise.all([
          dispatch(detailsSurvey(props.match.params.id)),
          dispatch(listQuestions(props.match.params.id)),
          dispatch(listInputSpecs())
        ])
      }else{
        dispatch(listQuestions()); //clear questionList stores
      }
      // todo:handle new survey
      return () => {
          //
      };
  },[])

      useEffect(() => {
        if (props.match.params.id){
          if(survey.title){
            //setSurveyTitle(survey.title);
            //setSurveyId(survey.id);
            setSurveyFields({id:survey.id, title:survey.title})
          }
          if(questions){
            const newQuestions = JSON.parse(JSON.stringify(questions));
            setQuestionFields(newQuestions);
          }
        }
        if(inputSpecs){
          setInputSpecFields(inputSpecs);
        }
        return () => {
            //
        };
    },[survey, questions, inputSpecs])

    useEffect(() => {
            if (isSurveySave && successSaveSurvey){
              //props.history.push('/');
              //console.log(detailedDiff(questions, questionFields));
              //dispatch(saveQuestions(successSaveSurvey.id, questionFields));
              console.log("questions:", questions);
              console.log("questionFields:", questionFields);
              console.log(detailedDiff(questions, questionFields));
              dispatch(saveQuestions(successSaveSurvey.id, questions, detailedDiff(questions, questionFields)));
              setIsSurveySave(false);
              console.log("Save Completed");
              props.history.push('/');
            }
            return() => {
                //
            };
        }, [isSurveySave, successSaveSurvey])

        

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(saveSurvey(surveyFields));
    setIsSurveySave(true);
}


const changeQuestionHandler = (id, event) => {
    const newQuestionFields = questionFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value;
        if (event.target.name === "input_type"){
          i.input_spec_id = null;
          i.choices = (event.target.value === "mc")?[{id: uuidv4(), name: '', input_spec_id:null}]:null;
        }
      }
      return i;
    })
    setQuestionFields(newQuestionFields);
  }

  const changeChoiceHandler = (questionId, event) => {
    const newQuestionFields = questionFields.map(i => {
      if(questionId.toString() === i.id.toString()) {
        i[event.target.name].map(c =>{
          if (c.id.toString() === event.target.id.toString()){
            c.name = event.target.value;
          }
        }) 
        
      }
      return i;
    })
    
    setQuestionFields(newQuestionFields);
  }
/*
  const changeInputSpecHandler = (id, event) => {
    const newQuestionFields = questionFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value;
        if (event.target.name === "input_type" && event.target.value ==="ls"){
          dispatch(listInputSpecs());
        }
      }
      return i;
    })
    
    setQuestionFields(newQuestionFields);
  }*/


  const addQuestionHandler = () => {
    setQuestionFields([...questionFields, { id: uuidv4(), title: '', input_type:'textbox', input_spec_id:null, choices:null }])
  }

  const removeQuestionHandler = id => {
    const newQuestionFields  = [...questionFields];
    newQuestionFields.splice(newQuestionFields.findIndex(item => item.id === id), 1);
    setQuestionFields(newQuestionFields);
  }

  const addChoiceHandler = (questionId) => {
    const newQuestionFields = [...questionFields]
    const index = newQuestionFields.findIndex(item => item.id === questionId)
  
    newQuestionFields[index] = {
      ...newQuestionFields[index],
      choices: [...questionFields[index].choices, {id: uuidv4(), name: '', input_spec_id:null}]
    }
    //console.log(newQuestionFields);
    setQuestionFields(newQuestionFields);
  }
 
  const removeChoiceHandler = (questionId, choiceId) => {
    const newQuestionFields  = [...questionFields];
    const questionIndex = newQuestionFields.findIndex(item => item.id === questionId);
    const choiceIndex = newQuestionFields[questionIndex].choices.findIndex(item => item.id === choiceId);
    newQuestionFields[questionIndex].choices.splice(choiceIndex, 1);
    //console.log(newQuestionFields);
    setQuestionFields(newQuestionFields);
  }

    return loadingSurveyDetails && loadingQuestionList? <div>Loading...</div>:
      errorSurveyDetails? <div>{errorSurveyDetails}</div>:
      errorQuestionList? <div>{errorQuestionList}</div>:<div className="form">
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surveyTitle"
                label="Survey Title"
                value={surveyFields.title || ""}
                onChange={(e) => setSurveyFields({...surveyFields, title: e.target.value})}
              />
            </Grid>
            </Grid>
            {questionFields.length > 0 && questionFields.map(questionField => (<Grid container spacing={2} key={questionField.id}>
            <Grid item xs={12} sm={6}>
                <TextField
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Question Title"
                value={questionField.title || ""}
                onChange={e => changeQuestionHandler(questionField.id, e)}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Question Type</FormLabel>
                <RadioGroup aria-label="input_type" name="input_type" value={questionField.input_type || "textbox"} onChange={e => changeQuestionHandler(questionField.id, e)}>
                    <FormControlLabel value="textbox" control={<Radio />} label="Textbox" />
                    <FormControlLabel value="mc" control={<Radio />} label="Multiple Choice" />
                    <FormControlLabel value="ls" control={<Radio />} label="Likert Scale" />
                </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={2}>
                <IconButton disabled={questionFields.length === 1} onClick={() => removeQuestionHandler(questionField.id)}>
                <RemoveIcon />
                </IconButton>
                <IconButton onClick={e => addQuestionHandler(questionField.id)}>
                <AddIcon />
                </IconButton>
            </Grid>
              {questionField.input_type==="mc" && questionField.choices && questionField.choices.map(choice => (
              <Grid item xs={12} sm={2} key={choice.id}>
                <TextField
                name="choices"
                required
                id={choice.id.toString()}
                label="Choice Title"
                value={choice.name || ""}
                onChange={e => changeChoiceHandler(questionField.id, e)}
                />
                <IconButton disabled={questionField.choices.length === 1} onClick={() => removeChoiceHandler(questionField.id, choice.id)}>
                <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => addChoiceHandler(questionField.id)}>
                <AddIcon />
                </IconButton>
              </Grid>
              
              ))
              }
              {questionField.input_type==="ls" && <Grid item xs={12} >
              {<FormControl className={classes.formControl}>
                    <InputLabel id="select-label">Input Specification</InputLabel>
                    <Select
                      labelId="select-label"
                      value={questionField.input_spec_id || ""}
                      name="input_spec_id"
                      onChange={e => changeQuestionHandler(questionField.id, e)}
                    >{inputSpecFields.map(inputSpec =>(<MenuItem key={inputSpec.id} value={inputSpec.id}>{inputSpec.name}</MenuItem>))}
                    </Select>
                </FormControl>
                
                }
                </Grid>}
            
            </Grid>))}
          
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            {props.match.params.id?"Update":"Create"}
          </Button>
        </form>
    </div>


}

export default QuestionsScreen;