import React from 'react'

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-primary">
        <div className="p-10 bg-white rounded">
            <h1 className="text-5xl font-bold font-nun text-primary">Forgot Password</h1>
            <input
                className="border border-solid border-black w-full rounded-lg py-6 px-11 mt-9 outline-0 sml:p-4 md:!py-6  md:!px-11"
               type="email" placeholder="Email Address"
              />
            <button
            className="font-nun font-semibold	text-xl  text-white mt-7 w-full text-center bg-primary rounded-[86px] py-5"
              >
            Sign up
          </button>
        </div>
    </div>
  )
}

export default ForgotPassword