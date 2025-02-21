"use client"
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React, { useEffect } from 'react'

function Home() {
  const { user } = useUser()
  const createUser = useMutation(api.user.createUser)

  const CheckUser = async () => {
    const result = await createUser({
      email: user.primaryEmailAddress.emailAddress,
      imageUrl: user.imageUrl,
      userName: user.fullName

    })
  }

  useEffect(() => {
    user && CheckUser()
  }, [user])

  return (
    <div>page</div>
  )
}

export default Home