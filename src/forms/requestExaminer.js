import { useState } from "react";

import axios from 'axios';
import cookies from 'js-cookie';

const RequestExaminerForm = (props) => {

    const [ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    })

    const handleChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
        console.log(formData);
    }

    const requestNewExaminer = async (event, formData) => {
        event.preventDefault();
        const token = cookies.get('token');
        const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
        await axios({
            method: 'post',
            // url: 'http://localhost:5000/api',
            url: `${BASEURL}/subAdmin/examiner/new`,
            data: formData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            this.examinerData();
        })
        .catch(e => console.log(e));
    }

    return (
        <form onSubmit={() => requestNewExaminer(formData)} >
            <input type='text' name='firstName' placeholder='First name' onChange={handleChange} value={formData.firstName} />
            <input type='text' name='lastName' placeholder='Last name' onChange={handleChange} value={formData.lastName} />
            <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
            <input type='number' name='phoneNumber' placeholder="Phone number" onChange={handleChange} value={formData.phoneNumber} />
            <button type='submit'>Request Examiner</button>
        </form>
    )
}

export default RequestExaminerForm;