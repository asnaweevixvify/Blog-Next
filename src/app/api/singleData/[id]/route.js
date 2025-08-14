import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getToken } from "next-auth/jwt";

export async function GET(req,{ params }){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { id } = params

    try {
        if(!token){
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const prisma = new PrismaClient()
        const data = await prisma.blog.findUnique({where:{ id }})
        return NextResponse.json(data)
    }
    catch(err) {    
        return NextResponse.json({error:err},{status:201})
    }
}