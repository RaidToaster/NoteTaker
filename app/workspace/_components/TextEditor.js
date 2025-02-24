import { chatSession } from '@/configs/AIModel'
import { api } from '@/convex/_generated/api'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAction } from 'convex/react'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, QuoteIcon, Sparkles, UnderlineIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

function TextEditor() {
    const { fileId } = useParams()
    const SearchAI = useAction(api.myAction.search)
    const onAiClick = async () => {
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

    if (!editor) {
        return null;
    }

    return (
        <div className='p-5'>
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
                <div className='overflow-scroll h-[75vh]'>
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default TextEditor