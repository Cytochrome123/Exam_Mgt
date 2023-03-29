import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';

const Navbarr = () => {

    const [authenticatedUser, setAuthenticatedUser] = useState({
        authenticated: false,
		firstName: '',
		lastName: '',
		role: '',
    })
    const ref = useRef(true);
    const navigate = useNavigate();

    useEffect( () => {
        if (ref.current) {
            const token = cookies.get('token')
            if (token) {
            const decoded = jwtDecode(token);
            // console.log(decoded)

                
                setAuthenticatedUser(prev => ({
                    ...prev,
                    authenticated: true,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    role: decoded.role,
                }))
            }
        }

        return () => ref.current = false;
    }, [authenticatedUser])


    const logOutUser = () => {
        cookies.remove('token');
        // cookies.remove('type');
        setAuthenticatedUser(prev => ({
            ...prev,
            authenticated: false,
            firstName: '',
            lastName: '',
            role: '',
        }))
        navigate('/login')
    }


    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Exam Mgt</Navbar.Brand>
          <Nav className="text-right">
            {authenticatedUser.authenticated ? 
                <Nav.Link href="" onClick={logOutUser}>Logout</Nav.Link> 
                : <Nav.Link href="/login">Login</Nav.Link>
            }
            <Nav.Link href="/signup">Sign up</Nav.Link>

            {authenticatedUser.role === 'subAdmin' ? (
                <>
                    <Nav.Link href="/subAdmin/examiners">Examiners</Nav.Link>
                    <Nav.Link href="/subAdmin/students">Students</Nav.Link>
                </>
            ) : authenticatedUser.role === 'examiner' ? (
                <>
                    <Nav.Link href="/examiner/course">Course</Nav.Link>
                    <Nav.Link href="/examiner/exam">Exam</Nav.Link>
                    <Nav.Link href="/examiner/students">Students</Nav.Link>
                </>
            ) : authenticatedUser.role === 'student' ? (
                <>
                    <Nav.Link href="#">Exami</Nav.Link>
                </>
            ) : authenticatedUser.role}

            <Nav.Link href="#">{authenticatedUser.firstName}</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    )
}



export default Navbarr;