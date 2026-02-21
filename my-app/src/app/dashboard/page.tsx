import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/getUser';
import { redirect } from "next/navigation";
import Notebox from '@/components/Notebox'

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
          {/* responsive: mobile 1 column, table 2, desktop 3 */}
         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
            <Notebox key={note.id} note={note}/>
          ))}
         </div>

       </div>
    </div>
  )
}

export default Dashboard