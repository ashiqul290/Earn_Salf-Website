"use client";

import { useState } from "react";
import { FaPhoneAlt, FaUserShield, FaWallet, FaUserEdit, FaWhatsapp, FaCheck, FaTimes } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

const initialProfile = {
  name: "Shahriear Al Amin",
  phone: "01788812345",
  role: "User",
  balance: 1000,
  trainer: {
    name: "Sakib Khan",
    phone: "01712345678",
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: profile.name, phone: profile.phone });

  const handleSave = () => {
    setProfile((prev) => ({ ...prev, name: form.name, phone: form.phone }));
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ name: profile.name, phone: profile.phone });
    setEditing(false);
  };

  const initials = profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">

          {/* Top banner */}
          <div className="h-24 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500" />

          {/* Avatar */}
          <div className="flex justify-center -mt-12 mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 p-[3px] shadow-lg">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-700">{initials}</span>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
            </div>
          </div>

          <div className="px-6 pb-7">

            {/* Name */}
            {editing ? (
              <div className="mb-1">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-center text-xl font-bold text-gray-800 border-b-2 border-yellow-400 pb-1 bg-transparent focus:outline-none"
                />
              </div>
            ) : (
              <h1 className="text-center text-2xl font-bold text-gray-800 mb-1">
                {profile.name}
              </h1>
            )}

            <p className="text-center text-xs text-gray-400 mb-6">
              <span className={`inline-block px-3 py-0.5 rounded-full font-medium text-[11px] ${
                profile.role === "User" ? "bg-blue-100 text-blue-600" :
                profile.role === "Premium" ? "bg-purple-100 text-purple-600" :
                "bg-yellow-100 text-yellow-700"
              }`}>
                {profile.role === "User" ? "👤" : profile.role === "Premium" ? "⭐" : "🎓"} {profile.role}
              </span>
            </p>

            {/* Info rows */}
            <div className="space-y-3">

              {/* Phone */}
              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FaPhoneAlt className="text-blue-500 text-base" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Phone Number</p>
                  {editing ? (
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="font-semibold text-gray-800 bg-transparent border-b border-yellow-400 focus:outline-none w-full text-sm"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800 text-sm">
                      {profile.phone.slice(0, 5)}*****
                    </p>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaUserShield className="text-yellow-500 text-base" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Role</p>
                  <p className={`font-semibold text-sm ${
                    profile.role === "User" ? "text-blue-600" :
                    profile.role === "Premium" ? "text-purple-600" :
                    "text-yellow-600"
                  }`}>
                    {profile.role}
                  </p>
                </div>
              </div>

              {/* Balance */}
              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <FaWallet className="text-pink-500 text-base" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Current Balance</p>
                  <p className="font-semibold text-emerald-600 text-sm">৳ {profile.balance.toLocaleString()}</p>
                </div>
              </div>

              {/* Trainer — শুধু trainer assign থাকলে দেখাবে */}
              {profile.trainer && (
                <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <MdPerson className="text-purple-500 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">My Trainer</p>
                    <p className="font-semibold text-gray-800 text-sm truncate">{profile.trainer.name}</p>
                  </div>
                  <a
                    href={`https://wa.me/88${profile.trainer.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-xl transition flex-shrink-0"
                  >
                    <FaWhatsapp size={13} />
                    Chat
                  </a>
                </div>
              )}

            </div>

            {/* Buttons */}
            <div className="mt-6">
              {editing ? (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition"
                  >
                    <FaTimes size={13} /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold transition"
                  >
                    <FaCheck size={13} /> Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold transition"
                >
                  <FaUserEdit size={14} /> Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}