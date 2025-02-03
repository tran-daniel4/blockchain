'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';

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
    circulating_supply: number;
    max_supply: number | null;
    last_updated: string;
  }
function CryptoList() {
    const [cryptos, setCryptos] = useState<Crypto[]>([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
          try {
            const { data } = await axios.get('http://localhost:5000/api/crypto', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
    
            const sortedData = data.sort((a: Crypto, b: Crypto) => b.market_cap - a.market_cap);
            setCryptos(sortedData);
            } catch (err) {
                console.error('Failed to load cryptocurrency data', err);
            }
        };
    
        fetchCryptoData();
      }, []);
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Cryptocurrency Prices by Market Cap</h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Coin</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">1h %</th>
                <th className="border border-gray-300 px-4 py-2">24h %</th>
                <th className="border border-gray-300 px-4 py-2">7d %</th>
                <th className="border border-gray-300 px-4 py-2">Market Cap</th>
                <th className="border border-gray-300 px-4 py-2">24h Volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto, index) => (
                <tr key={crypto.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 flex items-center">
                    <image href={crypto.image} width={24} height={24} className="mr-2" />
                    {crypto.id.toUpperCase()} ({crypto.symbol.toUpperCase()})
                  </td>
                  <td className="border border-gray-300 px-4 py-2">${crypto.current_price.toLocaleString()}</td>
                  <td className={`border border-gray-300 px-4 py-2 ${crypto.priceChange1h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.priceChange1h.toFixed(2)}%
                  </td>
                  <td className={`border border-gray-300 px-4 py-2 ${crypto.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.priceChange24h.toFixed(2)}%
                  </td>
                  <td className={`border border-gray-300 px-4 py-2 ${crypto.priceChange7d >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {crypto.priceChange7d.toFixed(2)}%
                  </td>
                  <td className="border border-gray-300 px-4 py-2">${crypto.market_cap.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">${crypto.total_volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default CryptoList