import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {  getDoc, doc, updateDoc } from 'firebase/firestore';
import {  db } from '../../../firebase';
import { Sidebar } from '../../../component';
import "./postDetail.css"
import swal from 'sweetalert';

const PostDetail = () => {
  const {id} =useParams();
  const [data, setData]= useState({
    title: "",
    description:"",
    select:"",
    status: "",
    url: ""
  })

  useEffect(()=>{
    async function getData(){
      const _doc = doc(db ,"posts",id)
      const _data =await getDoc(_doc)
      setData(_data.data())
    }
    getData()
  },[id])

  
const ApprovedStatus=()=>{
  const docRef =doc(db,"posts",id);
  swal({
    title:"Approved",
    text: "Are you sure to Approve this post",
    buttons: true,
    dangerMode: true,
  })
  .then((willUpdate) => {
    if (willUpdate) {
      updateDoc(docRef,{
        status: "Approved"
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
  const docRef =doc(db,"posts",id);
  swal({
    title:"Reject",
    text: "Are you sure to Reject this post",
    buttons: true,
    dangerMode: true,
  })
  .then((willUpdate) => {
    if (willUpdate) {
      updateDoc(docRef,{
        status: "Rejected"
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
        
      <h1>Post Detial</h1>
      {
        data !==null && (
            <div className='show_Detials'>
              <div className='left_cards'>
                <img className="postdetailsImg" src={data.url} />
                </div>
                <div className='right_cards'>
                <div className='right-cards-select'><p>Select Category</p> <span>{data.select}</span></div>

                <div className='right-cards-status'><p>Status</p> <span>{data.status}</span></div>
                {data.status==="padding"?
                <div className='post_buttons'>
                  <button onClick={RejectStatus}>Reject</button>
                  <button onClick={ApprovedStatus}>Approved</button>
                </div>:""}
                <h1 className='posts-title'>{data.title}</h1>
                <p className='post_des'>{data.description}</p>
                </div>
            </div>
        )
      }
      </div>
    </div>
  )
}

export default PostDetail
