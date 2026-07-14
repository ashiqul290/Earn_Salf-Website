"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBell, FaHome, FaWallet, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import {
  MdDashboard,
  MdAdminPanelSettings,
  MdOutlineSlowMotionVideo,
  MdSettings,
} from "react-icons/md";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";

// ─── Dummy auth hook — replace with your real auth (Firebase, NextAuth, etc.) ───
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching session — swap this block with your real auth check
    // e.g. onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); })
    const saved = localStorage.getItem("earnself_mock_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = () => {
    const mock = { name: "Shahriear Al Amin", role: "Premium User", initials: "SA" };
    localStorage.setItem("earnself_mock_user", JSON.stringify(mock));
    setUser(mock);
  };

  const logout = () => {
    localStorage.removeItem("earnself_mock_user");
    setUser(null);
  };

  return { user, loading, login, logout };
}

// ─── Nav links (shown in sidebar for everyone) ───────────────────────────────
const navLinks = [
  { href: "/",               label: "Home",       icon: FaHome                   },
  { href: "/Dashbord",       label: "Dashboard",  icon: MdDashboard              },
  { href: "/Admin_Dashbord", label: "Admin Panel", icon: MdAdminPanelSettings    },
  { href: "/Courses",        label: "Courses",    icon: MdOutlineSlowMotionVideo },
  { href: "/Balance",        label: "Balance",    icon: FaWallet                 },
  { href: "/Profile",        label: "Profile",    icon: FaUser                   },
];

// ─── Mock notifications ──────────────────────────────────────────────────────
const notifications = [
  { id: 1, text: "New referral joined!",       time: "2m ago",  unread: true  },
  { id: 2, text: "Cashout ৳500 approved",      time: "1h ago",  unread: true  },
  { id: 3, text: "Your profile was updated",   time: "3h ago",  unread: false },
];

export default function Navbar() {
  const { user, loading, login, logout } = useAuth();
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [notifOpen,  setNotifOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const pathname = usePathname();
  const router   = useRouter();
  const profileRef = useRef(null);

  const unread = notifs.filter((n) => n.unread).length;

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setNotifOpen(false);
    setProfileOpen(false);
  };

  const markAllRead = () =>
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));

  const handleLogout = () => {
    logout();
    closeAll();
    router.push("/");
  };

  return (
    <div className="relative z-50">
      {/* ── Backdrop overlay ── */}
      {(menuOpen || notifOpen) && (
        <div
          onClick={closeAll}
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
        />
      )}

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-[#b1b0b06b] backdrop-blur-2xl border-b border-gray-100 shadow-sm">
        <div className="h-full max-w-screen-xl mx-auto px-4 flex items-center justify-between">

          {/* ── Left: menu toggle + logo ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setMenuOpen(!menuOpen); setNotifOpen(false); setProfileOpen(false); }}
              className="w-9 h-9 flex items-center justify-center bg-[#ffee57] hover:bg-yellow-300 rounded-xl transition-all duration-200 shadow-sm"
            >
              {menuOpen
                ? <IoClose    size={20} className="text-[#1a1a1a]" />
                : <IoMenuSharp size={20} className="text-[#1a1a1a]" />}
            </button>

            <Link href="/" className="flex items-center gap-1.5">
              <span className="text-2xl">🦋</span>
              <span className="text-[20px] font-bold text-gray-800 tracking-tight">
                Earn<span className="text-[#ffee57] drop-shadow-sm">Self</span>
              </span>
            </Link>
          </div>

          {/* ── Right: differs by auth state ── */}
          <div className="flex items-center gap-2">

            {loading ? (
              // Skeleton while checking auth
              <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-xl" />

            ) : user ? (
              /* ════════ LOGGED IN ════════ */
              <>
                {/* Bell */}
                <div className="relative">
                  <button
                    onClick={() => { setNotifOpen(!notifOpen); setMenuOpen(false); setProfileOpen(false); }}
                    className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/60 transition"
                  >
                    <FaBell className="text-gray-700 text-[17px]" />
                    {unread > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                  </button>

                  {/* Notification dropdown */}
                  {notifOpen && (
                    <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-800">Notifications</span>
                          {unread > 0 && (
                            <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                              {unread}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-blue-500 hover:underline font-medium"
                        >
                          Mark all read
                        </button>
                      </div>

                      <ul>
                        {notifs.map((n) => (
                          <li
                            key={n.id}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer
                              ${n.unread ? "bg-blue-50/60" : ""}`}
                          >
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                              ${n.unread ? "bg-blue-500" : "bg-gray-300"}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-700 font-medium leading-snug">{n.text}</p>
                              <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                        <Link
                          href="/Notifications"
                          onClick={closeAll}
                          className="text-xs text-gray-400 hover:text-gray-600 transition"
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile dropdown button */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); setMenuOpen(false); }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/60 transition-all duration-200 group"
                  >
                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center shadow-sm flex-shrink-0">
                      <span className="text-white text-[11px] font-bold">{user.initials}</span>
                    </div>

                    {/* Name — hidden on very small screens */}
                    <span className="hidden sm:block text-sm font-semibold text-gray-800 max-w-[110px] truncate">
                      {user.name.split(" ")[0]}
                    </span>

                    <FaChevronDown
                      size={10}
                      className={`text-gray-500 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Profile dropdown panel */}
                  {profileOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-pink-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{user.initials}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <HiSparkles className="text-yellow-500 text-[10px]" />
                              <span className="text-[11px] text-yellow-600 font-medium">{user.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1.5">
                        {[
                          { href: "/Profile",  label: "My Profile",  icon: FaUser       },
                          { href: "/Balance",  label: "Balance",     icon: FaWallet     },
                          { href: "/Settings", label: "Settings",    icon: MdSettings   },
                        ].map(({ href, label, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={closeAll}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                          >
                            <Icon size={14} className="text-gray-400" />
                            {label}
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 py-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt size={13} />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>

            ) : (
              /* ════════ LOGGED OUT ════════ */
              <div className="flex items-center gap-2">
                <Link
                  href="/Login"
                  className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/Register"
                  className="px-4 py-1.5 text-sm font-bold bg-[#ffee57] hover:bg-yellow-300 text-gray-900 rounded-xl shadow-sm transition-all duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          SIDEBAR
      ════════════════════════════════════════ */}
      <aside
        className={`fixed top-[60px] left-0 z-50 h-[calc(100vh-60px)] w-[220px]
          bg-[#1a1a1a] shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* User mini profile — only when logged in */}
        {user ? (
          <div className="px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">{user.initials}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <HiSparkles className="text-yellow-400 text-[10px]" />
                  <span className="text-yellow-400 text-[11px] font-medium">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-white/40 text-xs text-center mb-3">Not logged in</p>
            <div className="flex gap-2">
              <Link
                href="/Login"
                onClick={closeAll}
                className="flex-1 text-center py-2 text-xs font-semibold text-white/70 border border-white/20 rounded-xl hover:border-white/40 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/Register"
                onClick={closeAll}
                className="flex-1 text-center py-2 text-xs font-bold bg-[#ffee57] text-gray-900 rounded-xl hover:bg-yellow-300 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}

        {/* Nav links */}
        <nav className="flex-1 py-3 px-3 overflow-y-auto">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={closeAll}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 group
                  ${isActive
                    ? "bg-[#ffee57] text-[#1a1a1a]"
                    : "text-white/60 hover:bg-white/10 hover:text-white"}`}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-[#1a1a1a]" : "text-white/40 group-hover:text-white transition"}
                />
                {label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar bottom */}
        <div className="px-5 py-4 border-t border-white/10">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors"
            >
              <FaSignOutAlt size={13} />
              Log out
            </button>
          ) : (
            <p className="text-[11px] text-white/20 text-center">EarnSelf v1.0</p>
          )}
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-[60px]" />
    </div>
  );
}