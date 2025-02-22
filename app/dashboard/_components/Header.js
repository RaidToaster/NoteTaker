import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
    return (
        <div className='flex justify-end shadow-sm p-5'>
            <UserButton></UserButton>
        </div>
    )
}

export default Header