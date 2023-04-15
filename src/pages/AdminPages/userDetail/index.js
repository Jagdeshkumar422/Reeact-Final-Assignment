import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {  getDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import {  db, userRef } from '../../../firebase';
import { Sidebar } from '../../../component';
import "./userDetail.css"
import swal from 'sweetalert';
const UserDetail = () => {
    const {id} =useParams();
    const [data, setData]= useState({
      Fname: "",
      lname:"",
      email:"",
      userProfile: "",
      Mobile_No:""
    })
  
    useEffect(()=>{
      async function getData(){
        const _doc = doc(db, "userData",id)
        console.log("doc",_doc)
        const _data =await getDoc(_doc)
        setData(_data.data())
      }
      getData()
    },[])
  //   useEffect(()=>{
  //     const unsub = onSnapshot(userRef,(onSnapshot)=>{
  //       let list=[];
  //       onSnapshot.docs.forEach((doc)=>{
  //         // console.log(doc.data())
  //         list.push({id: doc.id, ...doc.data()})
  //       })
  //       setData(list);
        
  //     },(error)=>{
  //       console.log(error)
  //     })
  
  //     return()=>{
  //       unsub()
  //     }
  // },[])
  
  const ApprovedStatus=()=>{
    const docRef =doc(db,"userData",id);
    swal({
      title:"Approved",
      text: "Are you sure to Approve this post",
      buttons: true,
      dangerMode: true,
    })
    .then((willUpdate) => {
      if (willUpdate) {
        updateDoc(docRef,{
          userStatus: "Approved"
        })
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
  const RejectStatus=()=>{
    const docRef =doc(db,"userData",id);
    swal({
      title:"Reject",
      text: "Are you sure to Reject this post",
      buttons: true,
      dangerMode: true,
    })
    .then((willUpdate) => {
      if (willUpdate) {
        updateDoc(docRef,{
          userStatus: "Rejected"
        })
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }
    return (
      <div className='Posts_Detial'>
        <Sidebar />
  
        <div className='Detials'>
          
        <h1>User Detial</h1>
        {
          data !==null && (
              <div className='show_Detials'>
                <div className='left_cards'>
                  <img className="postdetailsImg" src={data.userProfile} />
                  </div>
                  <div className='right_cards'>
                  <div className='right-cards-select'><h2>{data.Fname + data.lname}</h2></div>
  
                  <div className='right-cards-status'><p>{data.email}</p></div>
                  <div className='right-cards-status'><p>{data.Mobile_No}</p> </div>
                  <div className='right-cards-status'><p>Status</p> <span>{data.userStatus}</span></div>
                {data.userStatus === "Padding"?
                  <div className='post_buttons'>
                    <button onClick={RejectStatus}>Reject</button>
                    <button onClick={ApprovedStatus}>Approved</button>
                  </div>: ""}
                  </div>
              </div>
          )
        }
        </div>
      </div>
    )
}

export default UserDetail
