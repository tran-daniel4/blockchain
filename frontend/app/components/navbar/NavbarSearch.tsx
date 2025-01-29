'use client';
import React, { useState } from 'react'

function NavbarSearch() {
    const [ search, setSearch ] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    return (
    <div>
        <input 
        className='bg-gray-200 p-1 rounded-md '
        type='text'
        value={search}
        onChange={handleChange}
        placeholder='Search'/>
    </div>
    )
}

export default NavbarSearch