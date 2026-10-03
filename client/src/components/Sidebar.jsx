import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const links = user?.role === "student"
    ? [["/dashboard","Overview"],["/jobs","Browse Jobs"],["/applications","My Applications"],["/profile","My Profile"]]
    : user?.role === "recruiter"
    ? [["/dashboard","Overview"],["/jobs","Jobs"],["/jobs/create","Create Job"],["/applications/manage","Applications"],["/profile","Company Profile"]]
    : [["/dashboard","Overview"],["/admin/users","Users"],["/admin/jobs","Jobs"]];

  return <aside className="sidebar">{links.map(([to, label]) =>
    <NavLink key={to} to={to} className={({isActive}) => isActive ? "active" : ""}>{label}</NavLink>
  )}</aside>;
}
