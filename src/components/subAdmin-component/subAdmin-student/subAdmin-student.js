import { useState, useEffect, useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import  { Table }  from 'react-bootstrap';

import cookies from 'js-cookie';
import axios from 'axios';
import NewStudentForm from '../../../forms/newStudent';
import Navbarr from '../../header/navbar';
import { BASEURL } from '../../../App';

const SubAdminStudents = () => {
    const [ students, setStudents ] = useState({
        totalStudents: 0,
        studentList: []
    });

    const ref = useRef(true);
    const navigate = useNavigate();

    useEffect( () => {
        if (ref.current) {

            // ref.current = false;
            
            studentsData();

            return () => {
                ref.current = false;
            }
        }
    }, [students])

    // NEED TO GET A WAY TO MAKE THE COMPONENT UPDATE ITSELF, DEPENDENCY ARRAY BEHAVING ABNORMALLY

    function studentsData() {
        const token = cookies.get('token');
            // async function fetchData () {
                axios({
                    method: 'get',
                    // url: `http://localhost:5000/api`,
                    url: `${BASEURL}/subAdmin/students`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res);
                    setStudents(prevData => ({
                        ...prevData.studentList,
                        totalStudents: res.data.studentCount,
                        studentList: res.data.studentsList
                        // ...prevData,
                        // totalStudents: res.data.studentCount
                    }))
                })
                .catch(e => console.log(e));
            // }
    }

    // const addNewStudent = (event, formData) => {
    //         Passing event isn't allowed anym

    const viewStudent = async (id) => {
            navigate(`/subAdmin/student/${id}`)
    }

    const deleteStudent = async (id) => {
        const token = cookies.get('token');
        await axios({
            method: 'delete',
            // url: `http://localhost:5000/api/`,
            url: `${BASEURL}/subAdmin/student/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })
        .then(res => {
            console.log(res);
            studentsData();
        })
        .catch(e => console.log(e));
    };

    

    return (
        <div>
            <Navbarr />
            <div>Students --- { students.totalStudents }</div>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Created date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.studentList.map((student,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{student.firstName} {student.lastName} </td>
                            <td> {student.email} </td>
                            <td> {student.status} </td>
                            <td> {student.createdDate} </td>
                            <td>
                                <button onClick={() => viewStudent(student._id)} >View</button>
                                <button onClick={() => deleteStudent(student.studentData._id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <NewStudentForm 
                studentsData = {studentsData}
            />
        </div>
    )
}



export default SubAdminStudents;