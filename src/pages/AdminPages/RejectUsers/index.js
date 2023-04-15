import React,{useState, useEffect} from 'react'
import {  onSnapshot, query, where } from "firebase/firestore";
import { userRef } from '../../../firebase';
import { Sidebar, UerCard } from '../../../component';
import { useNavigate } from 'react-router-dom';


const RejectUsers = () => {
  const Navigate =useNavigate()

  const [data, setData]=useState([])
  useEffect(()=>{
    const q= query(userRef, where("userStatus","==","Rejected"))
    const unsub = onSnapshot(q, (querysnapshot)=>{
      const item=[];
      querysnapshot.forEach((doc)=>{
        item.push({id: doc.id, ...doc.data()})
      })
      setData(item)
    })
    return()=>{
      unsub()
    }
  })
  // console.log(data)
  return (
    <div className='approvedpost'>
      <Sidebar/>
      <div className='card'>
      {data && data.map((e,i)=>{
        return(
        <>
        <UerCard 
        onClick={`/userDetails/${e.id}`}
          userProfile={e.userProfile}
          FullName= {e.Fname + ' ' + e.lname}
          Email= {e.email}
          ContactNumber={e.Mobile_No}
          Status= {e.userStatus}
        />
          </> 
        )
      })}
      </div>
    </div>
  )
}

export default RejectUsers

