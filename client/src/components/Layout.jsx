import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user } = useAuth();
  return <>
    <Navbar />
    <div className={user ? "app-layout" : "public-layout"}>
      {user && <Sidebar />}
      <main className="main">{children}</main>
    </div>
  </>;
}
