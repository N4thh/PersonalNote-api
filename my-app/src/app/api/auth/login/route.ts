import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, created, notFound, unauthorized } from "@/lib/helper/response";
import { isEmpty } from "@/lib/helper/validators";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export async function POST(req: NextRequest) {
    try{
        //nhan user name va password
        const body = await req.json(); 
        const {username, password} = body; 

        if(isEmpty(username) || isEmpty(password)){ 
            return badRequest("Please fill out all fields!"); 
        }
        
        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        })
        if(!user){ 
            return notFound("User dose not exist");
        }
        
        const checkPassword = await bcrypt.compare(password, user.password);
        if(checkPassword == false){ 
            return unauthorized ("Password is incorrect");
        }

        //create token
        const token = jwt.sign(
            {id: user.id, username: user.username},
            process.env.JWT_SECRET!,
            {expiresIn: '7d'}
        );
        return created(token)
        
        //tra ve token 
    }catch(err){
        console.log('', err); 
        return unauthorized("Login failed");
    }
}