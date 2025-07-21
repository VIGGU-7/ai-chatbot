import React from 'react';
import { CiMenuFries } from "react-icons/ci";
import logo from '../assets/logo.png';
import { useAuthStore } from '../lib/store';

function Mobilenav() {
  const { setNav, navBarHidden } = useAuthStore();

  return (
    <div className={`flex items-center justify-between shadow-md mt-3 fixed top-0 left-0 right-0 bg-white p-3 z-50 ${navBarHidden ? "hidden" : ""} md:hidden`}>
      <CiMenuFries
        className="text-2xl cursor-pointer"
        onClick={() => setNav(!navBarHidden)} 
      />
      <img src={logo} className="h-[40px] w-auto" alt="logo" />
    </div>
  );
}

export default Mobilenav;
