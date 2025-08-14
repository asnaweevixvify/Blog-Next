import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const data = await req.json()
    try {
        const prisma = new PrismaClient()

        if(!token){
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.blog.create({data})
        return NextResponse.json({msg:"บันทึกบทความสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({
            msg:"faild to create blog",
            error:err,
        },{status:500})
    }
}