import React from "react";
import EmployeeHeader from "./EmployeeHeader";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <>
      <EmployeeHeader />
      
      <Outlet/>
    </>
  );
};

export default EmployeeLayout;
