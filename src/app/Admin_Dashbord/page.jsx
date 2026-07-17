"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MdPeople, MdWorkspacePremium, MdSupervisorAccount,
  MdBarChart, MdAccountBalanceWallet, MdCheckCircle,
  MdCancel, MdPending, MdTrendingUp, MdShare,
} from "react-icons/md";
import {
  FaMoneyBillWave, FaUserShield,
  FaCalendarDay, FaCalendarWeek, FaCalendarAlt,
  FaBolt, FaArrowRight, FaChartLine,
} from "react-icons/fa";
import { IoRefreshOutline } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";

/* ─────────────────────────────────────────
   Animated Counter Hook
───────────────────────────────────────── */
function useCounter(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return count;
}

/* ─────────────────────────────────────────
   StatCard
───────────────────────────────────────── */
function StatCard({ label, value, icon: Icon, bg, color, trend, prefix = "" }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const animated = useCounter(visible ? value : 0, 1500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative bg-white rounded-2xl p-4 border border-gray-100
        shadow-sm hover:shadow-md hover:-translate-y-1
        transition-all duration-300 overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
        bg-gradient-to-r from-transparent via-white/40 to-transparent
        transition-transform duration-700 ease-in-out pointer-events-none" />

      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center
          group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={18} className={color} />
        </div>
        {trend && (
          <span className="flex items-center gap-0.5 text-[10px] font-semibold
            text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full">
            <FaChartLine size={8} /> +{trend}%
          </span>
        )}
      </div>

      <p className="text-[22px] font-extrabold text-gray-800 leading-none mb-1">
        {prefix}{animated.toLocaleString("en-BD")}
      </p>

      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide truncate">
        {label}
      </p>

      <div className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full
        transition-all duration-500 rounded-b-2xl ${bg.replace("-100", "-400")}`} />
    </div>
  );
}

/* ─────────────────────────────────────────
   LiveClock — client-only, hydration safe
───────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState(null); // ← null on first render

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Don't render anything until client hydration is done
  if (!time) return null;

  return (
    <span className="font-mono text-xs text-gray-400 tracking-widest">{time}</span>
  );
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const stats = [
  { label: "Total Users",      value: 1284,  icon: MdPeople,               bg: "bg-blue-100",    color: "text-blue-500",    trend: 12 },
  { label: "Premium Users",    value: 342,   icon: MdWorkspacePremium,     bg: "bg-purple-100",  color: "text-purple-500",  trend: 8  },
  { label: "Total Trainers",   value: 38,    icon: MdSupervisorAccount,    bg: "bg-cyan-100",    color: "text-cyan-500",    trend: 5  },
  { label: "Today's Users",    value: 24,    icon: FaCalendarDay,          bg: "bg-green-100",   color: "text-green-500"              },
  { label: "Last 7 Days",      value: 163,   icon: FaCalendarWeek,         bg: "bg-teal-100",    color: "text-teal-500"               },
  { label: "Last 30 Days",     value: 598,   icon: FaCalendarAlt,          bg: "bg-indigo-100",  color: "text-indigo-500"             },
  { label: "Pending Cashout",  value: 17,    icon: MdPending,              bg: "bg-yellow-100",  color: "text-yellow-600"             },
  { label: "Approved Cashout", value: 215,   icon: MdCheckCircle,          bg: "bg-green-100",   color: "text-green-500",   trend: 3  },
  { label: "Rejected Cashout", value: 9,     icon: MdCancel,               bg: "bg-red-100",     color: "text-red-500"                },
  { label: "Total Earnings",   value: 54820, icon: FaMoneyBillWave,        bg: "bg-emerald-100", color: "text-emerald-600", prefix: "৳", trend: 15 },
  { label: "Monthly Earnings", value: 6340,  icon: MdBarChart,             bg: "bg-orange-100",  color: "text-orange-500",  prefix: "৳" },
  { label: "Total Referral",   value: 3201,  icon: MdShare,                bg: "bg-pink-100",    color: "text-pink-500",    trend: 20 },
  { label: "Monthly Referral", value: 412,   icon: MdTrendingUp,           bg: "bg-rose-100",    color: "text-rose-500"               },
  { label: "Total Cashout",    value: 48200, icon: MdAccountBalanceWallet, bg: "bg-violet-100",  color: "text-violet-500",  prefix: "৳" },
];

const activityTypes = {
  join:    { dot: "bg-blue-500",   badge: "bg-blue-50 text-blue-600 border-blue-100",      label: "Joined"   },
  premium: { dot: "bg-purple-500", badge: "bg-purple-50 text-purple-600 border-purple-100", label: "Premium"  },
  cashout: { dot: "bg-yellow-500", badge: "bg-yellow-50 text-yellow-600 border-yellow-100", label: "Cashout"  },
  trainer: { dot: "bg-cyan-500",   badge: "bg-cyan-50 text-cyan-600 border-cyan-100",       label: "Trainer"  },
  approve: { dot: "bg-green-500",  badge: "bg-green-50 text-green-600 border-green-100",    label: "Approved" },
  delete:  { dot: "bg-red-500",    badge: "bg-red-50 text-red-600 border-red-100",          label: "Deleted"  },
};

const recentActivity = [
  { id: 1, message: "Nusrat Jahan joined EarnSelf",     time: "2 min ago",  type: "join"    },
  { id: 2, message: "Sabbir Hossain activated Premium", time: "15 min ago", type: "premium" },
  { id: 3, message: "Rion requested cashout ৳500",      time: "30 min ago", type: "cashout" },
  { id: 4, message: "Sakib promoted to Trainer",        time: "1 hr ago",   type: "trainer" },
  { id: 5, message: "Cashout #204 approved — ৳750",     time: "2 hrs ago",  type: "approve" },
  { id: 6, message: "User account #98 was deleted",     time: "3 hrs ago",  type: "delete"  },
  { id: 7, message: "Mahfuz Rahman joined EarnSelf",    time: "5 hrs ago",  type: "join"    },
  { id: 8, message: "Tania Akter activated Premium",    time: "6 hrs ago",  type: "premium" },
];

const quickActions = [
  { label: "Add Trainer",      href: "/Admin_Dashbord/Trainers",         icon: FaUserShield,       bg: "from-cyan-500 to-cyan-600"     },
  { label: "View Users",       href: "/Admin_Dashbord/All_User",         icon: MdPeople,           bg: "from-blue-500 to-blue-600"     },
  { label: "Cashout Requests", href: "/Admin_Dashbord/Cash_Out",         icon: FaMoneyBillWave,    bg: "from-yellow-500 to-amber-500"  },
  { label: "Premium Requests", href: "/Admin_Dashbord/Premium_User",     icon: MdWorkspacePremium, bg: "from-purple-500 to-purple-600" },
  { label: "Analytics",        href: "/Admin_Dashbord/Course_Analytics", icon: MdBarChart,         bg: "from-emerald-500 to-green-600" },
];

const courses = [
  { id: 1, title: "Digital Marketing Masterclass",    category: "Marketing", students: 342, rating: 4.8, color: "from-blue-500 to-blue-600"    },
  { id: 2, title: "Freelancing with Fiverr & Upwork", category: "Freelance", students: 289, rating: 4.9, color: "from-purple-500 to-purple-600" },
  { id: 3, title: "Facebook Ads & Lead Generation",   category: "Marketing", students: 215, rating: 4.7, color: "from-pink-500 to-rose-500"     },
  { id: 4, title: "Graphic Design with Canva Pro",    category: "Design",    students: 178, rating: 4.6, color: "from-orange-500 to-amber-500"  },
  { id: 5, title: "YouTube Channel Growth Guide",     category: "Content",   students: 256, rating: 4.8, color: "from-red-500 to-red-600"       },
  { id: 6, title: "SEO & Content Writing Basics",     category: "SEO",       students: 134, rating: 4.5, color: "from-teal-500 to-cyan-500"     },
  { id: 7, title: "Affiliate Marketing A-Z",          category: "Earning",   students: 301, rating: 4.9, color: "from-emerald-500 to-green-600" },
  { id: 8, title: "Video Editing with CapCut",        category: "Design",    students: 192, rating: 4.7, color: "from-violet-500 to-purple-600" },
];

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function AdminDashboardPage() {
  const [refreshed, setRefreshed] = useState(false);
  const [mounted, setMounted] = useState(false); // ← hydration guard

  // ✅ Only run on client — avoids server/client date mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const today = mounted
    ? new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""; // ← empty string on server render

  const handleRefresh = () => {
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 1000);
  };

  return (
    <div className="space-y-7">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <HiSparkles className="text-[#FFD400] text-lg" />
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          </div>
          {/* ✅ Only show date after mount to avoid hydration mismatch */}
          {mounted && (
            <p className="text-sm text-gray-400">{today}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs font-semibold text-green-600">Live</span>
            {/* ✅ LiveClock returns null until mounted */}
            <LiveClock />
          </div>

          {/* ✅ suppressHydrationWarning on the button fixes className mismatch */}
          <button
            suppressHydrationWarning
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-white border border-gray-100 shadow-sm
              hover:shadow-md hover:border-[#FFD400]/50 transition-all duration-200 group"
          >
            <IoRefreshOutline
              size={18}
              className={`text-gray-500 group-hover:text-[#FFD400] transition-colors
                ${refreshed ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1F2937] via-[#2d3748] to-[#1F2937] p-6 text-white shadow-lg">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD400]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">
              Platform Summary
            </p>
            <h2 className="text-xl font-bold">
              Welcome back, <span className="text-[#FFD400]">Admin</span> 👋
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              You have{" "}
              <span className="text-yellow-400 font-semibold">17 pending cashouts</span> and{" "}
              <span className="text-blue-400 font-semibold">24 new users</span> today.
            </p>
          </div>

          <div className="flex gap-4 sm:gap-6">
            {[
              { label: "Revenue",   val: "৳54.8K", up: true  },
              { label: "Referrals", val: "3,201",  up: true  },
              { label: "Pending",   val: "17",      up: false },
            ].map(({ label, val, up }) => (
              <div key={label} className="text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
                <p className="text-lg font-extrabold text-white">{val}</p>
                <p className={`text-[10px] font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                  {up ? "▲ Growing" : "▼ Action needed"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FaBolt className="text-[#FFD400] text-sm" />
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Key Metrics</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div key={s.label} style={{ animationDelay: `${i * 50}ms` }} className="animate-[fadeInUp_0.5s_ease-out_both]">
              <StatCard {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Available Courses ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MdBarChart className="text-[#FFD400] text-lg" />
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Available Courses
            </h2>
            <span className="ml-1 px-2 py-0.5 bg-[#FFD400] text-gray-900 text-xs font-bold rounded-full">
              25
            </span>
          </div>
          <Link
            href="/Admin_Dashbord/Course_Analytics"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#FFD400] transition-colors"
          >
            View all <FaArrowRight size={9} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course, i) => (
            <div
              key={course.id}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm
                hover:shadow-md hover:-translate-y-1 transition-all duration-300
                overflow-hidden animate-[fadeInUp_0.5s_ease-out_both] cursor-pointer"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${course.color}`} />
              <div className="p-4">
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 bg-gradient-to-r ${course.color} text-white`}>
                  {course.category}
                </span>
                <p className="text-sm font-semibold text-gray-800 leading-snug mb-3 line-clamp-2 min-h-[40px]">
                  {course.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MdPeople size={13} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <svg key={si} className={`w-3 h-3 ${si < Math.floor(course.rating) ? "text-[#FFD400]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-[10px] text-gray-400 ml-0.5">{course.rating}</span>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 pt-0">
                <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300">
                  <button className={`w-full h-8 text-xs font-semibold text-white rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center gap-1`}>
                    Manage Course <FaArrowRight size={9} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* +17 more */}
          <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2
            border-dashed border-gray-200 hover:border-[#FFD400]/50 hover:bg-yellow-50/30
            transition-all duration-300 flex flex-col items-center justify-center p-6
            cursor-pointer min-h-[140px]">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
              <span className="text-lg font-bold text-[#FFD400]">+</span>
            </div>
            <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">17 more courses</p>
            <Link href="/Admin_Dashbord/Course_Analytics" className="text-xs text-gray-400 hover:text-[#FFD400] transition-colors mt-1">
              View all →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Activity + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FFD400] rounded-full inline-block" />
              Recent Activity
            </h2>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">Newest first</span>
          </div>
          <ul className="space-y-1">
            {recentActivity.map((item, i) => {
              const cfg = activityTypes[item.type];
              return (
                <li key={item.id} style={{ animationDelay: `${i * 60}ms` }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group animate-[fadeInUp_0.4s_ease-out_both]">
                  <span className="relative flex-shrink-0 flex h-2.5 w-2.5">
                    {i === 0 && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-60`} />}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cfg.dot}`} />
                  </span>
                  <p className="flex-1 text-sm text-gray-700 truncate group-hover:text-gray-900">{item.message}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badge} flex-shrink-0`}>{cfg.label}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0 min-w-[56px] text-right">{item.time}</span>
                </li>
              );
            })}
          </ul>
          <Link href="/Admin_Dashbord/Notifications"
            className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-[#FFD400] transition-colors py-2">
            View all activity <FaArrowRight size={10} />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <span className="w-1.5 h-4 bg-[#FFD400] rounded-full inline-block" />
            Quick Actions
          </h2>
          <div className="space-y-2.5 flex-1">
            {quickActions.map(({ label, href, icon: Icon, bg }, i) => (
              <Link key={href} href={href} style={{ animationDelay: `${i * 70}ms` }}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100
                  hover:border-[#FFD400]/30 hover:shadow-sm hover:bg-yellow-50/40
                  transition-all duration-200 group animate-[fadeInUp_0.4s_ease-out_both]">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
                <span className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#FFD400] flex items-center justify-center transition-all duration-200">
                  <FaArrowRight size={11} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">All systems operational</p>
            <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}