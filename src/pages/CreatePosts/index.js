import React,{useState, useEffect} from 'react'
import { UserHeader } from '../../component'
import "./createPost.css"
import { PostRef, auth, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
const initialState={
    title: "",
    select: "",
    description: "",
    // uid: .uid,
    status: "padding"
  }
const CreatePosts = () => {
  let uid;
    onAuthStateChanged(auth, (userData) => {
        if (userData.emailVerified) {
          console.log(userData)
          uid = userData.uid;
          console.log(uid)
          // ...
        } else {
          window.location.assign("/login")
        }
      });
      const [data, setData]=useState(initialState)
      const {title, select, description}= data
      const [file,setFile] = useState(null)
      const [progress,setProgress] = useState(null)
      const [isSubmit, setIsSubmit]= useState(false)

      const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
      }

      useEffect(()=>{
        const uploadFile =()=>{
          const title = new Date().getTime()+ file.name;
          const storageRef =ref(storage, file.name)
          const uploadTask= uploadBytesResumable(storageRef, file)

          uploadTask.on("state_changed", (snapshot)=>{
            const progress=(snapshot.bytesTransferred/ snapshot.totalBytes)*100;
            setProgress(progress);
            switch(snapshot.state){
              case 'paused':
                console.log("upload is pause")
                break;
              case 'running':
                console.log("upload is Running")
                break;  
              default:
                break;    
            }
          }, (error)=>{
            console.log(error)
          }, ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
              console.log(downloadURL)
              setData((prv)=>({...prv, url : downloadURL}))
            })
          })
        }

        file && uploadFile()
      },[file])

      const addPost=async (e)=>{
        e.preventDefault();
        setIsSubmit(true);
       await addDoc(PostRef,{
        ...data, Timestamp: serverTimestamp(),
        userUid: uid
       }) 
       
      }
    return (
    <div>
      <UserHeader />
      <div className='create-post'>
        <div className='forms'>
          <label htmlFor='' className='label'>Title</label>
          <input type="text" className='input1' placeholder='Enter Title' name='title' value={title} onChange={handleChange}/>
          <label htmlFor='' className='label'>Select Category</label>
          <select className='selection' name='select'value={select} onChange={handleChange}>
            <option>Select Category</option>
            <option>Web development</option>
            <option>App development</option>
            <option>Wordpress</option>
            <option>Freelancing</option>
          </select>
          <label htmlFor='' className='label'>Description</label>
          <textarea className='description' placeholder='Enter description' rows="10" cols="20" name='description' value={description} onChange={handleChange}/>
          <label htmlFor='' className='label'>Upload file</label>
          <input type="file" className='Uploadfile' onChange={(e)=>setFile(e.target.files[0])}/>
          <button className='create' onClick={addPost} disabled={progress !==null && progress<100}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePosts
