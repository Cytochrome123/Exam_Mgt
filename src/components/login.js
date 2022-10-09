import { useContext } from 'react';
import {Alert} from 'react-bootstrap';

import LoginForm from "../forms/login";
import { ExamContext } from '../App';

import { Container } from 'react-bootstrap';
import Navbarr from './header/navbar';

const Login = () => {
    const { alert, handleAlert } = useContext(ExamContext);


    return(
        <div>
            <Navbarr />
            <Container>
                <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                    <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                    <p>
                        {alert.msg}
                    </p>
                </Alert>


                <LoginForm handleAlert={handleAlert} />
            </Container>
        </div>
    )
}

export default Login;