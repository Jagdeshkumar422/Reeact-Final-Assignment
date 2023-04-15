import React from 'react'
import { BlogHeader, Footer } from '../../../component'
import AboutImage from "../../../images/AbiutUs.jpg"
import "./about.css"
const About = () => {
  return (
    <div className='aboutPage'>
      <BlogHeader />
      <div>
        <img src={AboutImage} alt='AboutImage' className='aboutImage'/>
      </div>
      <Footer/>
    </div>
  )
}

export default About
