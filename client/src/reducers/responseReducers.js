import { RESPONSE_LIST_FAIL, RESPONSE_LIST_REQUEST, RESPONSE_LIST_SUCCESS } from "../constants/responseConstants";


function responseListReducer(state = {responses:[]}, action){

    switch (action.type){
        case RESPONSE_LIST_REQUEST:
            return {loading:true, responses: []};
        case RESPONSE_LIST_SUCCESS:
            return {loading:false, responses: action.payload};
        case RESPONSE_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}

export {responseListReducer};

