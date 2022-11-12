import { useContext } from "react";
import { Alert } from 'react-bootstrap'


import SignupForm from "../../forms/signup";
import { ExamContext } from '../../App';
import Navbarr from "../header/navbar";
// import Alertt from '../utils/alert';

const Signup = () => {

    const { alert, handleAlert } = useContext(ExamContext);

    // const [alert, setAlert] = useState({
    //     show: false,
    //     msg: '',
    //     type: ''
    // }) 

    // const handleAlert = (show, msg, type) => {
    //     setAlert({
    //         show,
    //         msg,
    //         type
    //     })
    // }

    return(
        <div className='auth'>
            <Navbarr />
            <SignupForm handleAlert={handleAlert} />


            {/* {setTimeout(() => {
                
            }, 2000)} */}
            
            <Alert variant={alert.type} show={alert.show} onClose={() => handleAlert(false)} dismissible>
                <Alert.Heading>Oh {alert.type} !</Alert.Heading>
                <p>
                    {alert.msg}
                </p>
            </Alert>

            {/* <Alertt /> */}
        </div>
    )
}

export default Signup;