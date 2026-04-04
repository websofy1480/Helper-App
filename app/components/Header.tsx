"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Menu } from "lucide-react";

export default function Header() {

  const [hideTopBar, setHideTopBar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* TOP BAR */}
      <div
        className={`bg-[#1f6b5f] text-white transition-all duration-500 ${
          hideTopBar ? "h-0 overflow-hidden" : "py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">

          <h1 className="text-3xl font-bold text-yellow-400">
            Charitize
          </h1>

          <div className="flex flex-wrap gap-6 text-sm">

            <div className="flex items-center gap-2" data-aos="fade-down">
              <Phone size={18} />
              <span>+012 345 6789</span>
            </div>

            <div className="flex items-center gap-2" data-aos="fade-down">
              <Mail size={18} />
              <span>info@domain.com</span>
            </div>

            <div className="flex items-center gap-2" data-aos="fade-down">
              <MapPin size={18} />
              <span>123 Street, NY, USA</span>
            </div>

          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav
        className={`bg-yellow-500 transition-all duration-500 ${
          hideTopBar ? "py-4" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">

          {/* Logo for Mobile */}
          <div className="text-xl font-bold md:hidden">Charitize</div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-medium">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Service</li>
            <li className="hover:text-white cursor-pointer">Donation</li>
            <li className="hover:text-white cursor-pointer">Pages</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-yellow-500 px-6 pb-6">
            <ul className="flex flex-col gap-4 font-medium">
              <li>Home</li>
              <li>About</li>
              <li>Service</li>
              <li>Donation</li>
              <li>Pages</li>
              <li>Contact</li>
            </ul>
          </div>
        )}

      </nav>
    </header>
  );
}