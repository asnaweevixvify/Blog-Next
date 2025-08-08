import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

export async function GET(){
    try {
        const prisma = new PrismaClient()
        const data = await prisma.blog.findMany()
        return NextResponse.json(data)
    }
    catch(err) {
        return NextResponse.json({msg:"ไม่พบบทความ"},{status:200})
    }
}