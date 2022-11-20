import { useNavigate, useParams } from "react-router-dom";

import Navbarr from "../header/navbar";

const Instructions = () => {

    const { id, subject } = useParams();

    const navigate = useNavigate();

    const start = () => {
        navigate(`/student/exam/${id}/${subject}/questions`)
    }

    return (
        <div>

            <Navbarr />
            <div>Read through and answer all <br></br> <button onClick={start}>START</button></div>
        </div>
    )
}

export default Instructions