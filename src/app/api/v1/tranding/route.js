import prisma from "@/utils/prisma";
import { NextResponse as res} from "next/server";

export async function GET(){
    try {
        const tranding = await prisma.comment.findMany({include:{post:true},orderBy:{postId:'asc'}})
        return res.json({data:tranding},{status:200})

    } catch (error) {
        console.log(error);
        return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
    }
}