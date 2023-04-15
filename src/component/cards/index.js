import React from 'react'
import "./card.css"
import { useNavigate } from 'react-router-dom'

const Cards = (props) => {
    const Navigate= useNavigate()
  return (
        <div className='post_card' id={props.id} onClick={()=>Navigate(props.onClick)} key= {props.key}>
            <img src={props.Image} alt="poastCardImage" className='postCard_Image'/>
            <div className='postCard_detail'>
            <h1 className='titleheading'>{props.title}</h1>
            <p>{props.description} <span>......</span></p>
            </div>
            <div className='selectCard_category'>
                <h2 className='selectCategoryPost'>Select Category</h2>
                <h2 className='selectPostCtaegory1'>{props.select}</h2>
            </div>
            <div className='selectCard_category'>
                <h2 className='selectCategoryPost'>Status</h2>
                <h2 className='selectPostCtaegory'>{props.status}</h2>
            </div>
        </div>
        
  )
}

export default Cards
