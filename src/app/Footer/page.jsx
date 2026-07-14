"use client";

import {
  FaEnvelope,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaShieldAlt,
  FaLock,
  FaHeadset,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
    bg: "bg-[#1877F2]",
    shadow: "shadow-blue-300",
  },
  {
    icon: FaWhatsapp,
    href: "#",
    label: "WhatsApp",
    bg: "bg-[#25D366]",
    shadow: "shadow-green-300",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
    bg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    shadow: "shadow-pink-300",
  },
  {
    icon: FaYoutube,
    href: "#",
    label: "YouTube",
    bg: "bg-[#FF0000]",
    shadow: "shadow-red-300",
  },
];

const trustBadges = [
  { icon: FaShieldAlt, text: "100% Secure" },
  { icon: FaLock, text: "SSL Protected" },
  { icon: FaHeadset, text: "24/7 Support" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/Dashbord" },
  { label: "Balance", href: "/Balance" },
  { label: "Profile", href: "/Profile" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden">

      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
          style={{ height: 48 }}
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#1F2937"
          />
        </svg>
      </div>

      {/* Main body */}
      <div className="bg-[#1F2937] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">

          {/* Grid: Brand + Links + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#FFD400] flex items-center justify-center flex-shrink-0">
                  <FiZap className="text-gray-900 text-lg" />
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">EarnSelf</p>
                  <p className="text-xs text-gray-400 leading-tight">Earning Platform</p>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                Bangladesh's most trusted referral & earning platform.
                Empowering thousands of users to earn smarter every day.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {trustBadges.map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300"
                  >
                    <Icon className="text-[#FFD400] text-xs" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#FFD400] rounded-full inline-block" />
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-gray-400 hover:text-[#FFD400] transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#FFD400] transition-all duration-200 rounded-full" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#FFD400] rounded-full inline-block" />
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map(({ label, href }) => (
                  <li key={label}>
                  <a
                      href={href}
                      className="text-sm text-gray-400 hover:text-[#FFD400] transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#FFD400] transition-all duration-200 rounded-full" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Social */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#FFD400] rounded-full inline-block" />
                Connect With Us
              </h4>

              {/* Email */}
              <a
                href="mailto:support@earnself.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#FFD400] transition-colors duration-200 mb-5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FFD400]/40 transition-colors">
                  <FaEnvelope className="text-xs" />
                </div>
                support@earnself.com
              </a>

              {/* Social icons */}
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map(({ icon: Icon, href, label, bg, shadow }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-10 h-10 rounded-xl ${bg} text-white flex items-center justify-center text-sm
                      shadow-lg ${shadow} hover:scale-110 hover:-translate-y-0.5 transition-all duration-200`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD400]/40" />
              <div className="w-2 h-2 rounded-full bg-[#FFD400]/70" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD400]/40" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>
              Copyright © 2019 – {year}{" "}
              <span className="text-[#FFD400] font-semibold">EarnSelf.com</span>
              . All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <span className="text-red-400 mx-0.5">♥</span> in Bangladesh
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}