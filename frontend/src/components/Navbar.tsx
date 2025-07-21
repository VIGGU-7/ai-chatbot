import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { FiSidebar } from "react-icons/fi";
import { FaSearch, FaEdit } from "react-icons/fa";
import { apiInstance } from '../lib';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../lib/store';
function Navbar() {
  const [chathistory, setChatHistory] = React.useState([]);
  const {setNav,navBarHidden}=useAuthStore()

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const res = await apiInstance.get("/history");
        setChatHistory(res.data);
      } catch (error: any) {
        toast.error("Something went wrong while fetching chat history");
        console.log(error?.response?.data?.message);
      }
    };
    getChatHistory();
  }, []);
  console.log(chathistory)
return (
  <div className={`p-4 overflow-y-auto h-screen space-y-2 bg-white w-[150px] ${navBarHidden ? "block":"hidden"} md:w-[250px] md:block`}>
    <div className='flex'>
      <img src={logo} className='w-15 h-15 mr-auto' alt="logo" />
      <FiSidebar onClick={()=>{
        setNav(!navBarHidden)
      }}
      className='block rounded-lg text-xl ml-auto hover:bg-gray-300 cursor-pointer md:hidden' />
    </div>

    <div>
      <NavLink to="/" className='flex p-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
        <FaEdit className='mt-auto mb-auto' />
        <p className='mt-auto mb-auto ml-2'>New chat</p>
      </NavLink>
      <div className='flex p-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
        <FaSearch className='mt-auto mb-auto' />
        <p className='mt-auto mb-auto ml-2'>Search chat</p>
      </div>

      {/* Chat History */}
      <p className='text-gray-500 mt-10'>Chats</p>
      {chathistory.length > 0 ? (
        chathistory.map((chat: any, index: number) => (
         <NavLink
  to={`/chat/${chat._id}`}
  key={index}
  className={({ isActive, isPending }) =>
    `flex p-2 rounded-lg hover:bg-gray-300 cursor-pointer ${
      isPending ? 'opacity-50' : isActive ? 'bg-gray-300 font-semibold' : ''
    }`
  }
>
  <p>{chat.title}</p>
</NavLink>

        ))
      ) : (
        <p className='text-gray-400 text-sm mt-2'>No chat history found</p>
      )}
    </div>
  </div>
);

}

export default Navbar;
