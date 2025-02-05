'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const signOut = () => {
      localStorage.removeItem('token');
      router.push('/authentication');
    }

    return (
        <nav className="border-b-2 flex p-4 justify-end w-screen items-center">
            <input 
                className="bg-gray-200 p-1 rounded-md mr-4"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />

            <a className="hover:underline cursor-pointer" onClick={signOut}>
                Sign out
            </a>
        </nav>
    );
};

export default Navbar;
