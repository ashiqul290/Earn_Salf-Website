"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaPhone, FaLock, FaEye, FaEyeSlash,
  FaUser, FaTag,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const steps = ["Personal Info", "Contact", "Security"];

export default function RegisterPage() {
  const [step, setStep]       = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading]  = useState(false);
  const [toast, setToast]      = useState(null);
  const [form, setForm]        = useState({
    name: "", phone: "", email: "",
    referral: "", password: "", confirm: "",
  });

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim()) return showToast("Please enter your name")|| false;
    }
    if (step === 1) {
      if (!form.phone || form.phone.length < 11) return showToast("Please enter a valid phone number") || false;
    }
    if (step === 2) {
      if (!form.password || form.password.length < 6) return showToast("Password must be at least 6 characters") || false;
      if (form.password !== form.confirm)              return showToast("Passwords do not match") || false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < steps.length - 1) { setStep(step + 1); return; }
    // Final submit
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Registration Successful ✅", "success");
    }, 1500);
  };

  return (
    <div className="space min-h-screen bg-[#111111] flex items-center justify-center px-4 py-10">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white w-max max-w-[90vw] text-center ${
          toast.type === "error" ? "bg-red-500" : "bg-green-500"
        }`}>
          {toast.msg}
        </div>
      )}

      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ffee57] mb-4 shadow-lg shadow-yellow-500/20">
            <span className="text-3xl">🦋</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Earn<span className="text-[#ffee57]">Self</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Create a New Account</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 shadow-2xl">

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-[#ffee57]" : "bg-white/10"
                }`} />
                <span className={`text-[10px] font-semibold transition-colors ${
                  i === step ? "text-[#ffee57]" : i < step ? "text-gray-500" : "text-gray-700"
                }`}>
                  {s}
                </span>
              </div>
            ))}
          </div>

          {/* Step 0 — Personal Info */}
          {step === 0 && (
            <div className="space-y-4">
              <Field
                label="Full Name"
                icon={<FaUser className="text-[#ffee57] text-sm" />}
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
              <Field
                label="Referral Code (Optional)"
                icon={<FaTag className="text-[#ffee57] text-sm" />}
                type="text"
                placeholder="Enter referral code"
                value={form.referral}
                onChange={(e) => set("referral", e.target.value)}
              />
            </div>
          )}

          {/* Step 1 — Contact */}
          {step === 1 && (
            <div className="space-y-4">
              <Field
                label="Phone Number"
                icon={<FaPhone className="text-[#ffee57] text-sm" />}
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
              <Field
                label="Email (Optional)"
                icon={<MdEmail className="text-[#ffee57] text-base" />}
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          )}

          {/* Step 2 — Security */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                <div className={`flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border ${
                  form.password ? "border-[#ffee57]/40" : "border-white/5"
                } focus-within:border-[#ffee57]/60 transition`}>
                  <FaLock className="text-[#ffee57] text-sm flex-shrink-0" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                    className="w-full min-w-0 py-3.5 bg-transparent text-sm text-white placeholder-gray-600"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="text-gray-500 hover:text-gray-300 transition flex-shrink-0">
                    {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                <div className={`flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border ${
                  form.confirm
                    ? form.confirm === form.password ? "border-green-500/40" : "border-red-500/40"
                    : "border-white/5"
                } focus-within:border-[#ffee57]/60 transition`}>
                  <FaLock className="text-[#ffee57] text-sm flex-shrink-0" />
                  <input
                    type={showConf ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => set("confirm", e.target.value)}
                    className="w-full min-w-0 py-3.5 bg-transparent text-sm text-white placeholder-gray-600"
                  />
                  <button onClick={() => setShowConf(!showConf)} className="text-gray-500 hover:text-gray-300 transition flex-shrink-0">
                    {showConf ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p className="text-xs text-red-400 mt-1.5">Passwords do not match</p>
                )}
                {form.confirm && form.confirm === form.password && (
                  <p className="text-xs text-green-400 mt-1.5">✓ Passwords do not match</p>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold border border-white/10 transition"
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 py-3.5 rounded-2xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-extrabold transition shadow-lg shadow-yellow-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-[#1a1a1a]/40 border-t-[#1a1a1a] rounded-full animate-spin" />
              )}
              {loading ? "Processing..." : step === steps.length - 1 ? "Register" : "Next →"}
            </button>
          </div>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/Login" className="text-[#ffee57] font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

// ── Reusable Field ─────────────────────────────────────────────────────────
function Field({ label, icon, value, onChange, type, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className={`flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border ${
        value ? "border-[#ffee57]/40" : "border-white/5"
      } focus-within:border-[#ffee57]/60 transition`}>
        <span className="flex-shrink-0">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full min-w-0 py-3.5 bg-transparent text-sm text-white placeholder-gray-600"
        />
      </div>
    </div>
  );
}