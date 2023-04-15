import React,{useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {FiAlignRight,FiXCircle,FiChevronDown } from "react-icons/fi";
import "./userHeader.css"
import { userRef, auth } from '../../firebase';
import { onSnapshot } from 'firebase/firestore';
// import logo from '../../img/logo.png';
import { onAuthStateChanged ,signOut, getAuth} from 'firebase/auth';
import Logo from "../../images/userProfile.jpg"
import swal from "sweetalert"

const UserHeader = () => {
    const [userData, setUserData]=useState([])
    let uid;
    onAuthStateChanged(auth, (userData) => {
        if (userData.emailVerified) {
          uid = userData.uid;
          // ...
        } else {
          window.location.assign("/login")
        }
      });
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

    // useEffect(()=>{
    //     // const userDocRef =doc(db,"userData" ,uid);
    //     const unsub = onSnapshot(userRef,(onSnapshot)=>{
    //       let list=[];
    //       onSnapshot.docs.forEach((doc)=>{
    //         if(doc.data().id === uid){
    //         list.push({ ...doc.data()})
    //         }else{
    //           return;
    //         }
    //       })
    //       setUserData(list);
          
    //     },(error)=>{
    //       console.log(error)
    //     })
      
    //     return()=>{
    //       unsub()
    //     }
    //   },[])
    useEffect(()=>{
    
      const unsub = onSnapshot(userRef, (querysnapshot)=>{
        const item=[];
        querysnapshot.forEach((doc)=>{
          if (doc.data().id === uid){
          item.push({id: doc.id, ...doc.data()})
          }
        })
        setUserData(item)
      })
      return()=>{
        unsub()
      }
    })
   
const Logout =()=>{
  swal({
    title: "Are you sure?",
    text: "for logout Your account",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your are logout Successfully!", {
        icon: "success",
      });
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.assign("/login")
      }).catch((error) => {
        // An error happened.
      });
      
    } else {
      swal("Your are not logout");
    }
  });
}
// console.log("asdss",userData)
    return (
    <header className="header__middle">
        <div className="container">
            <div className="row">

                {/* Add Logo  */}
                {userData && userData.map((e,i)=>
                
                <div className="header__middle__logo logosection">
                        <img src={e.userProfile===""?Logo: e.userProfile} alt="logo"  className='userLgo'/> 
                          {/* <img src={Logo} className='userLgo'/> */}
                </div>
                )}

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
                        <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/userHome`}> Home </NavLink> 
                    </li>
                    <li className="menu-item createPost" ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/createPost`}> Create Post </NavLink> </li>
                    <li className="menu-item  " ><NavLink onClick={toggleClass} activeClassName='is-active' to="/profile"> profile </NavLink> </li>
                    <li className="menu-item " ><NavLink onClick={Logout}> LogOut </NavLink> </li>

                    </ul>


                    </nav>     
                </div>   



        
        
            </div>
	    </div>
    </header>
    )
}

export default UserHeader
