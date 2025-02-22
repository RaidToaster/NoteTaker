import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
    return (
        <div className='p-4 flex justify-between shadow-sm'>
            <div className='flex flex-row items-center justify-around cursor-pointer gap-2'>
                <Image src={'/logo.svg'} width={50} height={50} alt='logo'></Image>
                <h1 className='text-2xl font-bold text-primary'>NoteTaKKer</h1>
            </div>
            <UserButton></UserButton>
        </div>
    )
}

export default WorkspaceHeader