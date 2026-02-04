import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, created, success } from "@/lib/helper/response";
import { isEmpty } from "@/lib/helper/validators";
import { verifytoken } from "@/lib/auth";


//Create Note
export async function POST(req: NextRequest) {
    try{
        const user = await verifytoken(req); 
        if(!user){ 
            return new NextResponse("Don't have permission" , {status: 401})
        }
        
        const body = await req.json();
        const {title, content} = body;
        if(isEmpty(title) || isEmpty(content)){ 
            return badRequest("Please fill out all fields!"); 
        }
        //create
        const newNotes = await prisma.note.create({
            data: {
                title: title, 
                content: content,
                userId: user.id
            }
        });

        return created({
                id: newNotes.id,
                title: newNotes.title
        }, "New node created successfully")

    }catch (err){
        console.error("", err); 
        return NextResponse.json(
            {error: "Internal sever error"}, 
            {status: 500}
        );
    }
}

//Get all note
export async function GET(req: NextRequest) {
    const user = await verifytoken(req); 
    if(!user){ 
            return new NextResponse("Don't have permission" , {status: 401})
    }
    const getAllNote = await prisma.note.findMany({
        where: { userId: user.id},
    })
    return success(getAllNote , "Get all Notes successfully")
}