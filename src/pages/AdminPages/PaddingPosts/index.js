import React,{useState, useEffect} from 'react'
import {  onSnapshot, query, where } from "firebase/firestore";
import { PostRef } from '../../../firebase';
import { Sidebar, Cards } from '../../../component';
import { useNavigate } from 'react-router-dom';

const PaddingPosts = () => {
  const Navigate =useNavigate()

  const [data, setData]=useState([])
  useEffect(()=>{
    const q= query(PostRef, where("status","==","padding"))
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
  return (
    <div className='approvedpost'>
      <Sidebar/>
      <div className='card'>
      {data && data.map((e,i)=>{
        return(
        <>
        <Cards 
        key={i}
        onClick= {`/postDetails/${e.id}`}
          Image={e.url}
          title={e.title}
          description= {e.description.slice(0,30)}
          select={e.select}
          status ={e.status}
        />
          </> 
        )
      })}
      </div>
    </div>
  )
}

export default PaddingPosts

