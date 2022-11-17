import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import cookies from 'js-cookie';

const LoginForm = (props)=>{

    const [ formData , setFormData ] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    function handleChange(event){
        console.log(event.target.name);
        console.log(event.target.value);
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
        });
        // console.log(formData);
    }
    console.log(formData);


    const handleSubmit = (event) => {
        event.preventDefault();
        // setFormData({
        //     email: '',
        //     password: '',
        // })
    // console.log(history)
    console.log(process.env.BASEURL)
        axios({
            method: 'post',
            // url: 'http://localhost:5000/api/login',
            url: 'https://exam-mgt-server.herokuapp.com/api/login',
            // url: `${process.env.BASEURL}/login`,
            data: formData,
            // withCredentials: true
        })
        .then(res => {
            console.log(res);
            // console.log(res.data.token)
            cookies.set('token', res.data.token );
            props.handleAlert(true, 'successfully Loged In!!!', 'success');

            if(res.data.userType === 'admin') {
                navigate('/admin')
            } else if(res.data.userType === 'subAdmin') {
                navigate('/subAdmin/examiners')
            } else if(res.data.userType === 'examiner') {
                navigate('/examiner/course');
            } else {
                navigate('/student/allExams')
            }
        })
        .catch(e => {
            console.log(e);
            props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return(
        <div className="form">
            <div>Login form</div>  <Link to='/subAdmin/examiners' >Sub</Link>

            <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
                <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />

                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

export default LoginForm;