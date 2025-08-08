import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function DELETE(req,{ params }){
    const { id } = params

    try {
        const prisma = new PrismaClient()
        await prisma.blog.delete({where:{id}})
        return NextResponse.json({msg:"ลบข้อมูลสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:200})
    }
}