import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Badge } from 'react-bootstrap';

import axios from 'axios';
import cookies from 'js-cookie';

import Navbarr from '../../header/navbar';
import { BASEURL } from '../../../App';

const AssignStudent = () => {

    const [details, setDetails] = useState({
        examDetails: {
            examCode: '',
            subject: ''
        },
        students: [],
        selectedStudents: []
    })

    const ref = useRef(true);
    const { examId } = useParams();
    
    const token = cookies.get('token');

    useEffect( () => {
        if (ref.current) {

            axios({
                method: 'get',
                // url: 'http://localhost:5000/api',
                url: `${BASEURL}/examiner/students`,
                params: examId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                const studentsList = res.data.students.map(student => ({
                    ...student,
                    selected: false
                }))
                console.log(studentsList)

                setDetails(prev => ({
                    ...prev,
                    examDetails: {
                        examCode: res.data.examDetails.examCode,
                        subject: res.data.examDetails.subject
                    },
                    students: studentsList
                }))
            })
            .catch(e => {
                console.log(e)
            })
        }

        return () => ref.current = false;
    })

    const selectStudent = (studentId) => {

        const index = details.students.findIndex(student => student._id === studentId)
        details.students[index].selected = !details.students[index].selected;
        let selectedStudentIndex = details.selectedStudents.findIndex(
			(selectedStudentId) => selectedStudentId === studentId
		);

        const selected = details.selectedStudents.includes(studentId);
        if (selected) details.selectedStudents.splice(selectedStudentIndex, 1)
        else details.selectedStudents.push(studentId)

        setDetails(prev => ({
            ...prev,
            selectedStudents : details.selectedStudents
        }))
        
        // let index = details.students.findIndex((student) => student._id === studentId);
		// details.students[index].selected = !details.students[index].selected;
        // console.log(!details.students[index].selected)
    }

    
console.log(details)
    const assign = () => {
        if (details.selectedStudents.length === 0) {
            console.log('You must select at least a student')
        } else {
            axios({
                method: 'post',
                // url: `http://localhost:5000/api`,
                url: `${BASEURL}/examiner/student/assign`,
                data: {selectedStudents: details.selectedStudents},
                params: examId,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
            })
            .catch(e => console.log(e))
        }
    };

    return (
        <div>
            <Navbarr />
            <h1>{`${details.examDetails.subject} --- ${details.examDetails.examCode}`}</h1>

            <Button variant='secondary' onClick={assign} >{`Add Selected Students -  ${details.selectedStudents.length}`}</Button>

            {details.students.map(student => (

            <Card style={{ width: '18rem' }} className="mb-2" bg='secondary' >
                <Card.Body>
                    <Card.Title>{student.firstName} {student.lastName} {student.selected ? <Badge bg='success'>%</Badge> : null } </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                        <p>{student.studentDetails.gender}</p>
                        <span>{student.studentDetails.dob}</span>
                        <p>{student.studentDetails.state}</p>
                        <p>StudentId: {student.studentDetails.studentId}</p>
                    </Card.Text>
                    <Card.Footer onClick={() => selectStudent(student._id)}>Add</Card.Footer>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
            ))}
        </div>
    )
}

export default AssignStudent;