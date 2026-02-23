'use client'
import React, { SyntheticEvent } from 'react'
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { Note } from '@prisma/client';

type Props= {
  note: Note
}
const EditNote = ({note}: Props) => {
    //data
    const router = useRouter(); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setisLoading] = useState(false);
    const [formData, setFormData] = useState ({
        newtitle: '', 
        newcontent:''
    })
    useEffect(() => {
    if (note) {
      setFormData({
        newtitle: note.title,
        newcontent: note.content
      });
    }
  }, [note]);
    //handeleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = e.target
        setFormData(prev => ({
          ...prev, 
          [name] : value
        }));
    }

    //handleSubmit
    const handleSubmit = async (e:SyntheticEvent) =>{
      e.preventDefault(); 
      setError('');
      setSuccess('');
      setisLoading(true)
      try{

        const res = await fetch(`/api/notes/${note.id}` ,{
          method: 'PUT', 
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(formData)
        });
        
        const data = await res.json();
        if(!res.ok) {
          throw new Error(data.error || data.message || "Updating a new note failed");
        }

        setSuccess('Updating note successfullly');
    
        router.push("/dashboard")
      }catch(err: unknown){
            if(err instanceof Error){
                setError(err.message)
            }else{
                setError('Something went wrong. Try again!');
            }       
      } finally {
        setisLoading(false); 
      }
    }
  return (
    <>
      <div className='space-y-3'>
        <p className='font-semibold text-3xl'>Edit Note</p>
        <p className='text-gray-500'>Update your note</p>
      </div>
      
      <div className="min-h-[60vh] flex justify-center">
        <div className="border border-gray-300 shadow-lg rounded-lg px-6 pt-6 w-full max-w-xl space-y-6">
          <p>Edit Note</p>

          <form onSubmit={handleSubmit}
          className='space-y-4'>
            <div className='space-y-2'>
              <p className='font-semibold'>Title</p>           
              <input 
              className='border rounded-md w-full p-2 text-sm border-gray-200 bg-gray-200'
              type='text'
              name = "newtitle"
              value = {formData.newtitle}
              onChange={handleChange}
              placeholder='Enter note tile...'
              />
            </div>
            <div className='flex flex-col flex-1 space-y-2 '>
              <p className='font-semibold'>Content</p>           
              <textarea 
              className='border  rounded-md w-full p-2 min-h-[30vh] text-sm border-gray-200 bg-gray-200'
              name = "newcontent"
              value = {formData.newcontent}
              onChange={handleChange}
              placeholder='Write your note here...'
              />
            </div>

            <div className='space-y-3'>
              <button className='border rounded-lg bg-black text-white w-full py-2 mt-2
              hover:bg-[#222] transition-all duration-200 '
              type='submit'
              disabled ={loading}> {loading ? "Updating..." : "Update Note"}
              </button>

              <div>
                {error && <p className="text-red-600 mt-2">{error}</p>}
                {success && <p className="text-green-600 mt-2">{success}</p>} 
              </div>              
            </div>
              
          </form>
        </div>
      </div>            
    </>

  )
}

export default EditNote