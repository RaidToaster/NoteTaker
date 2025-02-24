import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req) {

    const reqUrl = req.url
    const { searchParams } = new URL(reqUrl)
    const pdfUrl = searchParams.get('pdfUrl')
    console.log(pdfUrl)
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
        chunkSize: 200,
        chunkOverlap: 40,
    });

    const output = await splitter.createDocuments([pdfTextContent])

    let splitterList = []
    output.forEach(doc => {
        splitterList.push(doc.pageContent)
    })

    return NextResponse.json({ result: splitterList })
}