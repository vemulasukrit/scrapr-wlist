import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import WaitlistCounter from "@/components/WaitlistCounter";
import {
  ChevronRight, Zap, Database, Cpu, Code,
  Check, Menu, XIcon, RefreshCw, ArrowRight,
  Shield, Bot, TrendingUp, Network, Globe, Layers,
} from "lucide-react";

/* ─── ANIMATION PRESETS ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
});

const NAV_LINKS = [
  { label: "How It Works", href: "#how" },
  { label: "API", href: "#api" },
  { label: "Traction", href: "#traction" },
  { label: "Investors", href: "#invest" },
];

/* ─── CUSTOM CURSOR ─── */
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    // hover detection on interactive elements
    const addHover = () => {
      document.querySelectorAll("a,button,input,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };
    addHover();
    const interval = setInterval(addHover, 2000);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    let frame: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      setTrail(prev => ({ x: lerp(prev.x, pos.x, 0.12), y: lerp(prev.y, pos.y, 0.12) }));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);
  return (
    <>
      {/* Main dot */}
      <div className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ left: pos.x, top: pos.y, transition: "transform 0.05s" }}>
        <div className={`rounded-full transition-all duration-150 ${clicking ? "scale-50" : "scale-100"} ${hovering ? "w-2 h-2 bg-amber-500" : "w-2 h-2 bg-stone-900"}`} />
      </div>
      {/* Trailing ring */}
      <div className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ left: trail.x, top: trail.y }}>
        <div className={`rounded-full border transition-all duration-200 ${hovering ? "w-9 h-9 border-amber-400/60 scale-110" : "w-6 h-6 border-stone-400/40"} ${clicking ? "scale-150 opacity-30" : ""}`} />
      </div>
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
};

/* ─── TICKER ─── */
const TickerBar = () => {
  const items = "SCRAPR — #5 PRODUCT OF THE DAY ON PRODUCT HUNT ✦ 500+ B2B SIGNUPS IN 72 HOURS ✦ PRIVATE BETA ✦ AI-NATIVE DATA EXTRACTION ✦ SUB-200MS ✦ ".repeat(6);
  return (
    <div className="overflow-hidden py-2 border-b-2 border-stone-900 bg-stone-900">
      <div className="animate-ticker whitespace-nowrap flex">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber-400/80 mr-0">{items}</span>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-amber-400/80">{items}</span>
      </div>
    </div>
  );
};

/* ─── BRUTALIST NAV ─── */
const Nav = ({ onMobileOpen }: { onMobileOpen: () => void }) => (
  <motion.nav className="sticky top-0 z-50 bg-[#F7F4EE] border-b-2 border-stone-900"
    initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
    <div className="max-w-7xl mx-auto flex items-stretch h-14">
      {/* Logo block */}
      <a href="#" className="flex items-center gap-2.5 px-6 border-r-2 border-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-200 group">
        <img src="/images/logo - nobg.png" alt="SCRAPR" className="w-5 h-5 object-contain group-hover:invert transition-all" style={{ filter: "sepia(0.5) saturate(1.5) hue-rotate(10deg) brightness(0.6)" }} />
        <span className="font-sans font-extrabold text-base tracking-tight text-stone-900 group-hover:text-white transition-colors">SCRAPR</span>
      </a>
      {/* Nav links */}
      <div className="hidden md:flex items-center flex-1">
        {NAV_LINKS.map((item) => (
          <a key={item.label} href={item.href}
            className="h-full flex items-center px-6 font-mono text-[11px] tracking-[0.18em] uppercase text-stone-600 border-r border-stone-200 hover:bg-stone-900 hover:text-white transition-all duration-150">
            {item.label}
          </a>
        ))}
      </div>
      {/* CTA */}
      <a href="#hero-form"
        className="hidden sm:flex items-center gap-2 ml-auto px-6 font-sans font-bold text-xs tracking-wide uppercase bg-stone-900 text-white hover:bg-amber-600 transition-colors duration-200 border-l-2 border-stone-900">
        Get Early Access <ArrowRight className="w-3.5 h-3.5" />
      </a>
      <button className="md:hidden flex items-center px-4 border-l-2 border-stone-900" onClick={onMobileOpen}>
        <Menu className="w-5 h-5 text-stone-700" />
      </button>
    </div>
  </motion.nav>
);

/* ─── MOBILE NAV ─── */
const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div className="fixed inset-0 z-[100] bg-stone-950 flex flex-col"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-white/10">
          <span className="font-sans font-extrabold text-white text-base">SCRAPR</span>
          <button onClick={onClose}><XIcon className="w-5 h-5 text-white/50" /></button>
        </div>
        {NAV_LINKS.map((item, i) => (
          <motion.a key={item.label} href={item.href}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="px-6 py-5 font-sans font-bold text-xl text-white border-b border-white/10 hover:bg-white/5 uppercase tracking-tight"
            onClick={onClose}>{item.label}</motion.a>
        ))}
        <a href="#hero-form" onClick={onClose}
          className="mx-6 mt-8 py-4 text-center font-sans font-bold text-sm uppercase tracking-wide bg-amber-500 text-white rounded-none">
          Get Early Access
        </a>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── PIPELINE DIAGRAM ─── */
const PipelineDiagram = () => {
  const steps = [
    { id: "URL", label: "Your URL", sub: "any website", color: "#E8EDF2", border: "#C8D4E0", text: "#3A5068" },
    { id: "NET", label: "Network\nIntercept", sub: "HTTP/XHR capture", color: "#FDF3E5", border: "#E8C07A", text: "#7A4E10" },
    { id: "SCH", label: "Schema\nDetection", sub: "auto-typed", color: "#FDF3E5", border: "#C17B2A", text: "#7A4E10" },
    { id: "OUT", label: "Clean JSON", sub: "AI-ready", color: "#EDFAF0", border: "#6ABF7A", text: "#1A5C2A" },
  ];
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center gap-0 min-w-[520px]">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }} viewport={{ once: true }}
              className="flex-1 border-2 rounded-none p-4 relative"
              style={{ background: step.color, borderColor: step.border }}>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1.5 opacity-50" style={{ color: step.text }}>STEP {i + 1}</div>
              <div className="font-sans font-bold text-sm leading-tight whitespace-pre-line" style={{ color: step.text }}>{step.label}</div>
              <div className="font-mono text-[10px] mt-1 opacity-60" style={{ color: step.text }}>{step.sub}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.3 }} viewport={{ once: true }}
                className="flex-shrink-0 px-1.5">
                <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                  <motion.path d="M0 8 H22" stroke="#C17B2A" strokeWidth="2"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                    transition={{ delay: i * 0.15 + 0.4, duration: 0.4 }} viewport={{ once: true }} />
                  <path d="M18 3 L26 8 L18 13" stroke="#C17B2A" strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      {/* Speed badge */}
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }} viewport={{ once: true }}
        className="mt-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-stone-200" />
        <span className="font-mono text-xs px-3 py-1 border-2 border-stone-900 bg-stone-900 text-amber-400 tracking-wider">AVG 89ms END-TO-END</span>
        <div className="h-px flex-1 bg-stone-200" />
      </motion.div>
    </div>
  );
};

/* ─── API MOCKUP ─── */
const ApiMockup = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-white/10 rounded-none overflow-hidden font-mono">
    {/* Request */}
    <div className="border-r border-white/10">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
        <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest text-stone-900 bg-amber-400">POST</span>
        <span className="text-xs text-stone-400">/v1/extract</span>
        <span className="ml-auto flex gap-1">
          {["bg-red-400/40","bg-yellow-400/40","bg-green-400/40"].map(c => <span key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />)}
        </span>
      </div>
      <div className="p-5 text-[12px] leading-[1.9]">
        <span className="text-stone-500">{"{"}</span><br />
        <span className="text-stone-400 pl-4">"url": </span><span className="text-amber-400">"ycombinator.com/rfs"</span><span className="text-stone-500">,</span><br />
        <span className="text-stone-400 pl-4">"format": </span><span className="text-amber-400">"json"</span><span className="text-stone-500">,</span><br />
        <span className="text-stone-400 pl-4">"schema": </span><span className="text-amber-400">"auto"</span><br />
        <span className="text-stone-500">{"}"}</span>
      </div>
    </div>
    {/* Response */}
    <div>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-emerald-400 tracking-widest font-bold">200 OK</span>
        <span className="ml-auto text-[10px] text-amber-400 font-bold tracking-wider">89ms</span>
      </div>
      <div className="p-5 text-[12px] leading-[1.9]">
        <span className="text-stone-500">{"{"}</span><br />
        <span className="text-stone-400 pl-4">"status": </span><span className="text-emerald-400">"success"</span><span className="text-stone-500">,</span><br />
        <span className="text-stone-400 pl-4">"schema": </span><span className="text-amber-400">"auto-detected"</span><span className="text-stone-500">,</span><br />
        <span className="text-stone-400 pl-4">"sections": </span><span className="text-stone-500">[</span><br />
        <span className="text-stone-500 pl-8">{"{"} </span><span className="text-stone-400">"heading": </span><span className="text-amber-400">"AI"</span><span className="text-stone-500">, "items": </span><span className="text-blue-400">12</span><span className="text-stone-500"> {"}"},</span><br />
        <span className="text-stone-500 pl-8">{"{"} </span><span className="text-stone-400">"heading": </span><span className="text-amber-400">"Robotics"</span><span className="text-stone-500">, "items": </span><span className="text-blue-400">8</span><span className="text-stone-500"> {"}"}</span><br />
        <span className="text-stone-500 pl-4">]</span><br />
        <span className="text-stone-500">{"}"}</span>
      </div>
    </div>
  </div>
);

/* ─── FAQ ─── */
const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div {...fadeUp(index * 0.05)} className="border-b-2 border-stone-900 cursor-pointer group" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4 py-5">
        <h4 className="font-sans font-bold text-base text-stone-900 leading-snug">{question}</h4>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 w-6 h-6 border-2 border-stone-900 flex items-center justify-center bg-white group-hover:bg-stone-900 transition-colors">
          <span className="font-bold text-stone-900 group-hover:text-white transition-colors text-sm leading-none">+</span>
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="pb-5">
            <p className="text-sm text-stone-500 font-body leading-relaxed max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── DIVIDER ─── */
const Divider = () => <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-stone-200" /></div>;

/* ════════════════════════════
   MAIN PAGE
════════════════════════════ */
const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden bg-background relative">
      <CustomCursor />
      <TickerBar />
      <Nav onMobileOpen={() => setMobileOpen(true)} />
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ══ HERO ══ */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity, y: heroY }}
        className="relative overflow-hidden border-b-2 border-stone-900">

        {/* Left column — dark */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] min-h-[92vh]">

          {/* LEFT: dark panel */}
          <motion.div className="dark-section flex flex-col justify-between p-8 sm:p-12 border-r-2 border-white/10 relative overflow-hidden"
            initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            {/* subtle amber orb */}
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(193,123,42,0.15) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              {/* Status pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["PRIVATE BETA", "AI-READY", "SEEKING INVESTORS"].map((p, i) => (
                  <motion.span key={p} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="font-mono text-[9px] tracking-[0.22em] uppercase px-3 py-1.5 border"
                    style={{ background: "rgba(193,123,42,0.1)", borderColor: "rgba(193,123,42,0.35)", color: "#E8A94D" }}>
                    {p}
                  </motion.span>
                ))}
              </div>

              {/* Social proof */}
              <div className="space-y-3 mb-10">
                {[
                  { val: "500+", lbl: "B2B engineers on waitlist", sub: "72 hours organic" },
                  { val: "#5", lbl: "Product of the Day", sub: "Product Hunt" },
                  { val: "89ms", lbl: "Average extraction time", sub: "no browser needed" },
                ].map(s => (
                  <div key={s.val} className="flex items-baseline gap-3 border-b py-2.5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <span className="font-sans font-extrabold text-2xl" style={{ color: "#E8A94D" }}>{s.val}</span>
                    <div>
                      <p className="font-body text-sm" style={{ color: "#D4C8BC" }}>{s.lbl}</p>
                      <p className="font-mono text-[10px]" style={{ color: "#5A5045" }}>{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PH badge */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="relative z-10">
              <a href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-scrapr"
                target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1092571&theme=dark"
                  alt="SCRAPR on Product Hunt" className="h-9 w-auto opacity-70 hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: light panel */}
          <motion.div id="hero-form" className="flex flex-col justify-center px-8 sm:px-14 py-16 relative overflow-hidden"
            initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>

            {/* Watermark */}
            <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden">
              <span className="font-sans font-extrabold text-[160px] sm:text-[220px] tracking-tight leading-none opacity-[0.03] text-stone-900">SR</span>
            </div>

            <div className="relative z-10">
              <p className="section-label mb-5">The Data Layer For AI</p>
              <h1 className="font-sans font-extrabold text-[3rem] sm:text-[4.2rem] md:text-[5rem] tracking-[-0.04em] leading-[0.9] text-stone-950 mb-6">
                THE WEB<br /><span className="shimmer-text">→</span><br />STRUCTURED<br />DATA
              </h1>
              <p className="font-body text-base text-stone-500 max-w-md mb-10 leading-relaxed">
                SCRAPR intercepts the network layer of any website — extracting clean, typed JSON in under 200ms. No browsers. No selectors. Built for AI agents and LLM pipelines.
              </p>
              <WaitlistForm source="hero" />
              <div className="mt-5">
                <WaitlistCounter />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ══ PIPELINE / HOW IT WORKS ══ */}
      <section id="how" className="py-16 sm:py-24 px-4 sm:px-6 border-b-2 border-stone-900">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 mb-12 items-end">
            <div>
              <p className="section-label mb-3">How It Works</p>
              <h2 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight text-stone-950 leading-[1.02]">
                From URL to data.<br /><span className="text-stone-400 font-semibold text-3xl sm:text-4xl">Four steps. Under 200ms.</span>
              </h2>
            </div>
            <div className="font-mono text-xs text-stone-400 text-right hidden md:block">
              <div>POST /v1/extract</div>
              <div className="text-amber-600 font-semibold">→ 200 OK in 89ms</div>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <PipelineDiagram />
          </motion.div>

          {/* Detailed step cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-10 border-2 border-stone-900 overflow-hidden">
            {[
              { num: "01", icon: Globe, title: "Send a URL", desc: "POST any URL. No selectors, no config, no browser setup. Just the URL and your API key." },
              { num: "02", icon: Network, title: "Network Replay", desc: "We capture and replay the exact HTTP/XHR calls the site makes to load its own data — without rendering a browser." },
              { num: "03", icon: RefreshCw, title: "Schema Inference", desc: "Types, keys, and structure are auto-detected from the API response. Strings, arrays, numbers — all typed correctly." },
              { num: "04", icon: Database, title: "Receive JSON", desc: "Clean, structured, AI-ready JSON arrives in your pipeline. Drop directly into LLM context, vector stores, or agents." },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.1)}
                  className={`p-6 flex flex-col gap-3 ${i < 3 ? "border-r-2 border-stone-900" : ""} sm:border-b-0 border-b-2 hover:bg-amber-50/60 transition-colors duration-200`}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-600">{s.num}</span>
                    <Icon className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-bold text-base text-stone-900">{s.title}</h3>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ WHY SCRAPR ══ */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="section-label mb-3">Why SCRAPR</p>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight text-stone-950 leading-[1.02] max-w-2xl">
              The extraction layer that doesn't break.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-stone-900 overflow-hidden">
            {[
              { icon: Zap, tag: "SPEED", title: "10–100× faster", metric: "<200ms avg", desc: "No Chromium spin-up. No render wait. We replay raw HTTP — the same way Chrome DevTools captures it." },
              { icon: Shield, tag: "RESILIENCE", title: "Zero maintenance", metric: "0 selectors", desc: "CSS selectors break on every redesign. SCRAPR targets internal data APIs — they change far less often." },
              { icon: Cpu, tag: "AI-NATIVE", title: "Built for LLMs", metric: "Schema auto-detected", desc: "Typed, structured JSON. No HTML noise. Drop directly into RAG pipelines, agent memory, or fine-tuning datasets." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.1)}
                  className={`p-7 sm:p-9 flex flex-col gap-4 ${i < 2 ? "border-r-2 border-stone-900" : ""} hover:bg-amber-50/40 transition-colors duration-200`}>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border-2 border-stone-900 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[10px] px-2 py-1 border border-stone-900 text-stone-600 tracking-wider">{f.metric}</span>
                  </div>
                  <div>
                    <p className="section-label mb-1.5">{f.tag}</p>
                    <h3 className="font-sans font-extrabold text-2xl text-stone-950">{f.title}</h3>
                  </div>
                  <p className="font-body text-sm text-stone-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DARK: API DEMO ══ */}
      <section id="api" className="dark-section py-16 sm:py-24 px-4 sm:px-6 border-y-2 border-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(193,123,42,0.07) 0%, transparent 60%)" }} />
        <div className="max-w-6xl mx-auto relative">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "#C17B2A" }}>// api reference</p>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight leading-[1.02]" style={{ color: "#F2EEE5" }}>
              Two endpoints.<br /><span style={{ color: "#5A5045" }}>Infinite extractions.</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <ApiMockup />
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-0 border border-white/10 overflow-hidden">
            {[
              { label: "GET /extract", desc: "Single URL extraction" },
              { label: "POST /extract", desc: "URL + actions (clicks, fills)" },
              { label: "GET /batch", desc: "Bulk URL array" },
              { label: "POST /webhook", desc: "Async job + notify" },
            ].map((e, i) => (
              <div key={e.label} className={`p-4 sm:p-5 ${i < 3 ? "border-r border-white/10" : ""}`}>
                <p className="font-mono text-xs font-bold mb-1" style={{ color: "#E8A94D" }}>{e.label}</p>
                <p className="font-mono text-[10px]" style={{ color: "#5A5045" }}>{e.desc}</p>
              </div>
            ))}
          </motion.div>
          {/* Quick start */}
          <motion.div {...fadeUp(0.28)} className="mt-5 border border-white/10 p-5 sm:p-6">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4" style={{ color: "#5A5045" }}>Quick Start</p>
            <pre className="font-mono text-[12px] leading-[1.9] overflow-x-auto" style={{ color: "#8A8078" }}>
{`curl https://api.scrapr.sh/v1/extract \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{ "url": "https://example.com", "format": "json" }'`}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* ══ USE CASES ══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="section-label mb-3">Use Cases</p>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight text-stone-950 leading-[1.02]">
              Every AI stack needs an extraction layer.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-2 border-stone-900 overflow-hidden">
            {[
              { icon: Bot, tag: "AGENTS", title: "Autonomous AI Agents", desc: "Give your agent reliable live web data without a headless browser. One API call — structured facts back in under 200ms." },
              { icon: Database, tag: "RAG", title: "RAG & Knowledge Bases", desc: "Continuously ingest real-world content into vector stores. Dense, schema-typed JSON — not HTML noise." },
              { icon: TrendingUp, tag: "DATA OPS", title: "Market Intelligence", desc: "Track competitors, pricing, inventory at scale via batch extraction. Webhook notifications when jobs complete." },
              { icon: Code, tag: "ML INFRA", title: "LLM Training Datasets", desc: "Generate labelled, structured training data from any site. Schema output is pre-formatted for dataset pipelines." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} {...fadeUp(i * 0.08)}
                  className={`p-7 flex gap-5 items-start ${i % 2 === 0 ? "border-r-2 border-stone-900" : ""} ${i < 2 ? "border-b-2 border-stone-900" : ""} group hover:bg-amber-50/40 transition-colors duration-200`}>
                  <div className="w-10 h-10 border-2 border-stone-900 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-stone-900 group-hover:border-stone-900 transition-colors">
                    <Icon className="w-4 h-4 text-stone-700 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="section-label mb-1">{f.tag}</p>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-stone-950 mb-2">{f.title}</h3>
                    <p className="font-body text-sm text-stone-500 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DARK: TRACTION ══ */}
      <section id="traction" className="dark-section py-16 sm:py-24 px-4 sm:px-6 border-y-2 border-stone-900">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "#C17B2A" }}>Traction</p>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight leading-[1.02]" style={{ color: "#F2EEE5" }}>
              Zero marketing.<br /><span style={{ color: "#5A5045" }}>All organic signal.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-white/10 overflow-hidden mb-8">
            {[
              { val: "500+", lbl: "B2B Waitlist Signups", sub: "72 hours, zero paid ads" },
              { val: "#5", lbl: "Product of the Day", sub: "Product Hunt" },
              { val: "$0", lbl: "Marketing Spend", sub: "100% organic growth" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className={`p-8 text-center ${i < 2 ? "border-r border-white/10" : ""}`}>
                <p className="font-sans font-extrabold text-5xl sm:text-6xl mb-2" style={{ color: "#E8A94D" }}>{s.val}</p>
                <p className="font-sans font-semibold text-sm mb-1" style={{ color: "#D4C8BC" }}>{s.lbl}</p>
                <p className="font-mono text-[10px]" style={{ color: "#5A5045" }}>{s.sub}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/10 overflow-hidden">
            <div className="p-7 border-r border-white/10">
              <h3 className="font-sans font-bold text-base mb-5" style={{ color: "#F2EEE5" }}>Live in Production</h3>
              <ul className="space-y-3">
                {["Network interception engine — shipping","REST API stable, versioned at v1","Auto schema detection — live","Webhook + batch endpoints — alpha"].map(item => (
                  <li key={item} className="flex items-center gap-2.5 font-body text-sm" style={{ color: "#8A8078" }}>
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#C17B2A" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7">
              <h3 className="font-sans font-bold text-base mb-5" style={{ color: "#F2EEE5" }}>Technical Benchmarks</h3>
              {[
                { l: "Avg Extraction", v: "<200ms" },
                { l: "vs Puppeteer", v: "10–100× faster" },
                { l: "Browser Required", v: "None" },
                { l: "Selectors Needed", v: "Zero" },
                { l: "Output Formats", v: "JSON / MD / XML" },
              ].map(r => (
                <div key={r.l} className="flex justify-between py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "#5A5045" }}>{r.l}</span>
                  <span className="font-mono text-sm font-semibold" style={{ color: "#E8A94D" }}>{r.v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ INVESTMENT ══ */}
      <section id="invest" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto border-2 border-stone-900">
          <motion.div {...fadeUp()}>
            <div className="flex flex-wrap items-center gap-3 px-7 sm:px-10 py-5 border-b-2 border-stone-900 bg-stone-900">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border border-amber-400/40 text-amber-400">Confidential Memo</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Bootstrapped · Pre-Seed
              </span>
            </div>
            <div className="px-7 sm:px-10 py-8">
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-stone-950 tracking-tight leading-[1.1] mb-8">
                The Data Infrastructure<br />for Autonomous AI Agents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-8 mb-8">
                <div className="space-y-4 font-body text-sm text-stone-500 leading-relaxed">
                  <p><span className="font-semibold text-stone-800">The Problem:</span> AI agents need massive volumes of structured live web data. Selenium/Puppeteer is fragile, slow (5–15s/page), and breaks with every redesign.</p>
                  <p><span className="font-semibold text-stone-800">Our Approach:</span> SCRAPR reverse-engineers the internal APIs websites use to load their own data — any URL becomes a REST endpoint. No browsers. Sub-200ms.</p>
                  <p><span className="font-semibold text-stone-800">Opportunity:</span> Every AI agent needs a real-time window into the web. SCRAPR is that window — the extraction layer underneath the agent layer.</p>
                </div>
                <div className="space-y-2">
                  {[["Stage","Pre-Seed"],["Waitlist","500+ B2B"],["PH Rank","#5 POTD"],["Revenue","Pre-revenue"],["Founder","Sukrit Vemula"]].map(([l,v]) => (
                    <div key={l} className="flex justify-between py-1.5 border-b border-stone-100">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">{l}</span>
                      <span className="font-mono text-xs font-bold text-stone-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-stone-900">
                <motion.a href="mailto:sukritvemula@outlook.com"
                  className="flex-1 text-center py-3.5 font-sans font-bold text-sm uppercase tracking-wide bg-stone-900 text-white hover:bg-amber-600 transition-colors duration-200"
                  whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
                  Request Pitch Deck
                </motion.a>
                <motion.a href="mailto:sukritvemula@outlook.com?subject=SCRAPR Data Room"
                  className="flex-1 text-center py-3.5 border-2 border-stone-900 font-sans font-bold text-sm uppercase tracking-wide text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
                  Access Data Room
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ══ FAQ ══ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="font-sans font-extrabold text-4xl tracking-tight text-stone-950">Questions answered.</h2>
          </motion.div>
          <div className="border-t-2 border-stone-900">
            {[
              { q: "How is SCRAPR different from Puppeteer or Scrapy?", a: "SCRAPR doesn't touch a browser. We intercept the actual HTTP/XHR calls a site makes to load its data — same calls you'd see in Chrome DevTools Network tab. Result: no browser overhead, no Chromium memory, and structured output (not raw HTML you need to parse)." },
              { q: "Will it work on JavaScript-heavy SPAs?", a: "Yes. Most SPAs load their data from internal REST or GraphQL APIs. SCRAPR captures and replays those calls. The JS-rendered UI is irrelevant because we're talking to the same data source." },
              { q: "What about sites that block scrapers?", a: "SCRAPR uses intelligent request patterning, realistic headers, and session management. Because our requests are based on captured real browser traffic, they pass most bot filters. High-volume use cases support proxy integration." },
              { q: "Do I need schemas or selectors?", a: "Never. SCRAPR auto-detects schema from API responses — strings, numbers, arrays all typed correctly. No CSS selectors, no XPath, no maintenance." },
              { q: "When does access open?", a: "We open in cohorts. Waitlist members get first invites — typically 2–4 weeks after signing up, with priority for teams who share their use case." },
            ].map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ FOOTER — DARK ══ */}
      <footer className="dark-section border-t-2 border-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* CTA strip */}
          <motion.div {...fadeUp()} className="py-16 sm:py-20 text-center border-b border-white/[0.06]">
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-5" style={{ color: "#C17B2A" }}>Early Access</p>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl tracking-tight mb-4 leading-[1.02]" style={{ color: "#F2EEE5" }}>
              Join the extraction layer<br />for AI agents.
            </h2>
            <p className="font-body text-sm mb-10 max-w-sm mx-auto" style={{ color: "#6B6055" }}>No card required. First cohort ships in weeks.</p>
            <div className="flex justify-center">
              <WaitlistForm source="footer" dark />
            </div>
          </motion.div>
          {/* Bottom links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {[
              { title: "Product", links: [["How It Works","#how"],["API Reference","#api"],["Traction","#traction"]] },
              { title: "Company", links: [["About","#"],["Blog","#"],["Contact","mailto:sukritvemula@outlook.com"]] },
              { title: "Legal", links: [["Privacy","#"],["Terms","#"]] },
              { title: "Connect", links: [["Twitter","#"],["Discord","#"],["Email","mailto:sukritvemula@outlook.com"]] },
            ].map(col => (
              <div key={col.title}>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: "#3A3228" }}>{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(([l, h]) => (
                    <li key={l}>
                      <a href={h} className="font-body text-xs transition-colors duration-200"
                        style={{ color: "#4A4035" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#C17B2A")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#4A4035")}>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-2">
              <img src="/images/logo - nobg.png" alt="SCRAPR" className="w-4 h-4 object-contain opacity-30" />
              <span className="font-sans font-bold text-xs" style={{ color: "#3A3228" }}>SCRAPR</span>
            </div>
            <p className="font-mono text-[10px]" style={{ color: "#3A3228" }}>v1.0 · © 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
