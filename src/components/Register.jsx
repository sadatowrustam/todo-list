import React, { useState } from 'react';


const Register = ({register}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email,setEmail]=useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    setPassword("")
    setUsername("")
    setEmail("")
    register({username, password,email})

    // TODO: Submit the register form to your backend API
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-700">
      <div className="w-full max-w-md">
      <h1 className='text-xl text-white'>Register</h1>
        <form>
          <div className="mt-4">
            <label htmlFor="username" className='text-white'>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className='text-white'>Email</label>
            <input
              type="text"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>  
          <div className="mt-4">
            <label htmlFor="password" className='text-white'>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
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
      </div>
    </div>
  );
};

export default Register;
