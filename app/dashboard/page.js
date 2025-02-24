"use client"
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Dashboard() {
    const { user } = useUser()

    const fileList = useQuery(api.fileStorage.GetUserFiles, {
        userEmail: user?.primaryEmailAddress?.emailAddress
    })

    return (
        <div>
            <h2 className='font-bold text-primary text-3xl'>Workspace</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>
                {fileList === undefined ? (
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div key={index} className='bg-slate-200 rounded-md h-[150px] animate-pulse'></div>
                    ))
                ) : fileList.length > 0 ? (
                    fileList.map((file) => (
                        <Link key={file.fileId} href={'/workspace/' + file.fileId}>
                            <div className='flex w-fit p-5 shadow-md flex-col rounded-md font-semibold
                                gap-1 items-center justify-center cursor-pointer border hover:scale-105 transition-all'>
                                <Image src={'/pdf-file.png'} alt='file' width={70} height={70}></Image>
                                <h2>{file?.fileName}</h2>
                                <h2>{new Date(file?._creationTime).toLocaleString()}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className='col-span-full row-span-full text-2xl text-center text-gray-500'>
                        There are no files.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard