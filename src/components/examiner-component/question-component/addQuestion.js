import { useState, useContext } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import cookies from 'js-cookie';

import LinkQuestionForm from '../../../forms/linkQuestionForm.js';
import MultipleChoiceQuestionForm from '../../../forms/multipleChoiceQuestionForm';
import TheoryQuestionForm from '../../../forms/theoryQuestionForm';

import { ExamContext } from '../../../App';
import { BASEURL } from '../../../App';


const AddQuestion = () => {

    const {examId} = useParams();
    const [queType, setQueType] = useState({type: ''});
    const { alert, handleAlert } = useContext(ExamContext);
    
    const navigate = useNavigate();

    const determineQueType = (event) => {
        console.log(event.target.value)
        if (event.target.value) {
            setQueType({type: event.target.value});
        }
        
    };
    console.log(queType)
    console.log(examId)
    
    const submitQuestion = (formData, optionsList) => {
        const finalValues = {
            examId: examId,
            ...formData,
            // question: formData.question,
            description: '',
            options: optionsList,
            

        };
        console.log(finalValues)
        const correctAnswer = optionsList.filter(option => option.answer);
        console.log(finalValues)
        // console.log(JSON.parse(optionsList))
        if (correctAnswer.length === 0) {
            handleAlert(true, 'You need to set the correct option before preoceeding!', 'danger');
        } else {
            const token = cookies.get('token');
            axios({
                method: 'post',
                // url: `http://localhost:5000/api`,
                url: `${BASEURL}/examiner/exam/${examId}/question`,
                data: finalValues,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                handleAlert(true, res.data.msg, 'success');
                navigate('/examiner/exam');
            })
            .catch(e => {
                console.log(e);
                handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            })
        }
        
    }
    // const setQue = () => {
    //     if (queType.type === 'Multiple Choice') {
    //         return <MultipleChoiceQuestionForm handleSubmit={submitQuestion} />
    //     } else if (queType.type == 'Theory') {
    //         return <TheoryQuestionForm />
    //     } else if (queType.type == 'Google Link') {
    //         return <LinkQuestionForm />
    //     } else {
    //         return <h1>The question type is yet to be selected</h1>
    //     }
    // }

    return (
        <>
            {/* <Form.Group className="mb-3" >
                <Form.Label>Passing Mark</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="40"
                    name='passingMarks' value={'formData.passingMarks'} onChange={'handleChange'}
                />
            </Form.Group> */}
            <Form.Group className="mb-3" >
                <Form.Label>Question Type</Form.Label>
                <Form.Select aria-label="Default select example" name='type' value={queType.type} onChange={determineQueType} >
                    <option></option>
                    <option value='Multiple Choice'>Multitple Choice</option>
                    <option value='Theory'>Theory</option>
                    <option value='Google Link'>Google Link</option>
                </Form.Select>
            </Form.Group>
            {/* {setQue()} */}
            {/* {if (queType == 'Multiple Choice') {
                <MultipleChoiceQuestionForm />
            } else if (queType == 'Theory') {
                <MultipleChoiceQuestionForm />
            } else {
                <MultipleChoiceQuestionForm />
            }} */}
            {queType.type === 'Multiple Choice' ? <MultipleChoiceQuestionForm handleSubmit={submitQuestion} /> : queType.type === 'Theory' ? <TheoryQuestionForm /> : queType === 'Google Link' ? <LinkQuestionForm /> : <h1>The question type is yet to be selected</h1>}


            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>
        </>
    )
}

export default AddQuestion;