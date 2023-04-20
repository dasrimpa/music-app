import React from "react";
import SideNavbar from "./SideNavbar";
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="w-full bg-gray-100">
        <div className="px-10">
        <Outlet />
        </div>
        
      </div>
    </div>
  );
}
