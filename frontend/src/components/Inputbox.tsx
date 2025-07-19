import React from 'react'

function Inputbox({type,placeholder,setValue,value}:any) {
  return (
    <input 
    type={type} 
    placeholder={placeholder} 
    value={value}
    onChange={(e)=>setValue(e.target.value)}
   className="block mb-2 border-2 border-gray-300 rounded-xl px-2 py-2 w-[320px] sm:w-[300px] md:w-[400px] lg:w-[350px] focus:outline-none focus:ring-2 focus:ring-blue-400"
    required/>
  );
}

export default Inputbox