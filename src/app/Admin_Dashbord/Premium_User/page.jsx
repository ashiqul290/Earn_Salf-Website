"use client";

import { useState } from "react";
import { FaWhatsapp, FaSearch, FaUserTie } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const demoUsers = [
  {
    id: 1,
    name: "Sabbir Hossain",
    phone: "01712345678",
    role: "premium",
    referredBy: "Rion Ahmed",
    balance: 1320,
    status: "active",
    joinDate: "2024-10-05",
    referralCode: "SAB001",
    email: "sabbir@gmail.com",
    trainer: "Sakib Khan",
    collectedUsers: 45,
    premiumUsers: 11,
  },
  {
    id: 2,
    name: "Tania Akter",
    phone: "01812345679",
    role: "premium",
    referredBy: "Sakib Khan",
    balance: 2180,
    status: "active",
    joinDate: "2024-10-12",
    referralCode: "TAN002",
    email: "tania@gmail.com",
    trainer: "Rion Ahmed",
    collectedUsers: 15,
    premiumUsers: 13,
  },
  {
    id: 3,
    name: "Rion Ahmed",
    phone: "01912345680",
    role: "premium",
    referredBy: "Sakib Khan",
    balance: 3900,
    status: "active",
    joinDate: "2024-11-01",
    referralCode: "RIO003",
    email: "rion@gmail.com",
    trainer: "Sakib Khan",
    collectedUsers: 25,
    premiumUsers: 2,
  },
  {
    id: 4,
    name: "Meherun Nesa",
    phone: "01612345681",
    role: "premium",
    referredBy: "Tania Akter",
    balance: 540,
    status: "inactive",
    joinDate: "2025-01-08",
    referralCode: "MEH004",
    email: "meherun@gmail.com",
    trainer: "Rion Ahmed",
    collectedUsers: 43,
    premiumUsers: 6,
  },
  {
    id: 5,
    name: "Jahangir Alam",
    phone: "01512345682",
    role: "premium",
    referredBy: "Sabbir Hossain",
    balance: 2210,
    status: "active",
    joinDate: "2025-01-15",
    referralCode: "JAH005",
    email: "jahangir@gmail.com",
    trainer: "Sakib Khan",
    collectedUsers: 43,
    premiumUsers: 9,
  },
  {
    id: 6,
    name: "Nasrin Sultana",
    phone: "01312345683",
    role: "premium",
    referredBy: "Rion Ahmed",
    balance: 1075,
    status: "active",
    joinDate: "2025-02-03",
    referralCode: "NAS006",
    email: "nasrin@gmail.com",
    trainer: "Rion Ahmed",
    collectedUsers: 12,
    premiumUsers: 10,
  },
  {
    id: 7,
    name: "Belal Hossain",
    phone: "01412345684",
    role: "premium",
    referredBy: "Tania Akter",
    balance: 4300,
    status: "active",
    joinDate: "2025-02-18",
    referralCode: "BEL007",
    email: "belal@gmail.com",
    trainer: "Sakib Khan",
    collectedUsers: 23,
    premiumUsers: 8,
  },
  {
    id: 8,
    name: "Sharmin Akter",
    phone: "01712345685",
    role: "premium",
    referredBy: "Sabbir Hossain",
    balance: 660,
    status: "inactive",
    joinDate: "2025-03-01",
    referralCode: "SHA008",
    email: "sharmin@gmail.com",
    trainer: "Rion Ahmed",
    collectedUsers: 20,
    premiumUsers: 12,
  }, 
  {
    id: 9,
    name: "Dipok Dash",
    phone: "01712345685",
    role: "premium",
    referredBy: "Sabbir Hossain",
    balance: 660,
    status: "inactive",
    joinDate: "2025-03-01",
    referralCode: "SHA008",
    email: "dipok11@gmail.com",
    trainer: "Rion Ahmed",
    collectedUsers: 25,
    premiumUsers: 12,
  },
];

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-red-500",
    "bg-indigo-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

function UserModal({ user, onClose, onMakeTrainer }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg">
            Premium User Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition"
          >
            <MdClose size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold ${["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-pink-500"][user.name.charCodeAt(0) % 4]}`}
            >
              {user.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-600">
                ⭐ Premium
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { label: "Phone", value: user.phone },
              { label: "Email", value: user.email },
              { label: "Balance", value: `৳ ${user.balance}` },
              { label: "Join Date", value: user.joinDate },
              { label: "Referral Code", value: user.referralCode },
              { label: "Referred By", value: user.referredBy },
              { label: "Trainer", value: user.trainer },
              { label: "Status", value: user.status },
              { label: "Collected Users", value: user.collectedUsers },
              { label: "Made Premium Users", value: user.premiumUsers },
              {
                label: "Conversion Rate",
                value: `${(
                  (user.premiumUsers / user.collectedUsers) *
                  100
                ).toFixed(1)}%`,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b border-gray-50"
              >
                <span className="text-sm text-gray-400">{label}</span>
                <span
                  className={`text-sm font-medium ${label === "Status" ? (value === "active" ? "text-green-600" : "text-red-500") : "text-gray-800"}`}
                >
                  {label === "Status"
                    ? value === "active"
                      ? "✅ Active"
                      : "❌ Inactive"
                    : value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <a
              href={`https://wa.me/88${user.phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition"
            >
              <FaWhatsapp size={16} /> WhatsApp
            </a>
            {user.role !== "trainer" && (
              <button
                onClick={() => {
                  onMakeTrainer(user.id);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-semibold py-3 rounded-xl transition"
              >
                <FaUserTie size={14} /> Make Trainer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PremiumUsersPage() {
  const [users, setUsers] = useState(demoUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search),
  );

  const handleMakeTrainer = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "trainer" } : u)),
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 space">
            Premium Users
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} premium users found
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 w-full sm:w-[260px] shadow-sm">
          <FaSearch className="text-gray-400 text-sm flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-600 w-full placeholder-gray-400"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <FaUserTie size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No premium users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5"
            >
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={user.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">
                      {user.name}
                    </h3>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        user.role === "trainer"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {user.role === "trainer" ? "🎓 Trainer" : "⭐ Premium"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{user.phone}</p>
                  <span
                    className={`text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full font-medium ${user.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
                  >
                    {user.status === "active" ? "● Active" : "● Inactive"}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Balance</span>
                  <span className="text-gray-700 font-medium">
                    ৳ {user.balance}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Collected Users</span>

                  <span className="font-semibold text-blue-600">
                    👥 {user.collectedUsers}
                  </span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Made Premium</span>

                  <span className="font-semibold text-yellow-600">
                    ⭐ {user.premiumUsers}
                  </span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Conversion</span>

                  <span className="font-semibold text-green-600">
                    {((user.premiumUsers / user.collectedUsers) * 100).toFixed(
                      1,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Referred By</span>
                  <span className="text-blue-600 font-medium truncate max-w-[130px] text-right">
                    {user.referredBy}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Trainer</span>
                  <span className="text-gray-700 font-medium truncate max-w-[130px] text-right">
                    {user.trainer}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Joined</span>
                  <span className="text-gray-700 font-medium">
                    {user.joinDate}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="flex-1 text-xs font-semibold py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                >
                  View Details
                </button>
                <a
                  href={`https://wa.me/88${user.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white transition"
                >
                  <FaWhatsapp size={14} />
                </a>
                {user.role !== "trainer" && (
                  <button
                    onClick={() => handleMakeTrainer(user.id)}
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] transition"
                    title="Make Trainer"
                  >
                    <FaUserTie size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onMakeTrainer={handleMakeTrainer}
      />
    </div>
  );
}
