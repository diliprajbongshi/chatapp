import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { RiEyeCloseFill } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();

 let [email,setEmail] = useState()
 let [password,setPassword] = useState()
 let [emailerr,setEmailerr] = useState()
 let [passworderr, setPassworderr] = useState();
 let [show, setShow] = useState(false);
 let [error,setError] = useState("")

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
   }else{
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerr("Valid email is required");
    }
   }
   if (!password) {
    setPassworderr("Please enter your password");
   }
   if(email && password){
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
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
  return (
    <div className="flex px-2.5   xl:px-0 mt-5 sml:mt-0 sml:my-2 md:!my-0">
      <div className="sml:w-1/2 flex flex-col items-end justify-center sml:mr-[40px]	md:!mr-[70px]">
        <div className="xl:w-[527px]">
          <h3 className="font-nun font-bold	text-4xl sml:text-[30px] md:!text-4xl text-headingOne">
            Login to your account!
          </h3>

          <div className="xl:w-[400px]">
            <button className="w-[280px] font-nun font-semibold	text-xl py-4 mt-7 text-[#03014C]  w-full text-center  rounded-[9px]  border border-solid border-black curser-pointer">
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

            <button
              onClick={handleSubmit}
              className="font-nun font-semibold	text-xl  text-white mt-12 w-full text-center bg-primary rounded-[9px] py-5"
            >
              Login to Continue
            </button>
                
            {error && (
                <p className="font-nun font-normal	text-[16px] text-white bg-red-500 p-1 mt-1 rounded">
                  {error}
                </p>
              )}
            <p className="font-open font-regular	text-xs text-black mt-9 w-full text-left">
              Don’t have an account ?{" "}
              <Link to="/login" className="font-open font-bold text-[#EA6C00]">
                {" "}
                Sign Up
              </Link>
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
    </div>
  );
}

export default Login;