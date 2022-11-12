import { useNavigate, useParams } from "react-router-dom"

const Instructions = () => {

    const { id, subject } = useParams();

    const navigate = useNavigate();

    const start = () => {
        navigate(`/student/exam/${id}/${subject}/questions`)
    }

    return (
        <div>Read through and answer all <br></br> <button onClick={start}>START</button></div>
    )
}

export default Instructions