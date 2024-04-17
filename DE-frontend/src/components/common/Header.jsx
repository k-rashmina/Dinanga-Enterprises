import React from "react";
import { Link } from "react-router-dom";



export default function SideBar({menu}) {

  const login = false;
    
  return(
    <nav>
       <div className="logo">
           {/* <img src="images/hlogo1.png" alt="Company Logo"/>     */}
       </div>
       
           
           <div className="menu">
               <Link className="menu-item a" to="/">Home</Link>
               <Link className="menu-item a" to="/services">Services</Link>
               <Link className="menu-item a" to="/cusprofile">Profile</Link>
               <Link className="menu-item a" to="/consultancy/req">Consultancy Service</Link>
               <Link className="menu-item a" to="/contact">Contact</Link>
               <Link className="menu-item a" to="/about">About Us</Link>

           </div>
       
       {!login ? <div className="signup-login">
           <Link className="login-button" to="#">Login</Link>
           <Link className="signup-button" to="#">Signup</Link>
       </div> : 
       	       <div class="signup-login">
                <a class="login-button" href="logout">Logout</a>
                
            </div>}
    </nav>

  )

}