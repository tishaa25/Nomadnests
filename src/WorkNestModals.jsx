import { useState, useEffect, useRef } from "react";
import {
  Wifi, Shield, Star, MapPin, X, Check, Users, Lock, Fingerprint,
  Zap, Coffee, Clock, Bell, User, Laptop, BadgeCheck, CreditCard,
  Volume2, BookOpen, Bookmark, Calendar, Phone, Heart, Eye, Award
} from "lucide-react";

// ─── LOGIN MODAL WITH OTP ────────────────────────────────────
export function LoginModal({ onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1=credentials, 2=otp, 3=success
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1500);
  };
  const handleOtpChange = (i, v) => {
    if (v.length > 1) return;
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleVerifyOtp = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); setTimeout(() => { onSuccess(); onClose(); }, 1500); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition-colors"><X size={20} /></button>

        {step === 1 && (<>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><Shield size={20} className="text-indigo-600" /></div>
            <div>
              <h3 className="font-semibold text-xl text-slate-900">Secure Login</h3>
              <p className="text-xs text-slate-500">Protected by 256-bit TLS encryption</p>
            </div>
          </div>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1.5">Email Address</label>
              <input defaultValue="student@worknest.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-indigo-400 transition-colors" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1.5">Password</label>
              <input type="password" defaultValue="••••••••••" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-indigo-400 transition-colors" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-5 p-3 bg-indigo-50 rounded-xl">
            <Phone size={16} className="text-indigo-600 flex-shrink-0" />
            <span className="text-xs text-indigo-800">OTP will be sent to +91 •••••67890</span>
          </div>
          <button onClick={handleLogin} disabled={loading} className="btn-primary w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? (<><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Sending OTP…</span></>) : (<><Lock size={16} /><span>Continue</span></>)}
          </button>
        </>)}

        {step === 2 && (<>
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4"><Fingerprint size={28} className="text-indigo-600" /></div>
            <h3 className="font-semibold text-xl text-slate-900 mb-1">Verify OTP</h3>
            <p className="text-sm text-slate-500">Enter the 6-digit code sent to +91 •••••67890</p>
          </div>
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((d, i) => (
              <input key={i} ref={el => otpRefs.current[i] = el} value={d} onChange={e => handleOtpChange(i, e.target.value)} maxLength={1}
                className="w-12 h-14 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-indigo-500 transition-colors" />
            ))}
          </div>
          <button onClick={handleVerifyOtp} disabled={loading} className="btn-primary w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? (<><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Verifying…</span></>) : (<><Shield size={16} /><span>Verify & Login</span></>)}
          </button>
          <p className="text-center text-xs text-slate-400 mt-4">Didn't receive? <button className="text-indigo-600 font-medium">Resend OTP</button></p>
        </>)}

        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 animate-bounce"><Check size={32} className="text-emerald-500" strokeWidth={3} /></div>
            <h3 className="font-semibold text-xl text-slate-900 mb-2">Welcome Back!</h3>
            <p className="text-sm text-slate-500">Identity verified. Redirecting to your dashboard…</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-full"><Shield size={12} />Secure Session Established</div>
          </div>
        )}
        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1"><Lock size={9} /> Secured by WorkNest Shield™</p>
      </div>
    </div>
  );
}

// ─── RAZORPAY PAYMENT MODAL ──────────────────────────────────
export function RazorpayModal({ item, hours, amount, onClose, onSuccess }) {
  const [tab, setTab] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => { setLoading(true); setTimeout(() => { setLoading(false); setSuccess(true); setTimeout(() => { onSuccess(); onClose(); }, 2200); }, 2500); };
  const tabs = [{ id: 'upi', label: 'UPI' }, { id: 'card', label: 'Card' }, { id: 'netbanking', label: 'Net Banking' }];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[780px] flex overflow-hidden animate-fade-up" onClick={e => e.stopPropagation()} style={{minHeight:'440px'}}>
        {/* Left Panel */}
        <div className="w-64 flex-shrink-0 flex flex-col" style={{background:'linear-gradient(160deg, #312e81 0%, #4338ca 100%)'}}>
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-4"><div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center"><Laptop size={14} className="text-indigo-300" /></div><span className="text-white font-bold text-sm">WorkNest</span></div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">Amount Due</p>
            <p className="text-white text-3xl font-bold">₹{amount}</p>
          </div>
          <div className="px-6 py-5 flex-1">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-3">Booking Summary</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-white/60">{item}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/50">Duration</span><span className="text-white/80">{hours} Hour{hours > 1?'s':''}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/50">GST (18%)</span><span className="text-white/80">Incl.</span></div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between font-semibold text-sm"><span className="text-white/70">Total</span><span className="text-emerald-400">₹{amount}</span></div>
            </div>
            <div className="mt-6 space-y-2">
              {['256-bit SSL Secured','PCI DSS Compliant','RBI Regulated'].map(b => (<div key={b} className="flex items-center gap-2 text-[10px] text-white/40"><Check size={10} className="text-emerald-400 flex-shrink-0" />{b}</div>))}
            </div>
          </div>
          <div className="px-6 py-4 border-t border-white/10 flex items-center gap-2"><Zap size={10} className="text-indigo-300" /><span className="text-white/30 text-[10px]">Powered by <span className="text-indigo-300 font-bold">Razorpay</span></span></div>
        </div>
        {/* Right Panel */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100"><p className="text-slate-900 font-semibold text-sm">Payment Method</p><button onClick={onClose} className="text-slate-400 hover:text-slate-700"><X size={18} /></button></div>
          {success ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5 animate-bounce"><Check size={36} className="text-emerald-500" strokeWidth={3} /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
              <p className="text-slate-500 text-sm mb-4">Your workspace <span className="font-semibold text-slate-700">{item}</span> is reserved.</p>
              <div className="bg-emerald-50 rounded-xl px-6 py-3 text-emerald-700 font-semibold text-sm">₹{amount} paid · {hours}hr booked 🎉</div>
            </div>
          ) : (
            <div className="flex flex-1 overflow-hidden">
              <div className="w-32 flex-shrink-0 border-r border-slate-100 py-4 bg-slate-50/50">
                {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} className={`w-full text-left px-4 py-3 text-sm font-medium transition-all border-l-2 ${tab === t.id ? 'border-indigo-500 bg-white text-slate-900 shadow-sm' : 'border-transparent text-slate-500 hover:bg-white/80'}`}>{t.label}</button>))}
              </div>
              <div className="flex-1 p-6 flex flex-col overflow-y-auto">
                {tab === 'upi' && (<div className="space-y-4 flex-1"><p className="text-slate-900 font-semibold text-sm">Pay via UPI</p><div><label className="text-xs text-slate-500 font-medium block mb-1.5">UPI ID</label><input value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-indigo-400 transition-all" /></div>
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center gap-3 bg-slate-50">
                    <div className="grid grid-cols-5 gap-1">{Array.from({length:25}).map((_,i) => (<div key={i} className={`w-4 h-4 rounded-sm ${[0,1,5,10,12,14,20,24].includes(i)?'bg-slate-800':Math.random()>0.5?'bg-slate-300':'bg-white'}`} />))}</div>
                    <p className="text-xs text-slate-500 font-medium">Scan with any UPI app</p>
                    <div className="flex gap-2">{['GPay','PhonePe','Paytm','BHIM'].map(a => (<span key={a} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">{a}</span>))}</div>
                  </div></div>)}
                {tab === 'card' && (<div className="space-y-3 flex-1"><p className="text-slate-900 font-semibold text-sm">Debit / Credit Card</p>
                  <div><label className="text-xs text-slate-500 block mb-1.5">Card Number</label><input value={cardNo} onChange={e => setCardNo(e.target.value.replace(/\D/g,'').replace(/(\d{4})/g,'$1 ').trim().slice(0,19))} placeholder="1234 5678 9012 3456" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-indigo-400" /></div>
                  <div className="grid grid-cols-2 gap-3"><div><label className="text-xs text-slate-500 block mb-1.5">Expiry</label><input value={cardExp} onChange={e => setCardExp(e.target.value)} placeholder="MM/YY" maxLength={5} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-indigo-400" /></div>
                  <div><label className="text-xs text-slate-500 block mb-1.5">CVV</label><input value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g,'').slice(0,3))} placeholder="•••" type="password" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:border-indigo-400" /></div></div>
                  <div className="flex gap-2 pt-1">{['VISA','MC','Rupay','AMEX'].map(n => (<span key={n} className="text-[10px] border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">{n}</span>))}</div></div>)}
                {tab === 'netbanking' && (<div className="space-y-4 flex-1"><p className="text-slate-900 font-semibold text-sm">Select Bank</p><div className="grid grid-cols-2 gap-2">{['SBI','HDFC Bank','ICICI Bank','Axis Bank','Kotak Bank','PNB'].map(b => (<button key={b} className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 text-sm font-medium hover:border-indigo-400 hover:bg-indigo-50 transition-all"><div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{b.slice(0,2)}</div>{b}</button>))}</div></div>)}
                <button onClick={handlePay} disabled={loading} className="mt-5 w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 disabled:opacity-80" style={{background: loading ? '#6366f199' : 'linear-gradient(135deg, #6366f1, #4f46e5)'}}>
                  {loading ? (<><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Processing…</span></>) : (<><Lock size={15} /><span>Pay ₹{amount} Securely</span></>)}
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2 flex items-center justify-center gap-1"><Shield size={9} /> Secured by Razorpay · 256-bit SSL</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── WORKSPACE DETAIL MODAL ──────────────────────────────────
const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"];

export function WorkspaceDetailModal({ workspace, onClose, onBook }) {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const w = workspace;
  const toggleSlot = (s) => setSelectedSlots(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const total = selectedSlots.length * w.price;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-500 hover:text-slate-900 shadow-lg"><X size={16} /></button>
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">{w.badge}</span>
            {w.available && <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />Live Available</span>}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{w.title}</h2>
              <p className="text-slate-500 text-sm flex items-center gap-1"><MapPin size={13} />{w.location}</p>
            </div>
            <div className="text-right"><span className="text-2xl font-bold text-indigo-600">₹{w.price}</span><span className="text-slate-400 text-sm">/hr</span></div>
          </div>
          {/* Facilities */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[{icon: Wifi, label: "Wi-Fi", value: w.wifi}, {icon: Volume2, label: "Noise", value: w.noise}, {icon: Zap, label: "Charging", value: `${w.charging} ports`}, {icon: Star, label: "Rating", value: `${w.rating} (${w.reviews})`}].map(f => (
              <div key={f.label} className="bg-slate-50 rounded-xl p-3 flex items-center gap-2"><f.icon size={16} className="text-indigo-500" /><div><p className="text-[10px] text-slate-400 uppercase font-bold">{f.label}</p><p className="text-sm font-semibold text-slate-800">{f.value}</p></div></div>
            ))}
          </div>
          {/* Suitability Scores */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Suitability Score</h4>
            <div className="flex gap-4">
              {[{label:"Study", score: w.study, color:"bg-emerald-500"}, {label:"Meeting", score: w.meeting, color:"bg-indigo-500"}, {label:"Focus", score: w.focus, color:"bg-violet-500"}].map(s => (
                <div key={s.label} className="flex-1"><div className="flex justify-between text-xs mb-1"><span className="text-slate-600">{s.label}</span><span className="font-bold text-slate-900">{s.score}%</span></div><div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${s.color} rounded-full transition-all`} style={{width:`${s.score}%`}} /></div></div>
              ))}
            </div>
          </div>
          {/* Time Slot Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2"><Clock size={14} />Select Time Slots <span className="text-xs font-normal text-slate-400">(Today)</span></h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {TIME_SLOTS.map(s => (<button key={s} onClick={() => toggleSlot(s)} className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${selectedSlots.includes(s) ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'}`}>{s}</button>))}
            </div>
          </div>
          {/* Book Now */}
          {selectedSlots.length > 0 && (
            <div className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-between">
              <div><p className="text-sm font-bold text-slate-900">{selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''} selected</p><p className="text-xs text-slate-500">{selectedSlots.join(', ')}</p></div>
              <button onClick={() => onBook(w.title, selectedSlots.length, total)} className="btn-primary text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2"><CreditCard size={16} />Book · ₹{total}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── USER DASHBOARD MODAL ────────────────────────────────────
const MOCK_BOOKINGS = [
  { id: 1, workspace: "The Silent Vault", date: "Apr 5, 2026", hours: 3, amount: 447, status: "Completed" },
  { id: 2, workspace: "Skyline Boardroom", date: "Apr 3, 2026", hours: 2, amount: 998, status: "Completed" },
  { id: 3, workspace: "Brew & Build Café", date: "Apr 1, 2026", hours: 5, amount: 495, status: "Completed" },
  { id: 4, workspace: "Zen Focus Room", date: "Mar 28, 2026", hours: 4, amount: 716, status: "Completed" },
];

export function UserDashboard({ onClose }) {
  const [tab, setTab] = useState("profile");
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "rewards", label: "Rewards", icon: Award },
  ];

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">My Dashboard</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900"><X size={20} /></button>
        </div>
        <div className="flex border-b border-slate-100">
          {tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all border-b-2 ${tab === t.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}><t.icon size={15} />{t.label}</button>))}
        </div>
        <div className="p-6 overflow-y-auto" style={{maxHeight:'calc(85vh - 120px)'}}>
          {tab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">AK</div>
                <div><h3 className="font-bold text-slate-900 text-lg">Avinash Kumar</h3><p className="text-sm text-slate-500">student@worknest.com</p><span className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full mt-1"><BadgeCheck size={10} />Pro Member</span></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{label:"Total Hours", value:"47"}, {label:"Workspaces Visited", value:"12"}, {label:"Member Since", value:"Jan 2026"}].map(s => (
                  <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-slate-900">{s.value}</p><p className="text-xs text-slate-500 mt-1">{s.label}</p></div>
                ))}
              </div>
              <div className="bg-indigo-50 rounded-2xl p-4"><h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2"><Bell size={14} />Notifications</h4>
                {["🎉 20% off your next booking this weekend!", "📍 New workspace opened near HSR Layout", "⏰ Your saved workspace 'Zen Focus Room' has slots available"].map((n,i) => (<p key={i} className="text-sm text-slate-600 py-1.5 border-b border-indigo-100 last:border-0">{n}</p>))}
              </div>
            </div>
          )}
          {tab === "bookings" && (
            <div className="space-y-3">
              {MOCK_BOOKINGS.map(b => (
                <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div><p className="font-semibold text-slate-900 text-sm">{b.workspace}</p><p className="text-xs text-slate-500">{b.date} · {b.hours} hrs</p></div>
                  <div className="text-right"><p className="font-bold text-slate-900">₹{b.amount}</p><span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">{b.status}</span></div>
                </div>
              ))}
            </div>
          )}
          {tab === "saved" && (
            <div className="grid grid-cols-2 gap-4">
              {[{name:"The Silent Vault", loc:"Koramangala", price:149}, {name:"Innovation Lab", loc:"Hinjewadi, Pune", price:249}].map(s => (
                <div key={s.name} className="border border-slate-200 rounded-xl p-4"><p className="font-semibold text-slate-900 text-sm">{s.name}</p><p className="text-xs text-slate-500 mb-2">{s.loc}</p><div className="flex items-center justify-between"><span className="text-indigo-600 font-bold text-sm">₹{s.price}/hr</span><Heart size={14} className="text-rose-500 fill-rose-500" /></div></div>
              ))}
            </div>
          )}
          {tab === "rewards" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-1">Loyalty Points</p>
                <p className="text-4xl font-bold mb-2">2,450</p>
                <div className="flex items-center gap-4"><span className="text-sm text-white/80">Tier: <span className="font-bold text-yellow-300">Gold</span></span><span className="text-sm text-white/80">Next: 550 pts to Platinum</span></div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-slate-900">Redeem Points</h4>
                {[{name:"₹100 Off Next Booking", pts: 500}, {name:"Free 1-Hour Session", pts: 1000}, {name:"Premium Day Pass", pts: 2000}].map(r => (
                  <div key={r.name} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl"><span className="text-sm text-slate-700">{r.name}</span><button className="text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-1.5 rounded-full">{r.pts} pts</button></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
