import React from 'react'
import "./userCard.css"
import { useNavigate } from 'react-router-dom'
const UerCard = (props) => {
  const Navigate =useNavigate()
  return (
    <div className='post_card' onClick={()=>Navigate(props.onClick)} key={props.userkey}>
        <div className='userProfileImage'> 
            <img src={props.userProfile} alt="poastCardImage" className='UserCard_Image'/></div>
            <div className='userCard_detail'>
            <h1 className='UserName'>{props.FullName}</h1>
            <p>{props.Email}</p>
            <p>{props.ContactNumber}</p>
            </div>
            
            <div className='selectCard_category'>
                <h2 className='selectCategoryPost'>Status</h2>
                <h2 className='selectPostCtaegory'>{props.Status}</h2>
            </div>
        </div>
  )
}

export default UerCard
