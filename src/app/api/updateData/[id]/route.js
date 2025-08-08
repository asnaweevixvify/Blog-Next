import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function PUT(req,{ params }){
    const { id } = params
    const data = await req.json()

    try {
        const prisma = new PrismaClient()
        await prisma.blog.update({where:{id},data})
        return NextResponse.json({msg:"แก้ไขบทความสำเร็จ"})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}