'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BsFillStarFill } from "react-icons/bs";
import '@fontsource/poppins';

interface Crypto {
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  market_cap: number;
  total_volume: number;
}

function CryptoList() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/crypto', {
          withCredentials: true,
        });

        const sortedData = data.sort((a: Crypto, b: Crypto) => b.market_cap - a.market_cap);
        setCryptos(sortedData);

        const favResponse = await axios.get('http://localhost:5000/api/tracked', {
          withCredentials: true,
        });
        setFavorites(favResponse.data.favorites || []);
      } catch (err: any) {
        console.error('Failed to load cryptocurrency data:', err.response?.data || err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push('/authentication');
        }
      }
    };

    fetchCryptoData();
  }, [router]);

  const handleFavorite = async (coinId: string) => {
    const isFavorite = favorites.includes(coinId);
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== coinId)
      : [...favorites, coinId];

    setFavorites(updatedFavorites);

    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/untrack/${coinId}`, { withCredentials: true });
      } else {
        await axios.post('http://localhost:5000/api/track', { coinId }, { withCredentials: true });
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Cryptocurrency Prices by Market Cap</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg text-gray-700">
          <thead>
            <tr className="bg-gray-900 text-white font-medium">
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Coin</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">1h %</th>
              <th className="px-4 py-3 text-right">24h %</th>
              <th className="px-4 py-3 text-right">7d %</th>
              <th className="px-4 py-3 text-right">Market Cap</th>
              <th className="px-4 py-3 text-right">24h Volume</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => (
              <tr key={crypto.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-3 text-center">
                  <BsFillStarFill
                    size={20}
                    className={`cursor-pointer transition-transform ${
                      favorites.includes(crypto.id) ? 'text-yellow-400 scale-110' : 'text-gray-400 hover:text-yellow-400'
                    }`}
                    onClick={() => handleFavorite(crypto.id)}
                  />
                </td>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={crypto.image} width={28} height={28} className="rounded-full" alt={crypto.id} />
                  <span className="font-semibold">{crypto.id.toUpperCase()}</span> 
                  <span className="text-gray-500">({crypto.symbol.toUpperCase()})</span>
                </td>
                <td className="px-4 py-3 text-right font-medium">${crypto.current_price.toLocaleString()}</td>
                <td className={`px-4 py-3 text-right font-medium ${crypto.priceChange1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.priceChange1h.toFixed(2)}%
                </td>
                <td className={`px-4 py-3 text-right font-medium ${crypto.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.priceChange24h.toFixed(2)}%
                </td>
                <td className={`px-4 py-3 text-right font-medium ${crypto.priceChange7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.priceChange7d.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right font-medium">${crypto.market_cap.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium">${crypto.total_volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoList;
