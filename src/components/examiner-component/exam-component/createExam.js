import { useEffect, useContext, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';


import axios from 'axios';
import cookies from 'js-cookie';

import { ExamContext } from '../../../App';
import { BASEURL } from '../../../App';

import Navbarr from '../../header/navbar';
import NewExamForm from '../../../forms/newExamForm';

const CreateExam = () => {

    const [courseList, setCourseList] = useState([]);

    const { alert, handleAlert } = useContext(ExamContext);

    // const navigate = useNavigate();
    const ref = useRef(true);

    useEffect( () => {
        if (ref.current) {

            const token = cookies.get('token');
            axios({
                method: 'get',
                // url: 'http://localhost:5000/api',
                url: `${BASEURL}/examiner/course`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                handleAlert(true, res.data.msg, 'success');
                setCourseList(res.data.courseDetails);
            })
            .catch(e => {
                console.log(e);
                handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            });
        }

        return () => ref.current = false;
    })


    return (
        <>
            <Navbarr />
            <NewExamForm courseList={courseList} />
            
            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>
        </>
    )
}

export default CreateExam;