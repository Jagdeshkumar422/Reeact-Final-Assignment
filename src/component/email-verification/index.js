import React, {useEffect, useState} from 'react'
import "./verification.css"
import { auth } from '../../firebase'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'

const EmailVerified = () => {
  const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    // const [data,setData]=useState()
  
    useEffect(()=>{
      onAuthStateChanged(auth, (userData) => {
        
        if (userData) {
        //   const uid = userData.uid;
        if(userData.emailVerified){
          // alert("email address is verified")
          window.location.assign("/user_Status")
        }
          // console.log(userData.email)
          
          
        } else {
          window.location.assign("/login")
        }
      });
  
  
    })
   const resendEmail =()=>{
        sendEmailVerification(auth.currentUser)
  .then((res) => {
    setmessage("Success Sent Verification link")
    setmessagetype("Success")
    setTimeout(() => {
      setmessage("")
  }, 2000);
    // Email verification sent!
    // ...
                    }).catch((err)=>{
                    console.log(err)
                    setmessage("error")
                    setmessagetype(err.message)
                    setTimeout(() => {
                      setmessage("")
                  }, 2000);
                })
    }
    const confirm =()=>{
        window.location.reload()
    }
  return (
    <div className='verified'>
    <div id="verify">
        <div id="Verifiedimg"><img src="../images/email.png" alt="" className='verificationimg' /></div>
        <h2 className='VerificationHeading'>Please verify your email</h2>
        <p className='Verification-p'>You're almost there! we sent an verification message on your email</p>
        <p className='Verification-p'>Just click on the linkin that email to complete your signup. If you don't see it, you may need to check spam folder.</p>
        <div id="Verification-btn"> 
            <button onClick={resendEmail}>Resend Email</button>
            <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>
            <button onClick={confirm}>Confirm</button>
        </div>
    </div>
    </div>
  )
}

export default EmailVerified
