"use client";

import { useState } from "react";
import { FaWhatsapp, FaCrown, FaUser, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const demoUsers = [
  {
    id: 1,
    name: "Nusrat Jahan",
    phone: "01712345678",
    role: "user",
    referredBy: "Sabbir Hossain",
    balance: 320,
    status: "active",
    joinDate: "2024-11-05",
    referralCode: "NUS001",
    email: "nusrat@gmail.com",
  },
  {
    id: 2,
    name: "Mahfuz Rahman",
    phone: "01812345679",
    role: "user",
    referredBy: "Tania Akter",
    balance: 180,
    status: "active",
    joinDate: "2024-11-12",
    referralCode: "MAH002",
    email: "mahfuz@gmail.com",
  },
  {
    id: 3,
    name: "Rina Begum",
    phone: "01912345680",
    role: "user",
    referredBy: "Rion Ahmed",
    balance: 90,
    status: "inactive",
    joinDate: "2024-12-01",
    referralCode: "RIN003",
    email: "rina@gmail.com",
  },
  {
    id: 4,
    name: "Karim Uddin",
    phone: "01612345681",
    role: "user",
    referredBy: "Sabbir Hossain",
    balance: 540,
    status: "active",
    joinDate: "2025-01-08",
    referralCode: "KAR004",
    email: "karim@gmail.com",
  },
  {
    id: 5,
    name: "Sadia Islam",
    phone: "01512345682",
    role: "user",
    referredBy: "Mahfuz Rahman",
    balance: 210,
    status: "active",
    joinDate: "2025-01-15",
    referralCode: "SAD005",
    email: "sadia@gmail.com",
  },
  {
    id: 6,
    name: "Rakib Hasan",
    phone: "01312345683",
    role: "user",
    referredBy: "Tania Akter",
    balance: 75,
    status: "active",
    joinDate: "2025-02-03",
    referralCode: "RAK006",
    email: "rakib@gmail.com",
  },
  {
    id: 7,
    name: "Fatema Khanam",
    phone: "01412345684",
    role: "premium",
    referredBy: "Rion Ahmed",
    balance: 430,
    status: "inactive",
    joinDate: "2025-02-18",
    referralCode: "FAT007",
    email: "fatema@gmail.com",
  },
  {
    id: 8,
    name: "Imran Hossain",
    phone: "01712345685",
    role: "user",
    referredBy: "Sabbir Hossain",
    balance: 660,
    status: "active",
    joinDate: "2025-03-01",
    referralCode: "IMR008",
    email: "imran@gmail.com",
  },
  {
    id: 9,
    name: "Puja Sharma",
    phone: "01812345686",
    role: "user",
    referredBy: "Karim Uddin",
    balance: 120,
    status: "active",
    joinDate: "2025-03-14",
    referralCode: "PUJ009",
    email: "puja@gmail.com",
  },
  {
    id: 10,
    name: "Arif Billah",
    phone: "01912345687",
    role: "user",
    referredBy: "Mahfuz Rahman",
    balance: 280,
    status: "active",
    joinDate: "2025-04-02",
    referralCode: "ARI010",
    email: "arif@gmail.com",
  },
  {
    id: 11,
    name: "Mim Akter",
    phone: "01612345688",
    role: "user",
    referredBy: "Nusrat Jahan",
    balance: 350,
    status: "active",
    joinDate: "2025-04-20",
    referralCode: "MIM011",
    email: "mim@gmail.com",
  },
  {
    id: 12,
    name: "Sumon Das",
    phone: "01512345689",
    role: "user",
    referredBy: "Rakib Hasan",
    balance: 50,
    status: "inactive",
    joinDate: "2025-05-05",
    referralCode: "SUM012",
    email: "sumon@gmail.com",
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

function UserModal({ user, onClose, onMakePremium }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg">User Details</h2>
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
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.role === "premium" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}
              >
                {user.role === "premium" ? "⭐ Premium" : "👤 User"}
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
              { label: "Status", value: user.status },
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
            {user.role !== "premium" && (
              <button
                onClick={() => {
                  onMakePremium(user.id);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-semibold py-3 rounded-xl transition"
              >
                <FaCrown size={14} /> Make Premium
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllUsersPage() {
  const [confirmUser, setConfirmUser] = useState(null);
  const [users, setUsers] = useState(demoUsers);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search),
  );

  const handleMakePremium = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "premium" } : u)),
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 space">All Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length} users found
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
          <FaUser size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No users found</p>
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
                    {user.role === "premium" && (
                      <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-medium">
                        ⭐ Premium
                      </span>
                    )}
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
                  <span className="text-gray-400">Role</span>
                  <span className="text-gray-700 font-medium capitalize">
                    {user.role}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Balance</span>
                  <span className="text-gray-700 font-medium">
                    ৳ {user.balance}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Referred By</span>
                  <span className="text-blue-600 font-medium truncate max-w-[130px] text-right">
                    {user.referredBy}
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
                {user.role !== "premium" && (
                  <button
                    onClick={() => setConfirmUser(user)}
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] transition"
                    title="Make Premium"
                  >
                    <FaCrown size={14} />
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
        onMakePremium={handleMakePremium}
      />
      {confirmUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCrown className="text-yellow-500 text-3xl" />
              </div>

              <h2 className="text-xl font-bold text-gray-800">
                Make Premium User?
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Are you sure you want to make
                <br />
                <span className="font-semibold text-black">
                  {confirmUser.name}
                </span>
                <br />a Premium User?
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setConfirmUser(null)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    handleMakePremium(confirmUser.id);
                    setConfirmUser(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#ffee57] hover:bg-yellow-300 font-semibold"
                >
                  Yes, Make Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
