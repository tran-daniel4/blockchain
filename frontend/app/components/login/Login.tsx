'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login({ handleSignUp }: {handleSignUp: () => void}) {
    const [ inputUser, setInputUser ] = useState('');
    const [ inputPass, setInputPass ] = useState('');
    const router = useRouter();
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { username: inputUser, password: inputPass });
            console.log('Successfully logged in', response.data);
            router.push('./home');
        } catch (error) {
            console.error('Error has occurred');
        }
    }

    return (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                  value= {inputUser}
                  onChange= {(e) => setInputUser(e.target.value)}
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
                  value= {inputPass}
                  onChange= {(e) => setInputPass(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-green-500 hover:bg-green800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-4">Don't have an account?</p>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>

    );
  }
export default Login