import React, { useEffect, useState } from 'react'
import "./signup.css"
import { Link } from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"
import { auth, userRef,db } from '../../firebase'
import { setDoc , doc, addDoc } from "firebase/firestore"; 

// import {swal} from "sweetalert" 
const Signup = () => {
        const [formValue, setformValue]=useState({
            Fname: "",
            lname: "",
            Mobile_No: "",
            email:"",
            password:"",
            confirmPassword:"",
            userStatus: "Padding"
        })

        
        const [formError, setforError]=useState({})
        const [isSubmit, setSubmit] =useState(false)
        const [message, setmessage] = useState("")
        const [messagetype, setmessagetype] = useState("")
        
        const handleValidation =(e)=>{
            const {name, value}= e.target;
            setformValue({...formValue, [name]: value});

        }

        const handleSubmit=async (e)=>{
            e.preventDefault();
            setforError(validationform(formValue));
            setSubmit(true);
        //     if(Object.keys(formError).length===0 && isSubmit){
        //         await addDoc(userRef,{
        //             ...formValue
        //         })
        //     }
            
        }
        const validationform=(value)=>{
            const errors={};
            if (!value.Fname){
                errors.Fname="first name is required";
            }else if (!value.lname){
                errors.lname="Last name is required";
            }else if(!value.Mobile_No){
                errors.Mobile_No="Mobile Number is required"
            }else if(value.Mobile_No <= 10 && value.Mobile_No >=12){
                errors.Mobile_No= "enter valid number"
            }
            else if(!value.email){
                errors.email="Email is required"
            } else if(!value.password){
                errors.password="password is required"
            }else if(!value.confirmPassword){
                errors.confirmPassword="Confirm Password is require"
            }else if (value.password !== value.confirmPassword){
                errors.confirmPassword="Password is not Matched"
            }


            return errors;
        };

        useEffect(()=>{
            if(Object.keys(formError).length===0 && isSubmit){
                console.log(formValue)
                createUserWithEmailAndPassword(auth,formValue.email,formValue.password).then(async (res)=>{
                    console.log(res)
                    sendEmailVerification(auth.currentUser)
  .then(async() => {
                    const ref = doc(userRef, res.user.uid)
                    const docRef=await setDoc(ref, {
                        Fname: formValue.Fname,
                        lname:formValue.lname,
                        email:formValue.email,
                        password:formValue.password,
                        Mobile_No:formValue.Mobile_No,
                        userStatus:formValue.userStatus,
                        id: res.user.uid,
                    })
                    setmessage("SuccesFully Sign Up")
                    setmessagetype("Success")
                    window.location.assign("/email-verification")
                    
                    
                    });
                }).catch((err)=>{
                    console.log(err)
                    setmessage(err.message)
                    setmessagetype("error")
                })
            }
        },[formError, formValue, isSubmit])

  return (
    <div className='main'>
        <h1>Sign Up</h1>
        <form className='signup' onSubmit={handleSubmit}>
            <div className='inputs'>
                <label>First Name: </label>
                <input type="text" name="Fname" placeholder='Enter First Name'value={formValue.Fname} onChange={handleValidation}/>
                <b className="error">{formError.Fname}</b>
            </div>
            <div className='inputs'>
                <label>Last Name: </label>
                <input type="text" name="lname" placeholder='Enter Last Name' value={formValue.lname} onChange={handleValidation}/>
                <b className="error">{formError.lname}</b>
            </div>
            <div className='inputs'>
                <label>Mobile Number: </label>
                <input type="Number" name="Mobile_No" placeholder='Enter Mobile Number' value={formValue.Mobile_No} onChange={handleValidation}/>
                <b className="error">{formError.Mobile_No}</b>
            </div>
            <div className='inputs'>
                <label>Email Address: </label>
                <input type="email" name="email" placeholder='Enter Email Address' value={formValue.email} onChange={handleValidation}/>
                <b className="error">{formError.email}</b>
            </div>
            <div className='inputs'>
                <label>Password: </label>
                <input type="password" name="password" placeholder='Enter Password' value={formValue.password} onChange={handleValidation}/>
                <b className="error">{formError.password}</b>
            </div>
            <div className='inputs'>
                <label>Confirm Password: </label>
                <input type="password" name="confirmPassword" placeholder='Enter Confirm Password' value={formValue.confirmPassword} onChange={handleValidation}/>
                <b className="error">{formError.confirmPassword}</b>
                <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>
            </div>
            <div className='buttons'>
                <button>Sign Up</button>
                <p>Already user? <Link to="/login">Login</Link></p>
            </div>
        </form>
      
    </div>
  )
}

export default Signup
