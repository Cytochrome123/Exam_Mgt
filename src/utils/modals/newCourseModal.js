import { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'

import axios from 'axios';
import cookies from 'js-cookie';
import { ExamContext } from '../../App';
// import CreateCourseForm from '../../forms/createCourseForm';


const NewCourseModal = (props) => {

    const [show, setShow] = useState(false);
    const [defaultCourses, setDefaultCourses] = useState();

    const { alert, handleAlert } = useContext(ExamContext)

    const [formData, setFormData] = useState({
        courseId: '',
        description: ''
    })

    const handleChange = (event) => {
        console.log(event.target.value);
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    console.log(formData);


    const loadDef = async () => {
        const token = cookies.get('token');
        await axios({
            method: 'get',
            // url: 'http://localhost:5000/api',
            url: `${process.env.BASEURL}/examiner/default-courses`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            handleAlert(true, res.data.msg, 'success');
            setDefaultCourses(res.data.defCourse)
        })
        .catch(e => {
            console.log(e);
            handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    const handleShow = () => {
        loadDef();
        setShow(prevState => !prevState);
        // handleAlert(false);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = cookies.get('token');
        await axios({
            method: 'post',
            url: 'http://localhost:5000/api/examiner/course',
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            handleAlert(true, res.data.msg, 'success');
            props.courseData();
            setShow(prevState => !prevState);
        })
        .catch(e => {
            console.log(e);
            handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            setShow(prevState => !prevState);
        });
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                New Course
            </Button>
            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <CreateCourseForm 
                        defaultCourses={defaultCourses}
                        handleSubmit={handleSubmit}
                    /> */}
                    <Form >
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Select aria-label="Default select example" name='courseId' value={formData.name} onChange={handleChange} >
                            <option disabled>E.g. B.Sc</option>
                            <option></option>
                            {defaultCourses?.map( (def, index) => <option key={index} value={def._id}>{def.name} - {def.description} </option> )}
                            
                        </Form.Select>
                        <Form.Control
                            type="select"
                            placeholder="E.g. B.Sc Autocomplete"
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="E.g. Bachelor of Technology"
                            name='description' value={formData.description} onChange={handleChange}
                        />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit} >
                    Create
                </Button>
                </Modal.Footer>
            </Modal>


            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>
        </>
    )
}

export default NewCourseModal;