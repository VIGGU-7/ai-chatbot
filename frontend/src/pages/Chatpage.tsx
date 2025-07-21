import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SessionChatinputbox from '../components/Sessionchatinput';
import Navbar from '../components/Navbar';
import {toast} from 'react-toastify'
import CodeBlock from '../components/Syntaxhighligter';
import { apiInstance } from '../lib';
import Mobilenav from '../components/Mobilenav';
function Chatpage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [chathistory,setChatHistory]=React.useState([])
  const [prompt,setPrompt]=React.useState("")
   const getchathistory=async()=>{
      try {
        const res=await apiInstance.get(
          `chat/${sessionId}`
        )
        setChatHistory(res.data)
      } catch (error) {
        toast.error(
          "something went wrong"
        )
        console.log(error?.response?.data?.message)
      }
    } 
  useEffect(()=>{
    getchathistory()
  },[sessionId])
  const sendPrompt=async()=>{
    try {
      const res=await apiInstance.post(`/send/${sessionId}`,{prompt:prompt})
      getchathistory()
      setPrompt("")
    } catch (error) {
       toast.error(
          "something went wrong"
        )
        console.log(error?.response?.data?.message)
    }
  }
  return (
    <>
    <Mobilenav/>
    <div className="md:grid grid-cols-[15%_85%] w-full h-screen overflow-hidden">
      
      <div className="overflow-visible">
        <Navbar />
      </div>

      <div className="h-screen flex flex-col overflow-hidden">

      
        <div className="flex-1 p-4 space-y-2 bg-white overflow-y-scroll mt-7 sm:mb-4">
        {
      chathistory.map((chat, index) => (
        <div key={index} >
      <div className='w-full px-2 py-1 shadow-md'>
         <p className="text-right">{chat.message}</p>
      </div>
       <p className="text-left">{!chat.isCode ? <p>{chat.Response}</p>:<CodeBlock resCode={chat.Response}/>}</p>
     <div>
      </div>
    </div>
  ))
}

        </div>

       
        <div className="p-2">
          <SessionChatinputbox value={prompt} setValue={setPrompt} onClick={sendPrompt}/>
        </div>
      </div>

    </div>
    </>
  );
}

export default Chatpage;
