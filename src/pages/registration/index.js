import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { RiEyeCloseFill } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification,updateProfile  } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { getDatabase, ref, set } from "firebase/database";
const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
   let navigate = useNavigate();
   let [email, setEmail] = useState();
   let [password, setPassword] = useState();
   let [fullName, setFullname] = useState();
   let [emailerr, setEmailerr] = useState();
   let [passerr, setPasserr] = useState();
   let [fullNameerr, setFfullnameerr] = useState();
   let [show, setShow] = useState(false);
   let [validEmail,setValidemil] = useState(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
   let [validPass,setValidpass] = useState(/"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"+$/.test(password));
   let [ferr,setFerr] = useState("")
   let [success,setSuccess] = useState("")
   let [loading,setLoading] = useState(false)

   
   let handleFullname = (e)=>{
      setFullname(e.target.value); 
      setFfullnameerr("");
   }
   let handlePassword = (e) => {
     setPassword(e.target.value);
     setPasserr("");
   };
   let handleEmail = (e) => {
     setEmail(e.target.value);
     setEmailerr("");
   };
   let handleSubmit = ()=>{
     if(!email){
      setEmailerr("Email is required");
     }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
          setEmailerr("Valid email is required");
      }
     }
     if (!fullName) {
       setFfullnameerr("Fullname is required");
     }else{
       if(fullName.length <=2){
        setFfullnameerr("Fullname must be greater than 2 charecter");
       }
     }
     if(!password){
       setPasserr("Password is required");
     }else{
      if (!/^(?=.*[a-z])/.test(password)) {
        setPasserr("Password must contain a lowercase ");
      }else if (!/^(?=.*[A-Z])/.test(password)) {
        setPasserr("Password must contain a uppercase ");
      }
      else if (!/^(?=.*[0-9])/.test(password)) {
        setPasserr("Password must contain a number ");
      }
      else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
        setPasserr("Password must contain a special charecter ");
      }
      else if (!/^(?=.{8,})/.test(password)) {
        setPasserr("Password have atleast 6 charecter");
      }
      else if(email && password && fullName && setValidemil
        && setValidpass){
          setLoading(true);
          createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            updateProfile(auth.currentUser, {
              displayName:fullName,
              photoURL:"images/avt.png",
            
            }).then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                setLoading(false);
                setSuccess("Registration successful. Please verified your email address ")
               
              }).then(()=>{
                set(ref(db, 'users/' + user.user.uid), {
                  name: user.user.displayName,
                  email: user.user.email,
                  photoURL : user.user.photoURL
                });
              }).then(()=>{
                setTimeout(()=>{
                  navigate("/login");
                },2000);
              })
           
            }).catch((error) => {
             console.log(error);
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            if(errorCode.includes("auth/email-already-in-use")){
              setLoading(false);
              setFerr("Email already in use");

            }
          });
      }
     }

   }
   let handlePasswordShow = ()=>{
     setShow(!show);
   };
  return (
    <div className="flex px-2.5   xl:px-0 mt-5 sml:mt-0 sml:my-2 md:!my-0">
      <div className=" sml:w-1/2 flex flex-col items-end justify-center sml:mr-[40px]	md:!mr-[70px]">
        <div className=" xl:w-[527px]">
          <h3 className="font-nun font-bold	text-4xl sml:text-[20px] md:!text-4xl text-headingOne text-center sml:text-left md:!text-center">
            Get started with easily register
          </h3>
          <p className="font-nun font-normal	text-[20px] sml:text-[14px] md:!text-[20px] text-para opacity-50	mt-2.5 text-center sml:text-left md:text-left">
            Free register and you can enjoy it
          </p>
          <div className="xl:w-[400px]">
            <div className="relative">
              <input
                className="border border-solid border-black w-full rounded-lg py-6 px-11 mt-9 outline-0 sml:p-4 md:!py-6  md:!px-11"
                type="text"
                onChange={handleFullname}
              />
              <p className="font-nun font-normal	text-[16px] text-para bg-white absolute top-6 left-8 px-2.5">
                Full name
              </p>
              {fullNameerr && (
                <p className="font-nun font-normal	text-[16px] text-white bg-red-500 p-1 mt-1 rounded">
                  {fullNameerr}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                className="border border-solid border-black w-full rounded-lg py-6 px-11 mt-9 outline-0 sml:p-4 md:!py-6  md:!px-11"
                type="email"
                onChange={handleEmail}
              />
              <p className="font-nun font-normal	text-[16px] text-para bg-white absolute top-6 left-8 px-2.5">
                Email Adress
              </p>
              {emailerr && (
                <p className="font-nun font-normal	text-[16px] text-white bg-red-500 p-1 mt-1 rounded">
                  {emailerr}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="border border-solid border-black w-full rounded-lg py-6 px-11 mt-9 outline-0 sml:p-4 md:!py-6  md:!px-11"
                type={show ? "text" : "password"}
                onChange={handlePassword}
              />
              <p className="font-nun font-normal	text-[16px] text-para bg-white absolute top-6 left-8 px-2.5">
                Password
              </p>
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

              {passerr && (
                <p className="font-nun font-normal	text-[16px] text-white bg-red-500 p-1 mt-1 rounded">
                  {passerr}
                </p>
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
            className="font-nun font-semibold	text-xl  text-white mt-7 w-full text-center bg-primary rounded-[86px] py-5"
          >
            Sign up
          </button>
            }
           
           
            {ferr && (
                <p className="font-nun font-normal	text-[16px] text-white bg-red-500 p-1 mt-1 rounded">
                  {ferr}
                </p>
              )}
            {success && (
                <p className="font-nun font-normal	text-[16px] text-white bg-green-500 p-1 mt-1 rounded">
                  {success}
                </p>
              )}
            <p className="font-open font-regular	text-xs text-black mt-7 w-full text-left">
              Already have an account ?{" "}
              <Link to="/login" className="font-open font-bold text-[#EA6C00]">
                {" "}
                Sign In
              </Link>
            </p>
           
          </div>
        </div>
      </div>
      <div className="w-1/2 hidden sml:block">
        <picture>
          <img
            className="sml:auto md:!h-screen w-full	object-cover"
            src="images/regis.webp"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
  );
}

export default Registration