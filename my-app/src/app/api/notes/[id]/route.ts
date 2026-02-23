import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { badRequest, notFound, success } from "@/lib/helper/response";
import { isEmpty } from "@/lib/helper/validators";
import { verifytoken } from "@/lib/auth";


export async function PUT(req: NextRequest, context: { params: {id: string}}) {
   try{
    //check user
    const user = await verifytoken(req);
    if(!user){ 
        return NextResponse.json(
            { error: "Don't have permission" },
            { status: 401}
        );
    }
 
    //get noteID
    const {id: noteID} = context.params; 
    const existNote = await prisma.note.findFirst({
        where: {
            id: noteID, 
            userId: user.id
        }
    }); 
    if(!existNote){
        return notFound("Note does not exist");
    }
    
    //get update req data
    const body = await req.json(); 
    const {newtitle, newcontent } = body; 
    if(isEmpty(newtitle) || isEmpty(newcontent)){
        return badRequest("Please fill out all fields!"); 
    }

    const updateNote = await prisma.note.update({
        where: {id: noteID},
        data: {
            title: newtitle, 
            content: newcontent
        }
    })
    
    return success(updateNote, "update Note successfully")

   }catch (err){
        console.error("", err); 
        return NextResponse.json(
            {error: "Internal sever error"},
            {status: 500}
        )
   }
}

//delete note

export async function DELETE(req: NextRequest , context: { params: Promise<{ id: string}>}) {
    try{
        const user = await verifytoken(req);
        if(!user){ 
            return new NextResponse("Don't have permission" , {status: 401})
        }

        const {id: noteID} = await context.params;
                  
        const deleteNote = await prisma.note.delete({
            where: {
                id: noteID
            }
        })
        
        return success(deleteNote, "Delete note successfully")

    }catch(err){
        console.error("", err); 
       return NextResponse.json(
            {error: "Internal sever error"},
            {status: 500}
        )
    }
}