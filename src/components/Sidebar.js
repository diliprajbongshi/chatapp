import React, { useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai';
import {BiMessage} from 'react-icons/bi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {MdLogout} from 'react-icons/md';
const Sidebar = ({active}) => {
    let [home,setHome] = useState(true)
  return (
    <div className="w-full bg-primary p-2.5 left-0  xl:py-9 xl:px-11 xl:rounded-3xl overflow-x-hidden flex xl:flex-col fixed bottom-0 xl:static gap-x-5 justify-left">
        <picture>
            <img src="images/profile.png" className="w-[50px] w-[50px] xl:w-[100px] xl:h-[100px] rounded"/>
        </picture>
        <div className="flex xl:flex-col  items-center text-white gap-x-5 xl:gap-y-20 xl:mt-24">

            <div className={`${active == "home" && 
            "relative z-10 after:absolute after:top-0 after:left-0 after:w-[110%] xl:after:w-[243%] after:h-full after:content-[''] after:bg-white  xl:after:bg-white after:z-[-1]   flex flex-col  items-center xl:p-10 rounded xl:after:rounded-2xl  before:absolute   before:top-0 before:right-[-5px] xl:before:right-[-36px] before:w-[10%] before:h-full before:content-[''] before:bg-primary xl:before:bg-primary before:rounded-2xl shadow-lg shadow-indigo-500/50 "}`}>
               <AiOutlineHome className={`${active == "home"?"text-3xl xl:text-5xl text-primary xl:text-primary":"text-3xl text-5xl  text-white"}`}/>
            </div>
            <div className={`${active == "message" && 
            "relative z-10 after:absolute after:top-0 after:left-0 after:w-[243%] after:h-full after:content-[''] after:bg-white after:z-[-1]   flex flex-col  items-center p-10 after:rounded-2xl  before:absolute   before:top-0 before:right-[-36px] before:w-[10%] before:h-full before:content-[''] before:bg-primary before:rounded-2xl shadow-lg shadow-indigo-500/50 "}`}>
               <BiMessage className={`${active == "message"?"text-3xl xl:text-5xl text-primary":"text-3xl text:3xl xl:text-5xl  text-white"}`}/>
            </div>
            <IoMdNotificationsOutline className="text-3xl xl:text-5xl"/>
            <MdLogout className="text-3xl xl:text-5xl xl:mt-44"/>
        </div>
    </div>
  )
}

export default Sidebar