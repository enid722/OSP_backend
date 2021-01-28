import axios from 'axios';
import { INPUT_SPEC_LIST_FAIL, INPUT_SPEC_LIST_REQUEST, INPUT_SPEC_LIST_SUCCESS, QUESTION_LIST_FAIL, QUESTION_LIST_REQUEST, QUESTION_LIST_SUCCESS, QUESTION_SAVE_FAIL, QUESTION_SAVE_REQUEST, QUESTION_SAVE_SUCCESS} from '../constants/questionConstants';


const listQuestions = (surveyId) => async (dispatch) => {

    try{
    dispatch({type: QUESTION_LIST_REQUEST});
    const {data} = await axios.get("/api/surveys/"+surveyId+"/questions");
    dispatch({type: QUESTION_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: QUESTION_LIST_FAIL, payload: error.message});
    }
}

const saveQuestions = (surveyId, oldQuestions, differences) => async (dispatch) => {
    try{
        dispatch({type: QUESTION_SAVE_REQUEST, payload: differences});

        //handle add request
        Object.keys(differences.added).forEach(function(prop) {
            //To create questions or choices
            console.log("Start Handling Add Request");
            console.log("property name" +prop);
            console.log(differences.added[prop]);
            if (Object.keys(differences.added[prop]).length > 1){ //To add a new question
                console.log("Create New Question: ")
                console.log(differences.added[prop])
                const {title :newTitle, input_type:newInputType, input_spec_id:newInputSpecId} = differences.added[prop];
                axios.post("/api/surveys/"+surveyId+"/questions", {title: newTitle, survey_id:surveyId, input_type:newInputType, input_spec_id:newInputSpecId})
                .then((response) => {
                    //create choices
                    console.log(response);
                    if (response.status = 200 && differences.added[prop].choices){
                        return axios.post("/api/questions/"+response.data.id+"/choices", differences.added[prop].choices);
                    }
                })
                .then((response) => {
                    console.log('Response', response);
                    return (response);
                });  
            }else{ //To add new choices to existing questions
                console.log("For existing Question: ");
                console.log(oldQuestions[prop]);
                console.log("Create New Choice: ");
                console.log(differences.added[prop].choices);
                const createIndexes = Object.keys(differences.added[prop].choices);
                const newChoices = createIndexes.map( i => differences.added[prop].choices[i]);
                console.log(newChoices);
                axios.post("/api/questions/"+oldQuestions[prop].id+"/choices", newChoices)
                .then((response)=>{
                    console.log('Response', response);
                    return (response);
                })
                
            }
        });

          
        //handle delete request
        Object.keys(differences.deleted).forEach(function(prop) {
            //To delete questions or choices
            console.log("Start Handling Delete Request");
            console.log("property name: " +prop);
            console.log(differences.deleted[prop]);
            if (typeof differences.deleted[prop] === 'undefined'){ //deleted a questions
                console.log("Cascade delete Question: ")
                console.log(oldQuestions[prop]);
                axios.delete("/api/questions/"+oldQuestions[prop].id)
                .then((response)=>{
                    console.log('Response', response);
                    return (response.data);
                })
            }else{ //delete choices
                console.log("For existing Question: ");
                console.log(oldQuestions[prop]);
                console.log("Delete Choices:")
                const deleteIndexes = Object.keys(differences.deleted[prop].choices);
                const deteleChoiceIds = deleteIndexes.map(i=> oldQuestions[prop].choices[Number(i)].id); //get a array of choiceId to be deleted
                console.log(deteleChoiceIds);
                axios.delete("/api/questions/"+oldQuestions[prop].id+"/choices", { data: deteleChoiceIds })
                .then((response)=>{
                    console.log('Response', response);
                    return (response.data);
                })
            }
        });
        //handle update request
        Object.keys(differences.updated).forEach(function(prop) {
            //To delete questions or choices
            console.log("Start Handling Update Request");
            console.log("property name: " +prop);
            console.log(differences.updated[prop]);
            if (Object.keys(differences.updated[prop]).length > 1 || !(differences.updated[prop].hasOwnProperty('choices'))){ //update question
                console.log("update question:");
                console.log(oldQuestions[prop]);
                //PUT update question
                axios.put("/api/questions/"+oldQuestions[prop].id, {update:differences.updated[prop], original:oldQuestions[prop]})
                .then((response)=>{
                    console.log('Response', response);
                    return (response.data);
                })
            }
                
            if (differences.updated[prop].hasOwnProperty('choices')){
                //update choices
                console.log("update choices")
                console.log(differences.updated[prop].choices);
                
                const updateIndexes = Object.keys(differences.updated[prop].choices);
                console.log(updateIndexes);
                console.log(differences.updated[prop].choices[[updateIndexes[0]]]);
                
                const createChoices = updateIndexes.map(i=> typeof differences.updated[prop].choices[Number(i)].id !== 'number'?differences.updated[prop].choices[Number(i)]:{});
                console.log(createChoices);
                //create new choices
                axios.post("/api/questions/"+oldQuestions[prop].id+"/choices", createChoices)
                .then((response)=>{
                    console.log('Response', response);
                    return (response);
                })


                const newChoicesName = updateIndexes.map( i => differences.updated[prop].choices[i]);
                console.log(newChoicesName);
                const updateChoiceIds = updateIndexes.map(i=> oldQuestions[prop].choices[Number(i)].id);
                console.log(updateChoiceIds);
                const newChoices = newChoicesName.map((c, i)=> c ={id:updateChoiceIds[i], name:c.name});
                axios.put("/api/choices/", newChoices)
                .then((response)=>{
                    console.log('Response', response);
                    return (response.data);
                })
            }
            


        });
        
        dispatch({type: QUESTION_SAVE_SUCCESS, payload: differences});
        
    }
    catch(error){
        dispatch({type: QUESTION_SAVE_FAIL, payload: error.message});
    }
}

const listInputSpecs = () => async (dispatch) => {

    try{
    dispatch({type: INPUT_SPEC_LIST_REQUEST});
    const {data} = await axios.get("/api/input_specs/");
    dispatch({type: INPUT_SPEC_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: INPUT_SPEC_LIST_FAIL, payload: error.message});
    }
}

export {listQuestions, listInputSpecs, saveQuestions};