"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdPeople,
  MdWorkspacePremium,
  MdSupervisorAccount,
  MdBarChart,
  MdSettings,
  MdClose,
} from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

const navItems = [
  { href: "/Admin_Dashbord",           label: "Dashboard",     icon: MdDashboard        },
  { href: "/Admin_Dashbord/All_User",     label: "All Users",     icon: MdPeople           },
  { href: "/Admin_Dashbord/Premium_User",   label: "Premium Users", icon: MdWorkspacePremium },
  { href: "/Admin_Dashbord/Trainers",  label: "Trainers",      icon: MdSupervisorAccount},
  { href: "/Admin_Dashbord/Team_Leader",  label: "Team Leader",      icon: MdSupervisorAccount},
  { href: "/Admin_Dashbord/Cash_Out",   label: "Cash Out",      icon: FaMoneyBillWave    },
  { href: "/Admin_Dashbord/Course_Analytics", label: "Course Analytics",     icon: MdBarChart         },
  { href: "/Admin_Dashbord/settings",  label: "Settings",      icon: MdSettings         },
];

export default function AdminSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-[240px]
          bg-[#1a1a1a] text-white flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:flex-shrink-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦋</span>
            <span className="space text-xl font-bold">
              Earn<span className="text-[#ffee57]">Self</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white transition">
            <MdClose size={20} />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-5 py-3 border-b border-white/10">
          <span className="text-[10px] uppercase tracking-widest text-[#ffee57] font-semibold">
            Admin Panel
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/Admin_Dashbord" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                    ? "bg-[#ffee57] text-[#1a1a1a]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"}
                `}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-[#1a1a1a]" : "text-white/50 group-hover:text-white"}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <p className="text-[11px] text-white/30">EarnSelf Admin v1.0</p>
        </div>
      </aside>
    </>
  );
}
