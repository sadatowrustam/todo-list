import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {AxiosInstance as axios} from './common/axios';
import LoginForm from './components/LoginForm';
import Main from './pages/Main';
import Tasks from './pages/Tasks';
import Register from './components/Register';
const App = () => {
  const login = async ({ username, password }) => {
    const data = { username, password }
    try {
      const res = await axios.post('/users/login', data)
      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token);
        window.location.href="/"
      }
    } catch (error) {
      alert(error.response.data.message+". Please try again")
    }
  }
  const register = async ({ username, password,email }) => {
    const data = { username, password,email }
    try {
      const res = await axios.post('/users/register', data)
      if (res.status === 200) {
        sessionStorage.setItem('token', res.data.token);
        window.location.href="/"
      }
    } catch (error) {
      console.log(error.response.status)
      if(error.response.status===400) alert("Fill in the blanks")
      else alert("Username and email must be unique.Please try again")
    }
  }
  const path=window.location.href.split("/")
  if (!sessionStorage.getItem('token')&& path[3]!=="registration") {
    return (
      <LoginForm login={login} />
      )
    }
    return (
      <Router>
      <Routes>
        <Route path='/' element={
          <Main />
        } />
        <Route path='/:uuid/tasks' element={
          <Tasks />
        } />
        <Route path='/registration' element={
          <Register register={register} />
        } />
      </Routes>
    </Router>

  );
};

export default App;