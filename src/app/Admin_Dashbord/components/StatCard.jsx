"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

export default function StatCard({ icon: Icon, label, value, prefix = "", suffix = "", color, bg, trend }) {
  const numericValue = typeof value === "number" ? value : parseInt(value) || 0;
  const animated = useCountUp(numericValue);

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 ${bg}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-800">
            {prefix}{animated.toLocaleString()}{suffix}
          </p>
          {trend !== undefined && (
            <p className={`text-xs mt-1 font-medium ${trend >= 0 ? "text-green-500" : "text-red-500"}`}>
              {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% this month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon size={22} className={color} />
        </div>
      </div>
    </div>
  );
}
