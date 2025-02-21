"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import React, { useEffect } from 'react'
import { api } from '../convex/_generated/api'

function Home() {
  const { user } = useUser()
  const createUser = useMutation(api.user.createUser)

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName

    })

    console.log(result)
  }

  useEffect(() => {
    user && CheckUser()
  }, [user])

  return (
    <div>
      page
      <UserButton />
    </div>
  )
}

export default Home