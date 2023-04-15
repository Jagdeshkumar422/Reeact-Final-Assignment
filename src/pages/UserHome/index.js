import React,{useState, useEffect} from 'react'
import { UserHeader, Cards } from '../../component'
import { onSnapshot, query, where } from 'firebase/firestore'
import { PostRef, auth } from '../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const UserHome = () => {
  let uid;
  onAuthStateChanged(auth, (userData) => {
      if (userData.emailVerified) {
        uid = userData.uid;
        // ...
      } else {
        window.location.assign("/login")
      }
    });
  const [data, setData]=useState([])
  useEffect(()=>{
    
    const unsub = onSnapshot(PostRef, (querysnapshot)=>{
      const item=[];
      querysnapshot.forEach((doc)=>{
        if (doc.data().userUid === uid){
        item.push({id: doc.id, ...doc.data()})
        }
      })
      setData(item)
    })
    return()=>{
      unsub()
    }
  })

  // useEffect(() => {
  //   onAuthStateChanged(auth, (blog) => {
  //       // const q = query(PostRef ,where("id", "==","uid"));
  //       const d = onSnapshot(PostRef, (querySnapshot) => {
  //           const items = [];
  //           querySnapshot.forEach((doc) => {
  //             if (doc.data().id===uid){
  //             items.push(doc.data());
  //             }
  //               setData(items)
  //           })
  //       });
  //   })
  // })
  return (
    <div>
      <UserHeader />

      <div className='BlogSection'>
      <div className='card'>
      {data && data.map((e,i)=>{
        return(
        <>
        <Cards 
        key={i}
        onClick= {`/userDetail/${e.id}`}
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

export default UserHome

