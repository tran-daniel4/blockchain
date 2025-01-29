'use client'
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token  = localStorage.getItem('token');
    if (token) {
      router.push('/home');
    } else {
      router.push('/authentication');
    }

  })
  return (
    <div>
    </div>
  );
}
