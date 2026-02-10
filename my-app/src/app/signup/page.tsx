'use client'
import React, { SyntheticEvent } from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";


const Signup = () => {
    //data
    const router = useRouter(); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setisLoading] = useState(false);
    const [formData, setFormData] = useState ({
        fullname: '',
        username: '', 
        password: '',
        confirmPassword: ''
    });

    //handle Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target; 
        setFormData(prev => ({
            ...prev,
            [name] : value
        }));
    };
    const handleSubmit = async (e: SyntheticEvent) =>{
        e.preventDefault (); 
        setError ('');
        setSuccess('');
        setisLoading(true);
        try{
            const res = await fetch('/api/auth/register',{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || data.message || "Sign up failed");
            }

            setSuccess('Sign up successfully')
            router.push ("/login")
        }catch(err :unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong. Try again!');
            }
        }finally{
            setisLoading(false); 
        }
    }
    
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md'>
            {/* text */}
            <div className='text-center mb-4'>
                <h1 className='font-semibold text-3xl mb-3'>NoteLy</h1>
                <p className='text-gray-500'>Create an account to start taking notes.</p>
            </div>
            {/* register form */}
            <div className='border rounded-lg p-6 shadow-sm'>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-1 mb-5'>
                        <h1 className='font-semibold'>Sign Up</h1>
                        <p className='text-gray-500'>Create your Notely account</p>
                    </div>
                    
                    <div className='space-y-2'>
                        {/* full name */}
                        <label className='font-semibold'>Full Name</label>
                        <input
                            className='border rounded-md w-full p-2 pl-3 text-sm border-gray-200 bg-gray-200'
                            name = 'fullname'
                            type='text'
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder='Nguyen Nhat Anh'
                        />
                        {/* username */}
                        <div className='space-y-1'>
                            <label className='font-semibold'>Username</label>
                            <input
                                className='border rounded-md w-full p-2 pl-3 text-sm border-gray-200 bg-gray-200'
                                name = 'username'
                                type='text'
                                value={formData.username}
                                onChange={handleChange}
                                placeholder='Your username'
                            />
                        </div>
                        {/* password */}
                         <div className='space-y-1'>
                            <label className='font-semibold'>Password</label>
                            <input
                                className='border rounded-md w-full p-2 pl-3 text-sm border-gray-200 bg-gray-200'
                                name = 'password'
                                type='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='At least 6 characters'
                            />
                        </div>
                        {/* confirm password */}
                         <div className='space-y-1'>
                            <label className='font-semibold'>Confirm Password</label>
                            <input
                                className='border rounded-md w-full p-2 pl-3 text-sm border-gray-200 bg-gray-200'
                                name = 'confirmPassword'
                                type='password'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder='Re-enter your password'
                            />
                        </div>
                    </div>

                    <button
                    className="border rounded-xl w-full font-semibold py-2.5 mt-6 text-white bg-black 
                            hover:bg-[#222] transition-all duration-200"
                    type='submit'
                    disabled ={loading}
                    > {loading ? "Signing up…": "Sign up"}
                    </button>

                    <div>
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                        {success && <p className="text-green-600 mt-2">{success}</p>} 
                    </div> 

                    <div className='flex justify-center mt-4'>
                        <p>Already have an account? <a href='/login' className='font-semibold'>Login</a></p>
                    </div> 
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup