import prisma from "@/utils/prisma";
import { NextResponse as res} from "next/server";

export async function GET(){
    try {
        const budget = await prisma.post.findMany({orderBy:{budget:'asc'}})
        return res.json({data:budget},{status:200})

    } catch (error) {
        console.log(error);
        return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
    }
}