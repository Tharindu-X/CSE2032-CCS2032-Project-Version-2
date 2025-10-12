// @ts-ignore
import React from 'react';
// @ts-ignore
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#home" className="flex items-center gap-2 text-white text-2xl font-extrabold">
              <span className="i fa-solid fa-briefcase" />Grag<span className="text-amber-400">Gig</span>
            </a>
            <p className="mt-4 text-slate-300 max-w-md">Connecting talented professionals with amazing opportunities worldwide.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-slate-300">
              {[
                { href: "#about", label: "About Us" },
                { href: "#", label: "Contact" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Terms of Service" },
              ].map((l, i) => (
                <li key={i}><a href={l.href} className="hover:text-indigo-400 transition">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Career Guidance Unit University of Sri Jayewardenepura, Nugegoda, 10250</li>
              <li><a href="tel:+94112801088" className="hover:text-indigo-400 transition">+94 11 280 1088</a></li>
              <li><a href="mailto:career@sjp.ac.lk" className="hover:text-indigo-400 transition">career@sjp.ac.lk</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex items-center justify-between text-slate-400">
          <p>© 2025 GragGig. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-indigo-400 transition">Privacy</a><a href="#" className="hover:text-indigo-400 transition">Cookies</a></div>
        </div>
      </div>
    </footer>
  );
}


