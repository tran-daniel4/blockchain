import React from 'react'
import Navbar from '../components/navbar/Navbar'
import CryptoList from '../components/cryptoList/CryptoList'

function page() {
  return (
    <div>
        <Navbar/>
        <CryptoList/>
    </div>
  )
}

export default page