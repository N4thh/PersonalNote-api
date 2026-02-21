'use client'
import { Note } from "@prisma/client"
import Link from "next/link"

type Props = {
    note: Note
}
const Notebox = ({note}: Props) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 max-full">
        <div className="p-2 space-y-8">
            <div className="space-y-1">
                <div className="flex justify-between">
                    <h1 className="font-semibold text-2xl">{note.title}</h1>
                    <div className="flex space-x-2">
                        <p>Delete</p>
                        <Link href={`/dashboard/notes/${note.id}`}>Edit</Link>                    
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
            <p className="text-gray-500">{note.content}</p>
        </div>
    </div>
  )
}

export default Notebox