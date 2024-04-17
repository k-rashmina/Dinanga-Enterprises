import React from "react";
import { Link } from "react-router-dom";
import Arrow from '../../assets/Arrow5.png'


export default function SideBar({page,menu}) {
    let [url, setUrl] = React.useState(window.location.pathname.toString());
    console.log(url);


    const menuItems = menu.map(item => {
      const itemUrl = `/admin/${page.toLowerCase()}/${item.toLowerCase().split(' ').join('')}`;
      let selectedStyle;
      if(url == itemUrl){

        selectedStyle = "nav-link active fs-5";
      }else{
        selectedStyle = "nav-link text-white fs-5";
      }
      return(
        <li className="nav-item">
          <Link to={itemUrl} className={selectedStyle} aria-current="page" onClick={() => setUrl(itemUrl)}>
            <svg className="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
            {item}
          </Link>
        </li>
      )

  })



  return(

    <div className="d-flex flex-column flex-shrink flex-shrink-0 p-3 text-white bg-dark" style={{width: "300px", minHeight: "100vh"}}>
      <a href="/" className="d-flex justify-content-center align-items-center mb-3 mb-md-0 me-md-5 text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span className="fs-4">Company Logo</span>
      </a>
      <hr/>
      <br/>

      <a href="/" className="d-flex justify-content-start align-items-center mb-3 mb-md-0 me-md-5 text-white text-decoration-none">
        <Link to='/admin'>
          <img className="bi me-5 ms-3" width="20" height="20" src={Arrow} alt="back"></img>
        </Link>

        <span className="fs-2">{page}</span>

      </a>

      <br/>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems} 
      </ul>
      <hr/>
    </div>

  )

}