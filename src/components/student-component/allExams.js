import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Badge } from 'react-bootstrap';

import axios from 'axios';
import cookies from 'js-cookie';

import Navbarr from '../header/navbar';

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
                url: 'http://localhost:5000/api/student/exams',
                // params: examId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                // res.data.allExams.map(all => (
                //     setExams(prev => ([
                //         ...prev,
                //         all
                //     ]))
                // ))
                // res.data.allExams.forEach(all => (
                //     setExams(prev => ([
                //         ...prev,
                //         all
                //     ]))
                // ))
                // setExams(prev => ([
                //     ...prev,
                //     res.data.allExams
                // ]))
                setExams(res.data.allExams)
            })
            .catch(e => {
                console.log(e)
                if(e.response.data == 'Unauthorized') navigate('/login')
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
            {exams.map((exam, index) => (
                <div key={index} onClick={() => openExam(exam.allExams._id, exam.allExams.subject)} style={{cursor: 'pointer'}}>{exam.allExams.subject}</div>
            ))} 
            {/* <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link href="#first">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#disabled" disabled>
                        Disabled
                        </Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card> */}
        </div>
    )
}

export default AllExams;