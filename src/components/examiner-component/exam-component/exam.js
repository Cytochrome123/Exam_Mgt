import { useEffect, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Table, Button } from 'react-bootstrap';


import axios from 'axios';
import cookies from 'js-cookie';

import { ExamContext } from '../../../App';
import Navbarr from '../../header/navbar';
import AddQuestion from '../question-component/addQuestion';


const Exam = () => {

    const [exams, setExams] = useState({
        courseCount: 0,
        totalExam: 0,
        examDetails: []
    });

    const { alert, handleAlert } = useContext(ExamContext);

    const navigate = useNavigate();
    const ref = useRef(true);

    useEffect( () => {
        if (ref.current) {

            const token = cookies.get('token');
            axios({
                method: 'get',
                url: 'http://localhost:5000/api/examiner/exam',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                handleAlert(true, res.data.msg, 'success');
                setExams(prev => ({
                    ...prev,
                    totalExam: res.data.examCount,
                    examDetails: res.data.examDetails
                }))
            })
            .catch(e => {
                console.log(e);
                handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            });
        }

        return () => ref.current = false;
    })

    const createNewExam = () => {
        if (exams.courseCount === 0) {
            const msg = 'You cannot create new exam before adding new courses';
            handleAlert(true, msg, 'danger');
        }
        navigate('/examiner/exam/new');
    }

    const addNewQuestion = (examId) => {
        navigate(`/examiner/exam/${examId}/question/new`);
    }

    const viewQuestions = (examId) => {
        navigate(`/examiner/exam/${examId}/questions`);
    }

    return (
        <>
            <Navbarr />
        
            {exams.totalExam !== 0 ? `${exams.totalExam} exams` : 'No exam'} <br />

            <Button variant="secondary" onClick={createNewExam}>
                Create Exam
            </Button>


            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.examDetails.map((exam,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{exam.course.name} {exam.course.description} </td>
                            <td> {exam.description} </td>
                            <td> {exam.status} </td>
                            <td> {exam.createdDate} </td>
                            <td>
                                <Button onClick={ () => viewQuestions(exam._id) }>View Questions</Button>
                                <Button onClick={() => addNewQuestion(exam._id)}>Add Question</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            
            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>

            <AddQuestion />
        </>
    )
}

export default Exam;