import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/home';
import Signup from './components/auth-component/signup';
import Login from './components/auth-component/login';
// import Navbarr from './components/header/navbar';

//  ***********    ADMIN      ***********

// import Admin from './components/admin-component/admin'
import AdminDashboard from './components/admin-component/admin-dashboard';
import AdminSubAdmin from './components/admin-component/admin-subAdmin';
import AdminExaminer from './components/admin-component/admin-examiners.js';

//  ***********    SUB-ADMIN      ***********
import SubAdminExaminers from './components/subAdmin-component/subAdmin-examiners';
import SubAdminStudents from './components/subAdmin-component/subAdmin-student/subAdmin-student';
import EachStudent from './components/subAdmin-component/subAdmin-student/each-student'
import EditStudent from './components/subAdmin-component/subAdmin-student/edit-student';

//  ***********    EXAMINER      ***********
import Courses from './components/examiner-component/courses';
import Exam from './components/examiner-component/exam-component/exam';
import CreateExam from './components/examiner-component/exam-component/createExam';
import AddQuestion from './components/examiner-component/question-component/addQuestion';
import ViewQuestions from './components/examiner-component/question-component/viewQuestions';
import EditQuestion from './components/examiner-component/question-component/editQuestion';
import AssignStudent from './components/examiner-component/student-component/assignStudent';
import Students from './components/examiner-component/student-component/students';
import ViewAssignedStudents from './components/examiner-component/student-component/viewAssignedStudents';
import AllExams from './components/student-component/allExams';
import Questions from './components/student-component/examQuestion';
import Instructions from './components/student-component/examInstructions';

export const ExamContext = createContext();

export const BASEURL = 'https://exam-mgt-server.herokuapp.com/api'

function App() {

  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  }) 

  const handleAlert = (show, msg, type) => {
    setAlert({
        show,
        msg,
        type
    })
  }


  return (
    <ExamContext.Provider value={{ alert, handleAlert }}>
      {/* <Navbarr /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/signup' component={Signup}></Route> */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/login' component={Login} /> */}
          {/* //  ***********    ADMIN      *********** */}

          {/* <Route path='/admin' element={<Admin />} /> */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/subAdmin' element={<AdminSubAdmin />} />
          <Route path='/admin/examiner' element={<AdminExaminer />} />

          {/* //  ***********   SUB-ADMIN      *********** */}
          
          <Route path='/subAdmin/examiners' element={<SubAdminExaminers />} />
          <Route path='/subAdmin/students' element={<SubAdminStudents />} />
          <Route path='/subAdmin/student/:id' element={<EachStudent />} />
          <Route path='/subAdmin/student/:id/edit' element={<EditStudent />} />

          {/* <Route path='/subAdmin/examiners' component={SubAdminExaminers} />
          <Route path='/subAdmin/students' component={SubAdminStudents} />
          <Route path='/subAdmin/student/:studentId' component={EachStudent} /> */}

          {/* //  ***********   EXAMINER      *********** */}

          <Route path='/examiner/course' element={<Courses />} />

          <Route path='/examiner/exam' element={<Exam />} />
          <Route path='/examiner/exam/new' element={<CreateExam />} />
          <Route path='/examiner/exam/:examId/question/new' element={<AddQuestion />} />
          <Route path='/examiner/exam/:examId/questions' element={<ViewQuestions />} />
          <Route path='/examiner/exam/:examId/question/:id' element={<EditQuestion />} />

          <Route path='/examiner/students' element={<Students />} />
          <Route path='/examiner/exam/:examId/addStudent' element={<AssignStudent />} />
          <Route path='/examiner/exam/:examId/students' element={<ViewAssignedStudents />} />


          {/* //  ***********   STUDENT      *********** */}

          <Route path='/student/allExams' element={<AllExams />} />
          <Route path='/student/exam/:id/:subject/questions' element={<Questions />} />
          <Route path='/student/exam/:id/:subject/instructions' element={<Instructions />} />
          
        </Routes>
      </Router>
    </ExamContext.Provider>
  );
}

export default App;
