import { uploadFile } from '@/lib/uploadFile' 
import { NextResponse } from 'next/server'

export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get("file")
    const directory = formData.get("dir")

    try {
        await uploadFile({
            Body: file,
            Key: file.name,
            ContentType: file.type,
            Dir: directory
        })
    } catch (error) {
        console.log(error)
    }

  return (
    NextResponse.json({message: "Good upload"})
  )
}
