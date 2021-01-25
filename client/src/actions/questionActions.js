import axios from 'axios';
import { INPUT_SPEC_LIST_FAIL, INPUT_SPEC_LIST_REQUEST, INPUT_SPEC_LIST_SUCCESS, QUESTION_DETAILS_FAIL, QUESTION_DETAILS_REQUEST, QUESTION_DETAILS_SUCCESS, QUESTION_LIST_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_SAVE_FAIL, QUESTION_SAVE_REQUEST, QUESTION_SAVE_SUCCESS} from '../constants/questionConstants';


const listQuestions = (surveyId) => async (dispatch) => {

    try{
    dispatch({type: QUESTION_LIST_REQUEST});
    const {data} = await axios.get("/api/surveys/"+surveyId+"/questions");
    console.log(data);
    dispatch({type: QUESTION_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: QUESTION_LIST_FAIL, payload: error.message});
    }
}
/*
const detailsQuestion = (surveyId) => async (dispatch) => {

    try{
    dispatch({type: QUESTION_DETAILS_REQUEST});
    const {data} = await axios.get("/api/surveys/"+surveyId);
    dispatch({type: QUESTION_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: QUESTION_DETAILS_FAIL, payload: error.message});
    }
}*/

const saveQuestions = (surveyId, questions) => async (dispatch) => {
    console.log(surveyId);
    console.log(questions);
    /*try{
        dispatch({type: QUESTION_SAVE_REQUEST, payload: questions});
        const {data} = await axios.put("/api/surveys/" + surveyId +"/questions", questions);        
        dispatch({type: QUESTION_SAVE_SUCCESS, payload: data});
        
    }
    catch(error){
        dispatch({type: QUESTION_SAVE_FAIL, payload: error.message});
    }*/
}

const listInputSpecs = () => async (dispatch) => {

    try{
    dispatch({type: INPUT_SPEC_LIST_REQUEST});
    const {data} = await axios.get("/api/input_specs/");
    console.log(data);
    dispatch({type: INPUT_SPEC_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: INPUT_SPEC_LIST_FAIL, payload: error.message});
    }
}

export {listQuestions, listInputSpecs, saveQuestions};