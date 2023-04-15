import React,{useState, useEffect} from 'react'
import { Cards, Sidebar, UerCard } from '../../../component'
import { useNavigate } from 'react-router-dom'
import { PostRef, userRef } from '../../../firebase'
import { onSnapshot } from 'firebase/firestore'
import "./adminhome.css"
import Logo from "../../../images/userProfile.jpg"

const AdminHome = () => {
  const Navigate =useNavigate()
  const [data, setData]=useState([])
  const [userData, setUserData]=useState([])

  useEffect(()=>{
      const unsub = onSnapshot(PostRef,(onSnapshot)=>{
        let list=[];
        onSnapshot.docs.forEach((doc)=>{
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
  useEffect(()=>{
    const unsub = onSnapshot(userRef,(onSnapshot)=>{
      let list=[];
      onSnapshot.docs.forEach((doc)=>{
        // console.log(doc.data())
        list.push({id: doc.id, ...doc.data()})
      })
      setUserData(list);
      
    },(error)=>{
      console.log(error)
    })

    return()=>{
      unsub()
    }
},[])
console.log("userdata", userData)
console.log("data",data)

  return (
    <div className='AdminHome'>
      <Sidebar />
      <div className='adminMain'>
      <div className='postCards'>
        <button className="AdminViewMore" onClick={()=>Navigate("/pendingUsers")}>View More</button>
        <div className='postCards1'>
    {userData && userData.slice(0,3).map((e,i)=>{
      return(
      <UerCard 
      onClick={`/userDetails/${e.id}`}
      userkey={i}
      userProfile ={e.userProfile===""? Logo: e.userProfile}
      FullName={e.Fname + " "+ e.lname}
      Email= {e.email}
      ContactNumber= {e.Mobile_No}
      Status = {e.userStatus}
      />
      )
    })}
    </div>
    </div>

      <div className='postCards'>
        <button className="AdminViewMore" onClick={()=>Navigate("/pendingPosts")}>View More</button>
        <div className='postCards1'>
    {data && data.slice(0,3).map((e,i)=>{
      return(
      <Cards 
      key={i}
        onClick= {`/postDetails/${e.id}`}
        Image={e.url}
        title={e.title}
        description= {e.description.slice(0,30)}
        select={e.select}
        status ={e.status}
      />
      )
    })}
    </div>
    </div>
    </div>
    </div>
  )
}

export default AdminHome