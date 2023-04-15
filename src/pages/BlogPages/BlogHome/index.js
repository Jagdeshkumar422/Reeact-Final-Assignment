import React,{useState, useEffect} from 'react'
import { BlogHeader, Cards, Footer } from '../../../component'
import { onSnapshot, query, where } from 'firebase/firestore'
import { PostRef } from '../../../firebase'

const BlogHome = () => {
  const [data, setData]=useState([])
  useEffect(()=>{
    const q= query(PostRef, where("status","==","Approved"))
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
  console.log("data",data)
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
        onClick= {`/blogDetails/${e.id}`}
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
        <Footer/>
      </div>

    </div>
  )
}

export default BlogHome
