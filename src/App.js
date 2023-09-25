import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import {AxiosInstance as axios} from './common/axios';
import LoginForm from './components/LoginForm';
import Main from './pages/Main';
import Tasks from './pages/Tasks';
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
      console.log(error)
    }
  }

  if (!sessionStorage.getItem('token')) {
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
      </Routes>
    </Router>

  );
};

export default App;