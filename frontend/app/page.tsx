'use client'
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/api/checkToken', { withCredentials: true });
        router.push('/home');
      } catch (error) {
        router.push('/authentication');
      }
    };

    checkAuth();
  }, []);
  return (
    <div>
    </div>
  );
}
