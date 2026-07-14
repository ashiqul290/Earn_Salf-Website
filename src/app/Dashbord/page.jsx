"use client";

import { useState } from "react";
import { FaWhatsapp, FaCheck, FaUserPlus } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const initialUsers = [
  { id: 1, name: "Shahriear Al Amin", phone: "01712345678", date: "Today 10:20 AM" },
  { id: 2, name: "Rion Ahmed",        phone: "01898765432", date: "Today 09:40 AM" },
  { id: 3, name: "Sakib Khan",        phone: "01987654321", date: "Yesterday"      },
  { id: 4, name: "Tania Akter",       phone: "01611112222", date: "Yesterday"      },
  { id: 5, name: "Mahfuz Rahman",     phone: "01933334444", date: "2 days ago"     },
];

function Avatar({ name }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-blue-500","bg-purple-500","bg-pink-500","bg-teal-500","bg-orange-500"];
  return (
    <div className={`w-11 h-11 rounded-2xl ${colors[name.charCodeAt(0) % colors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
      {initials}
    </div>
  );
}

export default function Dashboard() {
  const [users, setUsers]       = useState(initialUsers);
  const [contacted, setContacted] = useState([]);
  const [removing, setRemoving] = useState(null);

  const handleContacted = (id) => {
    setContacted((prev) => [...prev, id]);
    setRemoving(id);
    setTimeout(() => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setRemoving(null);
    }, 600);
  };

  return (
    <div className="space min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">New Users</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {users.length} pending contact{users.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-yellow-100 flex items-center justify-center">
          <FaUserPlus className="text-yellow-500 text-base" />
        </div>
      </div>

      {/* List */}
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
          <FaCheck size={40} className="mb-3" />
          <p className="text-sm font-medium">সবার সাথে যোগাযোগ হয়ে গেছে!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4 transition-all duration-500 ${
                removing === user.id ? "opacity-0 scale-95 -translate-x-4" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar name={user.name} />

                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-gray-800 truncate">{user.name}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">📞 {user.phone}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MdAccessTime className="text-gray-300 text-xs" />
                    <p className="text-[11px] text-gray-400">{user.date}</p>
                  </div>
                </div>

                {/* Buttons — desktop side by side */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`https://wa.me/88${user.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition"
                  >
                    <FaWhatsapp size={13} /> WhatsApp
                  </a>
                  <button
                    onClick={() => handleContacted(user.id)}
                    className="flex items-center gap-1.5 bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-xs font-semibold px-3 py-2 rounded-xl transition"
                  >
                    <FaCheck size={11} /> Contacted
                  </button>
                </div>
              </div>

              {/* Buttons — mobile full width */}
              <div className="flex gap-2 mt-3 sm:hidden">
                <a
                  href={`https://wa.me/88${user.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  <FaWhatsapp size={13} /> WhatsApp
                </a>
                <button
                  onClick={() => handleContacted(user.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-xs font-semibold py-2.5 rounded-xl transition"
                >
                  <FaCheck size={11} /> Contacted
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}