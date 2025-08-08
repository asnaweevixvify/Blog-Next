import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function GET(req,{ params }){
    const { id } = params

    try {
        const prisma = new PrismaClient()
        const data = await prisma.blog.findUnique({where:{ id }})
        return NextResponse.json(data)
    }
    catch(err) {    
        return NextResponse.json({error:err},{status:201})
    }
}