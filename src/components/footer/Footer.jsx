import { Heart, Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import useScrollSpy from "../../hooks/useScrollSpy";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About Doctor", id: "about" },
  { name: "Our Services", id: "services" },
  { name: "Patient Reviews", id: "reviews" },
  { name: "Book Appointment", id: "contact" },
];

const services = [
  { name: "General Adult Psychiatry" },
  { name: "Child & Adolescent Psychiatry" },
  { name: "Addiction Recovery" },
  { name: "Psychotherapy & Counseling" },
  { name: "Online Consultations" },
];

const Footer = () => {
  const { activeId, scrollTo } = useScrollSpy(navLinks.map((l) => l.id));

  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-330 mx-auto px-5 pt-12 pb-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold leading-snug">Dr. Farwa Naeem</h2>
            <p className="mt-6 text-gray-400 leading-8 text-sm">
              Providing compassionate, evidence-based psychiatric care to
              patients in Lahore and across Pakistan.
            </p>

            <div className="flex items-center gap-3 mt-8">
              <span className="text-red-500">
                <Heart width={18} />
              </span>

              <p className="text-slate-200 text-sm">Caring for Mental Health</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>

            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={`cursor-pointer text-md font-semibold text-gray-400 }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Services</h3>

            <ul className="space-y-5">
              {services.map((service, idx) => (
                <li
                  key={idx}
                  className="text-gray-400 text-md leading-relaxed"
                >
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>

            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="text-blue-400 mt-1"><Phone width={18} /></div>

                <div className="text-slate-300 text-md leading-9">
                  <p>+92 300 1234567</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-emerald-400 mt-1"><Mail width={18}/></div>

                <p className="text-slate-300 text-md break-all">
                  dr.farwanaeem@gmail.com
                </p>
              </div>
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="text-violet-400 mt-1"><MapPin width={18} /></div>
                <p className="text-slate-300 text-md leading-9">
                  Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-8 pt-5">
          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-gray-400 text-sm sm:text-md text-center lg:text-left">
            {new Date().getFullYear()} &copy; Dr. Farwa Naeem. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              {["Privacy Policy", "Terms of Service", "Disclaimer"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-md font-medium"
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-5">
            <p className="text-slate-500 text-sm sm-text-md">
              PMDC Registered Psychiatrist • Licensed Medical Practitioner
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
