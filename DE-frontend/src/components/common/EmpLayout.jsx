import React from "react";

import Footer from './Footer';
import { Outlet } from "react-router-dom";

export default function EmpLayout() {

  return(
    <div style={{flex: 1}}>
      <Outlet />
      <Footer />
    </div>
 )

}