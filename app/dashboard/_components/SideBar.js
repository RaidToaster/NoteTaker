import Image from 'next/image'
import React from 'react'
import { Layout, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import UploadPDFDialog from './UploadPDFDialog'

function SideBar() {
    return (
        <div className='shadow-md h-screen p-6'>
            <div className='flex flex-row items-center justify-around cursor-pointer'>
                <Image src={'/logo.svg'} width={50} height={50} alt='logo'></Image>
                <h1 className='text-2xl font-bold text-primary'>NoteTaKKer</h1>
            </div>

            <div className='mt-10'>
                <UploadPDFDialog>
                    
                </UploadPDFDialog>

                <div className='flex gap-2 items center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Layout />
                    <h2>Workspace</h2>
                </div>

                <div className='flex gap-2 items center p-3 mt-2 hover:bg-slate-100 rounded-lg cursor-pointer'>
                    <Shield />
                    <h2>Upgrade</h2>
                </div>
            </div>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={33} />
                <p className='text-sm mt-1'>2 out of 5 PDFs Uploaded</p>
                <p className='text-xs mt-1'>Upgrade to unlock more</p>
            </div>
        </div>
    )
}

export default SideBar