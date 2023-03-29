import Navbar from "./header/navbar"

import axios from 'axios';
// import cookies from 'js-cookie';
import { useEffect } from 'react';

const Home = () => {

    let data = {
        firstName: 'TESt',
        lastName: 'Headache',
        phoneNumber: '3456789',
        email: 'testhead1@gmail.com',
        password: '12345678',
        'State of Origin': 'Lagos'
    }
    // let decoded
    useEffect( () => {
        axios({
            method: 'post',
            url: 'https://shy-plum-swordfish-sari.cyclic.app/api/register',
            data,
            headers: {
                // 'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
                // Authorization: `Bearer ${token}`
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                // Authorization: `Bearer `
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        });
    })

    return (
        <div>
            <Navbar />

            {/* {if (decoded.role) {

            }} */}

        </div>
        
    )
}

export default Home;