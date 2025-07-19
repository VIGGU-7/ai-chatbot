import React from 'react'
import image from '../assets/logo.png'
import Inputbox from '../components/Inputbox'
import { apiInstance } from '../lib'
import { toast } from 'react-toastify';
function Login() {
  const [username,setUsername]=React.useState("")
  const [email,setEmail]=React.useState("")
  const [password,setPassword]=React.useState("")
  const data={username,email,password}
  const onsubmit=async(e:any)=>{
    e.preventDefault();
    if(!username){
       return toast.error("username is required")
    }
    if(!validateEmail(email)){
      return toast.error("Invalid email")
    }
    try {
      const res:any=await apiInstance.post("/auth/signup",data)
         toast.success("Signup succesfull")
      console.log(res)
    } catch (error:any) {
      toast.error(error.response?.data?.message)
      console.log(error.res?.data?.message)
    }
  }
  return (
    <div className='flex justify-center items-center container'>
      <div className='flex flex-col container items-center justify-center mt-30'>
        <img className="w-20 h-20 ml-auto mr-auto" src={image}/>
        <p className='text-center text-3xl font-semibold'>Welcome back.</p>
        <p className='text-center text-3xl font-semibold'>Sign in to Continue </p>
      <form className='flex-row ml-auto mr-auto justify-center items-center p-3 mt-3'>
        <Inputbox type="text" placeholder="username" setValue={setUsername} value={username}/>
        <Inputbox type="email" placeholder="email" setValue={setEmail} value={email}/>
         <Inputbox type="password" placeholder="password" setValue={setPassword} value={password}/>
         <button 
         className='w-full bg-black text-white px-2 py-2 rounded-4xl 
         hover:bg-gray-900 hover:cursor-pointer'
         onClick={(e)=>{onsubmit(e)}}>
          Login
          </button>
      </form>
       <p>Already have a account ? <span className='underline px-1 py-1 hover:cursor-pointer' onClick={()=>{window.location.href="/login"}}>Login</span></p>
      </div>
    </div>
  )
}
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
}

export default Login