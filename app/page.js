"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { api } from '../convex/_generated/api'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function Home() {
  const { user } = useUser()
  const createUser = useMutation(api.user.createUser)
  const [contentVisible, setContentVisible] = useState(false);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName

    })

    console.log(result)
  }

  const timer = setTimeout(() => {
    setContentVisible(true);
  }, 500);

  useEffect(() => {
    user && CheckUser()
  }, [user])

  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute top-4 right-4 z-50">
        <UserButton />
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 text-white z-10 transition-opacity duration-700 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Image src="/logo.svg" width={200} height={200} alt="Logo" className="animate-pulse" /> {/* Logo Pulse */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center">
          Your AI-Powered Note-Taking App
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl">
          Effortlessly organize and enhance your notes with AI. PDF viewing and powerful features to boost your productivity.
        </p>
        <Link href={'/dashboard'} >
          <Button className=" text-white font-semibold py-3 px-6 rounded-md shadow-md transition-colors duration-200 flex items-center gap-2 text-xl h-full hover:scale-105 transition-transform duration-200">
            Get Started <ArrowBigRight size={20} />
          </Button>
        </Link>
      </div>
    </div>
  )
}


export default Home