import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

function DashboardLayout({ children }) {
    return (
        <div>
            <div className='w-64 h-screen fixed'>
                <SideBar />
            </div>
            <div className='md:ml-64'>
                <Header />
                <div className='p-8'>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default DashboardLayout