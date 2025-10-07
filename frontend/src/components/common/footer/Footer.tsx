// @ts-ignore
import React from 'react';
// @ts-ignore
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur border-b z-50">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-indigo-600 font-extrabold text-xl">
          <span className="i fa-solid fa-briefcase" />
          Grag<span className="text-amber-400">Gig</span>
        </NavLink>
        <ul className="hidden md:flex items-center gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "#jobs", label: "Jobs", anchor: true },
            { to: "#about", label: "About", anchor: true },
            { to: "#services", label: "Services", anchor: true },
          ].map((l, i) => (
            <li key={i}>
              {l.anchor ? (
                <a href={l.to} className="nav-link">{l.label}</a>
              ) : (
                <NavLink to={l.to} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>{l.label}</NavLink>
              )}
            </li>
          ))}
          <li>
            <NavLink to="/add-job" className="ml-2 btn btn-primary">Post Job</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}


