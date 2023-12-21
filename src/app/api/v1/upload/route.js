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
        console.log(process.env.AWS_ACCESS_KEY_ID)
        console.log(process.env.AWS_SECRET_ACCESS_KEY)
        console.log(error)
    }

  return (
    NextResponse.json({message: "Good upload"})
  )
}
