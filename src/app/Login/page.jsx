"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPhone, FaLock, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaShieldAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { MdAdminPanelSettings, MdSecurity } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { IoRefreshOutline } from "react-icons/io5";

// ─── Hardcoded admin credentials ──────────────────────────────────────────────
const ADMIN = {
  name:       "K M SHAHRIEAR AL AMIN",
  phone:      "01788869780",
  email:      "krion8201@gmail.com",
  secretCode: "1318",
};

// ─── Generate a 6-digit OTP ───────────────────────────────────────────────────
const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));

// ─── Simple math CAPTCHA ──────────────────────────────────────────────────────
function useCaptcha() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const refresh = () => {
    setA(Math.floor(Math.random() * 9) + 1);
    setB(Math.floor(Math.random() * 9) + 1);
  };
  useEffect(() => { refresh(); }, []);
  return { question: `${a} + ${b} = ?`, answer: String(a + b), refresh };
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold text-white w-max max-w-[90vw] text-center animate-[fadeInDown_0.3s_ease-out]
      ${toast.type === "success" ? "bg-green-500" : toast.type === "warning" ? "bg-orange-500" : "bg-red-500"}`}>
      {toast.msg}
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepDot({ step, current, label }) {
  const done   = current > step;
  const active = current === step;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
        ${done   ? "bg-green-500 border-green-500 text-white"
        : active ? "bg-[#ffee57] border-[#ffee57] text-[#1a1a1a]"
                 : "bg-transparent border-white/20 text-white/30"}`}>
        {done ? <FaCheckCircle size={12} /> : step}
      </div>
      <span className={`text-[9px] font-medium hidden sm:block ${active ? "text-[#ffee57]" : done ? "text-green-400" : "text-white/30"}`}>
        {label}
      </span>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
export default function LoginPage() {
  const router = useRouter();

  // ── Normal user login state ───────────────────────────────────────────────
  const [form,     setForm]     = useState({ phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [toast,    setToast]    = useState(null);

  // ── Admin modal state ─────────────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [step,      setStep]      = useState(1); // 1=info, 2=otp, 3=captcha
  const [adminForm, setAdminForm] = useState({ name: "", phone: "", email: "", secret: "" });
  const [otp,       setOtp]       = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [sendingOtp,   setSendingOtp]   = useState(false);
  const [otpSent,      setOtpSent]      = useState(false);
  const [verifying,    setVerifying]    = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const captcha = useCaptcha();
  const otpRefs = useRef([]);

  const showToast = (msg, type = "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Normal login ──────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!form.phone || form.phone.length < 11) return showToast("Enter a valid phone number");
    if (!form.password || form.password.length < 6) return showToast("Password must be at least 6 characters");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Logged in successfully ✅", "success");
    }, 1500);
  };

  // ── Open admin modal ──────────────────────────────────────────────────────
  const openAdminModal = () => {
    setAdminForm({ name: "", phone: "", email: "", secret: "" });
    setOtp(["", "", "", "", "", ""]);
    setGeneratedOtp("");
    setOtpSent(false);
    setSendingOtp(false);
    setVerifying(false);
    setCaptchaInput("");
    captcha.refresh();
    setStep(1);
    setModalOpen(true);
  };

  // ── Step 1: validate info + send OTP ──────────────────────────────────────
  const handleSendOtp = async () => {
    const f = adminForm;
    if (f.name.trim().toLowerCase()  !== ADMIN.name.toLowerCase())  return showToast("Admin name doesn't match");
    if (f.phone.trim()               !== ADMIN.phone)               return showToast("Admin phone doesn't match");
    if (f.email.trim().toLowerCase() !== ADMIN.email.toLowerCase()) return showToast("Admin email doesn't match");
    if (f.secret.trim()              !== ADMIN.secretCode)          return showToast("Secret code is incorrect");

    setSendingOtp(true);
    const code = generateOTP();
    setGeneratedOtp(code);

    // ── EmailJS integration ──
    // Replace YOUR_SERVICE_ID / YOUR_TEMPLATE_ID / YOUR_PUBLIC_KEY
    // Template variables: {{to_email}}, {{otp_code}}, {{admin_name}}
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  "service_cj82jau",
          template_id: "template_hye4jdt",
          user_id:     "tK8oSohrTsbsXsqba",
          template_params: {
            to_email:   ADMIN.email,
            otp_code:   code,
            admin_name: ADMIN.name,
          },
        }),
      });
      showToast(`OTP sent to ${ADMIN.email} ✅`, "success");
    } catch {
      // EmailJS not configured yet — show OTP in toast for local dev
      showToast(`[DEV] OTP: ${code}`, "warning");
    }

    setSendingOtp(false);
    setOtpSent(true);
    setStep(2);
  };

  // ── OTP input handlers ────────────────────────────────────────────────────
  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleOtpPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(""));
      otpRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  // ── Step 2: verify OTP ────────────────────────────────────────────────────
  const handleVerifyOtp = () => {
    const entered = otp.join("");
    if (entered.length < 6) return showToast("Enter all 6 digits");
    if (entered !== generatedOtp) return showToast("Incorrect OTP. Try again.");
    showToast("OTP verified ✅", "success");
    captcha.refresh();
    setCaptchaInput("");
    setStep(3);
  };

  // ── Step 3: verify CAPTCHA + login ────────────────────────────────────────
  const handleAdminLogin = () => {
    if (!captchaInput.trim()) return showToast("Solve the CAPTCHA first");
    if (captchaInput.trim() !== captcha.answer) {
      showToast("Wrong CAPTCHA answer");
      captcha.refresh();
      setCaptchaInput("");
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setModalOpen(false);
      showToast("Admin login successful ✅", "success");
      setTimeout(() => router.push("/Admin_Dashbord"), 800);
    }, 1200);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 py-10">
      <Toast toast={toast} />

      {/* ═══════════════════════════════════════
          ADMIN MODAL
      ═══════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-[fadeInUp_0.3s_ease-out]">

            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#1a1a1a] to-[#242424] px-6 pt-6 pb-4 border-b border-white/10">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
              >
                <FaTimes size={13} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffee57] flex items-center justify-center">
                  <MdAdminPanelSettings size={20} className="text-[#1a1a1a]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Admin Verification</p>
                  <p className="text-white/40 text-[11px]">Secure multi-step authentication</p>
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2">
                {[
                  { n: 1, label: "Identity" },
                  { n: 2, label: "OTP"      },
                  { n: 3, label: "CAPTCHA"  },
                ].map(({ n, label }, i) => (
                  <div key={n} className="flex items-center gap-2 flex-1">
                    <StepDot step={n} current={step} label={label} />
                    {i < 2 && (
                      <div className={`flex-1 h-px transition-colors duration-500 ${step > n ? "bg-green-500" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-5">

              {/* ── STEP 1: Identity ── */}
              {step === 1 && (
                <div className="space-y-4 animate-[fadeInUp_0.25s_ease-out]">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Step 1 — Verify your identity</p>

                  {/* Name */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Admin Full Name</label>
                    <div className="flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border border-white/5 focus-within:border-[#ffee57]/40 transition">
                      <FaUser className="text-[#ffee57] text-xs flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Enter admin full name"
                        value={adminForm.name}
                        onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                        className="w-full py-3 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Admin Phone Number</label>
                    <div className="flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border border-white/5 focus-within:border-[#ffee57]/40 transition">
                      <FaPhone className="text-[#ffee57] text-xs flex-shrink-0" />
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={adminForm.phone}
                        onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                        className="w-full py-3 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Email + Send Code button */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Admin Email</label>
                    <div className="flex items-center gap-2 bg-[#242424] rounded-2xl px-4 border border-white/5 focus-within:border-[#ffee57]/40 transition">
                      <FaEnvelope className="text-[#ffee57] text-xs flex-shrink-0" />
                      <input
                        type="email"
                        placeholder="admin@email.com"
                        value={adminForm.email}
                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                        className="flex-1 py-3 bg-transparent text-sm text-white placeholder-gray-600 outline-none min-w-0"
                      />
                    </div>
                  </div>

                  {/* Secret code */}
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Admin Secret Code</label>
                    <div className="flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border border-white/5 focus-within:border-[#ffee57]/40 transition">
                      <FaShieldAlt className="text-[#ffee57] text-xs flex-shrink-0" />
                      <input
                        type="password"
                        placeholder="••••"
                        value={adminForm.secret}
                        onChange={(e) => setAdminForm({ ...adminForm, secret: e.target.value })}
                        className="w-full py-3 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="w-full py-3.5 rounded-2xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-extrabold transition shadow-lg shadow-yellow-500/20 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                  >
                    {sendingOtp
                      ? <><span className="w-4 h-4 border-2 border-[#1a1a1a]/40 border-t-[#1a1a1a] rounded-full animate-spin" /> Sending OTP...</>
                      : <><FaEnvelope size={13} /> Send OTP to Email</>}
                  </button>
                </div>
              )}

              {/* ── STEP 2: OTP ── */}
              {step === 2 && (
                <div className="space-y-5 animate-[fadeInUp_0.25s_ease-out]">
                  <div>
                    <p className="text-xs text-white/40 font-medium uppercase tracking-widest mb-1">Step 2 — Enter OTP</p>
                    <p className="text-xs text-gray-500">
                      A 6-digit code was sent to{" "}
                      <span className="text-[#ffee57] font-semibold">{ADMIN.email}</span>
                    </p>
                  </div>

                  {/* 6-box OTP input */}
                  <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className={`w-11 h-12 text-center text-lg font-bold rounded-xl bg-[#242424] border text-white outline-none transition-all
                          ${digit ? "border-[#ffee57]/60 text-[#ffee57]" : "border-white/10"}
                          focus:border-[#ffee57]/80 focus:scale-105`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    className="w-full py-3.5 rounded-2xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-extrabold transition shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle size={13} /> Verify OTP
                  </button>

                  <button
                    onClick={() => { setStep(1); setOtpSent(false); setOtp(["","","","","",""]); }}
                    className="w-full text-xs text-white/30 hover:text-white/60 transition text-center py-1"
                  >
                    ← Back to identity step
                  </button>
                </div>
              )}

              {/* ── STEP 3: CAPTCHA ── */}
              {step === 3 && (
                <div className="space-y-5 animate-[fadeInUp_0.25s_ease-out]">
                  <div>
                    <p className="text-xs text-white/40 font-medium uppercase tracking-widest mb-1">Step 3 — Human Verification</p>
                    <p className="text-xs text-gray-500">Solve the CAPTCHA to complete login</p>
                  </div>

                  {/* CAPTCHA box */}
                  <div className="bg-[#242424] rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MdSecurity size={20} className="text-[#ffee57]" />
                      <span className="text-white font-mono font-bold text-xl tracking-widest select-none">
                        {captcha.question}
                      </span>
                    </div>
                    <button
                      onClick={() => { captcha.refresh(); setCaptchaInput(""); }}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition"
                    >
                      <IoRefreshOutline size={15} />
                    </button>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Your Answer</label>
                    <input
                      type="number"
                      placeholder="Enter the answer"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                      className="w-full px-4 py-3 rounded-2xl bg-[#242424] border border-white/10 focus:border-[#ffee57]/60 text-white text-sm outline-none transition"
                    />
                  </div>

                  <button
                    onClick={handleAdminLogin}
                    disabled={verifying}
                    className="w-full py-3.5 rounded-2xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-extrabold transition shadow-lg shadow-yellow-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {verifying
                      ? <><span className="w-4 h-4 border-2 border-[#1a1a1a]/40 border-t-[#1a1a1a] rounded-full animate-spin" /> Logging in...</>
                      : <><MdAdminPanelSettings size={16} /> Login as Admin</>}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          MAIN LOGIN CARD
      ═══════════════════════════════════════ */}
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#ffee57] mb-4 shadow-lg shadow-yellow-500/20">
            <span className="text-3xl">🦋</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Earn<span className="text-[#ffee57]">Self</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Log in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 shadow-2xl">

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">Phone number</label>
            <div className={`flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border ${form.phone ? "border-[#ffee57]/40" : "border-white/5"} focus-within:border-[#ffee57]/60 transition`}>
              <FaPhone className="text-[#ffee57] text-sm flex-shrink-0" />
              <input
                type="tel"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full min-w-0 py-3.5 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <div className={`flex items-center gap-3 bg-[#242424] rounded-2xl px-4 border ${form.password ? "border-[#ffee57]/40" : "border-white/5"} focus-within:border-[#ffee57]/60 transition`}>
              <FaLock className="text-[#ffee57] text-sm flex-shrink-0" />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full min-w-0 py-3.5 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
              />
              <button onClick={() => setShowPass(!showPass)} className="text-gray-500 hover:text-gray-300 transition flex-shrink-0">
                {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
            <div className="text-right mt-2">
              <button className="text-xs text-[#ffee57] hover:underline">Forgot Password?</button>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#ffee57] hover:bg-yellow-300 text-[#1a1a1a] text-sm font-extrabold transition shadow-lg shadow-yellow-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <span className="w-4 h-4 border-2 border-[#1a1a1a]/40 border-t-[#1a1a1a] rounded-full animate-spin" />}
            {loading ? "Logging in..." : "Log in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Admin login trigger */}
          <button
            onClick={openAdminModal}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold border border-white/10 hover:border-[#ffee57]/30 transition group"
          >
            <MdAdminPanelSettings size={16} className="text-[#ffee57] group-hover:scale-110 transition" />
            Log in as Admin
          </button>
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link href="/Register" className="text-[#ffee57] font-semibold hover:underline">
            Register Now
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}