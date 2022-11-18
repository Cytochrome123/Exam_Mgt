import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import cookies from 'js-cookie';

import { ExamContext } from '../App';
import { BASEURL } from '../App';


const NewExamForm = (props) => {
    const [formData, setFormData] = useState({
        subject: '',
		course: '',
		examCode: '',
		password: '',
		totalMarks: '',
		passingMarks: '',
		negativeMarks: 0,
		examDate: null,
		startTime: null,
		endTime: null,
		hideDuration: true,
		duration: '',
    })

    console.log(formData.endTime - formData.startTime)

    const { handleAlert } = useContext(ExamContext);

    const handleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    console.log(formData);

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = cookies.get('token');
        axios({
            method: 'post',
            // url: 'http://localhost:5000/api/',
            url: `${BASEURL}/examiner/exam`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            handleAlert(true, res.data.msg, 'success');
        })
        .catch(e => {
            console.log(e);
            handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return (
        <>
            <Form >
                <Form.Group className="mb-3" >
                    <Form.Label>Subject(course)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="E.g. Osteology"
                        name='subject' value={formData.subject} onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Course</Form.Label>
                    <Form.Select aria-label="Default select example" name='course' value={formData.course} onChange={handleChange} >
                        <option disabled>E.g. B.Sc</option>
                        <option></option>
                        {props.courseList.map(course => (
                            <option key={course._id} value={course._id}>
                                {`${course.defaultCourses.name} - ${course.description}`}
                            </option>
                        ))}
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Exam code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="02eRTEiOEO"
                        name='examCode' value={formData.examCode} onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="******"
                        name='password' value={formData.password} onChange={handleChange}
                    />
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" >
                    <Form.Label>Total Mark</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="100"
                        name='totalMarks' value={formData.totalMarks} onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Passing Mark</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="40"
                        name='passingMarks' value={formData.passingMarks} onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Negative Mark</Form.Label>
                    <Form.Select aria-label="Default select example" name='negativeMarks' value={formData.negativeMarks} onChange={handleChange} >
                        <option></option>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Exam DAte</Form.Label>
                    {/* <Form.Date aria-label="Default select example" name='negativeMarks' value={formData.negativeMarks} onChange={handleChange} >
                        
                    </Form.Date> */}
                    <input type='date' name='examDate' value={formData.examDate} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Start Time</Form.Label>
                    <input type='time' name='startTime' value={formData.startTime} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>End Time</Form.Label>
                    <input type='time' name='endTime' value={formData.endTime} onChange={handleChange}/>
                </Form.Group>
                <Button variant="secondary" onClick={handleSubmit}>
                    Create
                </Button>
            </Form>
        </>
    )
}


export default NewExamForm;