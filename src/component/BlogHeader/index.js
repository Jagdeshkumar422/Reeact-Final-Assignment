import React,{useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";
// import logo from '../../img/logo.png';
import "./blogHeader.css"

const BlogHeader = () => {

    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
      setisMenu(isMenu === false ? true : false);
      setResponsiveclose(isResponsiveclose === false ? true : false);
  };

    let boxClass = ["main-menu menu-right menuq1"];
    if(isMenu) {
        boxClass.push('menuq2');
    }else{
        boxClass.push('');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);
      
    const toggleSubmenu = () => {
      setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };
    
    let boxClassSubMenu = ["sub__menus"];
    if(isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    }else {
        boxClassSubMenu.push('');
    }

   

    return (
    <header className="header__middle">
        <div className="container">
            <div className="row">

                {/* Add Logo  */}
                <div className="header__middle__logo">
                    {/* <NavLink exact activeClassName='is-active'> */}
                        <img src="https://tse3.mm.bing.net/th?id=OIP.TwzRNF6S3xpL6kRwpNIwdgHaHa&pid=Api&P=0" alt="logo"  className='blogLgo'/> 
                    {/* </NavLink> */}
                </div>

                <div className="header__middle__menus">
                    <nav className="main-nav " >

                    {/* Responsive Menu Button */}
                    {isResponsiveclose === true ? <> 
                        <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                    </> : <> 
                        <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                    </>}


                    <ul className={boxClass.join(' ')}>
                    <li  className="menu-item" >
                        <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </NavLink> 
                    </li>
                    {/* <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/About`}> About </NavLink> </li> */}
                    <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> Select <FiChevronDown /> </Link>
                        <ul className={boxClassSubMenu.join(' ')} id='sub_menu' > 
                            <li> <NavLink onClick={toggleClass} activeClassName='is-active'   to={`/web_development`}> Web Development </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/app_development`}> App Development </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/wordpress`}> Wordpress </NavLink> </li>
                            <li><NavLink onClick={toggleClass} activeClassName='is-active' to={`/freelancing`}> Freelancing </NavLink> </li>
                        </ul>
                    </li>
                    <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/about`}> About </NavLink> </li>

                    </ul>


                    </nav>     
                </div>   



        
        
            </div>
	    </div>
    </header>
    )
}

export default BlogHeader
