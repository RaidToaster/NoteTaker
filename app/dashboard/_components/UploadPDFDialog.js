'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import uuid4 from "uuid4";
import { useUser } from '@clerk/nextjs'
import axios from 'axios'


function UploadPDFDialog({ children }) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
    const insertFileEntry = useMutation(api.fileStorage.AddFileEntrytoDb)
    const getFileUrl = useMutation(api.fileStorage.getFileUrl)
    const embeddDocument = useAction(api.myAction.ingest)
    const { user } = useUser()
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState('')
    const OnFileSelect = (e) => {
        setFile(e.target.files[0])
    }
    const OnUpload = async () => {
        setLoading(true)

        // Step 1: Get a short-lived upload URL
        // const postUrl = await generateUploadUrl();

        // // Step 2: POST the file to the URL
        // const result = await fetch(postUrl, {
        //     method: "POST",
        //     headers: { "Content-Type": file?.type },
        //     body: file,
        // });
        // const { storageId } = await result.json();
        // console.log('StorageId', storageId)

        // const fileId = uuid4()
        // const fileUrl = await getFileUrl({ storageId: storageId })

        // const response = await insertFileEntry({
        //     fileId: fileId,
        //     storageId: storageId,
        //     fileName: fileName ?? 'Untitled File',
        //     fileUrl: fileUrl,
        //     createdBy: user.primaryEmailAddress.emailAddress
        // })

        // CALL TO FETCH PDF PROCESS DATA
        const APIresponse = await axios.get('/api/pdf-loader')
        console.log(APIresponse.data.result)
        embeddDocument({})
        setLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload your PDF</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            <h2>Select a file to upload</h2>
                            <div className='gap-2 p-3 rounded-md border'>
                                <input type='file' onChange={(e) => OnFileSelect(e)} />
                            </div>
                            <div className='mt-2'>
                                <label>File Name *</label>
                                <Input placeholder='File Name' onChange={(e) => setFileName(e.target.value)} />
                            </div>
                            <div className='flex justify-end mt-5'>
                                <Button onClick={OnUpload}>
                                    {
                                        loading ? <Loader2Icon className='animate-spin' /> : 'Upload'
                                    }
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default UploadPDFDialog