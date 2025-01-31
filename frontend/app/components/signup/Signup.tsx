'use client';
import React, { useState } from 'react';
import axios from 'axios';

function Signup({ handleLogin }: { handleLogin: () => void }) {
  const [ inputUser, setInputUser ] = useState('');
  const [ inputPass, setInputPass ] = useState('');
  const [ inputEmail, setInputEmail ] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup', {inputUser, inputPass, inputEmail});
      console.log('Successfully signed up', response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={inputUser}
            onChange= {(e) => setInputUser(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="text-center mb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-4">Already have an account?</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
