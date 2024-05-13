import React from "react";
import Header from "./Header";
import Footer from './Footer';
import { Outlet } from "react-router-dom";

export default function Layout() {

  return(
    <div style={{flex: 1}}>
      <Header />
      <Outlet />
      <Footer />
    </div>
 )

}