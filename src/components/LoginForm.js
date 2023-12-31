import React, { useState } from 'react';


const LoginForm = ({login}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsername("")
    setPassword("")
    login({username, password})

    // TODO: Submit the login form to your backend API
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700">
      <div className="w-full max-w-md">
      <h1 className='text-xl text-white'>Login</h1>
        <form action="/login" method="post">
          <div className="mt-4">
            <label htmlFor="username" className='text-white'>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className='text-white'>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
        <p className='text-md text-white'>Not registered yet <a href='/registration' className='text-#50f100 hover:text-blue-500'>Register</a></p>
      </div>
    </div>
  );
};

export default LoginForm;
