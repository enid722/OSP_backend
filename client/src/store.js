import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { inputSpecListReducer, questionListReducer, QuestionsSaveReducer } from './reducers/questionReducers';
import { responseListReducer } from './reducers/responseReducers';
import { surveyDeleteReducer, surveyDetailsReducer, surveyListReducer, surveySaveReducer } from './reducers/surveyReducers';

const initialState = {};

const reducer = combineReducers({
    surveyList: surveyListReducer, 
    surveyDetails: surveyDetailsReducer,
    surveySave: surveySaveReducer,
    surveyDelete: surveyDeleteReducer,
    questionList: questionListReducer,
    questionSave: QuestionsSaveReducer,
    inputSpecList: inputSpecListReducer,
    responseList: responseListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =  createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;   