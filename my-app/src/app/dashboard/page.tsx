import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/getUser';
import Notebox from '@/components/Notebox'
import { redirect } from "next/navigation";

const Dashboard = async () => {

  const user = await getUser();
    if (!user) {
    redirect("/login");
  }

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: "asc"
    }
  })

  const totalNote = notes.length || 0 ;
  return (
    <div>
       {/* top */}
       <div className='space-y-8'>
        <div className='space-y-3'>
          <h1 className='text-3xl font-semibold'>My Notes</h1>
          <p className='text-gray-500'>{totalNote} notes total</p>
        </div>

         <div className='max-w-lg'>
            {notes.map(note => (
            <Notebox key={note.id} note={note}/>
          ))}
         </div>

       </div>
    </div>
  )
}

export default Dashboard