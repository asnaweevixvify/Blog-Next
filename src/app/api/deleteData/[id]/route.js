import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getToken } from "next-auth/jwt";

export async function DELETE(req,{ params }){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { id } = params

    try {
        if(!token){
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const prisma = new PrismaClient()
        await prisma.blog.delete({where:{id}})
        return NextResponse.json({msg:"ลบข้อมูลสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}