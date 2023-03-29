import { useEffect, useRef, useState, useContext } from 'react';
import { Alert, Table } from 'react-bootstrap'

import axios from 'axios';
import cookies from 'js-cookie';

import NewCourseModal from '../../utils/modals/newCourseModal';
import { ExamContext } from '../../App';
import { BASEURL } from '../../App';
import Navbarr from '../header/navbar';



const Courses = () => {
    
    const [courses, setCourses] = useState({
        courseDetails: [],
        totalCourse: 0
    });
    
    const { alert, handleAlert } = useContext(ExamContext);
    const ref = useRef(true);

    useEffect( () => {
        if (ref.current) {
            courseData();
        }

        return () => ref.current = false;
    })

    async function courseData() {
        const token = cookies.get('token');
            await axios({
                method: 'get',
                // url: 'http://localhost:5000/api',
                url: `${BASEURL}/examiner/course`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                handleAlert(true, res.data.msg, 'success');
                setCourses(prev => ({
                    ...prev,
                    totalCourse: res.data.totalCourse,
                    courseDetails: res.data.courseDetails
                }))
            })
            .catch(e => {
                handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            });
    }

    return (
        <>
            <Navbarr />
            <NewCourseModal courseData={courseData} />
            
            <p>Courses {courses.totalCourse}</p>
            
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.courseDetails.map((course,index) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{course.defaultCourses.name} {course.defaultCourses.description} </td>
                            <td> {course.description} </td>
                            <td> {course.status} </td>
                            <td> {course.createdDate} </td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        
            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>
        </>
    )
}


export default Courses;