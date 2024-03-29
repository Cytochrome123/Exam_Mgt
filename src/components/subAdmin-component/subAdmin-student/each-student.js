import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import cookies from 'js-cookie';
import { Button, Modal } from 'react-bootstrap';
import EditStudentForm from '../../../forms/editStudent';
import Navbarr from '../../header/navbar';
import { BASEURL } from '../../../App';

const EachStudent = () => {
    const [studentDetails, setStudentDetails] = useState({
        firstName: '',
		lastName: '',
        email: '',
		studentId: '',
		mobileNumber: '',
		fatherName: '',
		motherName: '',
		address: '',
		dob: '',
		gender: '',
		city: '',
		state: '',
    });

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    const ref = useRef(true);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)

    useEffect( () => {
        if (ref.current) {
            ref.current = false;
            // const { id } = this.props.match.params
            const token = cookies.get('token');
            axios({
                method: 'get',
                // url: `http://localhost:5000/api`,
                url: `${BASEURL}/subAdmin/student/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(res => {
                console.log(res);
                setStudentDetails(prevDetails => ({
                    ...prevDetails,
                    firstName: res.data.studentDetails.firstName,
                    lastName: res.data.studentDetails.lastName,
                    email: res.data.studentDetails.email,
                    studentId: res.data.studentDetails.studentId,
                    phoneNumber: res.data.studentDetails.phoneNumber,
                    fatherName: res.data.studentDetails.fatherName,
                    motherName: res.data.studentDetails.motherName,
                    address: res.data.studentDetails.address,
                    dob: res.data.studentDetails.dob,
                    gender: res.data.studentDetails.gender,
                    city: res.data.studentDetails.city,
                    state: res.data.studentDetails.state,
                    
                }))
            })
            .catch(e => console.log(e));
        }
    });

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    return (
        <div>
            <Navbarr />
           <p>{ studentDetails.email }</p> 
           <p>{ studentDetails.dob }</p>
           <p>{ studentDetails.address }</p>

           <button onClick={() => navigate(`/subAdmin/student/${id}/edit`)}>Edit</button>

           <Button className="me-2 mb-2" onClick={() => handleShow(true)}>
            Full screen
            
            </Button>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditStudentForm studentDetails={studentDetails} />
                </Modal.Body>
            </Modal>
        </div>
    )
}



export default EachStudent;