import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Table, Button } from 'react-bootstrap';

import axios from "axios";
import cookies from 'js-cookie';
import Navbarr from "../../header/navbar";


const ViewAssignedStudents = () => {

    const { examId } = useParams()
    const ref = useRef(true);

    const [data, setData] = useState({
        assignedStudents: [],
        count: 0,
        examDetails: {
            subject: '',
            examCode: '',
            examDate: '',
            startTime: ''
        }
    });

    const token = cookies.get('token');

    useEffect( () => {
        if (ref.current) {

            axios({
                method: 'get',
                url: `http://localhost:5000/api/examiner/exam/${examId}/students`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                setData(prev => ({
                    ...prev,
                    assignedStudents: res.data.assignedStudents,
                    count: res.data.count,
                    examDetails: {
                        examDate: res.data.examDetails.examDate,
                        startTime: res.data.examDetails.startTime
                    }
                }))
            })
            .catch(e => console.log(e))
        }

        return () => ref.current = false;
    })


    return (
        <>

            <Navbarr />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Student Id</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.assignedStudents.map((student,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{student.userDetails.name} </td>
                            <td> {student.userDetails.email} </td>
                            <td> {student.studentDetails.studentId} </td>
                            <td> {student.status} </td>
                            <td>
                                <Button onClick={ () => (student._id) }>Block / un</Button>
                                <Button onClick={() => (student._id)}>Remove Students</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ViewAssignedStudents;