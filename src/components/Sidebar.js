import React, { useState } from 'react'
import {AiOutlineHome} from 'react-icons/ai';
import {BiMessage} from 'react-icons/bi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {MdLogout} from 'react-icons/md';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref,uploadString } from "firebase/storage";
const Sidebar = ({active}) => {
  const auth = getAuth();
  const storage = getStorage();
 

  const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("");
    const [cropper, setCropper] = useState();
    const storageRef = ref(storage,"mmmm");

    let navigate = useNavigate();
    let [home,setHome] = useState(true);
    let [show,setShow] = useState(false);
    let handleSingout =()=>{
      signOut(auth).then(()=>{
        navigate("/login");
      })
    }
    let handelUpload = ()=>{
      setShow(!show);
      setImage("")
    }
    
    const handleImageUpload = (e) => {
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };
    const getCropData = () => {
     
      if (typeof cropper !== "undefined") {
        const message4 =cropper.getCroppedCanvas().toDataURL();
        uploadString(storageRef, message4, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!');
        });
      }
    };
  
  return (
    <div className="w-full bg-primary p-2.5 left-0  xl:py-9 xl:px-11 xl:rounded-3xl overflow-x-hidden flex xl:flex-col fixed bottom-0 xl:static gap-x-5 justify-left">
        <div className="relative group w-[50px] w-[50px] xl:w-[100px] xl:h-[100px]  overflow-hidden">
        <picture>
            <img src={auth.currentUser.photoURL} className="w-[50px] w-[50px] xl:w-[100px] xl:h-[100px] rounded-full"/>

            <div onClick={handelUpload}  className="w-[50px] w-[50px] xl:w-[50px] xl:h-[50px] bg-primary hidden right-0 bottom-0 absolute group-hover:flex">
              <FaCloudUploadAlt className="text-white absolute top-[10px] left-[10px] text-2xl"/>
            </div>
            
        </picture>
        </div>
        <h4 className="font-nun font-bold text-2xl text-white text-center">{auth.currentUser.displayName}</h4>
        
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
            <MdLogout onClick={handleSingout} className="text-3xl xl:text-5xl xl:mt-44"/>
        </div>
        {/* photo modal */}
        {show && 
        <div className="flex justify-center items-center w-full h-screen bg-primary fixed top-0 left-0 z-[999]">
       <div className="p-10 bg-white rounded">
           <h1 className="text-5xl font-bold font-nun text-primary">Upload Image</h1>
           {image ?
            <img src={image} className="w-[50px] w-[50px] xl:w-[100px] xl:h-[100px] rounded-full"/>
            :
            <img src={auth.currentUser.photoURL} className="w-[50px] w-[50px] xl:w-[100px] xl:h-[100px] rounded-full"/>
            }
        
           <input
            onChange={handleImageUpload}
               className="border border-solid border-black w-full rounded-lg py-6 px-11 mt-9 outline-0 sml:p-4 md:!py-6  md:!px-11"
              type="file" placeholder="Email Address"
             />
          <Cropper
          style={{ height: 200, width: "70%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
           <button
           onClick={getCropData}
           className="font-nun font-semibold	text-xl  text-white mt-7 text-center bg-primary rounded-[5px] p-5"
             >
           Upload
         </button>
           <button onClick={()=>setShow(false)}
           className="font-nun font-semibold 	text-xl ml-5 text-white mt-7 text-center bg-[#EA6C00] rounded-[5px] p-5"
             >
           Cancel
         </button>
       </div>
     </div> 
     }
    </div>
  )
}

export default Sidebar