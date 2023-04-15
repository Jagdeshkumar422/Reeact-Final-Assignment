import React,{useState, useEffect} from 'react'
import Logo from "../../images/userProfile.jpg"
import Upload from "../../images/upload.png"
import "./profile.css"
import { UserHeader } from '../../component'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage, db,auth, userRef } from '../../firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const Profile = () => {
  const [userData, setUserData]=useState({
    title: "",
    userProfile:""
  })
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
  // const [data, setData]=useState({
  //   userProfile: ""
  // })
  const [progress,setProgress] = useState(null)
      const [file,setFile] = useState(null)
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
          setUserData((prv)=>({...prv, userProfile : downloadURL}))
        })
      })
    }

    file && uploadFile()
  },[file])
const uploadImage=()=>{

  const docRef =doc(db,"userData" ,uid);
  updateDoc(docRef,{
    userProfile: userData.userProfile
  })
}


useEffect(()=>{
  // const userDocRef =doc(db,"userData" ,uid);
  const unsub = onSnapshot(userRef,(onSnapshot)=>{
    let list=[];
    onSnapshot.docs.forEach((doc)=>{
      console.log(doc.data())
      console.log("docId",doc.data().id)
      if(doc.data().id === uid){
      list.push({ ...doc.data()})
      }else{
        return;
      }
    })
    setUserData(list);
    
  },(error)=>{
    console.log(error)
  })

  return()=>{
    unsub()
  }
},[])


  // const changeProfileImage= ()=>{
  //     {userData.userProfile==="" ? {Logo} : userData.userProfile}
  // }

console.log("userdata11", userData)
  // console.log("data", data)
  return (
    <div className='sect-profile'>
      <UserHeader/>
      <div>
        {/* {userData && userData.map((e,i)=>{ */}
          {/* return( */}
            <div>
        <div className='p-section'>
        <div className='ProfileImage'>
          <img src={Logo} className='ProfileImagelogo'/>
          <label htmlFor='upload'><img src={Upload} className='uploadButton' /></label>
          <input type='file' className='uploadProfile' id='upload' onChange={(e)=>setFile(e.target.files[0])}/>
          <button onClick={uploadImage}>UploadImage</button>
        </div>
        </div>
              {/* <h1>{e.userProfile}</h1> */}
              {/* <img src={e.userProfile===""?Logo: e.userProfile}/> */}
              {/* <h1}</h1> */}
            </div>
          )
        {/* })} */}

      </div>
    </div>
  )
}

export default Profile
