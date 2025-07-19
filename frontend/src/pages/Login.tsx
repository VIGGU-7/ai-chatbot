import React from 'react'
import image from '../assets/logo.png'
import Inputbox from '../components/Inputbox'
import { apiInstance } from '../lib'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate()
  const [email,setEmail]=React.useState("")
  const [password,setPassword]=React.useState("")
  const data={email,password}
  const onsubmit=async(e:any)=>{
    e.preventDefault();
    try {
      const res:any=await apiInstance.post("/auth/login",data)
         toast.success("Login succesfull")
          navigate("/")
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
        <Inputbox type="email" placeholder="email" setValue={setEmail} value={email}/>
         <Inputbox type="password" placeholder="password" setValue={setPassword} value={password}/>
         <button 
         className='w-full bg-black text-white px-2 py-2 rounded-4xl 
         hover:bg-gray-900 hover:cursor-pointer'
         onClick={(e)=>{onsubmit(e)}}>
          Login
          </button>
      </form>
       <p>Don't have an account ? <span className='underline px-1 py-1 hover:cursor-pointer' onClick={()=>{window.location.href="/signup"}}>Create account</span></p>
      </div>
    </div>
  )
}

export default Login