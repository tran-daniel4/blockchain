import React from 'react'
import NavbarItem from './NavbarItem'
import NavbarSearch from './NavbarSearch'

function Navbar() {
  return (
    <nav className='border-b-2 flex p-4 justify-end w-screen items-center'>
        <NavbarSearch/>
        <NavbarItem label='Sign out' href=''/>
    </nav>
  )
}

export default Navbar