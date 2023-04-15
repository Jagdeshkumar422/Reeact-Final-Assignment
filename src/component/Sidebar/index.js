import React, { useState } from 'react';
import {
    FaHome,
    FaBars,
    FaHandshakeAltSlash,
    FaUserAlt 
}from "react-icons/fa";
import {FcApproval } from "react-icons/fc"
import {MdOutlinePendingActions } from "react-icons/md"
import "./sidebar.css"
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/adminDashboad",
            name:"Dashboard",
            icon:<FaHome/>
        },
        {
            path:"/approvedUsers",
            name:"Approved Users",
            icon:<FcApproval/>
        },
        {
            path:"/pendingUsers",
            name:"Pending Users",
            icon:<MdOutlinePendingActions/>
        },
        {
            path:"/rejectUsers",
            name:"Reject Users",
            icon:<FaHandshakeAltSlash/>
        },
        {
            path:"/approvedPosts",
            name:"Approved Posts",
            icon:<FcApproval/>
        },
        {
            path:"/pendingPosts",
            name:"Pending Posts",
            icon:<MdOutlinePendingActions/>
        },
        {
            path:"/rejectPosts",
            name:"Reject Posts",
            icon:<FaHandshakeAltSlash/>
        },
    ]
    return (
        <div className="container_admin">
           <div style={{width: isOpen ? "180px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;