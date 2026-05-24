import React, { useState, useEffect, useRef } from "react";
import { Phone, Menu, X } from "lucide-react";
import doctorInfo from "../../config/doctorInfo";
import useScrollSpy from "../../hooks/useScrollSpy";

const NAV_LINKS = [
  { label: "Home",     id: "home"     },
  { label: "About",    id: "about"    },
  { label: "Services", id: "services" },
  { label: "Reviews",  id: "reviews"  },
  { label: "Contact",  id: "contact"  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  const toggleButton = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const { activeId, scrollTo } = useScrollSpy(NAV_LINKS.map((l) => l.id));

  const handleNav = (id) => {
    setIsMenuOpen(false);
    scrollTo(id);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 right-0 left-0 z-200 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md"
      aria-label="Primary navigation"
    >
      <div className="py-4">
        <div className="max-w-330 mx-auto px-5">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div>
              <h2 className="text-xl font-semibold">{doctorInfo.name}</h2>
              <span className="text-sm text-gray-500">Consultant Psychiatrist</span>
            </div>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-8" role="list">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => handleNav(id)}
                    aria-current={activeId === id ? "page" : undefined}
                    className={`cursor-pointer text-md font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      activeId === id
                        ? "text-blue-600"
                        : "text-slate-700 hover:text-blue-500"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop Button */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={() => handleNav("contact")}
                className="fill-btn flex items-center gap-2 border-2 border-blue-500 px-3 py-2 rounded-full cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="block md:hidden cursor-pointer relative rounded-lg p-2 transition-transform duration-200 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={toggleButton}
            >
              <Menu className={`absolute top-1/2 -translate-y-1/2 sm:right-2 right-1 transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
              <X    className={`absolute top-1/2 -translate-y-1/2 sm:right-2 right-1 transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`} />
              <span className="sr-only">Toggle navigation menu</span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="block md:hidden shadow-sm">
        <div
          id="mobile-navigation-menu"
          className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-300 mx-4
          ${isMenuOpen ? "max-h-96 opacity-100 py-4 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
          <ul className="flex flex-col gap-2 px-1" role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => handleNav(id)}
                  aria-current={activeId === id ? "page" : undefined}
                  className={`w-full rounded-md px-2 py-2 text-left text-md font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeId === id
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-500"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className="my-4">
            <button
              type="button"
              onClick={() => handleNav("contact")}
              className="fill-btn w-full justify-center flex items-center gap-2 border-2 border-blue-500 px-3 py-2 rounded-2xl cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;