import React,{useState, useEffect} from 'react'
import { BlogHeader } from '../../../component'
import "./blogDetails.css"
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useParams } from 'react-router-dom'
const BlogDetails = () => {
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
  return (
    <div className='BlogDetails_Page'>
      <BlogHeader />
      <div className='BlogDetailsMain'>
      <div className='BlogDetials'>
        
        <h1>BlogPost Detial</h1>
        {
          data !==null && (
              <div className='show_Detials'>
                <div className='left_cards'>
                  <img className="postdetailsImg" src={data.url} />
                  </div>
                  <div className='right_cards'>
                  <div className='right-cards-select'><p>Select Category</p> <span>{data.select}</span></div>
  
                  <div className='right-cards-status'><p>Status</p> <span>{data.status}</span></div>
                  {/* {data.status==="padding"?
                  <div className='post_buttons'>
                    <button onClick={RejectStatus}>Reject</button>
                    <button onClick={ApprovedStatus}>Approved</button>
                  </div>:""} */}
                  <h1 className='posts-title'>{data.title}</h1>
                  <p className='post_des'>{data.description}</p>
                  </div>
              </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
