import Navbar from "./header/navbar"

// import jwtDecode from 'jwt-decode';
// import cookies from 'js-cookie';
// import { useEffect } from 'react';

const Home = () => {

    // let decoded
    // useEffect( () => {
    //     // let cookieData = cookies.getJSON();

    //     // console.log(cookies.valueOf())

    //     const token = cookies.get('token')
    //     decoded = jwtDecode(token);
    //     console.log(decoded)
    // })

    return (
        <div>
            <Navbar />

            {/* {if (decoded.role) {

            }} */}

        </div>
        
    )
}

export default Home;