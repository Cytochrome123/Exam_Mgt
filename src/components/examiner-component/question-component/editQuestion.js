import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import cookies from 'js-cookie';

import Navbarr from '../../header/navbar';

const EditQuestion = () => {

    const [questionData, setQuestionData] = useState();

    const {examId, id} = useParams();
    
    const ref = useRef(true);

    useEffect( () => {
        if (ref.current) {

            const token = cookies.get('token');
            axios({
                method: 'get',
                // url: `http://localhost:5000/api`,
                url: `${process.env.BASEURL}/examiner/exam/${examId}/question/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res);
                setQuestionData(res.data.question)
            })
            .catch(e => {
                console.log(e);
            })
        }

        return () => ref.current = false;
    });
    return (
        <>
            <Navbarr />
            {JSON.stringify(questionData) }</>
    )
}

export default EditQuestion;