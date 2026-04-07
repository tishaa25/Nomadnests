// ============================================================
// WORKNEST - On-Demand Workspace Booking Platform
// Hourly workspace booking for students & professionals
// ============================================================
import { useState, useEffect, useRef } from "react";
import {
  Wifi, Shield, Star, MapPin, MessageCircle, X, Send, Check, Users,
  Lock, Fingerprint, Zap, Coffee, Clock, TrendingUp, Award, Bell,
  User, Menu, ArrowRight, Laptop, BadgeCheck, CreditCard, Gift,
  Volume2, BookOpen, Heart, Eye, ChevronRight, Calendar, Phone
} from "lucide-react";
import { LoginModal, RazorpayModal, WorkspaceDetailModal, UserDashboard } from "./WorkNestModals";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #fafaf9; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); } 70% { box-shadow: 0 0 0 14px rgba(99,102,241,0); } 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); } }
  @keyframes toast-in { from { opacity: 0; transform: translateY(40px) scale(0.92); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  .animate-fade-up { animation: fadeUp 0.7s ease both; }
  .animate-slide-in { animation: slideIn 0.5s ease both; }
  .animate-toast { animation: toast-in 0.45s cubic-bezier(.22,1,.36,1) both; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .pulse-ring { animation: pulse-ring 2s infinite; }
  .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.18); }
  .btn-primary { background: linear-gradient(135deg, #6366f1, #4f46e5); transition: all 0.25s ease; }
  .btn-primary:hover { background: linear-gradient(135deg, #4f46e5, #4338ca); transform: translateY(-1px); box-shadow: 0 8px 20px rgba(99,102,241,0.35); }
  .hero-bg {
    background-image: linear-gradient(to bottom, rgba(15,23,42,0.8) 0%, rgba(15,23,42,0.6) 60%, rgba(250,250,249,1) 100%),
    url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop');
    background-size: cover; background-position: center;
  }
  .glass { background: rgba(255,255,255,0.1); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15); }
  .mesh-bg {
    background: radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.07) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.05) 0%, transparent 50%), #fafaf9;
  }
  input:focus, select:focus { outline: none; }
`;

// ─── DATA ────────────────────────────────────────────────────
const WORKSPACES = [
  { id:1, title:"The Silent Vault", location:"Koramangala, Bengaluru", price:149, rating:4.95, reviews:312, wifi:"500 Mbps", noise:"Silent", charging:12, ac:true, image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", badge:"Best for Study", study:96, meeting:35, focus:98, tags:["Silent Zone","24/7 Open"], available:true, type:"Silent" },
  { id:2, title:"Skyline Boardroom", location:"BKC, Mumbai", price:499, rating:4.88, reviews:187, wifi:"300 Mbps", noise:"Moderate", charging:8, ac:true, image:"https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80", badge:"Best for Meetings", study:30, meeting:97, focus:55, tags:["Projector","Whiteboard"], available:true, type:"Meeting Room" },
  { id:3, title:"Brew & Build Café", location:"Indiranagar, Bengaluru", price:99, rating:4.82, reviews:428, wifi:"200 Mbps", noise:"Café Buzz", charging:6, ac:true, image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80", badge:"Most Popular", study:60, meeting:40, focus:55, tags:["Free Coffee","Snacks"], available:true, type:"Café" },
  { id:4, title:"TechPark Focus Hub", location:"HITEC City, Hyderabad", price:199, rating:4.91, reviews:256, wifi:"600 Mbps", noise:"Silent", charging:16, ac:true, image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80", badge:"Best Wi-Fi", study:88, meeting:50, focus:95, tags:["Dual Monitor","Standing Desk"], available:false, type:"Co-working" },
  { id:5, title:"The Library Lounge", location:"CP, New Delhi", price:129, rating:4.93, reviews:189, wifi:"250 Mbps", noise:"Silent", charging:10, ac:true, image:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", badge:"Best for Study", study:98, meeting:20, focus:96, tags:["Books","Quiet Zone"], available:true, type:"Silent" },
  { id:6, title:"Innovation Lab", location:"Hinjewadi, Pune", price:249, rating:4.87, reviews:145, wifi:"400 Mbps", noise:"Moderate", charging:14, ac:true, image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", badge:"Best for Teams", study:55, meeting:85, focus:70, tags:["Tech Park","Events"], available:true, type:"Co-working" },
  { id:7, title:"Zen Focus Room", location:"Anna Nagar, Chennai", price:179, rating:4.94, reviews:203, wifi:"350 Mbps", noise:"Silent", charging:8, ac:true, image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", badge:"Top Rated", study:90, meeting:30, focus:97, tags:["Private Cabin","AC"], available:true, type:"Silent" },
  { id:8, title:"The Hive Connect", location:"HSR Layout, Bengaluru", price:299, rating:4.86, reviews:334, wifi:"450 Mbps", noise:"Moderate", charging:20, ac:true, image:"https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80", badge:"Best Value", study:65, meeting:80, focus:72, tags:["Hot Desk","Meeting Pod"], available:true, type:"Co-working" },
];

const PLANS = [
  { name:"Student Pass", price:"Free", sub:"Always free", color:"bg-white border-slate-200", textColor:"text-slate-900", btnClass:"border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50", features:["Browse all workspaces","Book up to 5 hrs/month","Basic filters","Community access"], popular:false },
  { name:"Pro Desk", price:"₹499", sub:"per month", color:"bg-slate-900 border-slate-900", textColor:"text-white", btnClass:"btn-primary text-white", features:["Unlimited bookings","Priority slot access","AI Workspace Match","₹200 credit/month","Advanced noise filters","Early access to new spaces"], popular:true },
  { name:"Team Suite", price:"₹1,499", sub:"per month", color:"bg-white border-indigo-200", textColor:"text-slate-900", btnClass:"btn-primary text-white", features:["Up to 10 members","Team booking dashboard","Shared credit pool","Dedicated support","Meeting room priority","API access"], popular:false },
];

const CITIES = [
  { name:"Bengaluru", label:"Tech Capital", trend:"+72%", img:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80", color:"from-indigo-600/80" },
  { name:"Mumbai", label:"Business Hub", trend:"+58%", img:"https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400&q=80", color:"from-slate-800/80" },
  { name:"Pune", label:"IT Corridor", trend:"+45%", img:"https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=400&q=80", color:"from-violet-600/80" },
  { name:"Hyderabad", label:"Cyber City", trend:"+52%", img:"https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=400&q=80", color:"from-amber-600/80" },
  { name:"Delhi NCR", label:"Startup Street", trend:"+41%", img:"https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80", color:"from-rose-600/80" },
  { name:"Chennai", label:"SaaS Valley", trend:"+38%", img:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80", color:"from-sky-600/80" },
];

const CHAT_SCRIPT = [
  { from:"bot", text:"Hey! 👋 I'm Nesto, your WorkNest concierge. Need help finding the perfect workspace?" },
  { from:"bot", text:"I can help with: finding quiet study spots, booking meeting rooms, or comparing workspace amenities." },
];

// ─── COMPONENTS ──────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
      <div className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-xl shadow-xl">
        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0"><Check size={14} strokeWidth={3} /></div>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/50 hover:text-white"><X size={14} /></button>
      </div>
    </div>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(CHAT_SCRIPT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { from: "user", text: input }]); setInput(""); setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { from: "bot", text: "Great choice! I'd recommend 'The Silent Vault' in Koramangala — 500 Mbps Wi-Fi, silent zone, ₹149/hr. Want me to check availability? 📚" }]); }, 1400);
  };
  return (<>
    <button onClick={() => setOpen(o => !o)} className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-indigo-600 text-white shadow-2xl flex items-center justify-center pulse-ring transition-transform hover:scale-110">
      {open ? <X size={22} /> : <MessageCircle size={22} />}
    </button>
    {open && (
      <div className="fixed bottom-24 right-6 z-[100] w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-in">
        <div className="bg-indigo-600 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">N</div>
          <div><p className="text-white font-semibold text-sm">Nesto</p><p className="text-indigo-200 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />AI Concierge · Online</p></div>
        </div>
        <div className="p-4 h-60 overflow-y-auto space-y-3 scrollbar-hide">
          {msgs.map((m, i) => (<div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === "user" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-slate-100 text-slate-800 rounded-bl-sm"}`}>{m.text}</div></div>))}
          {typing && <div className="flex justify-start"><div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}} />)}</div></div>}
          <div ref={bottomRef} />
        </div>
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {["Quiet Study Spot","Meeting Rooms","Compare Spaces"].map(s => (<button key={s} onClick={() => setInput(s)} className="flex-shrink-0 text-xs border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-full hover:bg-indigo-50 whitespace-nowrap">{s}</button>))}
        </div>
        <div className="p-4 pt-2 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask Nesto anything…" className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:border-indigo-400" />
          <button onClick={send} className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center text-white flex-shrink-0"><Send size={15} /></button>
        </div>
      </div>
    )}
  </>);
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function NomadNests() {
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [typeFilter, setTypeFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("1 Hour");
  const [payment, setPayment] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const showToast = (msg) => setToast(msg);
  const openPayment = (item, hours, amount) => setPayment({ item, hours, amount });
  const handleLoginSuccess = () => { setLoggedIn(true); showToast("🔐 Secure session established. Welcome back!"); };

  return (
    <>
      <style>{globalStyles}</style>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      {payment && <RazorpayModal item={payment.item} hours={payment.hours} amount={payment.amount} onClose={() => setPayment(null)} onSuccess={() => showToast("🎉 Workspace Booked! Confirmation sent to your email.")} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}
      {showDashboard && <UserDashboard onClose={() => setShowDashboard(false)} />}
      {selectedWorkspace && <WorkspaceDetailModal workspace={selectedWorkspace} onClose={() => setSelectedWorkspace(null)} onBook={(item, hrs, amt) => { setSelectedWorkspace(null); openPayment(item, hrs, amt); }} />}
      <ChatWidget />

      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center"><Laptop size={16} className="text-indigo-600" /></div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">Work<span className="text-indigo-600">Nest</span></span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#workspaces" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Explore</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Pricing</a>
            <a href="#revenue" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Business</a>
            <a href="#security" className="text-sm text-slate-600 hover:text-slate-900 font-medium">Security</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior:'smooth'})} className="btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl hidden sm:block">Get Started</button>
            <button onClick={() => loggedIn ? setShowDashboard(true) : setShowLogin(true)} className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all relative">
              <User size={16} />
              {loggedIn && <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />}
            </button>
            <button className="md:hidden w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center" onClick={() => setMobileMenu(o=>!o)}><Menu size={16} /></button>
          </div>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 animate-fade-up">
            {["Explore","Pricing","Business","Security"].map(l => (<a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMobileMenu(false)} className="block text-sm font-medium text-slate-700 py-2 border-b border-slate-50">{l}</a>))}
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero-bg min-h-[88vh] flex flex-col items-center justify-center px-4 pb-24 pt-20 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 glass text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Zap size={12} className="text-indigo-400" />1,200+ verified workspaces across 24 cities
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] mb-6">
            Find Your Perfect<br /><span className="text-indigo-400">Workspace.</span> Anytime.
          </h1>
          <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Book study rooms, meeting spaces, and co-working desks by the hour. Purpose-built for students and professionals who need focus on demand.
          </p>
          <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl">
              <MapPin size={16} className="text-indigo-500 flex-shrink-0" />
              <input placeholder="Search location…" className="text-sm text-slate-800 placeholder:text-slate-400 w-full bg-transparent" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl">
              <BookOpen size={15} className="text-indigo-500 flex-shrink-0" />
              <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="text-sm text-slate-700 bg-transparent cursor-pointer">
                <option>All</option><option>Silent</option><option>Meeting Room</option><option>Café</option><option>Co-working</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-100 rounded-xl">
              <Clock size={15} className="text-indigo-500 flex-shrink-0" />
              <select value={durationFilter} onChange={e=>setDurationFilter(e.target.value)} className="text-sm text-slate-700 bg-transparent cursor-pointer">
                <option>1 Hour</option><option>2 Hours</option><option>Half Day</option><option>Full Day</option>
              </select>
            </div>
            <button className="btn-primary text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap"><span>Search</span><ArrowRight size={15} /></button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["📚 Study Zones","🤝 Meeting Rooms","☕ Café Desks","🎯 Focus Pods"].map(t => (<button key={t} className="glass text-white/85 text-xs px-4 py-1.5 rounded-full hover:bg-white/20 transition-all">{t}</button>))}
          </div>
        </div>
      </section>

      {/* ═══ LIVE STATS ═══ */}
      <section className="bg-slate-900 border-b border-white/5 py-8 md:py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-wrap justify-center gap-8 md:gap-16">
          {[{ n:"1,200+", label:"Verified Spaces", icon:MapPin }, { n:"45,000+", label:"Hours Booked", icon:Clock }, { n:"4.9/5", label:"Avg Rating", icon:Star }, { n:"24", label:"Cities", icon:TrendingUp }].map(s => (
            <div key={s.label} className="text-center flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-indigo-500/20 transition-colors flex items-center justify-center mb-3 text-indigo-400"><s.icon size={20} /></div>
              <h4 className="text-3xl font-extrabold text-white mb-1 tracking-tight">{s.n}</h4>
              <p className="text-white/50 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>



      {/* ═══ WORKSPACE LISTINGS ═══ */}
      <section id="workspaces" className="py-16 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Explore Workspaces</h2>
            <p className="text-slate-500 mb-6">Every space vetted for productivity — Wi-Fi speed tested, noise measured, ergonomics checked.</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {[{icon:Shield,text:"Verified"},{icon:Volume2,text:"Silent Zone"},{icon:Wifi,text:"500 Mbps+"},{icon:Coffee,text:"Free Coffee"},{icon:Laptop,text:"Standing Desk"},{icon:Users,text:"Meeting Rooms"}].map(f => (
                <button key={f.text} className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full hover:border-indigo-500 hover:text-indigo-600 transition-colors text-sm font-medium text-slate-700"><f.icon size={14} />{f.text}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKSPACES.map(w => (
              <div key={w.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover group cursor-pointer" onClick={() => setSelectedWorkspace(w)}>
                <div className="relative h-44 overflow-hidden">
                  <img src={w.image} alt={w.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-3 left-3"><span className="bg-indigo-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{w.badge}</span></div>
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md"><Wifi size={9} className="text-indigo-500" />{w.wifi}</span>
                    {w.available ? <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Available</span> : <span className="bg-red-500/90 text-white text-[9px] font-bold px-2 py-1 rounded-full">Fully Booked</span>}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-base leading-tight mb-1">{w.title}</h3>
                  <p className="text-slate-500 text-xs flex items-center gap-1 mb-2"><MapPin size={10} />{w.location}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {w.tags.map(t => <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{t}</span>)}
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{w.type}</span>
                  </div>
                  {/* Suitability mini-bars */}
                  <div className="flex gap-3 mb-3">
                    {[{l:"Study",v:w.study,c:"bg-emerald-500"},{l:"Meet",v:w.meeting,c:"bg-indigo-500"},{l:"Focus",v:w.focus,c:"bg-violet-500"}].map(s=>(
                      <div key={s.l} className="flex-1"><p className="text-[9px] text-slate-400 mb-0.5">{s.l}</p><div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${s.c} rounded-full`} style={{width:`${s.v}%`}} /></div></div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /><span className="font-semibold text-slate-800 text-xs">{w.rating}</span><span className="text-slate-400 text-xs">({w.reviews})</span></div>
                    <div><span className="font-bold text-slate-900">₹{w.price}</span><span className="text-slate-400 text-xs">/hr</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVENUE MODEL ═══ */}
      <section id="revenue" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Our Revenue Model</h2><p className="text-slate-500 max-w-lg mx-auto">A sustainable platform powering the future of flexible workspaces.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon:CreditCard, title:"Commission per Booking", desc:"We earn 10–15% commission on every workspace booking, ensuring hosts get visibility and users get vetted quality.", metric:"10–15%", metricLabel:"Per Transaction", color:"bg-indigo-50 text-indigo-600" },
              { icon:Award, title:"Subscription Plans", desc:"Students and professionals subscribe for monthly workspace-hour bundles at discounted rates, ensuring recurring revenue.", metric:"₹499+", metricLabel:"Monthly Plans", color:"bg-violet-50 text-violet-600" },
              { icon:TrendingUp, title:"Featured Listings", desc:"Workspace partners pay for premium placement, priority search rankings, and promotional badges in the marketplace.", metric:"3x", metricLabel:"More Visibility", color:"bg-emerald-50 text-emerald-600" },
            ].map(r => (
              <div key={r.title} className="rounded-3xl border border-slate-100 p-7 card-hover bg-white">
                <div className={`w-12 h-12 rounded-2xl ${r.color} flex items-center justify-center mb-5`}><r.icon size={24} /></div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{r.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{r.desc}</p>
                <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center gap-3"><span className="text-2xl font-extrabold text-slate-900">{r.metric}</span><span className="text-xs text-slate-500">{r.metricLabel}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING / MEMBERSHIP ═══ */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Choose Your Plan</h2><p className="text-slate-500 max-w-md mx-auto">Flexible plans built for every kind of workspace user.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map(plan => (
              <div key={plan.name} className={`relative rounded-3xl border-2 p-7 flex flex-col card-hover ${plan.color}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">⭐ Most Popular</div>}
                <div className={`text-sm font-semibold mb-1 ${plan.popular ? 'text-indigo-400' : 'text-indigo-600'}`}>{plan.name}</div>
                <div className={`text-4xl font-extrabold mb-0.5 ${plan.textColor}`}>{plan.price}</div>
                <div className={`text-xs mb-6 ${plan.popular ? 'text-white/60' : 'text-slate-400'}`}>{plan.sub}</div>
                <ul className="space-y-3 mb-8 flex-1">{plan.features.map(f => (<li key={f} className="flex items-start gap-2.5"><Check size={14} className="text-indigo-500 mt-0.5 flex-shrink-0" /><span className={`text-sm ${plan.popular ? 'text-white/85' : 'text-slate-600'}`}>{f}</span></li>))}</ul>
                <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.btnClass}`}>{plan.price === "Free" ? "Get Started Free" : "Start Free Trial"}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MARKETING STRATEGY ═══ */}
      <section id="marketing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Growth & Marketing</h2><p className="text-slate-500 max-w-lg mx-auto">Our multi-channel strategy to acquire and retain users at scale.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon:BookOpen, title:"Student Discounts", desc:"Flat 30% off for .edu email IDs. Campus ambassador programs at 50+ universities.", color:"text-indigo-600 bg-indigo-50" },
              { icon:Gift, title:"Referral Rewards", desc:"Refer a friend → both get ₹100 credit. No limits. Viral loop built into the product.", color:"text-violet-600 bg-violet-50" },
              { icon:Zap, title:"First Booking Free", desc:"New users get their first hour absolutely free. Zero friction onboarding experience.", color:"text-emerald-600 bg-emerald-50" },
              { icon:Users, title:"Campus Marketing", desc:"On-ground activations, study marathons, and branded workspace challenges at colleges.", color:"text-amber-600 bg-amber-50" },
            ].map(m => (
              <div key={m.title} className="border border-slate-100 rounded-2xl p-6 card-hover">
                <div className={`w-11 h-11 rounded-xl ${m.color} flex items-center justify-center mb-4`}><m.icon size={20} /></div>
                <h3 className="font-bold text-slate-900 mb-2">{m.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative rounded-3xl bg-indigo-50 overflow-hidden p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage:"radial-gradient(circle at 70% 50%, #6366f1 0%, transparent 60%)"}} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2"><Gift size={18} className="text-indigo-600" /><span className="text-indigo-600 text-sm font-semibold">Referral Program</span></div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Invite a friend,<br />earn <span className="text-indigo-600">₹100 credit</span></h3>
              <p className="text-slate-600 text-sm max-w-md">Every friend who books their first session earns you ₹100 in WorkCredits. Share your unique link and grow together.</p>
            </div>
            <button className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl text-base flex items-center gap-2 flex-shrink-0"><Users size={18} />Start Referring</button>
          </div>
        </div>
      </section>

      {/* ═══ CRM DASHBOARD PREVIEW ═══ */}
      <section id="crm" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Your Productivity<br />Dashboard.</h2>
              <p className="text-slate-500 leading-relaxed mb-6">Track every hour, earn rewards, and personalize your workspace experience. WorkNest remembers how you work best.</p>
              <ul className="space-y-3">
                {[{icon:Clock, text:"Track total focus hours and productivity streaks"}, {icon:Heart, text:"Save favorite workspaces for quick rebooking"}, {icon:Award, text:"Earn loyalty points with every booking"}, {icon:Bell, text:"Get notified about deals, new spaces & reminders"}].map(({icon:Icon, text}) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0"><Icon size={14} className="text-indigo-600" /></div>{text}
                  </li>
                ))}
              </ul>
              <button onClick={() => loggedIn ? setShowDashboard(true) : setShowLogin(true)} className="btn-primary text-white font-semibold px-6 py-3 rounded-xl mt-6 inline-flex items-center gap-2"><Eye size={16} />Open Dashboard</button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 shadow-lg">
              <div className="flex items-center justify-between"><h3 className="font-bold text-slate-900">Quick Stats</h3><span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">This Month</span></div>
              <div className="grid grid-cols-3 gap-3">
                {[{label:"Hours",value:"23",icon:Clock},{label:"Bookings",value:"8",icon:Calendar},{label:"Points",value:"2,450",icon:Award}].map(s=>(
                  <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center"><s.icon size={16} className="text-indigo-500 mx-auto mb-1" /><p className="text-lg font-extrabold text-slate-900">{s.value}</p><p className="text-[10px] text-slate-500">{s.label}</p></div>
                ))}
              </div>
              <div><h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Recent Bookings</h4>
                {[{name:"The Silent Vault",time:"Today, 2:00 PM",hrs:"3 hrs"},{name:"Brew & Build Café",time:"Yesterday",hrs:"2 hrs"},{name:"Skyline Boardroom",time:"Apr 5",hrs:"1 hr"}].map(b=>(
                  <div key={b.name} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"><div><p className="text-sm font-semibold text-slate-900">{b.name}</p><p className="text-xs text-slate-400">{b.time}</p></div><span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">{b.hrs}</span></div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl p-4 text-white flex items-center justify-between">
                <div><p className="text-white/60 text-xs font-bold">Loyalty Tier</p><p className="text-lg font-extrabold">Gold Member</p></div>
                <div className="text-right"><p className="text-white/60 text-xs font-bold">Points</p><p className="text-lg font-extrabold">2,450</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECURITY ═══ */}
      <section id="security" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">WorkNest Security Shield™</h2><p className="text-white/50 max-w-md mx-auto">Enterprise-grade security protecting every transaction, identity, and session.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon:Lock, title:"256-bit Encryption", desc:"All data encrypted using AES-256, the same standard used by global banks and financial institutions.", color:"text-indigo-400", bg:"bg-indigo-400/10" },
              { icon:Fingerprint, title:"OTP Verification", desc:"Multi-factor authentication via SMS OTP. Every login is verified with a one-time code sent to your phone.", color:"text-violet-400", bg:"bg-violet-400/10" },
              { icon:Shield, title:"Secure Payments", desc:"PCI-DSS compliant payment processing via Razorpay. Your card details never touch our servers.", color:"text-emerald-400", bg:"bg-emerald-400/10" },
            ].map(({icon:Icon, title, desc, color, bg}) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-white/5 p-7 card-hover">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-5`}><Icon size={24} className={color} /></div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => setShowLogin(true)} className="btn-primary text-white font-semibold px-10 py-4 rounded-2xl text-base inline-flex items-center gap-2"><Lock size={18} />Experience Secure Login</button>
            <p className="text-white/30 text-xs mt-3">Click to see OTP verification flow + secure session toast</p>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center"><Laptop size={13} className="text-indigo-400" /></div><span className="text-base font-extrabold text-white">Work<span className="text-indigo-400">Nest</span></span></div>
          <p className="text-white/40 text-xs">© 2026 WorkNest Technologies · Built for the focus-first generation.</p>
          <div className="flex items-center gap-1 text-xs text-slate-400"><Shield size={11} className="text-indigo-400" /><span>SOC 2 Type II Certified</span></div>
        </div>
      </footer>
    </>
  );
}
