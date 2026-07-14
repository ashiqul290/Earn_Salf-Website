"use client";

import { useState } from "react";
import {
  FaWallet, FaMoneyBillWave, FaHistory,
  FaCheckCircle, FaClock, FaTimesCircle,
} from "react-icons/fa";
import { MdMobileScreenShare } from "react-icons/md";

const initialBalance = 1000;

const initialTransactions = [
  { id: 1, method: "bKash",  number: "01711111111", amount: 500, date: "25 Jun 2026", status: "approved" },
  { id: 2, method: "Nagad",  number: "01722222222", amount: 300, date: "20 Jun 2026", status: "approved" },
  { id: 3, method: "Rocket", number: "01733333333", amount: 200, date: "18 Jun 2026", status: "pending"  },
  { id: 4, method: "bKash",  number: "01744444444", amount: 400, date: "10 Jun 2026", status: "rejected" },
];

const methodColors = {
  bKash:  { bg: "bg-pink-100",   text: "text-pink-600"   },
  Nagad:  { bg: "bg-orange-100", text: "text-orange-600" },
  Rocket: { bg: "bg-purple-100", text: "text-purple-600" },
};

const statusConfig = {
  approved: { icon: FaCheckCircle, color: "text-green-500",  label: "Approved" },
  pending:  { icon: FaClock,       color: "text-yellow-500", label: "Pending"  },
  rejected: { icon: FaTimesCircle, color: "text-red-500",    label: "Rejected" },
};

export default function BalancePage() {
  const [balance, setBalance]   = useState(initialBalance);
  const [transactions, setTxns] = useState(initialTransactions);
  const [method, setMethod]     = useState("bKash");
  const [number, setNumber]     = useState("");
  const [amount, setAmount]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [toast, setToast]       = useState(null);
  const [confirm, setConfirm]   = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = () => {
    if (!number || number.length < 11)   return showToast("সঠিক নম্বর দিন", "error");
    if (!amount || Number(amount) < 300)  return showToast("সর্বনিম্ন ৳৩০০ দিন", "error");
    if (Number(amount) > balance)         return showToast("ব্যালেন্স কম আছে", "error");
    setConfirm(true);
  };

  const handleConfirm = () => {
    setTxns((prev) => [{
      id: prev.length + 1,
      method, number, date: "আজ",
      amount: Number(amount),
      status: "pending",
    }, ...prev]);
    setBalance((b) => b - Number(amount));
    setAmount("");
    setNumber("");
    setConfirm(false);
    showToast("Cash Out request পাঠানো হয়েছে ✅");
  };

  const filtered = filter === "all"
    ? transactions
    : transactions.filter((t) => t.status === filter);

  const totalApproved = transactions
    .filter((t) => t.status === "approved")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space min-h-screen bg-gray-50 py-6 px-3 sm:px-4">
      <div className="w-full max-w-lg mx-auto space-y-4">

        {/* Toast — center top, never overflow */}
        {toast && (
          <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white w-max max-w-[90vw] text-center ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}>
            {toast.msg}
          </div>
        )}

        {/* Confirm Modal */}
        {confirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h3 className="font-bold text-gray-800 text-lg text-center mb-1">Confirm Cash Out</h3>
              <p className="text-center text-gray-500 text-sm mb-4">এই request confirm করবেন?</p>
              <div className="space-y-2 bg-gray-50 rounded-xl p-4 mb-5 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 flex-shrink-0">Method</span>
                  <span className="font-semibold text-right">{method}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 flex-shrink-0">Number</span>
                  <span className="font-semibold text-right truncate">{number}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 flex-shrink-0">Amount</span>
                  <span className="font-bold text-emerald-600">৳ {Number(amount).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setConfirm(false)} className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition">Cancel</button>
                <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold transition">Confirm</button>
              </div>
            </div>
          </div>
        )}

        {/* Balance Card */}
        <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl p-5 sm:p-6 shadow-xl overflow-hidden">
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <FaWallet className="text-white/80 text-base" />
              <p className="text-white/80 text-sm font-medium">Current Balance</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              ৳ {balance.toLocaleString()}
            </h1>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white/20 rounded-2xl p-3">
                <p className="text-white/70 text-xs">Total Withdrawn</p>
                <p className="text-white font-bold text-base sm:text-lg">৳ {totalApproved.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 rounded-2xl p-3">
                <p className="text-white/70 text-xs">Total Requests</p>
                <p className="text-white font-bold text-base sm:text-lg">{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Out Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <FaMoneyBillWave className="text-yellow-500 text-base" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Cash Out</h2>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {["bKash", "Nagad", "Rocket"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
                    method === m
                      ? `${methodColors[m].bg} ${methodColors[m].text} border-current`
                      : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-400">
              <MdMobileScreenShare className="text-gray-400 text-lg flex-shrink-0" />
              <input
                type="text"
                placeholder="01XXXXXXXXX"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full min-w-0 py-3 bg-transparent text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600 mb-2">Amount</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-yellow-400">
              <span className="text-gray-400 font-semibold flex-shrink-0">৳</span>
              <input
                type="number"
                placeholder="Minimum 300"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full min-w-0 py-3 bg-transparent text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[300, 500, 1000].map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(String(q))}
                  className="flex-1 py-1.5 rounded-lg bg-yellow-50 text-yellow-600 text-xs font-semibold hover:bg-yellow-100 transition"
                >
                  ৳{q}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 transition py-3.5 rounded-xl text-sm font-bold text-white flex justify-center items-center gap-2 shadow-md shadow-yellow-200"
          >
            <FaMoneyBillWave /> Cash Out Now
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-6">

          {/* ── Header: title বামে, filter নিচে — সবসময় stack ── */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FaHistory className="text-blue-500 text-base" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">History</h2>
            </div>

            {/* Filter tabs — grid এ রাখলে কখনো overflow হবে না */}
            <div className="grid grid-cols-4 gap-1 bg-gray-100 rounded-xl p-1">
              {["all", "approved", "pending", "rejected"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`py-1.5 rounded-lg text-[11px] font-semibold capitalize transition text-center ${
                    filter === f
                      ? "bg-white shadow text-gray-800"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-300">
              <FaHistory size={30} className="mx-auto mb-2" />
              <p className="text-sm">কোনো লেনদেন নেই</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((tx) => {
                const s = statusConfig[tx.status];
                const m = methodColors[tx.method] || { bg: "bg-gray-100", text: "text-gray-600" };
                const StatusIcon = s.icon;
                return (
                  <div key={tx.id} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
                    <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-xs font-bold ${m.text}`}>{tx.method[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{tx.method}</p>
                      <p className="text-xs text-gray-400 truncate">{tx.number} · {tx.date}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-800">৳ {tx.amount.toLocaleString()}</p>
                      <span className={`text-[10px] font-semibold ${s.color} flex items-center justify-end gap-0.5`}>
                        <StatusIcon size={10} /> {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}