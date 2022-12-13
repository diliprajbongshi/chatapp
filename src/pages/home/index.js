import React, { useEffect, useState } from 'react'
import BlockUser from '../../components/BlockUser'
import FriendRequest from '../../components/FriendRequest'
import Friends from '../../components/Friends'
import Group from '../../components/Group'
import MyGroups from '../../components/MyGroups'
import Search from '../../components/Search'
import Sidebar from '../../components/Sidebar'
import UserList from '../../components/UserList'
import { getAuth, updateCurrentUser } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { RiH1 } from 'react-icons/ri'

const Home = () => {
let auth = getAuth();
let navigate = useNavigate();
let [varify,setVarify]  = useState(false)
useEffect(()=>{
  if(!auth.currentUser){
    navigate("/login");
  }else{
    console.log(auth.currentUser.emailVerified)
    if(auth.currentUser.emailVerified){
      setVarify(true)
    }
  }
},[]);

  return (
    <>
     {varify ? 
        <div className="xl:flex justify-between p-2.5 xl:p-0">
        <div className="xl:max-w-[186px] ">
            <Sidebar active="home"/>
        </div>
        <div className="xl:max-w-[427px]">
          <Search/>
          <Group/>
          <FriendRequest/>
        </div>
        <div className="xl:max-w-[344px]">
           <Friends/>
           <MyGroups/>
        </div>
        <div className="xl:max-w-[344px]">
          <UserList/>
          <BlockUser/>
        </div>
    </div>
      :
      (
        <div className="text-center mt-5">
          <span className="font-nun font-bold text-5xl text-white bg-primary p-5 inline-block">Please Varify Your Email</span>
        </div>
      )
      }
    </>
 
  )
}

export default Home