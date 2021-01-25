import axios from 'axios';
import { SURVEY_DETAILS_FAIL, SURVEY_DETAILS_REQUEST, SURVEY_DETAILS_SUCCESS, SURVEY_LIST_FAIL, SURVEY_LIST_REQUEST, SURVEY_LIST_SUCCESS, SURVEY_SAVE_FAIL, SURVEY_SAVE_REQUEST, SURVEY_SAVE_SUCCESS} from '../constants/surveyConstants';


const listSurveys = () => async (dispatch) => {

    try{
    dispatch({type: SURVEY_LIST_REQUEST});
    const {data} = await axios.get("/api/surveys");
    dispatch({type: SURVEY_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: SURVEY_LIST_FAIL, payload: error.message});
    }
}

const detailsSurvey = (surveyId) => async (dispatch) => {

    try{
    dispatch({type: SURVEY_DETAILS_REQUEST});
    const {data} = await axios.get("/api/surveys/"+surveyId);
    dispatch({type: SURVEY_DETAILS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: SURVEY_DETAILS_FAIL, payload: error.message});
    }
}

const saveSurvey = (survey) => async (dispatch) => {
    console.log(survey);
    try{
    dispatch({type: SURVEY_SAVE_REQUEST, payload: survey});
        if (!survey.id){
            const {data} = await axios.post("/api/surveys", survey);
            dispatch({type: SURVEY_SAVE_SUCCESS, payload: data});
        }else{
            const {data} = await axios.put("/api/surveys/" + survey.id, survey);        
            dispatch({type: SURVEY_SAVE_SUCCESS, payload: data});
        }
    }
    catch(error){
        dispatch({type: SURVEY_SAVE_FAIL, payload: error.message});
    }
}

export {listSurveys, detailsSurvey, saveSurvey};