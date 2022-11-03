import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { Card, Button, Form, Alert } from 'react-bootstrap';

import { ExamContext } from '../../App';


const Questions = () => {
    
    const ref = useRef(true);
    
    const [ details, setDetails ] = useState({
        examId: '',
        questionId: '',
        question: '',
        description: '',
        totalQuestion: 0,
        options: [],
        optionType: '',
        duration: 0,
        questions: [],
        questionNum: 0,
        singleOptionChoice: '',
        multipleOptionChoice: []
    });
    const { id, subject } = useParams();
    
    const { alert, handleAlert } = useContext(ExamContext);

    const token = Cookies.get('token');

    useEffect(() => {
        if(ref.current) {
            axios({
                method: 'get',
                url: `http://localhost:5000/api/student/exam/${id}/${subject}/question`,
                params: {questionNum: details.questionNum},
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                let singleOptChoice = ''
                if (res.data.existingAnswer) {
                    if (res.data.question.optionType === 'single') {
                        singleOptChoice = res.data.existingAnswer.answer
                    }
                }
                setDetails(prev => ({
                    ...prev,
                    examId: res.data.assignedExam._id,
                    questionId: res.data.question._id,
                    singleOptionChoice: singleOptChoice,
                    ...res.data.question
                }))
            })
            .catch(err => {
                console.log(err);
            }) 
        }

        return () => ref.current = false;
    })
    console.log(details)

    const nextQue = (questionNum) => {
        axios({
            method: 'get',
            url: `http://localhost:5000/api/student/exam/${id}/${subject}/questions`,
            params: {questionNum},
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            setDetails(prev => ({
                ...prev,
                exam: res.data.assignedExam._id,
                
                ...res.data.questions,
                questionNum
            }))
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    const chooseOption = (event) => {
        if (details.optionType === 'single') {
            setDetails(prev => ({
                ...prev,
                // [event.target.name]: event.target.value
                singleOptionChoice: event.target.value
            }))
        } else {
            setDetails(prev => ({
                ...prev,
                multipleOptionChoice: event.target.value
            }))
        }
    }

    const saveAnswer = () => {
        if (!details.singleOptionChoice) {
            let msg = 'Attempt question before saving the answer'
            handleAlert(true, msg, 'danger')
        } else {
            const { examId, questionId, singleOptionChoice, questionNum } = details
            const answerObj = {
                examId,
                questionId,
                answer: singleOptionChoice,
                status: 'ATTEMPTED'
            }
            axios({
                method: 'post',
                url: `http://localhost:5000/api/student/exam/${id}/${subject}/question`,
                data: answerObj,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                handleAlert(true, res.data, 'success')
                nextQue(questionNum + 1);
            })
            .catch(e => {
                handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            })
        }
    }

    const submitExam = () => {
        axios({
            method: 'put',
            url: `http://localhost:5000/api/student/exam/${id}/submit`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(e => console.log())
    }

    return (
        <div>
            
            {details.question ? (

            <Card className="text-center">
                <Card.Header className='mb-5'>{details.question}</Card.Header>
                <Card.Body>
                    <Card.Title className='mb-5'>{details.question} {details.description}</Card.Title>
                    <Card.Text>
                        {details.optionType === 'single' ? 
                            details.options.map(option => (
                                <Form.Check
                                    inline
                                    label={option.value}
                                    name="singleOptionChoice"
                                    type='radio'
                                    id={`inline-}-1`}
                                    value={option.value}
                                    // onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                    onChange={chooseOption}
                                />
                            )) : 
                            details.options.map(option => (
                                            <Form.Check 
                                                type='checkbox'
                                                id={`default-`}
                                                label={option.value}
                                                // onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                            />
                                        )
                            )
                        }
                    </Card.Text>
                    <Button variant="primary" onClick={saveAnswer}>Save</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                    2 days ago <button onClick={() => nextQue(details.questionNum + 1)}>Next</button>
                    <div><button onClick={submitExam}>Submit</button></div>
                </Card.Footer>
            </Card>
            ) : <div>Could'nt load the questions!!</div>}

            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>
        </div>
    )
}

export default Questions