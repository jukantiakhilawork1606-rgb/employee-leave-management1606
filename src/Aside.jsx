import React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

const Aside = () => {
  return (
    <aside className="sidebar">
      
      {/* Logo */}
      <div className="logo">
        <p className="logotext-para">TimeOff Buddy</p>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <p className="nav-label">Main</p>

        <NavLink to="/" className="nav-item">
          📊 Dashboard
        </NavLink>

        <p className="nav-label">Admin</p>

        <NavLink to="/Approvals" className="nav-item">
          ⚙️ Approvals
        </NavLink>

        <NavLink to="/departments" className="nav-item">
          🏢 Departments
        </NavLink>

        <NavLink to="/reports" className="nav-item">
          📄 Reports
        </NavLink>

        <NavLink to="/notifications" className="nav-item">
          🔔 Notifications
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;