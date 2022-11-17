import { useState } from "react";

import axios from 'axios';
import cookies from 'js-cookie';

const NewStudentForm = (props) => {

    const [ formData, setFormData ] = useState({
        firstName: '',
		lastName: '',
		fatherName: '',
		motherName: '',
		studentId: '',
		phoneNumber: '',
		address: '',
		city: '',
		state: '',
		email: '',
		password: '',
		dob: '',
		gender: ''
    });
    // let event;

    const handleChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        console.log(formData);
    }

    const addNewStudent = (event) => {
        event.preventDefault();
        const token = cookies.get('token');
        const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
        axios({
            method: 'post',
            // url: 'http://localhost:5000/api',
            url: `${BASEURL}/subAdmin/student/new`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            props.studentsData();
        })
        .catch(e => console.log(e));
    }


    return (
        <form onSubmit={ addNewStudent }>
            <input type='text' name='firstName' placeholder='First name' onChange={handleChange} value={formData.firstName} />
            <input type='text' name='lastName' placeholder='Last name' onChange={handleChange} value={formData.lastName} />
            <input type='text' name='fatherName' placeholder='Father name' onChange={handleChange} value={formData.fatherName} />
            <input type='text' name='motherName' placeholder='Mother name' onChange={handleChange} value={formData.motherName} />
            <input type='text' name='studentId' placeholder='Student ID' onChange={handleChange} value={formData.studentId} />
            <input type='number' name='phoneNumber' placeholder="Phone number" onChange={handleChange} value={formData.phoneNumber} />
            <input type='text' name='address' placeholder='Address' onChange={handleChange} value={formData.address} />
            <input type='text' name='city' placeholder='City' onChange={handleChange} value={formData.city} />
            <input type='text' name='state' placeholder='State' onChange={handleChange} value={formData.state} />
            <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
            <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />
            <input type='date' name='dob' placeholder="DOB" onChange={handleChange} value={formData.dob} />
            <input type='gender' name='gender' placeholder="Gender" onChange={handleChange} value={formData.gender} />

            <button type='submit'>Create Student</button>
        </form>
    )
}

export default NewStudentForm;