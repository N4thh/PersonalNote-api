'use client'
import { Note } from "@prisma/client"
import Link from "next/link"

import { useRouter } from "next/navigation";
import { Trash2, Pencil } from "lucide-react";
import { NextResponse } from "next/server";

type Props = {
    note: Note
}
const Notebox = ({note}: Props) => {
    const router = useRouter();
    
    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this note?");
        if(!confirmDelete) return;
        try{
            const res = await fetch(`/api/notes/${note.id}`,{
                method: 'DELETE', 
                headers: {'Content-Type' : 'application.json'}
            }); 
            const data = await res.json(); 

            if (!res.ok) {
            throw new Error(data.error || data.message || '"Delete failed');
            }
            
            router.push("/dashboard")           
        }catch(err: unknown){
            console.error(err);
            return NextResponse.json("Delete failed") 
        }
    }

  return (
    <div className="border border-gray-300 rounded-xl p-4 ">
        <div className="p-2 space-y-8">
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-2xl">{note.title}</h1>
                    <div className="flex space-x-2">
                        <Link href={`/dashboard/notes/${note.id}` } 
                        className="px-1 py-1.5 rounded-md transition-all duration-200  hover:bg-gray-200 active:bg-gray-300">
                        <Pencil size={20}  /></Link>

                        <button className="px-1 py-1.5 rounded-md transition-all duration-200  hover:bg-red-200 active:bg-red-300"
                        onClick={handleDelete}>
                        <Trash2 size={20} color="red" /></button>                               
                    </div>               
                </div>
                
                <p className="text-gray-500">
                {note.createdAt.toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                })}
                </p>
            </div>
            <p className="text-gray-500 line-clamp-3 break-all">{note.content}</p>
        </div>
    </div>
  )
}

export default Notebox