import React,{useState} from 'react'

const AdminLogin = () => {
    const [loginValue, setloginValue]= useState({
        email:"",
        password:""
    })
    // const [formError1, setforError1]=useState({})
    // const [isSubmit2, setSubmit2] =useState(false)

    const AdminHandle =(e)=>{
        const {name, value}= e.target;
        setloginValue({...loginValue, [name]: value});
    
    }
    const AdminSubmitHandler=(e)=>{
        e.preventDefault();
        // setforError1(loginValue);
        // setSubmit2(true);
        // console.log(loginValue)
        if (loginValue.email==="jagdeshk953@gmail.com" && loginValue.password==="123456"){
            alert("")
        console.log(loginValue)
        window.location.assign("/adminDashboard")

        }else{
            alert("user not exist")
        }
    }
    
  return (
    <div className='main'>
    <h1>Log In</h1>
    <div className='Login'>
        <div className='inputs'>
            <label>Email Address: </label>
            <input type="email" placeholder='Enter Email Address' name="email" value={loginValue.email} onChange={AdminHandle}/>
            <b className="error">{}</b>
        </div>
        <div className='inputs'>
            <label>Password: </label>
            <input type="password" placeholder='Enter Password' name='password' value={loginValue.password} onChange={AdminHandle}/>
            <b className="error">{}</b>
        </div>
        <div className='buttons'>
            <button onClick={AdminSubmitHandler}>Log In</button>
        </div>
    </div>
  
</div>
  )
}

export default AdminLogin
