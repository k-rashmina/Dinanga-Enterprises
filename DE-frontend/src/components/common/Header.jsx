import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DELogo from '../../assets/DELogo.png'


export default function SideBar({menu}) {

    const nav = useNavigate();

  const login = false;

  let logStatus = false;

  logStatus = localStorage.getItem('loggedUser') || localStorage.getItem('loggedSup');

  console.log(localStorage.getItem('loggedUser'))
    
  return(
    <nav>
       <div className="logo">

        <Link href="/" className="d-flex justify-content-center align-items-center mb-3 mt-3 mb-md-0 me-md-5 text-white text-decoration-none">
            <img width="200" height="50" style={{objectFit: 'cover'}} src={DELogo} />
        </Link>

       </div>
       
           
           <div className="menu">
               <Link className="menu-item a" to="/">Home</Link>
               <Link className="menu-item a" to="/services">Services</Link>
               {localStorage.getItem('loggedUser') &&
                    <Link className="menu-item a" to={"/cusprofile"}>Profile</Link>
                }
                {localStorage.getItem('loggedSup') &&
                    <Link className="menu-item a" to={"/supprofile"}>Profile</Link>
                }
               <Link className="menu-item a" to="/consultancy/req">Consultancy Service</Link>
               <Link className="menu-item a" to="/about">About Us</Link>

           </div>
       
       {!logStatus ? <div className="signup-login">
           <Link className="login-button" to="/cuslogin">Login</Link>
           <Link className="signup-button" to="/cusreg">Signup</Link>
       </div> : 
       	    <div class="signup-login" onClick={() => {
                localStorage.removeItem('loggedUser');
                localStorage.removeItem('loggedSup');
                alert('You are Successfully Logged Out');
                nav('/');
            }}>
                <Link class="login-button" >Logout</Link>
                
            </div>}
    </nav>

  )

}