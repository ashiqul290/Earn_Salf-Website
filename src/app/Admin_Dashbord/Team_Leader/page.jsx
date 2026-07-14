"use client";

import { useState } from "react";
import {
  FaUsers, FaWallet, FaCalendarAlt, FaCrown, FaUserShield,
  FaWhatsapp, FaSearch, FaTimes, FaExclamationTriangle,
  FaUserMinus, FaChevronRight, FaStar, FaUserCheck,
} from "react-icons/fa";
import { MdSupervisorAccount, MdVerified, MdTrendingUp } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";

const initialLeaders = [
  {
    id: "tl001", name: "Arif Rahman", phone: "01712000001",
    email: "arif@earnself.com", initials: "AR", balance: 48500,
    trainersCount: 12, joinDate: "2023-01-15", premiumDate: "2023-03-20",
    trainerDate: "2023-06-10", teamLeaderDate: "2024-01-05",
    totalReferral: 3240, monthlyReferral: 320, totalEarnings: 84500,
    status: "active", gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "tl002", name: "Sumaiya Khatun", phone: "01812000002",
    email: "sumaiya@earnself.com", initials: "SK", balance: 32100,
    trainersCount: 8, joinDate: "2023-02-10", premiumDate: "2023-04-15",
    trainerDate: "2023-08-22", teamLeaderDate: "2024-02-18",
    totalReferral: 2180, monthlyReferral: 210, totalEarnings: 62300,
    status: "active", gradient: "from-purple-500 to-purple-600",
  },
  {
    id: "tl003", name: "Mizanur Islam", phone: "01912000003",
    email: "mizan@earnself.com", initials: "MI", balance: 23700,
    trainersCount: 5, joinDate: "2023-05-08", premiumDate: "2023-07-14",
    trainerDate: "2023-11-30", teamLeaderDate: "2024-03-12",
    totalReferral: 1540, monthlyReferral: 145, totalEarnings: 41200,
    status: "active", gradient: "from-emerald-500 to-green-600",
  },
  {
    id: "tl004", name: "Nadia Sultana", phone: "01612000004",
    email: "nadia@earnself.com", initials: "NS", balance: 18900,
    trainersCount: 3, joinDate: "2023-08-20", premiumDate: "2023-10-05",
    trainerDate: "2024-01-18", teamLeaderDate: "2024-04-22",
    totalReferral: 980, monthlyReferral: 98, totalEarnings: 28700,
    status: "active", gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "tl005", name: "Rashed Khan", phone: "01512000005",
    email: "rashed@earnself.com", initials: "RK", balance: 9200,
    trainersCount: 2, joinDate: "2023-11-12", premiumDate: "2024-01-08",
    trainerDate: "2024-04-15", teamLeaderDate: "2024-06-01",
    totalReferral: 540, monthlyReferral: 62, totalEarnings: 14500,
    status: "active", gradient: "from-orange-500 to-amber-500",
  },
];

const fmt     = (n) => n?.toLocaleString("en-BD");
const fmtDate = (d) => new Date(d).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" });
const daysSince = (d) => Math.floor((Date.now() - new Date(d)) / 86400000);

// ✅ iconColor prop আলাদা করা হয়েছে
function TimelineItem({ icon: Icon, bgColor, iconColor = "text-white", label, date, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon size={14} className={iconColor} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-white/10 my-1" />}
      </div>
      <div className="pb-4">
        <p className="text-xs text-white/40 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-white mt-0.5">{fmtDate(date)}</p>
        <p className="text-[11px] text-white/30 mt-0.5">{daysSince(date)} days ago</p>
      </div>
    </div>
  );
}

export default function TeamLeaderPage() {
  const [leaders,      setLeaders]      = useState(initialLeaders);
  const [search,       setSearch]       = useState("");
  const [detailTarget, setDetailTarget] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);
  const [toast,        setToast]        = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = leaders.filter((l) =>
    !search ||
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search)
  );

  // ✅ Fully fixed handleRemove
  const handleRemove = () => {
    if (!removeTarget) return;                      // extra null guard
    const removedName      = removeTarget.name;     // আগেই save
    const removedId        = removeTarget.id;
    const removedCount     = removeTarget.trainersCount;

    setRemoveTarget(null);                          // আগে null করো
    setDetailTarget(null);
    setLeaders((prev) => prev.filter((l) => l.id !== removedId));
    showToast(`${removedName} removed from Team Leader.`);
  };

  return (
    <div className="space-y-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[300] px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white w-max max-w-[90vw] text-center animate-[fadeInDown_0.3s_ease-out]
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <HiSparkles className="text-[#FFD400]" />
            <h1 className="text-2xl font-bold text-gray-800">Team Leaders</h1>
            <span className="px-2 py-0.5 bg-[#FFD400] text-gray-900 text-xs font-bold rounded-full">
              {leaders.length}
            </span>
          </div>
          <p className="text-sm text-gray-400">Manage all team leaders and their trainer groups</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-gray-100 shadow-sm text-xs font-semibold text-gray-600">
            <MdSupervisorAccount className="text-blue-500" size={14} />
            {leaders.reduce((a, l) => a + l.trainersCount, 0)} Trainers
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-gray-100 shadow-sm text-xs font-semibold text-gray-600">
            <FaWallet className="text-emerald-500" size={12} />
            ৳{fmt(leaders.reduce((a, l) => a + l.totalEarnings, 0))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD400]/50 focus:border-[#FFD400]/60 transition shadow-sm"
        />
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <FaTimes size={12} />
          </button>
        )}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
          <FaCrown className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No team leaders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((leader, i) => (
            <div
              key={leader.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden animate-[fadeInUp_0.4s_ease-out_both]"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${leader.gradient}`} />
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${leader.gradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                      {leader.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFD400] rounded-full flex items-center justify-center shadow">
                      <FaCrown size={9} className="text-gray-900" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-gray-800 truncate text-sm">{leader.name}</p>
                      <MdVerified className="text-blue-500 flex-shrink-0" size={14} />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{leader.phone}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-2 py-0.5 bg-[#FFD400]/10 text-yellow-700 rounded-full border border-[#FFD400]/20">
                      <FaStar size={8} /> Team Leader
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { label: "Balance",      val: `৳${fmt(leader.balance)}`,    icon: FaWallet,            color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Trainers",     val: leader.trainersCount,          icon: MdSupervisorAccount, color: "text-blue-500",    bg: "bg-blue-50"    },
                    { label: "Total Ref.",   val: fmt(leader.totalReferral),     icon: MdTrendingUp,        color: "text-purple-500",  bg: "bg-purple-50"  },
                    { label: "Monthly Ref.", val: fmt(leader.monthlyReferral),   icon: FaUsers,             color: "text-pink-500",    bg: "bg-pink-50"    },
                  ].map(({ label, val, icon: Icon, color, bg }) => (
                    <div key={label} className={`${bg} rounded-xl p-2.5 flex items-center gap-2`}>
                      <Icon size={13} className={color} />
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-400 leading-none">{label}</p>
                        <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">{val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mb-4 text-xs text-gray-400">
                  <FaCalendarAlt size={10} />
                  <span>Joined {fmtDate(leader.joinDate)}</span>
                  <span className="mx-1">•</span>
                  <span>TL since {fmtDate(leader.teamLeaderDate)}</span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/88${leader.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-9 h-9 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition-colors"
                  >
                    <FaWhatsapp size={15} />
                  </a>
                  <button
                    onClick={() => setDetailTarget(leader)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100 hover:bg-[#FFD400] text-gray-600 hover:text-gray-900 text-xs font-semibold transition-all duration-200 group/btn"
                  >
                    View Details
                    <FaChevronRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {detailTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-[fadeInUp_0.25s_ease-out] max-h-[90vh] flex flex-col">

            <div className={`bg-gradient-to-r ${detailTarget.gradient} p-5 flex-shrink-0`}>
              <button
                onClick={() => setDetailTarget(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition"
              >
                <FaTimes size={13} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg">
                  {detailTarget.initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-bold text-base">{detailTarget.name}</p>
                    <MdVerified className="text-white/80" size={15} />
                  </div>
                  <p className="text-white/70 text-xs">{detailTarget.phone}</p>
                  <p className="text-white/70 text-xs">{detailTarget.email}</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold px-2 py-0.5 bg-[#FFD400] text-gray-900 rounded-full">
                    <FaCrown size={8} /> Team Leader
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-5 space-y-5">
              <div>
                <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-3">Performance Stats</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Balance",          val: `৳${fmt(detailTarget.balance)}`       },
                    { label: "Under Trainers",   val: detailTarget.trainersCount             },
                    { label: "Total Referrals",  val: fmt(detailTarget.totalReferral)        },
                    { label: "Monthly Referrals",val: fmt(detailTarget.monthlyReferral)      },
                    { label: "Total Earnings",   val: `৳${fmt(detailTarget.totalEarnings)}`  },
                    { label: "Status",           val: "Active ✓"                             },
                  ].map(({ label, val }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <p className="text-[10px] text-white/30 uppercase tracking-wider">{label}</p>
                      <p className="text-sm font-bold text-white mt-1">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-3">Journey Timeline</p>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  {/* ✅ color → bgColor, iconColor আলাদা prop */}
                  <TimelineItem
                    icon={FaUserCheck}
                    bgColor="bg-blue-500"
                    iconColor="text-white"
                    label="Joined EarnSelf"
                    date={detailTarget.joinDate}
                  />
                  <TimelineItem
                    icon={FaStar}
                    bgColor="bg-purple-500"
                    iconColor="text-white"
                    label="Became Premium"
                    date={detailTarget.premiumDate}
                  />
                  <TimelineItem
                    icon={FaUserShield}
                    bgColor="bg-emerald-500"
                    iconColor="text-white"
                    label="Promoted to Trainer"
                    date={detailTarget.trainerDate}
                  />
                  {/* ✅ আর !text-gray-900 নেই — bgColor + iconColor আলাদা */}
                  <TimelineItem
                    icon={FaCrown}
                    bgColor="bg-yellow-400"
                    iconColor="text-gray-900"
                    label="Became Team Leader"
                    date={detailTarget.teamLeaderDate}
                    isLast
                  />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 p-4 border-t border-white/10 flex gap-3">
              <button
                onClick={() => setDetailTarget(null)}
                className="flex-1 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-semibold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (detailTarget) setRemoveTarget(detailTarget);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-sm font-semibold border border-red-500/20 transition-colors"
              >
                <FaUserMinus size={13} />
                Remove as TL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Remove Modal */}
      {removeTarget !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl p-6 animate-[fadeInUp_0.2s_ease-out]">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                <FaExclamationTriangle className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Remove Team Leader?</h3>
              <p className="text-white/40 text-sm mb-1">You are about to remove</p>
              <p className="text-[#FFD400] font-bold text-base mb-1">{removeTarget.name}</p>
              <p className="text-white/40 text-sm mb-5">
                from the Team Leader role. This will demote them but not delete their account.
              </p>

              <div className="w-full bg-white/5 rounded-2xl p-3 border border-white/10 mb-5 text-left space-y-1.5">
                <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-2">What will happen:</p>
                {[
                  "Team Leader badge will be removed",
                  `${removeTarget.trainersCount} trainers will be unassigned`,
                  "Account remains active as Trainer",
                  "Earnings and history preserved",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setRemoveTarget(null)}
                  className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemove}
                  className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <FaUserMinus size={13} />
                  Yes, Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}