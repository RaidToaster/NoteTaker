import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pdfUrl = 'https://frugal-wolf-416.convex.cloud/api/storage/ef3645ea-5d87-4cc5-b8ef-4971646fd24c'
export async function GET(req) {

    // LOAD PDF FILE
    const response = await fetch(pdfUrl)
    const data = await response.blob()
    const loader = new WebPDFLoader(data)
    const docs = await loader.load()

    let pdfTextContent = ''
    docs.forEach(doc => {
        pdfTextContent += doc.pageContent
    })

    // SPLIT JADI KECIL
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });

    const output = await splitter.createDocuments([pdfTextContent])

    let splitterList = []
    output.forEach(doc => {
        splitterList.push(doc.pageContent)
    })

    return NextResponse.json({ result: splitterList })
}