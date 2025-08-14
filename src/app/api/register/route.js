import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from 'bcryptjs'

export async function POST(req){
    try {
        const userData = await req.json()
        const prisma = new PrismaClient()

        const { username,password } = userData
        const hashPass = await bcrypt.hash(password,10)

        await prisma.user.create({
            data:{
                username,password:hashPass
            }
        })
        return NextResponse.json({msg:"สมัครบัญชีสำเร็จ"},{status:201})
    }
    catch(err) {
        return NextResponse.json({error:err},{status:500})
    }
}