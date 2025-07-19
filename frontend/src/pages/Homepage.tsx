import React from 'react'
import Chatinputbox from '../components/Chatinputbox'
import { apiInstance } from '../lib'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Homepage() {
  const navigate=useNavigate()
  const [prompt,setPrompt]=React.useState()
  const onSubmit=async()=>{
    try {
      console.log("clicked")
      const res=await apiInstance.post("/send",{prompt})
      navigate(`/chat/${res.data.sessionId}`)
      console.log(res)
    } catch (error:any) {
      toast.error(error?.response?.data.message)
    }
  }
  return (
    <div className='h-screen container flex justify-center'>
      <div className='flex flex-col mt-70'>
        <p className='text-2xl text-center mb-1 sm:text-3xl'>What's on the agenda today?</p>
           <Chatinputbox value={prompt} setValue={setPrompt} onClick={onSubmit}/>
      </div>
    </div>
  )
}

export default Homepage