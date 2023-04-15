import React,{useState, useEffect} from 'react'
import { BlogHeader, Cards } from '../../../component'
import { onSnapshot, query, where } from 'firebase/firestore'
import { PostRef } from '../../../firebase'

const WebDevelopment = () => {
  const [data, setData]=useState([])
  useEffect(()=>{
    const q= query(PostRef, where("status","==","Approved"))
    const p= query(PostRef, where("select","==","Web development"))
    const unsub = onSnapshot(p, (querysnapshot)=>{
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
    <div>
      <BlogHeader />

      <div className='BlogSection'>
      <div className='card'>
      {data && data.map((e,i)=>{
        return(
        <>
        <Cards 
        key={i}
        onClick= {`postDetails/${e.id}`}
        id="blogPostsCards"
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
    </div>
  )
}

export default WebDevelopment
