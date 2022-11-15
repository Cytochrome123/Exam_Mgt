import { Component } from 'react';
import axios from 'axios';


import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Navbarr from '../header/navbar';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  width: '20%',
  // display: 'flex'
}));

// const darkTheme = createTheme({ palette: { mode: 'dark' } });
// const lightTheme = createTheme({ palette: { mode: 'light' } });


// const paper = (
//     // <Grid container spacing={2}>
//     //   {[lightTheme, darkTheme].map((theme, index) => (
//     //     <Grid item xs={6} key={index}>
//     //       <ThemeProvider theme={theme}>
//     //         <Box
//     //           sx={{
//     //             p: 2,
//     //             bgcolor: 'background.default',
//     //             display: 'grid',
//     //             gridTemplateColumns: { md: '1fr' },
//     //             gap: 2,
//     //           }}
//     //         >
//     //           {[16].map((elevation) => (
//     //             <Item key={elevation} elevation={elevation}>
//     //               {`elevation=${elevation}`}
//     //             </Item>
//     //           ))}
//     //         </Box>
//     //       </ThemeProvider>
//     //     </Grid>
//     //   ))}
//     // </Grid>
//     <Grid>
//       <Grid item xs={6}>
//         <ThemeProvider theme={lightTheme}>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: 'background.default',
//               display: 'grid',
//               gridTemplateColumns: { md: '1fr 1fr' },
//               gap: 2,
//             }}
//           >
//             {/* <div className='d-flex'> */}

//             <Item key={16} elevation={16}>
//               {`elevation=${16}`}
//             </Item>
//             {/* </div> */}
//           </Box>
//         </ThemeProvider>
//       </Grid>
//     </Grid>
// )


// const AdminDashboard = () => {
//     return (
//       <div>
//         {paper}
//       </div>
//     )
// }

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
      url: 'http://localhost:5000/api/admin/dashboard'
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