import { NextRequest, NextResponse } from "next/server";
import { badRequest, created } from "@/lib/helper/response";
import { isStrongPassword, isEmpty } from "@/lib/helper/validators";
import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try{
        //nhan request ve body 
        const body = await req.json(); 
        const {username, password, fullname, confirmPassword} = body;  
        //validate
        if(isEmpty(password) || isEmpty(username) || isEmpty(fullname) || isEmpty(confirmPassword)){ 
            return badRequest("Please fill out all fields!"); 
        }
        //password // hash
        if (!isStrongPassword(password)) {
            return badRequest("Password is not strong");
        }
         if(confirmPassword != password){
                return badRequest('Passwords do not match');
        }

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return badRequest("Username already exists");
        }
        const hashPassword = await bcrypt.hash(password, 10); 
        const newUser = await prisma.user.create({
            data:{ 
                fullname: fullname,
                username: username,
                password: hashPassword   
            },
        })
        return created({
            id: newUser.id,
            fullname: newUser.fullname,
            userName: newUser.username,
        }, "Registration successful")

        
    }catch(err){
        console.error("", err);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    }
}