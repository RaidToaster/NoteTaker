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
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState('')
    const OnFileSelect = (e) => {
        setFile(e.target.files[0])
    }
    const OnUpload = async () => {
        setLoading(true)

        try {
            const postUrl = await generateUploadUrl()
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file?.type },
                body: file,
            })

            const { storageId } = await result.json()
            const fileId = uuid4()
            const fileUrl = await getFileUrl({ storageId })

            await insertFileEntry({
                fileId,
                storageId,
                fileName: fileName || 'Untitled File',
                fileUrl,
                createdBy: user.primaryEmailAddress.emailAddress
            })

            const APIresponse = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl)

            await embeddDocument({
                splitText: APIresponse.data.result,
                fileId: fileId
            })

        } catch (error) {
            console.error("Upload failed:", error)
            alert(`Upload failed: ${error.message}`)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild><Button onClick={() => setOpen(true)} className='w-full'>+ Upload PDF</Button></DialogTrigger>
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
                                <Button onClick={() => setOpen(false)} className='mr-2 bg-red-600 hover:bg-red-400'>
                                    Cancel
                                </Button>
                                <Button onClick={OnUpload} disabled={loading}>
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