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
            console.log(decoded)

                
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

    // setAuthenticatedUser = (authenticatedState, data) => {
    //     return {
    //         authenticated: authenticatedState,
	// 		firstName: data.firstName,
	// 		lastName: data.lastName,
	// 		role: data.role,
    //     }
    // }

    // const cond = () => {
    //     if ()
    // }

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

// class Navbarr extends Component {
//     constructor(){
//         super();
//         this.state = {
//             authenticated: false,
//             firstName: '',
//             lastName: '',
//             role: '',
//         }
//     }

//     componentDidMount() {
//         const token = cookies.get('token')
//             if (token) {
//                 const decoded = jwtDecode(token);
//                 console.log(decoded)

                
//                 this.setState({
//                     authenticated: true,
//                     firstName: decoded.firstName,
//                     lastName: decoded.lastName,
//                     role: decoded.role,
//                 })
//             }
//     }

//     // componentDidUpdate() {
//     //     const token = cookies.get('token')
//     //         if (token) {
//     //             const decoded = jwtDecode(token);
//     //             console.log(decoded)

                
//     //             // this.setState({
//     //             //     authenticated: true,
//     //             //     firstName: decoded.firstName,
//     //             //     lastName: decoded.lastName,
//     //             //     role: decoded.role,
//     //             // })
//     //         }
//     // }

//     logOutUser = () => {
//         cookies.remove('token');
//         // cookies.remove('type');
//         this.setState({
//             authenticated: false,
//             firstName: '',
//             lastName: '',
//             role: '',
//         })
//         // navigate('/login')
//     }


//     render() {
//         let { authenticated, firstName } = this.state;
//         return (
//             <Navbar bg="dark" variant="dark">
//                 <Container>
//                 <Navbar.Brand href="/">Exam Mgt</Navbar.Brand>
//                 <Nav className="text-right">
//                     <Nav.Link href="/">Home</Nav.Link>
//                     {authenticated ? 
//                         <Nav.Link href="" onClick={this.logOutUser}>Logout</Nav.Link> 
//                         : <Nav.Link href="/login">Login</Nav.Link>
//                     }
//                     {firstName ? 
//                         <Dropdown>
//                             <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
//                             {firstName}
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu variant="dark">
//                                 <Dropdown.Item href="#/action-1" active>
//                                     Action
//                                 </Dropdown.Item>
//                                 <Dropdown.Item href="#">Profile</Dropdown.Item>
//                                 <Dropdown.Item href="#">Logout</Dropdown.Item>
                            
//                             </Dropdown.Menu>
//                         </Dropdown>                         
//                         : <Nav.Link href="/signup">Sign up</Nav.Link>}
                    
//                 </Nav>
//                 </Container>
//             </Navbar>
//         )
//     }
// }



export default Navbarr;