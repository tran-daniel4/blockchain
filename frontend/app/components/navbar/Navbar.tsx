'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';

interface CryptoSearchResult {
    id: string;
    name: string;
    thumb: string;
}

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<CryptoSearchResult[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const router = useRouter();

    const signOut = () => {
        // handle jwt
        router.push('/authentication');
    };

    useEffect(() => {
        const fetchCryptos = async () => {
            if (search.trim() === '') {
                setSearchResults([]);
                setShowDropdown(false);
                return;
            }
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${search}`);
                const data = await response.json();
                setSearchResults(data.coins.slice(0, 5));
                setShowDropdown(true);
            } catch (error) {
                console.error("Error fetching search results", error);
            }
        };

        fetchCryptos();
    }, [search]);

    const handleSelectCrypto = (id: any) => {
        router.push(`/crypto/${id}`); 
        setSearch('');
        setShowDropdown(false);
    };

    return (
        <nav className="border-b-2 flex p-4 justify-between items-center w-full bg-white shadow-md">
            <h1 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => router.push('/')}>
                CryptoTracker
            </h1>
            <div className="relative">
                <div className="flex items-center bg-gray-200 p-2 rounded-md">
                    <BsSearch className="text-gray-500 mr-2" />
                    <input
                        className="bg-transparent focus:outline-none w-48"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Crypto..."
                    />
                </div>
                {showDropdown && searchResults.length > 0 && (
                    <div className="absolute top-10 left-0 bg-white shadow-md w-full rounded-md">
                        {searchResults.map((crypto) => (
                            <div 
                                key={crypto.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => handleSelectCrypto(crypto.id)}
                            >
                                <img src={crypto.thumb} alt={crypto.name} className="w-6 h-6 mr-2" />
                                <span>{crypto.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-6">
                <a 
                    className="text-gray-800 font-semibold hover:underline cursor-pointer"
                    onClick={() => router.push('/dashboard')}
                >
                    Dashboard
                </a>

                <button
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    onClick={signOut}
                >
                    Sign Out
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
