import prisma from "@/utils/prisma";
import { NextResponse as res} from "next/server";

export async function GET(){
    try {
        const topRated = await prisma.rating.findMany({include:{post:true},orderBy:{rate:'desc'}})
console.log("top rated",topRated);
        return res.json({data:topRated})

    } catch (error) {
        console.log(error);
        return res.json({ error: `Something went wrong. Please try again later, ${error}` }, { status: 500 });
    }
}