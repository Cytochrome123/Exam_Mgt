import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import  { Table }  from 'react-bootstrap';

import axios from 'axios';
import cookies from 'js-cookie';

import RequestExaminerForm from '../../forms/requestExaminer';
import Navbarr from '../header/navbar';

class SubAdminExaminers extends Component {
    constructor() {
        super();
        this.state = {
            examinersList: [],
            totalExaminers: 0
        }
    }

    componentDidMount() {
        this.examinerData();
    }

    // componentDidUpdate() {
    //     this.examinerData();
    // }

    examinerData = async () => {
        const token = cookies.get('token');
        console.log(token);
        const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
        // localStorage.setItem('token');
        // let token = localStorage.getItem('token')
        await axios({
            method: 'get',
            // url: 'http://localhost:5000/api',
            url: `${BASEURL}/subAdmin/examiners`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJodWRoYXlmYWgiLCJsYXN0TmFtZSI6ImlzbWFpbCIsInVzZXJJZCI6IjYzMDAxODQ3OTg1MzZhMjNkNDdjOTI1NCIsInJvbGUiOiJzdWJBZG1pbiIsImlhdCI6MTY2MjY0Nzk2M30.GhzVLl1deyZcT9Gi8QVqIRfsHPZ3U4NZm6ey1GefsZo`
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log(res);
            this.setState({
                examinersList: res.data.examinersList,
                totalExaminers: res.data.count
            })
        }).catch(e => console.log(e));
    }

    // requestNewExaminer = async (event, formData) => {
    //     event.preventDefault();
    //     const token = cookies.get('token');
    //     await axios({
    //         method: 'post',
    //         url: 'http://localhost:5000/api/subAdmin/examiner/new',
    //         data: formData,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //     .then(res => {
    //         console.log(res);
    //         this.examinerData();
    //     })
    //     .catch(e => console.log(e));
    // }

    deleteExaminer = async (id) => {
        const token = cookies.get('token');
        const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
        await axios({
            method: 'delete',
            // url: `http://localhost:5000/api`,
            url: `${BASEURL}/subAdmin/examiner/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            }
        })
        .then(res => {
            console.log(res);
            this.examinerData();
        })
        .catch(e => console.log(e));
    }

    render() {
        const { examinersList, totalExaminers} = this.state;

        return (
            <>
                <Navbarr />
                <div>My Examiners ----  {totalExaminers} </div>
                <br />
                <NavLink  to={`/subAdmin/students`}>View Students</NavLink>
                    {/* <div key={index} > */}
                        {/* <p>{examiner.email}</p>
                        <button onClick={() => this.deleteExaminer(examiner._id) }>Delete</button> */}
                        {/* <table>
                            <tr>
                                <th>S/N</th>
                                <th>Name</th>
								<th>Email</th>
								<th>Status</th>
								<th>Created date</th>
								<th>Actions</th>
                            </tr>
                            {examinersList?.map((examiner, index) => (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{examiner.firstName} {examiner.lastName} </td>
                                    <td> {examiner.email} </td>
                                    <td> {examiner.status} </td>
                                    <td> {examiner.createdDate} </td>
                                </tr>
                            ))}
                        </table> */}

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
                                {examinersList?.map((examiner, index) => (
                                    <tr key={index} >
                                        <td>{index + 1}</td>
                                        <td>{examiner.firstName} {examiner.lastName} </td>
                                        <td> {examiner.email} </td>
                                        <td> {examiner.status} </td>
                                        <td> {examiner.createdDate} </td>
                                        <td> <button onClick={() => this.deleteExaminer(examiner._id) }>Delete</button> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    {/* </div> */}


                {/* <RequestExaminerForm
                    requestNewExaminer={this.requestNewExaminer}
                /> */}
                <RequestExaminerForm />
            </>
        )
    }
}

export default SubAdminExaminers;