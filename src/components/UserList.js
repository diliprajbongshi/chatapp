import React from 'react'
import { getDatabase, ref, onValue} from "firebase/database";
import { useEffect ,useState} from 'react';
import { getAuth  } from "firebase/auth";

const UserList = () => {


const auth = getAuth();
let [userlist,setUserlist] = useState([]);
const db = getDatabase();
useEffect(()=>{
  const userRef = ref(db, "users/");
  onValue(userRef, (snapshot) => {
    let arr = [];
    snapshot.forEach((item)=>{
      if(item.key !== auth.currentUser.uid){
        arr.push(item.val());
      }
    });
    setUserlist(arr)
  });
},[]);
  return (
    <div className="shadow-sm shadow-gray-600 h-[427px] p-2 rounded-3xl mt-5 overflow-y-scroll	">
    <h3 className="font-nun font-semibold text-xl ">User List</h3>

{userlist.map(item=>(
   <div className="flex justify-between items-center border-b-2 border-solid border-zinc-300 pb-2.5 m-3" >
   <img src={item.photoURL} className="w-[50px] h-[50px] rounded-full"/>
    <div>
        <h3 className="font-nun font-semibold text-xl ">{item.name}</h3>
        <p className="font-nun font-normal text-base ">{item.email}</p>
    </div>
    <div>
      <button className="font-nun font-normal text-base bg-primary p-1.5 rounded">Join</button>
    </div>
    </div>
))}
</div>
  )
}
export default UserList