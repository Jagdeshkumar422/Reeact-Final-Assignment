import React,{useState} from 'react'
import "./forget.css"
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase'
import { Link} from 'react-router-dom'

const ForgetPassword = () => {
    // const navigate = useNavigate()
    // usest
    const [emailforgot, setemailforgot] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    // var regex = "/^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/";
    const Forgot = () => {
        if (emailforgot === "") {
            setmessage("Email Address Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        }
        // else if (!emailforgot.match(regex)) {
        //     setmessage("Please Enter Valid Email Address")
        //     setmessagetype("error")
        //     setTimeout(() => {
        //         setmessage("")
        //     }, 2000);
        // }
         else {
            sendPasswordResetEmail(auth, emailforgot)
                .then((res) => {
                    setmessage("Success")
                    setmessagetype("success")
                        })
                .catch((error) => {
                    const errorMessage = error.message;
                    setmessage(errorMessage)
                    setmessagetype("error")
                });
        }
    }
  return (
    <div className='ForgetPassword'>
      <div id="forget">
        <h2>Forgot Password</h2>
        <p>Lost your password? plaese enter your email address. you will receive a link to create a new password via email.</p>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" placeholder="Email Address" value={emailforgot} onChange={(e) => setemailforgot(e.target.value)}/>
        <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>
        <button id="Reset" type='submit' onClick={Forgot}>Request password reset</button>
        <Link to={"/login"}>Back to Log In</Link>

    </div>
    </div>
  )
}

export default ForgetPassword
