import { Component } from 'react';
import axios from 'axios';

import Navbarr from '../header/navbar';


class adminExaminer extends Component {
    constructor() {
        super();
        this.state = {
            examinerData: [],
            totalExaminers: 0,
            currentStatus: {
                id: '',
                status: ''
            }
        }
        // this.requestUpdateStatus = ''
    }

    // Either I make the require directly or make the require part of the class method so that I can use it later

    componentDidMount() {
        this.examinerData();
    }

    examinerData = () => {
        const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
        axios({
            method: 'get',
            // url: 'http://localhost:5000/api'
            url: `${BASEURL}/admin/examiner`,
        })
        .then(res => {
            console.log(res);
            this.setState({
                examinerData: res.data.examinerData,
                totalExaminers: res.data.count
            })
        })
        .catch (e => console.log(e));

        
    }


    updateExaminerStatus = (id, newStatus) => {
        this.setState({
            currentStatus: {
                id: id,
                status: newStatus
            }
        })
        // this.setState(prevState => {
        //     console.log(prevState)
        //     return {
        //         ...prevState,
        //         [prevState.currentStatus]: {
        //             [prevState.id]: id,
        //             [prevState.status]: newStatus
        //         }
        //     }
        // })
        console.log(this.state.currentStatus)
        // this.requestUpdateExaminerStatus();
        this.examinerData();
    }

    requestUpdateExaminerStatus = () => {
        const { currentStatus } = this.state
        const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'
        axios({
            method: 'patch',
            // url: 'http://localhost:5000/api',
            url: `${BASEURL}/admin/status`,
            data: currentStatus
        })
        .then(res => console.log(res)).catch(e => console.log(e));
    }


    render() {

        let { examinerData, totalExaminers } = this.state;

        

        return (
            <div>
                <Navbarr />
                <h2>Examiners ------ {totalExaminers}</h2>
                { examinerData.map(examiner => (
                    <div>
                        <p>{examiner.email}</p>
                        {/* *********The onclick event still returning thr last state when first triggered!!!!!!******** */}
                        <button onClick={ () => this.updateExaminerStatus(examiner._id, 'approved') } >Approve</button>
                        <button onClick={ () => this.updateExaminerStatus(examiner._id, 'declined') } >Decline</button>

                        {/* <select onSelect={ () => this.updateExaminerStatus(examiner.id, 'approved') }>
                            <option>Update status</option>
                            <option value={examiner.id}>Approve</option>
                            <option value={examiner.id}>Decline</option>
                        </select> */}
                    </div>
                )) }
            </div>
        )
    }

    
}

export default adminExaminer;