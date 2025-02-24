"use client"
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

function Dashboard() {
    const { user } = useUser()

    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    })

    return (
        <div>
            <h2 className='font-medium text-3xl'>Workspace</h2>
            <div>
                {fileList && fileList?.map((file, index) => (
                    <div key={index}>
                        <Image src={'/pdf-file.png'} alt='file' width={70} height={70}></Image>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard