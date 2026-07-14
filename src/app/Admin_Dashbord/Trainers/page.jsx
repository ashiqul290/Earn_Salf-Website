"use client";

import { useState } from "react";
import { FaWhatsapp, FaSearch, FaUserTie } from "react-icons/fa";
import { MdClose, MdPersonRemove, MdPersonAdd } from "react-icons/md";

const demoTrainers = [
  { id: 1, name: "Sakib Khan",     phone: "01712345678", email: "sakib@gmail.com",    referredBy: "Admin",         balance: 8500, status: "active",   joinDate: "2024-08-10", referralCode: "SAK001", premiumCount: 12, collectedUsers: 120, premiumUsers: 100 },
  { id: 2, name: "Rion Ahmed",     phone: "01812345679", email: "rion@gmail.com",     referredBy: "Sakib Khan",    balance: 6200, status: "active",   joinDate: "2024-09-05", referralCode: "RIO002", premiumCount: 9,  collectedUsers: 102, premiumUsers: 80  },
  { id: 3, name: "Tania Akter",    phone: "01912345680", email: "tania@gmail.com",    referredBy: "Admin",         balance: 4100, status: "active",   joinDate: "2024-10-12", referralCode: "TAN003", premiumCount: 7,  collectedUsers: 200, premiumUsers: 126 },
  { id: 4, name: "Jahangir Alam",  phone: "01612345681", email: "jahangir@gmail.com", referredBy: "Rion Ahmed",    balance: 3300, status: "inactive", joinDate: "2025-01-08", referralCode: "JAH004", premiumCount: 4,  collectedUsers: 12,  premiumUsers: 10  },
  { id: 5, name: "Nasrin Sultana", phone: "01512345682", email: "nasrin@gmail.com",   referredBy: "Tania Akter",   balance: 5700, status: "active",   joinDate: "2025-02-14", referralCode: "NAS005", premiumCount: 11, collectedUsers: 342, premiumUsers: 140 },
  { id: 6, name: "Belal Hossain",  phone: "01312345683", email: "belal@gmail.com",    referredBy: "Sakib Khan",    balance: 2900, status: "active",   joinDate: "2025-03-01", referralCode: "BEL006", premiumCount: 6,  collectedUsers: 12,  premiumUsers: 10  },
];

// যেসব premium user এখনো কোনো trainer এর under এ নেই
const unassignedPremiumUsers = [
  { id: 101, name: "Sabbir Hossain",  phone: "01711111111" },
  { id: 102, name: "Tania Begum",     phone: "01722222222" },
  { id: 103, name: "Karim Uddin",     phone: "01733333333" },
  { id: 104, name: "Mim Akter",       phone: "01744444444" },
  { id: 105, name: "Arif Billah",     phone: "01755555555" },
  { id: 106, name: "Puja Sharma",     phone: "01766666666" },
  { id: 107, name: "Imran Hossain",   phone: "01777777777" },
  { id: 108, name: "Fatema Khanam",   phone: "01788888888" },
];

function Avatar({ name, size = "sm" }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-blue-500","bg-purple-500","bg-green-500","bg-pink-500","bg-orange-500","bg-teal-500","bg-red-500","bg-indigo-500"];
  const sz = size === "lg" ? "w-14 h-14 text-xl" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} ${colors[name.charCodeAt(0) % colors.length]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

function ConfirmDialog({ name, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MdPersonRemove size={28} className="text-red-500" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg">Remove Trainer?</h3>
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-semibold text-gray-700">{name}</span> will be removed from Trainer and made a Premium User.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition">Remove</button>
        </div>
      </div>
    </div>
  );
}

function TrainerModal({ trainer, onClose }) {
  if (!trainer) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg">Trainer Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <MdClose size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={trainer.name} size="lg" />
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{trainer.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700">🎓 Trainer</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Phone",           value: trainer.phone },
              { label: "Email",           value: trainer.email },
              { label: "Balance",         value: `৳ ${trainer.balance}` },
              { label: "Trainer Of",      value: trainer.premiumCount },
              { label: "Join Date",       value: trainer.joinDate },
              { label: "Referral Code",   value: trainer.referralCode },
              { label: "Referred By",     value: trainer.referredBy },
              { label: "Status",          value: trainer.status },
              { label: "Collected Users", value: trainer.collectedUsers },
              { label: "Made Premium",    value: trainer.premiumUsers },
              { label: "Conversion Rate", value: `${((trainer.premiumUsers / trainer.collectedUsers) * 100).toFixed(1)}%` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-400">{label}</span>
                <span className={`text-sm font-medium ${label === "Status" ? (value === "active" ? "text-green-600" : "text-red-500") : "text-gray-800"}`}>
                  {label === "Status" ? (value === "active" ? "✅ Active" : "❌ Inactive") : value}
                </span>
              </div>
            ))}
          </div>
          <a
            href={`https://wa.me/88${trainer.phone}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition"
          >
            <FaWhatsapp size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Allot Members Modal ────────────────────────────────────────────────────
function AllotModal({ trainer, onClose, onAllot }) {
  const [selected, setSelected] = useState([]);

  const toggle = (user) => {
    setSelected((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleAllot = () => {
    onAllot(trainer.id, selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-bold text-gray-800 text-lg">Allot Members</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Trainer: <span className="font-semibold text-yellow-600">{trainer.name}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition">
            <MdClose size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Selected preview — right corner badge style */}
        {selected.length > 0 && (
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-blue-700">Selected ({selected.length})</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.map((u) => (
                <span
                  key={u.id}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {u.name}
                  <button
                    onClick={() => toggle(u)}
                    className="hover:text-red-500 transition ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* User list */}
        <div className="flex-1 overflow-y-auto p-5">
          {unassignedPremiumUsers.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p className="text-sm">No unassigned premium users</p>
            </div>
          ) : (
            <div className="space-y-2">
              {unassignedPremiumUsers.map((user) => {
                const isChecked = !!selected.find((u) => u.id === user.id);
                return (
                  <label
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition border ${
                      isChecked
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(user)}
                      className="w-4 h-4 accent-blue-500 flex-shrink-0"
                    />
                    <Avatar name={user.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.phone}</p>
                    </div>
                    {isChecked && (
                      <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                        Selected
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex-shrink-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAllot}
            disabled={selected.length === 0}
            className="flex-1 py-3 rounded-xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Allot {selected.length > 0 ? `(${selected.length})` : ""} Members
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function TrainersPage() {
  const [trainers, setTrainers] = useState(demoTrainers);
  const [search, setSearch] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [allotTrainer, setAllotTrainer] = useState(null);

  const filtered = trainers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search)
  );

  const handleRemove = (id) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
    setConfirmId(null);
  };

  const handleAllot = (trainerId, users) => {
    setTrainers((prev) =>
      prev.map((t) =>
        t.id === trainerId
          ? { ...t, premiumCount: t.premiumCount + users.length }
          : t
      )
    );
  };

  const confirmTrainer = trainers.find((t) => t.id === confirmId);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 space">Trainers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} trainers found</p>
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
          <p className="text-sm">No trainers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-5">
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={trainer.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{trainer.name}</h3>
                    <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                      🎓 Trainer
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{trainer.phone}</p>
                  <span className={`text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full font-medium ${trainer.status === "active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                    {trainer.status === "active" ? "● Active" : "● Inactive"}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Balance</span>
                  <span className="text-gray-700 font-medium">৳ {trainer.balance}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Collected Users</span>
                  <span className="font-semibold text-blue-600">👥 {trainer.collectedUsers}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Made Premium</span>
                  <span className="font-semibold text-yellow-600">⭐ {trainer.premiumUsers}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Conversion</span>
                  <span className="font-semibold text-green-600">{((trainer.premiumUsers / trainer.collectedUsers) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Trainer Of</span>
                  <span className="text-purple-600 font-medium">{trainer.premiumCount} users</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Referred By</span>
                  <span className="text-blue-600 font-medium truncate max-w-[130px] text-right">{trainer.referredBy}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Joined</span>
                  <span className="text-gray-700 font-medium">{trainer.joinDate}</span>
                </div>
              </div>

              {/* 4 buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTrainer(trainer)}
                  className="flex-1 text-xs font-semibold py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => setAllotTrainer(trainer)}
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition"
                  title="Allot Members"
                >
                  <MdPersonAdd size={16} />
                </button>
                <a
                  href={`https://wa.me/88${trainer.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white transition"
                >
                  <FaWhatsapp size={14} />
                </a>
                <button
                  onClick={() => setConfirmId(trainer.id)}
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-red-100 hover:bg-red-500 hover:text-white text-red-500 transition"
                  title="Remove from Trainer"
                >
                  <MdPersonRemove size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TrainerModal trainer={selectedTrainer} onClose={() => setSelectedTrainer(null)} />

      {allotTrainer && (
        <AllotModal
          trainer={allotTrainer}
          onClose={() => setAllotTrainer(null)}
          onAllot={handleAllot}
        />
      )}

      {confirmId && (
        <ConfirmDialog
          name={confirmTrainer?.name}
          onConfirm={() => handleRemove(confirmId)}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}