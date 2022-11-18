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
        // name: { _id: '', name: '', description: '' },
        // description: '',
        // courseId: '',
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
                console.log(res);
                handleAlert(true, res.data.msg, 'success');
                setCourses(prev => ({
                    ...prev,
                    totalCourse: res.data.totalCourse,
                    courseDetails: res.data.courseDetails
                }))
            })
            .catch(e => {
                console.log(e);
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

// class Courses extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             show: false,
//             course: {
// 				name: { _id: '', name: '', description: '' },
// 				description: '',
// 				courseId: '',
// 			},
//             defaultCourses: []
//         }
//     }

//     componentDidMount() {
//         this.getCourses();
//     }

//     handleShow = () => this.setState()

//     getCourses = () => {
//         const token = cookies.get('token');
//         axios({
//             method: 'get',
//             url: 'http://localhost:5000/api/examiner/course',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(res => console.log(res))
//         .catch(e => console.log(e));
//     }

//     render() {
//         return (
//             <div>
//                 <p>Courses</p>


//                 <Button variant="primary" onClick={handleShow}>
//                     Launch demo modal
//                 </Button>

//                 <Modal show={show} onHide={handleShow}>
//                     <Modal.Header closeButton>
//                     <Modal.Title>Modal heading</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                         Save Changes
//                     </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>

            
//         )
//     }
// }

export default Courses;