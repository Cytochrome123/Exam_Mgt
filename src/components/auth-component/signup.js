import { useContext } from "react";
import { Alert } from 'react-bootstrap'


import SignupForm from "../../forms/signup";
import { ExamContext } from '../../App';
import Navbarr from "../header/navbar";
// import Alertt from '../utils/alert';

const Signup = () => {

    const { alert, handleAlert } = useContext(ExamContext);

    return(
        <div className='auth'>
            <Navbarr />
            <SignupForm handleAlert={handleAlert} />

            
            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>

        </div>
    )
}

export default Signup;