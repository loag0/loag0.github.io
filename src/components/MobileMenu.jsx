import { useState, useEffect, useRef } from "react";

/**
 * Mobile hamburger menu component.
 * Renders a hamburger icon that opens a full-screen overlay with nav links.
 * Only visible at ≤768px via CSS.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* Prevent body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className={`mobile-menu-btn ${isOpen ? "mobile-menu-btn--open" : ""}`}
        onClick={toggle}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="mobile-menu-bar" />
        <span className="mobile-menu-bar" />
        <span className="mobile-menu-bar" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="mobile-menu-overlay" ref={menuRef}>
          <nav className="mobile-menu-nav">
            <a href="#about" className="mobile-menu-link" onClick={close}>
              About
            </a>
            <a href="#skills" className="mobile-menu-link" onClick={close}>
              Skills
            </a>
            <a href="#projects" className="mobile-menu-link" onClick={close}>
              Projects
            </a>
            <a href="#experience" className="mobile-menu-link" onClick={close}>
              Experience
            </a>
            <a href="#contact" className="mobile-menu-link" onClick={close}>
              Contact
            </a>
            <a
              href="/assets/Loago_Moremi - CV.pdf"
              download
              className="mobile-menu-link mobile-menu-link--accent"
              onClick={close}
            >
              Download CV
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
