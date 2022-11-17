import { Component } from 'react';
import axios from 'axios';

import Navbarr from '../header/navbar';


class adminSubAdmin extends Component {
    constructor() {
        super();
        this.state = {
            subAdmin: []
        }
    }

    // Either I make the require directly or make the require part of the class method so that I can use it later

    componentDidMount() {
        this.subAdminData();
    }

    subAdminData = () => {
        axios({
            method: 'get',
            // url: 'http://localhost:5000/api'
            url: `${process.env.BASEURL}/admin/subAdmin`,
        })
        .then(res => console.log(res))
        .catch (e => console.log(e));
    }

    render() {
        return (
            <div>
                <Navbarr />
            </div>
        )
    }

    
}

export default adminSubAdmin;