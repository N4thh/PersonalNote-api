'use client'
import React, { SyntheticEvent } from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateNote = () => {
    //data
    const router = useRouter(); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setisLoading] = useState(false);
    const [formData, setFormData] = useState ({
        title: '', 
        content: ''
    })

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
    }
  return (
    <>
      <div className='space-y-3'>
        <p className='font-semibold text-3xl'>Create Note</p>
        <p className='text-gray-500'>Add a new note to your collection</p>
      </div>
      
      <div className="min-h-[65vh] flex justify-center">
        <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-full max-w-xl space-y-6">
          <p>Create New Note</p>

          <form 
          className='space-y-4'>
            <div className='space-y-2'>
              <p className='font-semibold'>Title</p>           
              <input 
              className='border rounded-md w-full p-2 text-sm border-gray-200 bg-gray-200'
              type='text'
              name = "title"
              value = {formData.title}
              onChange={handleChange}
              placeholder='Enter note tile...'
              />
            </div>
            <div className='flex flex-col flex-1 space-y-2'>
              <p className='font-semibold'>Content</p>           
              <textarea 
              className='border  rounded-md w-full p-2 h-full text-sm border-gray-200 bg-gray-200'
              name = "content"
              value = {formData.content}
              onChange={handleChange}
              placeholder='Write your note here...'
              />
            </div>
          </form>
        </div>
      </div>            
    </>

  )
}

export default CreateNote