// ============================================================
// NOMADNESTS - Premium Real Estate Platform for Digital Nomads
// Single-Page React Application
// Tailwind CSS + Lucide-React + CSS Transitions
// ============================================================

import { useState, useEffect, useRef } from "react";
import {
  Wifi, Shield, Star, MapPin, MessageCircle, X, Send,
  Check, Globe, Users, Lock, Fingerprint, Zap, ChevronRight,
  Coffee, Clock, TrendingUp, Award, Bell, User, Menu,
  ChevronDown, ArrowRight, Laptop, Home, BadgeCheck,
  CreditCard, Gift, Headphones, Play
} from "lucide-react";
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #fafaf9; }
  h1,h2,h3,.font-display { font-family: 'Playfair Display', serif; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
    70%  { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
    100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
  }
  @keyframes toast-in {
    from { opacity: 0; transform: translateY(40px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-fade-up  { animation: fadeUp 0.7s ease both; }
  .animate-slide-in { animation: slideIn 0.5s ease both; }
  .animate-toast    { animation: toast-in 0.45s cubic-bezier(.22,1,.36,1) both; }
  .pulse-ring       { animation: pulse-ring 2s infinite; }
  .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.18); }
  .btn-primary {
    background: linear-gradient(135deg, #10b981, #059669);
    transition: all 0.25s ease;
  }
  .btn-primary:hover { background: linear-gradient(135deg, #059669, #047857); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(16,185,129,0.35); }
  .hero-bg {
    background-image: linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.35) 60%, rgba(250,250,249,1) 100%),
    url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop');
    background-size: cover; background-position: center 40%;
  }
  .glass { background: rgba(255,255,255,0.12); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.2); }
  .glass-dark { background: rgba(15,23,42,0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.08); }
  .mesh-bg {
    background: radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%),
                #fafaf9;
  }
  .partner-logo { filter: grayscale(100%) opacity(0.55); transition: filter 0.3s; }
  .partner-logo:hover { filter: grayscale(0%) opacity(1); }
  input:focus, select:focus { outline: none; }
`;

// ─── DATA ────────────────────────────────────────────────────
const LISTINGS = [
  {
    id: 1,
    title: "Goan Heritage Villa",
    location: "Assagao, Goa",
    price: "25,000",
    rating: 4.85,
    reviews: 142,
    wifi: "500 Mbps",
    desk: "Standing",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    badge: "Most Premium",
    community: 4.9,
    tags: ["Private Pool", "Beach Near"],
  },
  {
    id: 2,
    title: "Wayanad Forest Retreat",
    location: "Wayanad, Kerala",
    price: "18,000",
    rating: 4.92,
    reviews: 215,
    wifi: "600 Mbps",
    desk: "Dual Monitor",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    badge: "Nature Escape",
    community: 4.8,
    tags: ["Coffee Estate", "Yoga Deck"],
  },
  {
    id: 3,
    title: "Alibaug Private Estate",
    location: "Alibaug, Maharashtra",
    price: "15,000",
    rating: 4.79,
    reviews: 98,
    wifi: "400 Mbps",
    desk: "Standing",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    badge: "Most Affordable",
    community: 4.95,
    tags: ["Mansion", "Power Backup"],
  },
  {
    id: 4,
    title: "Coorg Coffee Estate",
    location: "Coorg, Karnataka",
    price: "10,000",
    rating: 4.88,
    reviews: 176,
    wifi: "350 Mbps",
    desk: "Standard",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80",
    badge: "Budget Pick",
    community: 4.7,
    tags: ["Tech Park", "Quiet Zone"],
  },
  {
    id: 5,
    title: "Varkala Cliff House",
    location: "Varkala, Kerala",
    price: "12,000",
    rating: 4.9,
    reviews: 84,
    wifi: "300 Mbps",
    desk: "Standing",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    badge: "Ocean Front",
    community: 4.6,
    tags: ["Surfing", "Cafes"],
  },
  {
    id: 6,
    title: "Rishikesh Himalayan Hub",
    location: "Rishikesh, Uttarakhand",
    price: "14,000",
    rating: 4.95,
    reviews: 310,
    wifi: "200 Mbps",
    desk: "Standard",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    badge: "Zen Focus",
    community: 4.9,
    tags: ["Yoga", "Mountains"],
  },
  {
    id: 7,
    title: "Jaipur Heritage Haweli",
    location: "Jaipur, Rajasthan",
    price: "19,000",
    rating: 4.88,
    reviews: 125,
    wifi: "450 Mbps",
    desk: "Dual Monitor",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    badge: "Luxury Pick",
    community: 4.7,
    tags: ["Royal", "Courtyard"],
  },
  {
    id: 8,
    title: "Auroville Eco Dome",
    location: "Pondicherry",
    price: "11,000",
    rating: 4.93,
    reviews: 289,
    wifi: "300 Mbps",
    desk: "Standing",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    badge: "Eco-Friendly",
    community: 4.95,
    tags: ["Forest", "Vegan"],
  },
];

const PLANS = [
  {
    name: "Basic",
    price: "Free",
    sub: "Always free",
    color: "bg-white border-slate-200",
    textColor: "text-slate-900",
    btnClass: "border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50",
    features: ["Browse all listings", "Save up to 5 favorites", "Basic filters", "Community forum access"],
    popular: false,
  },
  {
    name: "Pro Nomad",
    price: "₹299",
    sub: "per month",
    color: "bg-slate-900 border-slate-900",
    textColor: "text-white",
    btnClass: "btn-primary text-white",
    features: ["Unlimited bookings", "Priority Wi-Fi filter", "AI Concierge Nestor", "₹500 NestCredit/month", "Standing desk filter", "Early access listings"],
    popular: true,
  },
  {
    name: "Team Hub",
    price: "₹799",
    sub: "per month",
    color: "bg-white border-emerald-200",
    textColor: "text-slate-900",
    btnClass: "btn-primary text-white",
    features: ["Up to 8 team members", "Team sync dashboard", "Shared NestCredits pool", "Dedicated account manager", "Custom timezone alerts", "API access"],
    popular: false,
  },
];

const CITIES = [
  { name: "Bengaluru", country: "Karnataka", trend: "+67%", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&auto=format&fit=crop&q=80", color: "from-orange-500/80" },
  { name: "Mumbai", country: "Maharashtra", trend: "+58%", img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&auto=format&fit=crop&q=80", color: "from-slate-800/80" },
  { name: "Pune", country: "Maharashtra", trend: "+45%", img: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=400&auto=format&fit=crop&q=80", color: "from-rose-600/80" },
  { name: "Hyderabad", country: "Telangana", trend: "+52%", img: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=400&auto=format&fit=crop&q=80", color: "from-amber-600/80" },
  { name: "Chennai", country: "Tamil Nadu", trend: "+41%", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&auto=format&fit=crop", color: "from-purple-600/80" },
  { name: "Goa", country: "India", trend: "+82%", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&auto=format&fit=crop&q=80", color: "from-sky-600/80" },
];

const CHAT_SCRIPT = [
  { from: "bot", text: "Hey there! 👋 I'm Nestor, your AI Concierge. How can I help make your next stay exceptional?" },
  { from: "bot", text: "I can help with: booking airport transfers, co-working recommendations, or finding the perfect listing for your timezone." },
];

// ─── COMPONENT: TOAST ────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
      <div className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 border-none rounded-xl shadow-xl">
        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/50 hover:text-white transition-colors"><X size={14} /></button>
      </div>
    </div>
  );
}

// ─── COMPONENT: LOGIN MODAL (SECURITY SECTION) ───────────────
// SECURITY & TRUST START
function LoginModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); onClose(); }, 1800);
  };
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Shield size={20} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-slate-900">Secure Login</h3>
            <p className="text-xs text-slate-500">Protected by 256-bit TLS encryption</p>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1.5">Email Address</label>
            <input defaultValue="nomad@example.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1.5">Password</label>
            <input type="password" defaultValue="••••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-emerald-400 transition-colors" />
          </div>
        </div>
        <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-50 rounded-xl">
          <Fingerprint size={16} className="text-emerald-600 flex-shrink-0" />
          <span className="text-xs text-emerald-800">2FA verification will be sent to your device</span>
        </div>
        <button onClick={handleLogin} disabled={loading} className="btn-primary w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
          {loading ? (
            <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Authenticating…</span></>
          ) : (
            <><Lock size={16} /><span>Secure Login</span></>
          )}
        </button>
        <p className="text-center text-xs text-slate-400 mt-4">Verified by NomadNests Security Vault™</p>
      </div>
    </div>
  );
}
// SECURITY & TRUST END

// ─── COMPONENT: CHAT WIDGET (CRM STRATEGY) ───────────────────
// CRM STRATEGY START
function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(CHAT_SCRIPT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMsgs(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { from: "bot", text: "Great choice! I can arrange an Ola/Uber pickup for ₹800. Shall I book it for your arrival? 🚗✈️" }]);
    }, 1400);
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-slate-50 text-white shadow-2xl flex items-center justify-center pulse-ring transition-transform hover:scale-110"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-[100] w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-in">
          <div className="bg-slate-50 px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">N</div>
            <div>
              <p className="text-white font-semibold text-sm">Nestor</p>
              <p className="text-emerald-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />AI Concierge · Online</p>
            </div>
          </div>
          <div className="p-4 h-60 overflow-y-auto space-y-3 scrollbar-hide">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === "user" ? "bg-emerald-500 text-white rounded-br-sm" : "bg-slate-100 text-slate-800 rounded-bl-sm"
                }`}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                  {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {["Book Ola/Uber", "Co-working Cafes", "Local Tips"].map(s => (
              <button key={s} onClick={() => setInput(s)} className="flex-shrink-0 text-xs border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors whitespace-nowrap">{s}</button>
            ))}
          </div>
          <div className="p-4 pt-2 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask Nestor anything…" className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:border-emerald-400 transition-colors" />
            <button onClick={send} className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white flex-shrink-0"><Send size={15} /></button>
          </div>
        </div>
      )}
    </>
  );
}
// CRM STRATEGY END

// ─── COMPONENT: MOCK RAZORPAY MODAL ───────────────────────────
function RazorpayModal({ item, amount, onClose, onSuccess }) {
  const [tab, setTab] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [bank, setBank] = useState('');
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { onSuccess(); onClose(); }, 2200);
    }, 2500);
  };

  const tabs = [
    { id: 'upi', label: 'UPI' },
    { id: 'card', label: 'Card' },
    { id: 'netbanking', label: 'Net Banking' },
    { id: 'wallet', label: 'Wallets' },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[820px] flex overflow-hidden animate-fade-up" onClick={e => e.stopPropagation()} style={{minHeight: '480px'}}>

        {/* ── LEFT PANEL (Order Summary) ── */}
        <div className="w-72 flex-shrink-0 flex flex-col" style={{background: 'linear-gradient(160deg, #072654 0%, #0e3d6a 100%)'}}>
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center">
                <Zap size={14} className="text-[#02baff]" />
              </div>
              <span className="text-white font-bold text-sm tracking-wide">NomadNests</span>
            </div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">Amount Due</p>
            <p className="text-white text-3xl font-bold">₹{amount}</p>
          </div>
          {/* Order Details */}
          <div className="px-6 py-5 flex-1">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-3">Booking Summary</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">{item}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Duration</span>
                <span className="text-white/80">1 Month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">GST (18%)</span>
                <span className="text-white/80">Incl.</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between font-semibold text-sm">
                <span className="text-white/70">Total</span>
                <span className="text-emerald-400">₹{amount}</span>
              </div>
            </div>
            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              {['256-bit SSL Secured', 'PCI DSS Compliant', 'RBI Regulated'].map(b => (
                <div key={b} className="flex items-center gap-2 text-[10px] text-white/40">
                  <Check size={10} className="text-emerald-400 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
          {/* Razorpay branding */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#02baff]/20 flex items-center justify-center">
              <Zap size={10} className="text-[#02baff]" />
            </div>
            <span className="text-white/30 text-[10px]">Powered by <span className="text-[#02baff] font-bold">Razorpay</span></span>
          </div>
        </div>

        {/* ── RIGHT PANEL (Payment Methods) ── */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <p className="text-slate-900 font-semibold text-sm">Choose Payment Method</p>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
          </div>

          {success ? (
            /* Success Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5 animate-bounce">
                <Check size={36} className="text-emerald-500" strokeWidth={3} />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
              <p className="text-slate-500 text-sm mb-4">Your booking for <span className="font-semibold text-slate-700">{item}</span> is confirmed.</p>
              <div className="bg-emerald-50 rounded-xl px-6 py-3 text-emerald-700 font-semibold text-sm">
                ₹{amount} paid via {tab === 'upi' ? 'UPI' : tab === 'card' ? 'Card' : tab === 'netbanking' ? 'Net Banking' : 'Wallet'} 🎉
              </div>
              <p className="text-slate-400 text-xs mt-4">Booking confirmation sent to your email.</p>
            </div>
          ) : (
            <div className="flex flex-1 overflow-hidden">
              {/* Method Sidebar */}
              <div className="w-36 flex-shrink-0 border-r border-slate-100 py-4 bg-slate-50/50">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-all border-l-2 ${tab === t.id ? 'border-[#02baff] bg-white text-slate-900 shadow-sm' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/80'}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Form Area */}
              <div className="flex-1 p-6 flex flex-col overflow-y-auto">

                {/* UPI */}
                {tab === 'upi' && (
                  <div className="space-y-4 flex-1">
                    <p className="text-slate-900 font-semibold text-sm">Pay via UPI</p>
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">Enter UPI ID</label>
                      <input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#02baff] focus:ring-2 focus:ring-[#02baff]/10 transition-all outline-none" />
                    </div>
                    <p className="text-xs text-slate-400">Or pay using QR Code</p>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center gap-3 bg-slate-50">
                      <div className="grid grid-cols-5 gap-1">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className={`w-5 h-5 rounded-sm ${[0,1,5,10,12,14,20,24].includes(i) ? 'bg-slate-800' : Math.random() > 0.5 ? 'bg-slate-300' : 'bg-white'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">Scan with any UPI app</p>
                      <div className="flex gap-2">
                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                          <span key={app} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">{app}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Card */}
                {tab === 'card' && (
                  <div className="space-y-3 flex-1">
                    <p className="text-slate-900 font-semibold text-sm">Debit / Credit Card</p>
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">Card Number</label>
                      <input value={cardNo} onChange={e => setCardNo(e.target.value.replace(/\D/g,'').replace(/(\d{4})/g,'$1 ').trim().slice(0,19))} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-[#02baff] focus:ring-2 focus:ring-[#02baff]/10 transition-all outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-500 font-medium block mb-1.5">Expiry (MM/YY)</label>
                        <input value={cardExp} onChange={e => setCardExp(e.target.value)} placeholder="MM/YY" maxLength={5} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-[#02baff] focus:ring-2 focus:ring-[#02baff]/10 transition-all outline-none" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-medium block mb-1.5">CVV</label>
                        <input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,3))} placeholder="•••" maxLength={3} type="password" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-[#02baff] focus:ring-2 focus:ring-[#02baff]/10 transition-all outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-medium block mb-1.5">Name on Card</label>
                      <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="AVINASH KUMAR" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-[#02baff] focus:ring-2 focus:ring-[#02baff]/10 transition-all outline-none" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      {['VISA', 'MC', 'Rupay', 'AMEX'].map(n => (
                        <span key={n} className="text-[10px] border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">{n}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {tab === 'netbanking' && (
                  <div className="space-y-4 flex-1">
                    <p className="text-slate-900 font-semibold text-sm">Select Your Bank</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Yes Bank', 'PNB', 'Bank of Baroda'].map(b => (
                        <button key={b} onClick={() => setBank(b)} className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${bank === b ? 'border-[#02baff] bg-blue-50 text-slate-900' : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${bank === b ? 'bg-[#02baff]/20 text-[#02baff]' : 'bg-slate-100 text-slate-500'}`}>{b.slice(0,2)}</div>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wallets */}
                {tab === 'wallet' && (
                  <div className="space-y-4 flex-1">
                    <p className="text-slate-900 font-semibold text-sm">Choose Wallet</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Paytm Wallet', color: 'bg-blue-100 text-blue-700' },
                        { name: 'PhonePe Wallet', color: 'bg-purple-100 text-purple-700' },
                        { name: 'Amazon Pay', color: 'bg-orange-100 text-orange-700' },
                        { name: 'MobiKwik', color: 'bg-rose-100 text-rose-700' },
                        { name: 'Freecharge', color: 'bg-green-100 text-green-700' },
                      ].map(w => (
                        <button key={w.name} onClick={() => setWallet(w.name)} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all text-left ${wallet === w.name ? 'border-[#02baff] bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${w.color}`}>{w.name.slice(0,2)}</div>
                          <span className="text-slate-800">{w.name}</span>
                          {wallet === w.name && <Check size={14} className="text-[#02baff] ml-auto" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pay Button */}
                <button onClick={handlePay} disabled={loading}
                  className="mt-5 w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-80"
                  style={{background: loading ? '#02baff99' : 'linear-gradient(135deg, #02baff, #0278ff)'}}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Verifying Payment…</span></>
                  ) : (
                    <><Lock size={15} /><span>Pay ₹{amount} Securely</span></>
                  )}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                  <Shield size={9} /> Secured by Razorpay · 256-bit SSL
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function NomadNests() {
  const [showLogin, setShowLogin] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [wifiFilter, setWifiFilter] = useState("100Mbps+");
  const [deskFilter, setDeskFilter] = useState("Any");
  const [payment, setPayment] = useState(null); // { item, amount }

  const showToast = (msg) => setToast(msg);
  const openPayment = (item, amount) => setPayment({ item, amount });
  const closePayment = () => setPayment(null);
  const onPaymentSuccess = () => showToast("🎉 Booking Confirmed! Check your email for details.");

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── TOAST ── */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* ── PAYMENT MODAL ── */}
      {payment && <RazorpayModal item={payment.item} amount={payment.amount} onClose={closePayment} onSuccess={onPaymentSuccess} />}

      {/* ── LOGIN MODAL ── */}}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={() => showToast("🔐 Identity Authenticated via Secure Tunnel")} />}

      {/* ── CHAT WIDGET ── */}
      <ChatWidget />

      {/* ================================================================
          UI STRATEGY START — STICKY NAVBAR
      ================================================================ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
              <Home size={16} className="text-emerald-400" />
            </div>
            <span className="font-display text-xl font-bold text-slate-900 tracking-tight">NomadNests</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="#listings" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">Explore</a>
            <a href="#membership" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">Membership</a>
            <a href="#network" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">Network</a>
            <a href="#security" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">Security</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 px-4 py-2 rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition-all">
              <BadgeCheck size={15} className="text-emerald-500" />
              Verified Host
            </button>
            <button onClick={() => document.getElementById('membership').scrollIntoView({behavior:'smooth'})} className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hidden sm:block">
              Join Nomad Pass
            </button>
            <button onClick={() => setShowLogin(true)} className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all">
              <User size={16} />
            </button>
            <button className="md:hidden w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center" onClick={() => setMobileMenu(o=>!o)}>
              <Menu size={16} />
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 animate-fade-up">
            {["Explore","Membership","Network","Security"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMobileMenu(false)} className="block text-sm font-medium text-slate-700 py-2 border-b border-slate-50">{l}</a>
            ))}
            <button onClick={() => setShowLogin(true)} className="btn-primary w-full text-white text-sm font-semibold py-2.5 rounded-xl">Join Nomad Pass</button>
          </div>
        )}
      </nav>

      {/* ================================================================
          UI STRATEGY — HERO SECTION
      ================================================================ */}
      <section className="hero-bg min-h-[88vh] flex flex-col items-center justify-center px-4 pb-24 pt-20 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 glass text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Zap size={12} className="text-emerald-400" />
            2,400+ verified nomad-ready properties worldwide
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] mb-6">
            Your next base.<br />
            <span className="text-emerald-400">Perfectly wired.</span>
          </h1>
          <p className="text-white/75 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Find premium stays with blazing Wi-Fi, standing desks, and thriving co-working communities—curated for the remote-first life.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl">
              <MapPin size={16} className="text-emerald-500 flex-shrink-0" />
              <input placeholder="Where are you going?" className="text-sm text-slate-800 placeholder:text-slate-400 w-full bg-transparent" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl">
              <Wifi size={15} className="text-emerald-500 flex-shrink-0" />
              <select value={wifiFilter} onChange={e=>setWifiFilter(e.target.value)} className="text-sm text-slate-700 bg-transparent cursor-pointer">
                <option>100Mbps+</option>
                <option>200Mbps+</option>
                <option>500Mbps+</option>
                <option>Any Speed</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl">
              <Laptop size={15} className="text-emerald-500 flex-shrink-0" />
              <select value={deskFilter} onChange={e=>setDeskFilter(e.target.value)} className="text-sm text-slate-700 bg-transparent cursor-pointer">
                <option>Any Desk</option>
                <option>Standing</option>
                <option>Standard</option>
                <option>Dual Monitor</option>
              </select>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl max-w-[140px]">
              <Clock size={15} className="text-emerald-500 flex-shrink-0" />
              <input type="date" className="text-sm text-slate-400 bg-transparent outline-none cursor-pointer" />
            </div>
            <button className="btn-primary text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap">
              <span>Search</span><ArrowRight size={15} />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["🌊 Beach + Fiber","🏙️ City Hub","☕ Café Scene","🌿 Jungle Retreat"].map(t => (
              <button key={t} className="glass text-white/85 text-xs px-4 py-1.5 rounded-full hover:bg-white/20 transition-all">{t}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          UNIQUE FEATURE 1: LIVE STATS
      ================================================================ */}
      <section className="bg-slate-900 border-b border-white/5 py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { n: "2,400+", label: "Verified Spaces", icon: MapPin },
            { n: "18,000+", label: "Active Nomads", icon: Users },
            { n: "4.8/5", label: "Average Rating", icon: Star },
            { n: "24", label: "Indian Cities", icon: TrendingUp },
          ].map(s => (
            <div key={s.label} className="text-center flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-emerald-500/20 transition-colors flex items-center justify-center mb-3 text-emerald-400">
                <s.icon size={20} />
              </div>
              <h4 className="text-3xl font-display font-bold text-white mb-1 tracking-tight">{s.n}</h4>
              <p className="text-white/50 text-sm font-medium tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          MARKETING STRATEGY — TRENDING NOW
      ================================================================ */}
      <section className="py-14 bg-white" id="trending">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={20} className="text-emerald-500" />
            <h2 className="font-display text-2xl font-semibold text-slate-900">Trending Now</h2>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">Hot destinations this month</span>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {CITIES.map((city, i) => (
              <div key={i} className="flex-shrink-0 w-40 sm:w-48 rounded-2xl overflow-hidden cursor-pointer card-hover group relative">
                <img src={city.img} alt={city.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${city.color} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-semibold text-sm">{city.name}</p>
                  <p className="text-white/70 text-xs">{city.country}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp size={10} className="text-emerald-400" />
                    <span className="text-emerald-300 text-xs font-semibold">{city.trend} searches</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          UI STRATEGY — PROPERTY GRID
      ================================================================ */}
      <section id="listings" className="py-16 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Curated Stays</h2>
            <p className="text-slate-500 mb-6">Every listing vetted for the remote-work lifestyle</p>
            
            {/* UNIQUE FEATURE 2: ADVANCED FILTERS */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {[
                { icon: Shield, text: "24/7 Security" },
                { icon: Zap, text: "Power Backup" },
                { icon: MapPin, text: "Near Metro" },
                { icon: Coffee, text: "In-house Café" },
                { icon: Laptop, text: "Standing Desks" },
                { icon: Users, text: "Meeting Rooms" },
              ].map(f => (
                <button key={f.text} className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium text-slate-700">
                  <f.icon size={14} /> {f.text}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LISTINGS.map((l, i) => (
              <div key={l.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover">
                <div className="relative h-44 overflow-hidden">
                  <img src={l.image} alt={l.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/85 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <BadgeCheck size={10} className="text-emerald-400" />{l.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Wifi size={9} />{l.wifi}
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                      <Users size={9} className="text-emerald-400" /> {Math.floor(Math.random()*8)+3} viewing
                    </span>
                  </div>
                  
                  {/* UNIQUE FEATURE 3: VIRTUAL TOUR */}
                  <div className="absolute inset-0 bg-slate-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <button className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl hover:scale-105">
                      <Play size={12} className="fill-slate-900" /> 360° Tour
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-slate-900 text-base leading-tight mb-1">{l.title}</h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1 mb-3">
                    <MapPin size={10} />{l.location}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {l.tags.map(t => <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>)}
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{l.desk} Desk</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-emerald-400 fill-emerald-400" />
                      <span className="font-semibold text-slate-800">{l.rating}</span>
                      <span>({l.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={11} className="text-emerald-500" />
                      <span className="font-medium text-emerald-700">Community {l.community}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">₹{l.price}</span>
                      <span className="text-slate-400 text-xs">/mo</span>
                    </div>
                    <button onClick={() => openPayment(l.title, l.price)} className="btn-primary text-white text-xs font-semibold px-4 py-2 rounded-xl">View Stay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          UNIQUE FEATURE — INTERACTIVE SMART PASS
      ================================================================ */}
      <section className="py-24 bg-slate-900 border-b border-white/5 relative overflow-hidden flex items-center justify-center min-h-[600px] perspective-1000">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold bg-white/5 px-4 py-2 rounded-full mb-6 border border-white/10">
              <CreditCard size={14} /> The Industry First
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              One Smart Pass.<br/>Infinite Workspaces.
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Tap your digital Nomad Pass at any of our verified locations across India. Instantly connect to the secure Wi-Fi node, unlock meeting rooms, and bill coffee directly to your dashboard.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-white/80 text-sm bg-white/5 px-4 py-2 rounded-xl">
                <Wifi size={14} className="text-emerald-400" /> Auto-connect Network
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm bg-white/5 px-4 py-2 rounded-xl">
                <Coffee size={14} className="text-emerald-400" /> Tap-to-Pay Café
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center perspective-1000">
            <div className="relative w-80 h-[420px] rounded-3xl shadow-2xl overflow-hidden hover:[transform:rotateY(-15deg)_rotateX(10deg)_scale(1.05)] transition-all duration-700 ease-out group [transform-style:preserve-3d]">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-full h-full rounded-3xl p-8 flex flex-col z-10 box-border overflow-hidden" style={{background: 'linear-gradient(135deg, #0f2027 0%, #0d3d30 40%, #0f766e 100%)'}}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full translate-y-1/4 -translate-x-1/4" />
                {/* Chip decoration */}
                <div className="absolute top-1/3 left-8 w-10 h-7 rounded-md border-2 border-yellow-400/60 bg-yellow-400/20 grid grid-cols-2 gap-px p-1">
                  <div className="bg-yellow-400/40 rounded-sm" /><div className="bg-yellow-400/40 rounded-sm" />
                  <div className="bg-yellow-400/40 rounded-sm" /><div className="bg-yellow-400/40 rounded-sm" />
                </div>
                <div className="flex justify-between items-start mb-8 relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                    <Zap size={20} className="text-white" />
                  </div>
                  <Wifi size={24} className="text-white/50" />
                </div>
                
                <div className="mt-auto relative">
                  <div className="mb-6">
                    <p className="text-emerald-400/70 text-[10px] mb-1 uppercase tracking-widest font-bold">Digital Nomad</p>
                    <p className="text-white text-xl font-display font-medium tracking-wide drop-shadow-lg">AVINASH KUMAR</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-emerald-400/70 text-[10px] mb-1 uppercase tracking-widest font-bold">Status</p>
                      <p className="text-emerald-400 font-semibold tracking-wider text-sm">PRO GLOBAL</p>
                    </div>
                    <Lock size={20} className="text-white/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          NEW SECTION — QUALITY GUARANTEE (SPEED TEST)
      ================================================================ */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-emerald-600 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="p-10 md:p-14 flex-1 text-white relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="inline-flex items-center gap-2 text-emerald-900 text-sm font-bold bg-white/90 px-4 py-2 rounded-full mb-6">
                <Award size={14} /> Quality Assured
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Never drop a call again.</h2>
              <p className="text-emerald-50 mb-8 leading-relaxed max-w-md">
                Every single property on NomadNests undergoes rigorous on-site internet and infrastructure testing before it gets listed. If it doesn't hit 100 Mbps minimum, we simply don't list it.
              </p>
              <div className="space-y-4">
                {[
                  "Mandatory UPS / Power Backup",
                  "Dedicated Fiber Optic Lines",
                  "Ergonomic Standing Desks"
                ].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/5 bg-slate-900 p-10 flex flex-col justify-center items-center relative">
              <div className="w-48 h-48 rounded-full border-8 border-slate-700 flex flex-col items-center justify-center relative shadow-inner">
                <div className="absolute inset-2 rounded-full border-4 border-emerald-500 border-l-transparent animate-[spin_3s_linear_infinite]" />
                <Wifi size={24} className="text-emerald-400 mb-2" />
                <span className="font-display text-4xl font-bold text-white">480</span>
                <span className="text-emerald-500 text-xs font-bold tracking-widest mt-1">MBPS</span>
              </div>
              <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl w-full p-4 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-white/50 text-xs">Ping</p>
                  <p className="text-white font-semibold">12 ms</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-white/50 text-xs">Upload</p>
                  <p className="text-white font-semibold">210 Mbps</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-white/50 text-xs">Jitter</p>
                  <p className="text-white font-semibold">1.2 ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          REVENUE MODEL — MEMBERSHIP TIERS
      ================================================================ */}
      <section id="membership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3 mt-4">Choose your Nomad Pass</h2>
            <p className="text-slate-500 max-w-md mx-auto">Unlock premium features built for the way remote professionals actually live and work.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={plan.name} className={`relative rounded-3xl border-2 p-7 flex flex-col card-hover ${plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-emerald-200">
                    ⭐ Most Popular
                  </div>
                )}
                <div className={`text-sm font-semibold mb-1 ${plan.popular ? 'text-emerald-400' : 'text-emerald-600'}`}>{plan.name}</div>
                <div className={`font-display text-4xl font-bold mb-0.5 ${plan.textColor}`}>{plan.price}</div>
                <div className={`text-xs mb-6 ${plan.popular ? 'text-white/60' : 'text-slate-400'}`}>{plan.sub}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={`text-sm ${plan.popular ? 'text-white/85' : 'text-slate-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.btnClass}`}>
                  {plan.price === "Free" ? "Get Started" : "Start Free Trial"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          MARKETING STRATEGY — GLOBAL NETWORK + REFERRAL
      ================================================================ */}
      <section id="network" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3 mt-4">Our Global Network</h2>
            <p className="text-slate-500">Partner co-working spaces in 68 cities—seamlessly integrated into your booking.</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center mb-14">
            {[
              { name: "WeWork India", bg: "bg-blue-600" },
              { name: "91Springboard", bg: "bg-orange-500" },
              { name: "Awfis", bg: "bg-emerald-500" },
              { name: "IndiQube", bg: "bg-emerald-600" },
              { name: "CoWrks", bg: "bg-sky-600" },
              { name: "The Executive Centre", bg: "bg-emerald-600" },
            ].map(p => (
              <div key={p.name} className="partner-logo flex items-center justify-center h-14 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <div className={`${p.bg} text-white text-xs font-bold px-3 py-1.5 rounded-lg`}>{p.name}</div>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl bg-slate-50 overflow-hidden p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 70% 50%, #10b981 0%, transparent 60%)"}} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={18} className="text-emerald-400" />
                <span className="text-emerald-400 text-sm font-semibold">Referral Program</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Bring a nomad friend,<br />get <span className="text-emerald-500">₹500 NestCredit</span></h3>
              <p className="text-slate-600 text-sm max-w-md">Every friend who books their first month earns you ₹500 in NestCredits. No limits, no caps—share the nomad love.</p>
            </div>
            <div className="relative flex-shrink-0">
              <button className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl text-base flex items-center gap-2">
                <Users size={18} />
                Refer a Friend
              </button>
              <p className="text-slate-400 text-xs text-center mt-2">4,210 NomadNests members referred last month</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CRM STRATEGY — MY PREFERENCES DASHBOARD SNIPPET
      ================================================================ */}
      <section id="crm" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4 mt-2">We remember<br />what you love.</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                NomadNests learns your rhythm. Your preferred time zones, workspace vibe, and coffee shop style—surfaced automatically every time you search.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Clock, text: "Auto-syncs to your home time zone (IST +5:30)" },
                  { icon: MapPin, text: "Prefers: Metro Accessible properties" },
                  { icon: Wifi, text: "Minimum: 200 Mbps fiber connection" },
                  { icon: Laptop, text: "Always shows: Standing desk options first" },
                ].map(({icon: Icon, text}) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-emerald-600" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-slate-900">My Preferences</h3>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">Auto-saved</span>
              </div>
              {[
                { label: "Home TZ", value: "IST (UTC +5:30)", icon: Clock },
                { label: "Commute", value: "Metro Accessible", icon: MapPin },
                { label: "Wi-Fi Minimum", value: "200 Mbps", icon: Wifi },
                { label: "Desk Type", value: "Standing preferred", icon: Laptop },
                { label: "Community", value: "Startup vibes", icon: Users },
                { label: "Cuisine nearby", value: "North Indian", icon: Star },
              ].map(({label, value, icon: Icon}) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Icon size={13} />
                    <span className="text-xs">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-800">{value}</span>
                </div>
              ))}
              <button className="btn-primary w-full text-white text-sm font-semibold py-2.5 rounded-xl">Update Preferences</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECURITY & TRUST — SECURITY VAULT
      ================================================================ */}
      <section id="security" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3 mt-4">The NomadNests Security Vault™</h2>
            <p className="text-white/50 max-w-md mx-auto">Every transaction, identity, and conversation on our platform is protected by enterprise-grade security.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Lock, title: "256-bit Encryption", desc: "All data in transit and at rest is encrypted using AES-256, the same standard used by global financial institutions.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { icon: Fingerprint, title: "2-Factor Auth (2FA)", desc: "Multi-factor authentication via authenticator app, SMS, or hardware key—your account stays yours.", color: "text-sky-400", bg: "bg-sky-400/10" },
              { icon: BadgeCheck, title: "Mandatory ID Verification", desc: "Every host undergoes government ID check + video verification before their first listing goes live.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            ].map(({icon: Icon, title, desc, color, bg}) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/5 p-7 card-hover">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
                  <Icon size={24} className={color} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => setShowLogin(true)} className="btn-primary text-white font-semibold px-10 py-4 rounded-2xl text-base inline-flex items-center gap-2">
              <Lock size={18} />
              Experience Secure Login
            </button>
            <p className="text-white/30 text-xs mt-3">Click to trigger the Secure Login modal + authentication toast</p>
          </div>
        </div>
      </section>

      {/* ================================================================
          UNIQUE FEATURE 4: PRODUCTIVITY DASHBOARD
      ================================================================ */}
      <section className="py-20 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 border-b border-slate-200 pb-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-4 mt-4">Data-Driven Productivity</h2>
            <p className="text-slate-500 max-w-lg mx-auto">We don't just guess what makes a good workspace. We measure it. Here is the live analytics across our hubs.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-emerald-500 card-hover">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900">Peak Focus Hours</h3>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">Live Global Data</span>
              </div>
              <div className="flex items-end gap-2 h-32 relative">
                {[40, 70, 45, 90, 100, 60, 30].map((h, i) => (
                  <div key={i} className="flex-1 h-full bg-slate-100/50 rounded-t-lg relative group flex items-end">
                    <div style={{height: `${h}%`}} className="w-full bg-emerald-400 rounded-t-lg group-hover:bg-emerald-500 transition-all duration-300 relative">
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {h}% Focus
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-3 font-medium">
                <span>9 AM</span><span>12 PM</span><span>3 PM</span><span>6 PM</span>
              </div>
            </div>

            <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm border-b-4 border-b-emerald-500 card-hover">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900">Acoustic Environment</h3>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">Moderate Buzz</span>
              </div>
              <div className="relative h-4 rounded-full bg-slate-100 overflow-hidden mb-4 mt-12">
                <div className="absolute top-0 left-0 bottom-0 w-2/3 bg-gradient-to-r from-emerald-400 to-emerald-400 rounded-full" />
              </div>
              <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 font-medium">
                <span>Library Silent</span>
                <span className="text-slate-900 font-bold">Cafe Buzz (65dB)</span>
                <span>Networking Loud</span>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Home size={13} className="text-emerald-400" />
            </div>
            <span className="font-display text-base font-bold text-white">NomadNests</span>
          </div>
          <p className="text-white/40 text-xs">© 2026 NomadNests Inc. · Built for the remote-first generation.</p>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Shield size={11} className="text-emerald-500" />
            <span>SOC 2 Type II Certified</span>
          </div>
        </div>
      </footer>
    </>
  );
}
