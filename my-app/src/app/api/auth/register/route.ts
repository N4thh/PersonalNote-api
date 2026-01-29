import { NextRequest, NextResponse } from "next/server";
import { badRequest, created } from "@/lib/helper/response";
import { isStrongPassword, isEmpty } from "@/lib/helper/validators";
import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try{
        //nhan request ve body 
        const body = await req.json(); 
        const {userName, Password} = body;  
        //validate
        if(isEmpty(Password) || isEmpty(userName)){ 
            return badRequest("Please fill out all fields!"); 
        }
        //password // hash
        if (!isStrongPassword(Password)) {
            return badRequest("Password is not strong");
        }
        
        const hashPassword = await bcrypt.hash(Password, 10); 
        const newUser = await prisma.user.create({
            data:{ 
                username: userName,
                password: hashPassword,
            },
        })
        return created({
            id: newUser.id,
            userName: newUser.id,
            Password: "****",
        }, "Registration successful")

        
    }catch(err){
        console.error("", err);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        )
    }
}