import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {getSurveyList} from '../services/surveyService';


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
import { v4 as uuidv4 } from 'uuid';

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
  }));
  
function QuestionsScreen (props){

    const [survey, setSurvey] = useState({});
    const [isUpdated, setisUpdated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [questionFields, setQuestionFields] = useState([
        { id: uuidv4(), questionTitle: '', inputType: '' },
      ]);
    
    const { id: surveyId, title: surveyTitle, token: surveyToken} = survey;

    const classes = useStyles();

    const getSurvey = async () => {
        setError("");
        setIsLoading(true);
        await fetch('/api/surveys/'+props.match.params.id)
        .then( res => {
          if (!res.ok) { throw res }
          return res.json();
        })
        .then(survey => setSurvey(survey))
        .catch( err => {
          err.text().then( errorMessage => {
            setError(errorMessage)
          })})
        setIsLoading(false);
      };

    const updateSurvey = async () => {
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(survey)
        };
        await fetch('/api/surveys/'+props.match.params.id, options)
        .then( res => {
          if (!res.ok) { throw res }
          return res.json();
        })
        .then(res => console.log(res))
        .then(setisUpdated(true))
        .catch( err => {
          err.text().then( errorMessage => {
            setError(errorMessage)
          })})
        setIsLoading(false);
    }

    const createSurvey = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(survey)
        };
        await fetch('/api/surveys/', options)
        .then( res => {
          if (!res.ok) { throw res }
          return res.json();
        })
        .then(res => console.log(res))
        .then(setisUpdated(true))
        .catch( err => {
          err.text().then( errorMessage => {
            setError(errorMessage)
          })})
        setIsLoading(false);
    }

    useEffect(() => {
      if (isUpdated)
        props.history.push('/');
      if (props.match.params.id)
        getSurvey();
      return () => {
          //
      };
  },[isUpdated])


  const submitHandler = (e) =>{
    e.preventDefault();
    console.log("survey:", survey);
    console.log("questionFields:", questionFields);
    props.match.params.id?updateSurvey():createSurvey();
}

const changeSurveyHandler = (event) => {
    setSurvey({...survey, title:event.target.value});
  }

const changeQuestionHandler = (id, event) => {
    const newQuestionFields = questionFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setQuestionFields(newQuestionFields);
  }


const addQuestionHandler = () => {
    setQuestionFields([...questionFields, { id: uuidv4(),  questionTitle: '', inputType: '' }])
  }

  const removeQuestionHandler = id => {
    const values  = [...questionFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setQuestionFields(values);
  }

    return <div>

        <div className="form">
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="surveyTitle"
                label="Survey Title"
                value={surveyTitle?surveyTitle:""}
                onChange={e => changeSurveyHandler(e)}
              />
            </Grid>
            </Grid>
            { questionFields.map(questionField => (<Grid container spacing={2} key={questionField.id}>
            <Grid item xs={12} sm={6}>
                <TextField
                name="questionTitle"
                variant="outlined"
                required
                fullWidth
                id="questionTitle"
                label="Question Title"
                onChange={e => changeQuestionHandler(questionField.id, e)}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Question Type</FormLabel>
                <RadioGroup aria-label="inputType" name="inputType" value={questionFields.find(x=>x.id === questionField.id).inputType} onChange={e => changeQuestionHandler(questionField.id, e)}>
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
                <IconButton onClick={addQuestionHandler}>
                <AddIcon />
                </IconButton>
            </Grid>
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

    </div>

}

export default QuestionsScreen;