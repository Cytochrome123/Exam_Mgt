import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import cookies from 'js-cookie';
import axios from 'axios';
import EditStudentForm from "../../../forms/editStudent";
import Navbarr from "../../header/navbar";

const EditStudent = () => {

    const [studentDetails, setStudentDetails] = useState({
        email: 'dfgh',
		firstName: '',
		lastName: '',
		mobileNumber: '',
		address: '',
		dob: '',
		gender: '',
		city: '',
		state: '',
		fatherName: '',
		motherName: '',
		studentId: '',
    });

    const ref = useRef(true);
    const { id } = useParams();
    console.log(id)

    useEffect( () => {
        if (ref.current) {
            // ref.current = false;
            // const { id } = this.props.match.params
            // const fetchData = ()
            const token = cookies.get('token');
            axios({
                method: 'get',
                url: `http://localhost:5000/api/subAdmin/student/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(res => {
                console.log(res);
                setStudentDetails(prevData => ({
                    ...prevData,
                    firstName: res.data.studentDetails.firstName,
                    lastName: res.data.studentDetails.lastName,
                    fatherName: res.data.studentDetails.fatherName,
                    motherName: res.data.studentDetails.motherName,
                    studentId: res.data.studentDetails.studentId,
                    phoneNumber: res.data.studentDetails.phoneNumber,
                    address: res.data.studentDetails.address,
                    city: 'res.data.studentDetails.city',
                    state: res.data.studentDetails.state,
                    email: res.data.studentDetails.email,
                    password: res.data.studentDetails.password,
                    dob: res.data.studentDetails.dob,
                    gender: res.data.studentDetails.gender,
                }));
            })
            .catch(e => console.log(e));

            return () => {
                ref.current = false;
            }
        }
    });

    return (
        <div>
            <Navbarr />
            <EditStudentForm studentDetails={studentDetails} />
        </div>
    )
}

export default EditStudent;