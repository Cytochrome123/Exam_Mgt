import { useState } from "react";
import { Form, InputGroup, Button } from 'react-bootstrap';

import axios from 'axios';
import cookies from 'js-cookie';
import { BASEURL } from "../App";

const EditStudentForm = (props) => {

    const [ formData, setFormData ] = useState({
        firstName: props.studentDetails.firstName,
		lastName: props.studentDetails.lastName,
		fatherName: props.studentDetails.fatherName,
		motherName: props.studentDetails.motherName,
		studentId: props.studentDetails.studentId,
		phoneNumber: props.studentDetails.phoneNumber,
		address: props.studentDetails.address,
		city: props.studentDetails.city,
		state: props.studentDetails.state,
		email: props.studentDetails.email,
		password: props.studentDetails.password,
		dob: props.studentDetails.dob,
		gender: props.studentDetails.gender
    });
    // let event;

    const handleChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }
    console.log(formData);

    const updateStudent = (event) => {
        event.preventDefault();
        const token = cookies.get('token');
        axios({
            method: 'patch',
            // url: `http://localhost:5000/api/subAdmin/student/${props.studentDetails._id}`,
            url: `${BASEURL}/subAdmin/student/${props.studentDetails._id}`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(e => console.log(e));
    }


    return (
        <Form>
            <InputGroup className="mb-3 col-6">
                <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
                <Form.Control
                    type="text"
                    defaultValue={props.studentDetails.firstName}
                    name='firstName'
                    onChange={handleChange}
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
                <Form.Control
                    type="text"
                    defaultValue={props.studentDetails.lastName}
                    name='lastName'
                    onChange={handleChange}
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Father's Name</InputGroup.Text>
                <Form.Control
                    type="text"
                    defaultValue={props.studentDetails.fatherName}
                    name='fatherName'
                    onChange={handleChange}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Mother's Name</InputGroup.Text>
                <Form.Control
                    type="text"
                    defaultValue={props.studentDetails.motherName}
                    name='motherName'
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Student's Id</InputGroup.Text>
                <Form.Control
                    type="number"
                    defaultValue={props.studentDetails.studentId}
                    name='studentId'
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
                <Form.Control
                    type="number"
                    defaultValue={props.studentDetails.phoneNumber}
                    name='phoneNumber'
                    onChange={handleChange}
                />
            </InputGroup>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                defaultValue={props.studentDetails.email}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                defaultValue={props.studentDetails.email}
            />
            </Form.Group>
            
            <Button variant="outline-secondary" id="button-addon1" onClick={updateStudent}>
                Update
            </Button>
            
        </Form>
    )
}

export default EditStudentForm;