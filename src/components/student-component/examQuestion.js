import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form, Alert } from 'react-bootstrap';

import { ExamContext } from '../../App';
import { BASEURL } from "../../App";


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
        singleOptionChoice: 'o',
        multipleOptionChoice: {}
    });
    const { id, subject } = useParams();
    
    const { alert, handleAlert } = useContext(ExamContext);
    const navigate = useNavigate();

    const token = Cookies.get('token');

    useEffect(() => {
        if(ref.current) {
            axios({
                method: 'get',
                // url: `http://localhost:5000/api`,
                url: `${BASEURL}/student/exam/${id}/${subject}/question`,
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
                        singleOptChoice = res.data.existingAnswer.answer[0]
                    }
                    setDetails(prev => ({
                        ...prev,
                        // examId: res.data.assignedExam._id,
                        questionId: res.data.question._id,
                        singleOptionChoice: singleOptChoice,
                        ...res.data.question
                    }))
                } else {
                    setDetails(prev => ({
                        ...prev,
                        // examId: res.data.assignedExam._id,
                        questionId: res.data.question._id,
                        ...res.data.question
                    }))
                }
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
            // url: `http://localhost:5000/api`,
            url: `${BASEURL}/student/exam/${id}/${subject}/question`,
            params: {questionNum},
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            // setDetails(prev => ({
            //     ...prev,
            //     exam: res.data.assignedExam._id,
                
            //     ...res.data.questions,
            //     questionNum
            // }))
            let singleOptChoice = ''
            if (res.data.existingAnswer) {
                if (res.data.question.optionType === 'single') {
                    singleOptChoice = res.data.existingAnswer.answer[0]
                }
                setDetails(prev => ({
                    ...prev,
                    // examId: res.data.assignedExam._id,
                    questionId: res.data.question._id,
                    singleOptionChoice: singleOptChoice,
                    ...res.data.question,
                    questionNum
                }))
            } else {
                setDetails(prev => ({
                    ...prev,
                    // examId: res.data.assignedExam._id,
                    questionId: res.data.question._id,
                    ...res.data.question,
                    questionNum
                }))
            }
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
            if (details.multipleOptionChoice[event.target.name]){
                setDetails(prev => ({
                    ...prev,
                    multipleOptionChoice: {
                        ...prev.multipleOptionChoice,
                        [event.target.name]: null
                    },
                }))
            } else {

                setDetails(prev => ({
                    ...prev,
                    // multipleOptionChoice: event.target.value
                    multipleOptionChoice: {
                        ...prev.multipleOptionChoice,
                        [event.target.name]: event.target.value
                    }
                }))
            }
        }
    }

    const saveAnswer = () => {
        const { questionId, singleOptionChoice, multipleOptionChoice } = details

        if (!details.singleOptionChoice && !Object.entries(multipleOptionChoice)) {
            let msg = 'Attempt question before saving the answer'
            handleAlert(true, msg, 'danger')
        } else {

            let allSelectedOptions = [];

            Object.keys(multipleOptionChoice).forEach(key => {
                if (multipleOptionChoice[key]) {
                    allSelectedOptions.push(multipleOptionChoice[key]);
                }
            })

            console.log(allSelectedOptions)
            const answerObj = {
                examId: id,
                questionId,
                // answer: singleOptionChoice,
                answer: details.optionType === 'single' ? singleOptionChoice : allSelectedOptions,
                status: 'ATTEMPTED'
            }
            console.log(answerObj);
            axios({
                method: 'post',
                // url: `http://localhost:5000/api`,
                url: `${BASEURL}/student/exam/${id}/${subject}/question`,
                data: answerObj,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                handleAlert(true, res.data, 'success')
                // nextQue(questionNum + 1);
            })
            .catch(e => {
                handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            })
        }
    }

    const submitExam = () => {
        axios({
            method: 'put',
            // url: `http://localhost:5000/api`,
            url: `${BASEURL}/student/exam/${id}/submit`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
            navigate('/student/allExams')
        })
        .catch(e => console.log())
    }

    return (
        <div>
            
            {details.question ? (

            <Card className="text-center">
                <Card.Header className='mb-5'>Question {details.questionNum + 1}</Card.Header>
                <Card.Body>
                    <Card.Title className='mb-5'>{details.question} {details.description}</Card.Title>
                    <Card.Text>
                        {details.optionType === 'single' ? 
                            details.options.map((option, index) => {
                                // if (!details.singleOptionChoice) {

                                //     if (details.singleOptionChoice === )
                                // }
                                // console.log(details.singleOptionChoice === option.value)
                                // console.log(option)
                                return (

                                    <Form.Check
                                        inline
                                        label={option.value}
                                        name="singleOptionChoice"
                                        type='radio'
                                        id={`inline-}-1`}
                                        value={option.value}
                                        // onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                        onChange={chooseOption}
                                        checked={details.singleOptionChoice === option.value}
                                    />
                                )
                            }) : 
                            details.options.map(option => {
                                // console.log(option)
                                // console.log(details.multipleOptionChoice[option.key])
                                // console.log(details.multipleOptionChoice[option.key] === option.value);
                                // console.log(option.value)
                                return (
                                    <Form.Check 
                                        type='checkbox'
                                        id={`default-`}
                                        label={option.value}
                                        // onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                        name={option.key}
                                        value={option.value}
                                        onChange={chooseOption}
                                        // checked={details.multipleOptionChoice[option.key]}
                                        checked={details.multipleOptionChoice[option.key] === option.value}
                                    />
                                )
                            })
                        }
                    </Card.Text>
                    <Button variant="primary" onClick={saveAnswer}>Save</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                <button onClick={() => nextQue(details.questionNum - 1)}>Previous</button>2 days ago <button onClick={() => nextQue(details.questionNum + 1)}>Next</button>
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