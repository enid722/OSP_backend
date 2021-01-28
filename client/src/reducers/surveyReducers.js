import { SURVEY_DELETE_FAIL, SURVEY_DELETE_REQUEST, SURVEY_DELETE_SUCCESS, SURVEY_DETAILS_FAIL, SURVEY_DETAILS_REQUEST, SURVEY_DETAILS_SUCCESS, SURVEY_LIST_FAIL, SURVEY_LIST_REQUEST, SURVEY_LIST_SUCCESS, SURVEY_SAVE_FAIL, SURVEY_SAVE_REQUEST, SURVEY_SAVE_SUCCESS} from "../constants/surveyConstants";


function surveyListReducer(state = {surveys:[]}, action){

    switch (action.type){
        case SURVEY_LIST_REQUEST:
            return {loading:true, surveys: []};
        case SURVEY_LIST_SUCCESS:
            return {loading:false, surveys: action.payload};
        case SURVEY_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function surveyDetailsReducer(state = {survey:{}}, action){

    switch (action.type){
        case SURVEY_DETAILS_REQUEST:
            return {loading:true, survey: {}};
        case SURVEY_DETAILS_SUCCESS:
            return {loading:false, survey: action.payload};
        case SURVEY_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}


function surveySaveReducer(state = {survey:{}}, action){

    switch (action.type){
        case SURVEY_SAVE_REQUEST:
            return {loading:true};
        case SURVEY_SAVE_SUCCESS:
            return {loading:false, success: true, survey: action.payload};
        case SURVEY_SAVE_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function surveyDeleteReducer(state = {survey:{}}, action){

    switch (action.type){
        case SURVEY_DELETE_REQUEST:
            return {loading:true};
        case SURVEY_DELETE_SUCCESS:
            return {loading:false, success: true, survey: action.payload};
        case SURVEY_DELETE_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

export {surveyListReducer, surveyDetailsReducer, surveySaveReducer, surveyDeleteReducer};

