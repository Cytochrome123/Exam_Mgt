import { useState, useEffect, useRef } from "react";

import axios from 'axios';

const SignupForm = (props)=>{

    const [ formData , setFormData ] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        college: ''
    });
    const [collegeList, setCollegeList ] = useState();
    // const [ optionList, setOptionList ] = useState();

    const ref = useRef(true);

    const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
    useEffect( () => {
        if (ref.current) {
            axios({
                method: 'get',
                // url: 'http://localhost:5000/api'
                url: `${BASEURL}/collegeList`,
            })
            .then(res => {
                console.log(res);
                props.handleAlert(true, res.data.msg, 'success');
                setCollegeList(res.data.collegeList);
            })
            .catch(e => {
                console.log(e);
                props.handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            });

            return () => {
                ref.current = false;
            }
        }
    })

    function handleChange(event){
        console.log(event.target.name);
        console.log(event.target.value);
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
        })
    }
    console.log(formData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setFormData()

        await axios({
            method: 'post',
            // url: 'http://localhost:5000/api/signup',
            url: `${BASEURL}/signup`,
            data: formData
        })
        .then(res => {
            console.log(res.data.msg);
            props.handleAlert(true, res.data.msg, 'success');
        })
        .catch(e => {
            console.log(e);
            props.handleAlert(true, e.response.data.msg ? e.response.data.msg : e.message, 'danger');
        });
    }

    return (
        <div className="form mt-5">
            <div>Signup form</div>

            <form onSubmit={handleSubmit}>
                <input type='text' name='firstName' placeholder='First name' onChange={handleChange} value={formData.firstName} />
                <input type='text' name='lastName' placeholder='Last name' onChange={handleChange} value={formData.lastName} />
                <input type='number' name='phoneNumber' placeholder="Phone number" onChange={handleChange} value={formData.phoneNumber} />
                <select name='college' value={formData.college} onChange={handleChange} >
                    <option></option>
                    {collegeList?.map((list, index) => <option key={index} value={list._id} >{list.name}</option> )}
                    
                </select>
                <input type='option' name='çollege' placeholder="College" onChange={handleCollegeList}/>
                <input type='email' name='email' placeholder="Email" onChange={handleChange} value={formData.email} />
                <input type='password' name='password' placeholder="Password" onChange={handleChange} value={formData.password} />

                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}

function handleCollegeList(event){
    // axios({
    //     method:'get',
    //     url: 'http://localhost:5000/api/collegelist',
    // })
    // .then(response => {
    //     // for (let list of response.data.collegeList){
    //     //     console.log(list)
    //     // }
    //     for( let list of Object.values(response.data.collegeList)){
    //         console.log(list)
    //     }
    // })
    // .catch(err => {
    //     throw err;
    // })
    // setFormData(prevData => {
    //     return {
    //         ...prevData,

    //     }
    // })
}

export default SignupForm;