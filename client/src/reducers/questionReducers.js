import { INPUT_SPEC_LIST_FAIL, INPUT_SPEC_LIST_REQUEST, INPUT_SPEC_LIST_SUCCESS, QUESTION_LIST_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_SAVE_FAIL, QUESTION_SAVE_REQUEST, QUESTION_SAVE_SUCCESS} from "../constants/questionConstants";


function questionListReducer(state = {questions:[]}, action){

    switch (action.type){
        case QUESTION_LIST_REQUEST:
            return {loading:true, questions: []};
        case QUESTION_LIST_SUCCESS:
            return {loading:false, questions: action.payload};
        case QUESTION_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}



function QuestionsSaveReducer(state = {questions:[]}, action){

    switch (action.type){
        case QUESTION_SAVE_REQUEST:
            return {loading:true};
        case QUESTION_SAVE_SUCCESS:
            return {loading:false, success: true, questions: action.payload};
        case QUESTION_SAVE_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

function inputSpecListReducer(state = {inputSpecs:[]}, action){

    switch (action.type){
        case INPUT_SPEC_LIST_REQUEST:
            return {loading:true, inputSpecs: []};
        case INPUT_SPEC_LIST_SUCCESS:
            return {loading:false, inputSpecs: action.payload};
        case INPUT_SPEC_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}


export {questionListReducer, QuestionsSaveReducer, inputSpecListReducer};

