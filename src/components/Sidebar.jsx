import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/authContext";
import PrivateRoute from "./PrivateRoute";

const SidebarLinks = () => {
  return (
    <ul className="mt-6">
      <SidebarRoute to="" title="Inicio" icon="fas fa-home" />
      <PrivateRoute estadoList={['AUTORIZADO']} roleList={['ADMINISTRADOR']}>
        <SidebarRoute to="/usuarios" title="Usuarios" icon="fas fa-user" />
        <SidebarRoute to="/proyectos" title="Proyectos" icon="fas fa-tasks" />
        <SidebarRoute
          to="/estudiantes"
          title="Estudiantes"
          icon="fas fa-user-friends"
        />
      </PrivateRoute>

      <Logout />
    </ul>
  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    
    setToken(null);
  };
  return (
    <li onClick={() => deleteToken()}>
      <NavLink to="/auth/login" className="sidebar-route">
        <div className="flex items-center my-20">
          <i className="fas fa-sign-out-alt" />
          <span className="text-lg  ml-2">Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div className="py-3 w-full flex flex-col items-center justify-center rounded-xld-m">
      <img src="jarlyLogo.png" alt="Logo" className="h-17 rounded-2xl" />
      <span className="my-4 text-2xl font-bold text-center">
        Modulo de Gestión
      </span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row flex-no-wrap md:h-full">
      {/* Sidebar starts */}

      <div className="sidebar hidden md:flex">
        <div className="px-8">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className="flex md:hidden w-full justify-between bg-gray-800 p-2 text-red text-white">
        <i
          className={`fas fa-${open ? "times" : "bars"}`}
          onClick={() => setOpen(!open)}
        />
        <i className="fas fa-home" />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className="sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out"
        id="mobile-nav"
      >
        <div className="px-8">
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "sidebar-route text-black bg-green-500"
            : "sidebar-route text-gray-700 hover:text-gray-700 hover:bg-blue-300"
        }
      >
        <div className="flex items-center">
          <i className={icon} />
          <span className="text-lg  ml-2">{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
