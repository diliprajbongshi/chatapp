import React, { useState } from 'react'
import { FcGoogle, FcSafe } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeCloseFill } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,sendPasswordResetEmail   } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { getDatabase, ref, set } from "firebase/database";
const Login = () => {

const auth = getAuth();
const provider = new GoogleAuthProvider();
let navigate = useNavigate();
let [email,setEmail] = useState()
let [password,setPassword] = useState()
let [emailerr,setEmailerr] = useState()
let [passworderr, setPassworderr] = useState();
let [show, setShow] = useState(false);
let [error,setError] = useState("")
let [success,setSuccess] = useState("")
let [loading,setLoading] = useState(false)
let [open,setOpen] = useState(false)
let [forgotEmail,setForgotEmail] = useState("")

let handleEmial =(e)=>{
  setEmail(e.target.value);
  setEmailerr("");
}; 
let handlePassword =(e)=>{
setPassword(e.target.value);
setPassworderr("");
}; 
 let handleSubmit =()=>{
   if(!email){
     setEmailerr("Please enter your email");
   }
   
   if (!password) {
    setPassworderr("Please enter your password");
   }
   if(email && password){
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      toast("Login successful! wait redirect");
      setSuccess("Registration successful. Please verified your email address ")
    }).then(()=>{

    }).then(()=>{
      setTimeout(()=>{
        setLoading(false);
        navigate("/");
      },2000);
    })
    .catch((error) => {
      setLoading(false);
      const errorCode = error.code;
      console.log(errorCode)
      if(errorCode.includes("auth/wrong-password")){
        setError("Password does not match")
      }
      if(errorCode.includes("auth/user-not-found")){
        setError("Email does not match")
      }
    });
   }
 };



 let handlePasswordShow = ()=>{
  setShow(!show);
};
let handleGoogle = ()=>{
  signInWithPopup(auth, provider).then(()=>{
    navigate("/");
  });
}
let handleForgotpassword =()=>{
  sendPasswordResetEmail(auth, forgotEmail)
  .then(() => {
    toast("Please check your Email");
    setTimeout(()=>{
      setOpen(false)
    },2000);
  })
}
  return (
    <div className="flex px-2.5   xl:px-0 mt-5 sml:mt-0 sml:my-2 md:!my-0">
       <ToastContainer position="bottom-center" theme="dark"/>
      <div className="sml:w-1/2 flex flex-col items-end justify-center sml:mr-[40px]	md:!mr-[70px]">
        <div className="xl:w-[527px]">
          <h3 className="font-nun font-bold	text-4xl sml:text-[30px] md:!text-4xl text-headingOne">
            Login to your account!
          </h3>

          <div className="xl:w-[400px]">
            <button onClick={handleGoogle} className="w-[280px] font-nun font-semibold	text-xl py-4 mt-7 text-[#03014C]  w-full text-center  rounded-[9px]  border border-solid border-black curser-pointer">
              <FcGoogle className="inline-block	text-[40px] mr-2.5" />
              Login with Google
            </button>
            <div className="relative">
              <input
                className="border-b border-solid border-black w-full  py-5 px-2.5  mt-9 sml:mt-0 md:!mt-9 outline-0"
                type="email"
                onChange={handleEmial}
              />
              <p className="font-nun font-normal	text-[20px] text-para bg-white absolute top-6 left-0 px-2.5">
                Email Adress
              </p>
              {emailerr && (
                <p className="font-nun font-normal	text-[16px]  bg-lime-800 text-white p-1 mt-1 rounded">
                  {emailerr}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="border-b border-solid border-black w-full  py-5 px-2.5 mt-9 sml:mt-0 md:!mt-9  outline-0"
                type={show?"text":"password"}
                onClick={handlePassword}
              />
              <p className="font-nun font-normal	text-[20px]  bg-white absolute top-6 left-0 px-2.5">
                Password
              </p>
              {passworderr && (
                <p className="font-nun font-normal	text-[16px]  bg-lime-800 text-white p-1 mt-1 rounded">
                  {passworderr}
                </p>
              )}
                {show ? (
                <ImEye
                  onClick={handlePasswordShow}
                  className="absolute top-16 right-4"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={handlePasswordShow}
                  className="absolute top-16 right-4"
                />
              )}
            </div>
            {loading ?
             <div className="flex justify-center">
             <ColorRing
                     height="80"
                     width="80"
                     radius="48"
                     color="#5F35F5"
                     ariaLabel="watch-loading"
                     wrapperStyle={{}}
                     wrapperClassName=""
                     visible={true}
                   />
             <ColorRing
                     height="80"
                     width="80"
                     radius="48"
                     color="#5F35F5"
                     ariaLabel="watch-loading"
                     wrapperStyle={{}}
                     wrapperClassName=""
                     visible={true}
                   />
             <ColorRing
                     height="80"
                     width="80"
                     radius="48"
                     color="#5F35F5"
                     ariaLabel="watch-loading"
                     wrapperStyle={{}}
                     wrapperClassName=""
                     visible={true}
                   />
             </div>
            :
            <button
              onClick={handleSubmit}
              className="font-nun font-semibold	text-xl  text-white mt-12 w-full text-center bg-primary rounded-[9px] py-5"
            >
              Login to Continue
            </button>
            } 
            {error && (
                <p className="font-nun font-normal	text-[16px] text-white bg-red-500 p-1 mt-1 rounded">
                  {error}
                </p>
              )}
            <p className="font-open font-regular	text-xs text-black mt-9 w-full text-left">
              Don’t have an account ?{" "}
              <Link to="/registration" className="font-open font-bold text-[#EA6C00]">
                {" "}
                Sign Up
              </Link>
            </p>
            <p className="font-open font-regular	text-xs text-black mt-7 w-full text-center">
           
           <button onClick={()=>setOpen(!open)} className="font-open font-bold text-primary">
             {" "}
             Forgot password
           </button>
         </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 hidden sml:block">
        <picture>
          <img
            className="sml:auto md:!h-screen w-full	object-cover"
            src="images/rec.webp"
            loading="lazy"
          />
        </picture>
      </div>
      {open &&
     
     <div className="flex justify-center items-center w-full h-screen bg-primary fixed">
       <div className="p-10 bg-white rounded">
           <h1 className="text-5xl font-bold font-nun text-primary">Forgot Password</h1>
           <input onChange={(e)=>setForgotEmail(e.target.value)}
               className="border border-solid border-black w-full rounded-lg py-6 px-11 mt-9 outline-0 sml:p-4 md:!py-6  md:!px-11"
              type="email" placeholder="Email Address"
             />
           <button onClick={handleForgotpassword}
           className="font-nun font-semibold	text-xl  text-white mt-7 text-center bg-primary rounded-[5px] p-5"
             >
           Change Password
         </button>
           <button onClick={()=>setOpen(false)}
           className="font-nun font-semibold	text-xl ml-5 text-white mt-7 text-center bg-[#EA6C00] rounded-[5px] p-5"
             >
           Cancel
         </button>
       </div>
     </div> 
       }
    </div>
  );
}

export default Login;