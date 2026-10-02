import { useEffect, useState } from "react";
import "./Navbar.css";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find(
          (entry) => entry.isIntersecting
        );

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
        >
          URBAN EDGE
        </a>

        <div className="nav-links">

          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={
                activeSection === item.id
                  ? "active"
                  : ""
              }
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}

        </div>

        <a
          href="#booking"
          className="booking-btn desktop-booking"
        >
          Book Appointment
        </a>

        <button
          className={`menu-btn ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={
              activeSection === item.id
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}

        <a
          href="#booking"
          className="mobile-booking-btn"
          onClick={closeMenu}
        >
          Book Appointment
        </a>

      </div>
    </nav>
  );
}

export default Navbar;