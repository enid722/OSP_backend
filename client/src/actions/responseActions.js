import axios from 'axios';
import { RESPONSE_LIST_FAIL, RESPONSE_LIST_REQUEST, RESPONSE_LIST_SUCCESS } from '../constants/responseConstants';

const listResponse = (questionId) => async (dispatch) => {

    try{
    dispatch({type: RESPONSE_LIST_REQUEST});
    const {data} = await axios.get("/api/questions/"+ questionId+"/responses");
    dispatch({type: RESPONSE_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: RESPONSE_LIST_FAIL, payload: error.message});
    }
}

export {listResponse};