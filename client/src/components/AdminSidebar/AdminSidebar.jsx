import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] =
    useState(false);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    sessionStorage.removeItem(
      "adminToken"
    );

    navigate("/admin/login");
  };

  // ==========================================
  // CLOSE MOBILE SIDEBAR
  // ==========================================

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <>
      {/* ======================================
          MOBILE HEADER
      ====================================== */}

      <div className="mobile-admin-header">

        <button
          type="button"
          className={`sidebar-toggle ${
            isOpen ? "active" : ""
          }`}
          onClick={() =>
            setIsOpen(!isOpen)
          }
          aria-label="Toggle admin menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <span className="mobile-admin-logo">
          URBAN EDGE
        </span>

      </div>

      {/* ======================================
          MOBILE OVERLAY
      ====================================== */}

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside
        className={`admin-sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >

        {/* ====================================
            LOGO
        ==================================== */}

        <div className="admin-sidebar-logo">

          <span className="sidebar-logo-main">
            URBAN EDGE
          </span>

          <span className="sidebar-logo-sub">
            ADMIN PANEL
          </span>

        </div>

        {/* ====================================
            NAVIGATION
        ==================================== */}

        <nav className="admin-nav">

          {/* Dashboard */}

          <button
            type="button"
            className={`admin-nav-item ${
              location.pathname === "/admin"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleNavigation("/admin")
            }
          >
            <span className="nav-icon">
              📊
            </span>

            <span>
              Dashboard
            </span>
          </button>

          {/* Appointments */}

          <button
            type="button"
            className="admin-nav-item"
            onClick={() => {
              closeSidebar();

              document
                .getElementById(
                  "appointments"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            <span className="nav-icon">
              📅
            </span>

            <span>
              Appointments
            </span>
          </button>

        </nav>

        {/* ====================================
            SIDEBAR FOOTER
        ==================================== */}

        <div className="admin-sidebar-footer">

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            <span>
              🚪
            </span>

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;