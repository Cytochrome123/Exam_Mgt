import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Card, Button, Badge } from 'react-bootstrap';

import axios from 'axios';
import cookies from 'js-cookie';
import { BASEURL } from "../../App";
import Navbarr from "../header/navbar";

// import Navbarr from '../header/navbar';

const AllExams = () => {

    const [exams, setExams ] = useState([])

    const ref = useRef(true);
    // const { examId } = useParams();
    const navigate = useNavigate();
    
    const token = cookies.get('token');

    useEffect( () => {
        if (ref.current) {
            axios({
                method: 'get',
                // url: 'http://localhost:5000/api',
                url: `${BASEURL}/student/exams`,
                // params: examId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setExams(res.data.allExams)
            })
            .catch(e => {
                console.log(e)
                if(e.response.data === 'Unauthorized') navigate('/login')
            })
        }

        return () => ref.current = false;
    })

    console.log(exams)

    const openExam = (id, subject) => {
        // navigate(`/student/exam/${id}/${subject}/questions`)
        navigate(`/student/exam/${id}/${subject}/instructions`);

    }

    return (
        <div>
            <Navbarr />
            {exams.map((exam, index) => (
                <div key={index} onClick={() => openExam(exam.allExams._id, exam.allExams.subject)} style={{cursor: 'pointer'}}>{exam.allExams.subject}</div>
            ))} 
            
        </div>
    )
}

export default AllExams;