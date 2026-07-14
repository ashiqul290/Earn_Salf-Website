"use client";

import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { FaBell, FaSearch } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AdminNavbar({ onMenuToggle }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, title: "New user registered",     time: "2 min ago",  unread: true  },
    { id: 2, title: "Cashout request #45",      time: "10 min ago", unread: true  },
    { id: 3, title: "Premium upgrade: Rion",    time: "1 hr ago",   unread: false },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl bg-[#ffee57] hover:bg-yellow-300 transition"
        >
          <IoMenuSharp size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-[220px]">
          <FaSearch className="text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search users, trainers..."
            className="bg-transparent text-sm text-gray-600 w-full placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <FaBell className="text-gray-600 text-lg" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-sm">Notifications</span>
                <button className="text-xs text-blue-500 hover:underline">Mark all read</button>
              </div>
              <ul className="py-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`px-4 py-3 hover:bg-gray-50 transition cursor-pointer ${n.unread ? "bg-blue-50/50" : ""}`}
                  >
                    <p className="text-sm font-medium text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-[#ffee57] flex items-center justify-center">
            <MdAdminPanelSettings size={20} className="text-[#1a1a1a]" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
            <p className="text-[10px] text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
