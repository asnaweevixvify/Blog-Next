import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getToken } from "next-auth/jwt";

export async function PUT(req,{ params }){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { id } = params
    const data = await req.json()

    try {
        if(!token){
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const prisma = new PrismaClient()
        await prisma.blog.update({where:{id},data})
        return NextResponse.json({msg:"แก้ไขบทความสำเร็จ"})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}