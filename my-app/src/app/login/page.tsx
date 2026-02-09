'use client'
import React, { SyntheticEvent } from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    //data
    const router = useRouter(); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setisLoading] = useState(false);
    const [formData, setFormData] = useState ({
        username: '', 
        password: ''
    })

    //handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData( prev => ({
            ...prev, 
            [name] : value, 
        }));
    }
    //handle Login
    const handleLogin = async (e: SyntheticEvent) =>{
        e.preventDefault();
        setError('')
        setSuccess('')
        setisLoading(true)
        try{
            const res = await fetch ("/api/auth/login", {
                method : 'POST', 
                headers: {'Content-Type' : 'application/json'}, 
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if(!res.ok){ 
                throw new Error(data.error || "Login failed")
            }
            setSuccess('Login successfully')
            router.push ("/dashboard")
            setisLoading(true)
        }catch{
            setError('Something went wrong. Try again!');
        } finally {
            setisLoading(false);
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md'>
            {/* text */}
            <div className='text-center mb-4'>
                <h1 className='font-semibold text-3xl mb-3'>NoteLy</h1>
                <p className='text-gray-500'>Welcome back! Please login to your account.</p>
            </div>
            {/* login form */}
            <div className='border rounded-lg p-6 shadow-sm'>
                <form
                onSubmit={handleLogin}>
                    <div className='mb-3 space-y-1'> 
                        <h1 className='font-semibold'>Login</h1>
                        <p className='text-gray-500'>Enter your credentials to access your notes</p>
                    </div>
                    
                    <div className='space-y-3'>
                        {/* username */}
                        <div className='space-y-1'>
                            <p>Username</p>
                            <input 
                            className='border rounded-md w-full p-2 text-sm border-gray-200 bg-gray-200'
                            name = "username"
                            value = {formData.username}
                            onChange={handleChange}
                            placeholder='Your username'
                            />
                        </div>
                        {/* password */}
                        <div className='space-y-1'>
                            <p>Password</p>
                            <input 
                            className='border rounded-md w-full p-2 text-sm border-gray-200 bg-gray-200'
                            name = "password"
                            value = {formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            />
                        </div>
                    </div>

                    <button
                    className="border rounded-xl w-full font-semibold py-2.5 mt-6 text-white bg-black 
                            hover:bg-[#222] transition-all duration-200"
                    type='submit'
                    disabled ={loading}
                    >{loading ? "Logging in..." : "Login"}</button> 
                    <div className='mt-3'>
                        {error && <p className="text-red-600">{error}</p>}
                        {success && <p className="text-green-600">{success}</p>} 
                    </div>            
                </form>
            </div>
        </div>
    </div>
  )
}
export default Login