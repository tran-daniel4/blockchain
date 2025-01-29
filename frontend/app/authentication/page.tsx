'use client'
import React, { useState } from 'react'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup';

function page() {
    const [switchSignUp, setSwitchSignup] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {switchSignUp ? (<Signup handleLogin={() => setSwitchSignup(false)}></Signup>) : <Login handleSignUp={() => setSwitchSignup(true)}></Login>}
    </div>
  )
}

export default page