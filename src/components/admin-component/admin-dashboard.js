import { Component } from 'react';
import axios from 'axios';


// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Navbarr from '../header/navbar';
import { BASEURL } from '../../App';


class AdminDashboard extends Component {
  constructor() {
    super();

    this.state = {
      totalSubAdmin: 0,
      totalExaminers: 0,
      totalExams: 0,
      totalStudent: 0
    };
    
  }


  componentDidMount() {
    axios({
      method: 'get',
      // url: 'http://localhost:5000/api'
      url: `${BASEURL}/admin/dashboard`,
    })
    .then(res => console.log(res))
    .catch(e => console.log(e))
  }

  render() {
    return (
      <div>
        <Navbarr />
      </div>
    );
  }
}

export default AdminDashboard;