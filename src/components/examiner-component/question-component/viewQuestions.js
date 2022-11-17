import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import cookies from 'js-cookie';
import { Card, Button, Form } from 'react-bootstrap';
import Navbarr from "../../header/navbar";


const ViewQuestions = () => {
    
    const {examId} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        questionsList: [],
		questionCount: 0,
		totalMarks: 0,
		examDate: '',
		startTime: '',
		status: false,
    });

    const ref = useRef(true);

    useEffect( () => {
        if (ref.current) {

            const token = cookies.get('token');
            const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
            axios({
                method: 'get',
                // url: `http://localhost:5000/api`,
                url: `${BASEURL}/examiner/exam/${examId}/questions`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                setData(prev => ({
                    ...prev,
                    questionsList: res.data.questions,
                    questionCount: res.data.count,
                    totalMarks: res.data.examDetails.totalMarks,
                    examDate: res.data.examDetails.examDate,
                    startTime: res.data.examDetails.startTime
                }))
            })
            .catch(e => {
                console.log(e);
            })
        }

        return () => ref.current = false;
    });

    const editQuestion = (examId, id) => {
        navigate(`/examiner/exam/${examId}/question/${id}`);
    }

    return (
        <>
            <Navbarr />
            <p>View Questions</p>
            <h2>{data.examDate} --- {data.startTime}</h2>
            <p>{data.totalMarks}</p>

            {data.questionsList.map(question => (

                <Card className="">
                    <Card.Header><Card.Title>{question.question}</Card.Title></Card.Header>
                    <Card.Body>
                        {/* <Card.Title>{question.question}</Card.Title> */}
                        <Card.Text>
                            {question.description} additional content.
                            {/* options */}
                            {question.optionType === 'single' ? 
                                question.options.map(option => (
                                    <Form.Check
                                        inline
                                        label={option.value}
                                        name="group1"
                                        type='radio'
                                        id={`inline-}-1`}
                                        // onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                    />
                                )) : 
                                    question.options.map(option => (
                                        <Form.Check 
                                            type='checkbox'
                                            id={`default-`}
                                            label={option.value}
                                            // onClick={() => handleCorrectAnswer(formData.optionType, index)}
                                        />
                                    )
                                )
                            }
                            {/* {question.options.map(option => (
                                <p>{option.value}</p>
                            ))} */}
                            </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <div className="text-right">
                            <Button onClick={() => editQuestion(examId, question._id)}>Edit</Button>
                            <Button>Delete</Button>
                        </div>
                        
                    </Card.Footer>
                </Card>
            ))}
        </>
    )
}

export default ViewQuestions;