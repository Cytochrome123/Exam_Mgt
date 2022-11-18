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
        // const token = cookies.get('token');
        // await axios({
        //     method: 'get',
        //     url: `http://localhost:5000/api/subAdmin/student/${id}`,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${token}` 
        //     }
        // })
        // .then(res => {
        //     console.log(res);
            navigate(`/subAdmin/student/${id}`)
            // this.studentData();
            // console.log(this.props.history)
            // console.log(this.context.history)
            // this.context.history.push(`/subAdmin/student/${id}`);
            // let nex = `/subAdmin/student/${id}`
            // <Redirect to="/" />
        // })
        // .catch(e => console.log(e));
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

            {/* {students.studentList.map((student,index) => (
                <div key={index}>
                    <p>{ student.email }</p>
                    <button onClick={() => viewStudent(student._id)} >View</button>
                    <button onClick={() => deleteStudent(student.studentData._id)} >Delete</button>
                </div>
            ))} */}
            <NewStudentForm 
                studentsData = {studentsData}
            />
        </div>
    )
}

// class SubAdminStudents extends Component{
//     constructor() {
//         super();
//         this.state = {
//             totalStudents: 0,
//             studentList: []
//         }
        
//     }
// // console.log(props)
//     componentDidMount() {
//         // this.studentData();
//         console.log(this.props)
//     }

//     studentData() {
//         const token = cookies.get('token');
//         axios({
//             method: 'get',
//             url: `http://localhost:5000/api/subAdmin/students`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(res => {
//             console.log(res);
//             this.setState({
//                 totalStudents: res.data.studentCount,
//                 studentList:  res.data.studentsList
//             })
//             console.log(this.state)
//         })
//         .catch(e => console.log(e));
//     }

//     // addNewStudent = (event, formData) => {
//     //     event.preventDefault();
//     //     const token = cookies.get('token');
//     //     axios({
//     //         method: 'post',
//     //         url: 'http://localhost:5000/api/subAdmin/student/new',
//     //         data: formData,
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //             Authorization: `Bearer ${token}`
//     //         }
//     //     })
//     //     .then(res => {
//     //         console.log(res);
//     //         this.studentData();
//     //     })
//     //     .catch(e => console.log(e));
//     // }

//     viewStudent = async (studentId) => {
//         // const token = cookies.get('token');
//         // await axios({
//         //     method: 'get',
//         //     url: `http://localhost:5000/api/subAdmin/student/${studentId}`,
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         Authorization: `Bearer ${token}` 
//         //     }
//         // })
//         // .then(res => {
//         //     console.log(res);
//         //     this.studentData();
//         // console.log(this.props.history)
//         // console.log(this.context.history)
//         //     this.context.history.push(`/subAdmin/student/${studentId}`);
//         //     // let nex = `/subAdmin/student/${studentId}`
//         //     <Redirect to="/" />
//         // })
//         // .catch(e => console.log(e));
//     }

//     deleteStudent = async (studentId) => {
//         const token = cookies.get('token');
//         await axios({
//             method: 'delete',
//             url: `http://localhost:5000/api/subAdmin/student/${studentId}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}` 
//             }
//         })
//         .then(res => {
//             console.log(res);
//             this.studentData();
//         })
//         .catch(e => console.log(e));
//     }

//     render() {
//         const { totalStudents, studentList } = this.state;

//         return (
//             <div>
//                 <div>Student ---- {totalStudents} </div>

//                 {studentList.map((student,index) => (
//                     <div key={index}>
//                         <p>{ student.email }</p>
//                         <button onClick={() => this.viewStudent(student.studentData.studentId)} >View</button>
//                         <button onClick={() => this.deleteStudent(student.studentData.studentId)} >Delete</button>
//                     </div>
//                 ))}

//                 <NewStudentForm 
//                     // createStudent = {this.addNewStudent}
//                 />
//             </div>
//         )
//     }
// }

export default SubAdminStudents;