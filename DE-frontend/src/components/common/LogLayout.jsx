import React from "react";
import { Outlet, Link } from "react-router-dom";
import regbg1 from "../../assets/regbg1.png";


export default function LogLayout({ cus, sup }) {



    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-center" style={{width: "100%", height:"100vh", backgroundImage: `url(${regbg1})`, backgroundSize: 'cover'}}>
                <div>
                    <Link to={`/${cus}`}><button className="reg-form-button rounded-5 me-2">User</button></Link>
                    <Link to={`/${sup}`}><button className="reg-form-button rounded-5 ms-2">Supplier</button></Link>
                    <Link to={`/emplogin`}><button className="reg-form-button rounded-5 ms-2">Employee</button></Link>
                </div>
                <br/>
                <Outlet/>
            </div>
        </>
    )

}