import { Button } from '@/components/ui/button'
import { chatSession } from '@/configs/AIModel'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAction, useMutation, useQuery } from 'convex/react'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, QuoteIcon, Sparkles, UnderlineIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

function TextEditor() {
    const { fileId } = useParams()
    const SearchAI = useAction(api.myAction.search)
    const addNotes = useMutation(api.notes.AddNotes)
    const { user } = useUser()
    const notes = useQuery(api.notes.GetNotes, { fileId: fileId })

    const onAiClick = async () => {
        toast('AI is getting your answer...')
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        )
        console.log(selectedText)
        console.log("params file id", fileId)
        const result = await SearchAI({ query: selectedText, fileId: fileId })

        const UnformattedAns = JSON.parse(result)
        let AllUnformatedAns = '';
        UnformattedAns && UnformattedAns.forEach(element => {
            AllUnformatedAns = AllUnformatedAns + element.pageContent
        });

        console.log('unformatted answer', result)

        const PROMPT = "For question: " + selectedText + "and with the given content as an answer, " +
            "please give appropiate answer in HTML format. The answer content is: " + AllUnformatedAns


        const AiModelResult = await chatSession.sendMessage(PROMPT)
        console.log(AiModelResult.response.text())
        const finalAnswer = AiModelResult.response.text().replace('```', '').replace('html', '').replace('```', '')

        const allText = editor.getHTML()
        editor.commands.setContent(allText + '<p> <strong>Answer:</strong> </p>' + finalAnswer)

        addNotes({
            notes: editor.getHTML(),
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
    }

    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
                placeholder: 'Start typing here...',
            })
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen'
            }
        }
    })

    useEffect(() => {
        if (editor && notes) {
            editor.commands.setContent(notes)
        }
    }, [editor, notes])

    if (!editor) {
        return null;
    }

    const handleSave = async () => {
        try {
            await addNotes({
                notes: editor.getHTML(),
                fileId: fileId,
                createdBy: user?.primaryEmailAddress?.emailAddress
            })
            toast.success('Notes saved successfully!')
        } catch (error) {
            toast.error('Failed to save notes: ' + error.message)
        }
    }


    return (
        <div className='p-5'>
            <div className='flex flex-row items-center justify-between'>
                <div className="control-group">
                    <div className="button-group flex gap-2 mb-2">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'text-blue-400' : ''}
                        >
                            <BoldIcon />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'text-blue-400' : ''}
                        >
                            <ItalicIcon />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? 'text-blue-400' : ''}
                        >
                            <QuoteIcon />
                        </button>

                        <button
                            onClick={() => onAiClick()}
                            className='hover:text-blue-400'
                        >
                            <Sparkles />
                        </button>
                    </div>
                </div>
                <div>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </div>
            <div>
                <div className='overflow-scroll h-[75vh]'>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default TextEditor