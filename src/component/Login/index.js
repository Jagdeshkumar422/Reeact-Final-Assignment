import React,{useState, useEffect} from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import {auth, userRef} from "../../firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { onSnapshot } from 'firebase/firestore'

const Login = () => {
    const Navigate= useNavigate()
    const [data, setData]=useState()
    const [message, setmessage] = useState("")
        const [messagetype, setmessagetype] = useState("")
    const [formValue, setformValue]=useState({
        email:"",
        password:"",
    })
    
    const [formError, setforError]=useState({})
    const [isSubmit, setSubmit] =useState(false)
    
    const handleValidation =(e)=>{
        const {name, value}= e.target;
        setformValue({...formValue, [name]: value});
    
    }

    useEffect(()=>{
      const unsub = onSnapshot(userRef,(onSnapshot)=>{
        let list=[];
        onSnapshot.docs.forEach((doc)=>{
          // console.log("doc",doc.data())
          list.push({id: doc.id, ...doc.data()})
        })
        setData(list);
        
      },(error)=>{
        console.log(error)
      })

      return()=>{
        unsub()
      }
  },[])
  // console.log("data",data)
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        setforError(validationform(formValue));
        setSubmit(true);
    }
    const validationform=(value)=>{
        const errors={};
        if(!value.email){
            errors.email="Email is require"
        }
        else if(!value.password){
            errors.password="password is required"
        }else{
            if(Object.keys(formError).length===0 && isSubmit){
                console.log(formValue)
                signInWithEmailAndPassword(auth, formValue.email,formValue.password)
               .then((userCredential) => {
                  // Signed in 
                  console.log(userCredential.user)
                  setmessage("Successfully Sign In")
                          setmessagetype("Success")
                  if(userCredential.user.emailVerified){
                    data.forEach((data)=>{
                      if (data.id===userCredential.user.uid){
                        if(data.userStatus==="Padding"){
                          window.location.assign("/user_Status")
                        }else{
                          window.location.assign("/userHome")
                        }
                      }
                    })
                        // alert(data.userStatus)
                      window.location.assign("/userHome")
                  }else{
                    Navigate("/email-verification")
                  }
                //   const user = userCredential.user;
                  // ...
                })
                .catch((error) => {
                //   const errorCode = error.code;
                console.log(error.message)
                setmessage(error.message)
                          setmessagetype("error")
                //   const errorMessage = error.message;
                });

        }
        }
        
    
    
        return errors;
    };   
    
  return (
    <div className='main'>
        <h1>Log In</h1>
        <div className='Login'>
            <div className='inputs'>
                <label>Email Address: </label>
                <input type="email" placeholder='Enter Email Address' required name="email" value={formValue.email} onChange={handleValidation}/>
                <b className="error">{formError.email}</b>
            </div>
            <div className='inputs'>
                <label>Password: </label>
                <input type="password" placeholder='Enter Password' required name='password' value={formValue.password} onChange={handleValidation}/>
                <b className="error">{formError.password}</b>
            </div>
            <div className='buttons'>
                <Link className='fPassword' to={"/forget_Password"}>Forget Password</Link>
                <button onClick={handleSubmit}>Log In</button>
                <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>
                <p>New users ? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
      
    </div>
  )
}

export default Login
