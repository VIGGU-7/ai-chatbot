import React from 'react'
import { FaArrowUp } from "react-icons/fa";
function Chatinputbox({value,setValue,onClick}:any) {
  return (
    <div className='relative mt-auto sm:mt-0'>
    <input 
    type="text" 
    placeholder="Ask anything" 
    value={value}
    onChange={(e)=>{
        document.getElementById("send-icon")?.classList.remove("cursor-not-allowed")
        setValue(e.target.value)
    }}
   className="block mb-2 shadow-md border-2 border-gray-300 rounded-xl px-2 py-4 mt-auto w-sm sm:mt-0 sm:w-[550px] md:w-[650px] lg:w-[750px] "
    required/>
    <div className=
    {`absolute right-1/45 top-1/4 ${(value || "").trim() === "" ? "bg-gray-500 ":"bg-black"}  rounded-full w-7 h-7 px-2 flex items-center`}
    >
        <FaArrowUp className={`text-white text-2xl 
        ${(value || "").trim() === "" ? "cursor-not-allowed":"cursor-pointer"}`}
           onClick={onClick}  />
    </div>
   

  </div>
  )
}

export default Chatinputbox