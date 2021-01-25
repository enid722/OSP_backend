import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { inputSpecListReducer, questionListReducer } from './reducers/questionReducers';
import { surveyDetailsReducer, surveyListReducer, surveySaveReducer } from './reducers/surveyReducers';

const initialState = {};

const reducer = combineReducers({
    surveyList: surveyListReducer, 
    surveyDetails: surveyDetailsReducer,
    surveySave: surveySaveReducer,
    questionList: questionListReducer,
    inputSpecList: inputSpecListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =  createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;   