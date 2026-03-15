import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useMemo, useRef } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import WaitlistCounter from "@/components/WaitlistCounter";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ChevronDown, ChevronRight, Zap, Database, Cpu, Code,
  GitBranch, TrendingUp, BarChart3, Check, X, Menu, XIcon,
  Globe, Layers, RefreshCw, ArrowRight, Shield, Gauge, Bot
} from "lucide-react";

/* ═══════════════════════════════════════════════
   CONSTANTS & REUSABLE ANIMATION PRESETS
   ═══════════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "API", href: "#api" },
  { label: "Pricing", href: "#pricing" },
  { label: "Invest", href: "#invest" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
  viewport: { once: true, margin: "-80px" },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.6, delay },
  viewport: { once: true },
});

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const staggerChild = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

/* ═══════════════════════════════════════════════
   LIGHTSABER ROOT & BRANCH DIVIDERS
   ═══════════════════════════════════════════════ */


const BranchDivider = () => (
  <div className="flex justify-center py-0 relative w-full h-12 sm:h-16 overflow-hidden pointer-events-none mt-[-1px] z-0">
    {/* Left Branch */}
    <svg className="absolute left-1/2 top-0 -translate-x-full w-24 sm:w-40 md:w-64 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d="M 100 0 C 100 50, 80 50, 0 50"
        fill="none"
        stroke="url(#gradient-left)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ filter: "drop-shadow(0 0 6px rgba(100, 200, 255, 0.6))" }}
      />
      <defs>
        <linearGradient id="gradient-left" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>

    {/* Right Branch */}
    <svg className="absolute left-1/2 top-0 w-24 sm:w-40 md:w-64 h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d="M 0 0 C 0 50, 20 50, 100 50"
        fill="none"
        stroke="url(#gradient-right)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        style={{ filter: "drop-shadow(0 0 6px rgba(100, 200, 255, 0.6))" }}
      />
      <defs>
        <linearGradient id="gradient-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════ */

const ParticlesBackground = () => {
  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 10,
    })), []
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-[0.15]"
        style={{ background: "radial-gradient(circle, rgba(70,110,190,0.2) 0%, transparent 65%)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-20"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(50,90,160,0.12) 0%, transparent 65%)" }} />
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full bg-white/20"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`
          }} />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════ */

const TickerBar = () => {
  const items = "SCRAPR PRIVATE BETA — JOIN THE WAITLIST ✦ ".repeat(12);
  return (
    <div className="bg-white/[0.02] border-b border-white/[0.05] overflow-hidden py-2 relative z-50">
      <div className="animate-ticker whitespace-nowrap flex">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-body">{items}</span>
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-body">{items}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   FAQ ITEM
   ═══════════════════════════════════════════════ */

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div {...fadeUp(index * 0.05)} className="border-b border-white/[0.06] cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center justify-between gap-4 py-5 sm:py-6">
        <h4 className="text-sm sm:text-base font-sans font-medium text-white/80 leading-tight group-hover:text-white transition-colors duration-300">{question}</h4>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="flex-shrink-0">
          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="pb-5">
            <p className="text-sm text-white/35 font-body leading-relaxed max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════════ */

const MobileNav = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div className="fixed inset-0 z-[100] bg-black/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
        <button onClick={onClose} className="absolute top-5 right-6"><XIcon className="w-6 h-6 text-white/50 hover:text-white/80 transition-colors" /></button>
        {NAV_LINKS.map((item, i) => (
          <motion.a key={item.label} href={item.href}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
            className="text-3xl font-sans font-medium text-white/60 hover:text-white transition-colors tracking-wide uppercase" onClick={onClose}>
            {item.label}
          </motion.a>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

const Index = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden bg-background relative">
      <ParticlesBackground />
      <div className="relative z-10 min-h-screen">

        <TickerBar />

        {/* ── NAV ── */}
        <motion.nav className="sticky top-0 z-50 px-3 sm:px-6 md:px-8 py-2.5"
          initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full nav-metallic shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/[0.08]">
            <a href="#" className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity">
              <img src="/images/logo - nobg.png" alt="SCRAPR Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
              <span className="font-sans font-bold text-lg tracking-tight text-foreground">SCRAPR</span>
            </a>
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((item) => (
                <a key={item.label} href={item.href}
                  className="text-[11px] uppercase tracking-[0.2em] text-white/35 hover:text-white/75 transition-colors duration-300 font-body">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href="mailto:sukritvemula@outlook.com"
                className="hidden sm:inline-block text-[11px] uppercase tracking-[0.15em] text-white/35 hover:text-white/70 transition-all duration-300 font-body border border-white/[0.08] px-4 py-1.5 rounded-full hover:bg-white/[0.04] hover:border-white/[0.15]">
                Contact
              </a>
              <button className="md:hidden" onClick={() => setMobileNavOpen(true)}>
                <Menu className="w-5 h-5 text-white/50" />
              </button>
            </div>
          </div>
        </motion.nav>

        <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        {/* ── HERO ── */}
        <motion.section ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale }}
          className="min-h-[88vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center relative">
          <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}>

            <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
              {["PRIVATE BETA", "AI-READY", "SEEKING INVESTORS"].map((pill, i) => (
                <motion.span key={pill} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-white/[0.15] text-white/80 font-body bg-white/[0.05] shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  {pill}
                </motion.span>
              ))}
            </motion.div>

            <motion.p className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/25 mb-5 font-body"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              The Data Layer For AI
            </motion.p>

            <motion.h1
              className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-bold tracking-[-0.03em] text-foreground mb-6 leading-[0.92] text-glow"
              initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}>
              THE WEB →<br />STRUCTURED DATA
            </motion.h1>

            <motion.p className="text-sm sm:text-base md:text-lg text-white/35 max-w-xl mx-auto mb-10 font-body leading-relaxed"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}>
              SCRAPR converts websites into structured data that AI models and autonomous agents can reliably understand.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.05 }} className="w-full max-w-lg mx-auto flex flex-col items-center gap-8">
              <WaitlistForm source="hero" />
              <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-2xl hover:bg-white/[0.04] transition-colors relative group">
                <a href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-scrapr" target="_blank" rel="noopener noreferrer" className="block opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-0.5">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=1092571&theme=dark" alt="SCRAPR on Product Hunt" className="w-[200px] h-auto" />
                </a>
              </div>
            </motion.div>

            <motion.p className="text-[11px] text-white/15 mt-6 font-body"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
              Investing? <a href="mailto:sukritvemula@outlook.com" className="text-white/30 hover:text-white/50 underline underline-offset-4 transition-colors duration-300">Connect with us</a>
            </motion.p>
          </motion.div>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4 text-white/15" />
          </motion.div>
        </motion.section>

        <BranchDivider />

        {/* ── LIVE DEMO MOCKUP ── */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-8">
              <div className="inline-block relative z-10 bg-black/90 px-6 sm:px-8 py-3 rounded-full border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-1 sm:mb-2 font-body">See It In Action</p>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-foreground text-glow text-center">
                  From URL to structured data in milliseconds.
                </h2>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] w-full">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.05] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/[0.04] rounded-md px-3 py-1 max-w-sm mx-auto">
                    <span className="text-[10px] font-mono text-white/25">api.scrapr.sh/v1/extract</span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 md:gap-0 items-stretch">
                  {/* INPUT */}
                  <motion.div className="bg-black/30 border border-white/[0.05] rounded-xl p-5" {...fadeUp(0.2)}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded-md bg-white/[0.06] flex items-center justify-center">
                        <Globe className="w-3 h-3 text-white/30" />
                      </div>
                      <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.15em]">Request</span>
                    </div>
                    <div className="space-y-1 font-mono text-[11px] leading-relaxed">
                      <p className="text-white/25">POST /v1/extract</p>
                      <p className="text-white/15 mt-2">{"{"}</p>
                      <p className="text-white/40 pl-3">url: <span className="text-blue-400/50">"ycombinator.com/rfs"</span>,</p>
                      <p className="text-white/40 pl-3">format: <span className="text-blue-400/50">"json"</span>,</p>
                      <p className="text-white/40 pl-3">schema: <span className="text-blue-400/50">"auto"</span></p>
                      <p className="text-white/15">{"}"}</p>
                    </div>
                  </motion.div>

                  {/* ARROW 1 */}
                  <div className="hidden md:flex items-center justify-center px-3">
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }} viewport={{ once: true }}>
                      <ArrowRight className="w-4 h-4 text-white/10" />
                    </motion.div>
                  </div>

                  {/* PROCESSING */}
                  <motion.div className="bg-black/30 border border-white/[0.05] rounded-xl p-5 flex flex-col items-center justify-center text-center"
                    {...fadeUp(0.35)}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="mb-3">
                      <RefreshCw className="w-6 h-6 text-white/15" />
                    </motion.div>
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.15em] mb-2">Processing</p>
                    <div className="space-y-1 text-[10px] font-body text-white/15">
                      <p>Network interception</p>
                      <p>API route detection</p>
                      <p>Schema inference</p>
                    </div>
                    <motion.div className="mt-4 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]"
                      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }} viewport={{ once: true }}>
                      <span className="font-mono text-sm font-bold text-foreground">89<span className="text-white/30 text-xs">ms</span></span>
                    </motion.div>
                  </motion.div>

                  {/* ARROW 2 */}
                  <div className="hidden md:flex items-center justify-center px-3">
                    <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }} viewport={{ once: true }}>
                      <ArrowRight className="w-4 h-4 text-white/10" />
                    </motion.div>
                  </div>

                  {/* OUTPUT */}
                  <motion.div className="bg-black/30 border border-white/[0.05] rounded-xl p-5" {...fadeUp(0.5)}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded-md bg-white/[0.06] flex items-center justify-center">
                        <Layers className="w-3 h-3 text-white/30" />
                      </div>
                      <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.15em]">Response · 200</span>
                    </div>
                    <pre className="font-mono text-[10px] text-white/40 leading-relaxed">{`{
  "title": "Requests for...",
  "sections": [
    { "heading": "AI",
      "items": [12] },
    { "heading": "Robotics",
      "items": [8] }
  ],
  "meta": { "time_ms": 89 }
}`}</pre>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <BranchDivider />

        {/* ── FEATURES ── */}
        <section id="features" className="py-8 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <div className="inline-block relative z-10 bg-black/90 px-6 sm:px-8 py-3 rounded-full border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-1 sm:mb-2 font-body">Core Technology</p>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-foreground text-glow">
                  Why SCRAPR is different.
                </h2>
              </div>
            </motion.div>
            <div className="space-y-20 sm:space-y-28">
              {[
                { icon: Zap, title: "NETWORK-NATIVE SPEED", desc: "SCRAPR intercepts how sites load data — no browsers, no overhead. Sub-200ms extraction from any website, any page." },
                { icon: Cpu, title: "AI-READY OUTPUT", desc: "Structured JSON optimized for LLM context windows, RAG pipelines, and autonomous agent consumption. Schema auto-detection built in." },
                { icon: RefreshCw, title: "ZERO MAINTENANCE", desc: "Extracts data from how sites load information — not from fragile HTML selectors that break with every UI change." },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={i} {...fadeUp(0.1)} className="text-center">
                    <motion.div className="mb-5 flex justify-center"
                      whileInView={{ scale: [0.85, 1.05, 1], opacity: [0, 1, 1] }}
                      transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
                      <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white/30" strokeWidth={1.5} />
                      </div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold tracking-tight text-foreground mb-3">{f.title}</h3>
                    <p className="text-sm sm:text-base text-white/35 font-body leading-relaxed max-w-lg mx-auto">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── STATS ROW ── */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: "<200", unit: "ms", label: "EXTRACTION SPEED" },
                { value: "10", unit: "x", label: "FASTER THAN PUPPETEER" },
                { value: "0", unit: "ms", label: "SETUP TIME" },
              ].map((stat, i) => (
                <motion.div key={i} {...fadeUp(i * 0.1)}
                  className="glass-card rounded-2xl p-7 sm:p-9 text-center group hover:bg-white/[0.04] transition-all duration-500"
                  whileHover={{ y: -3 }}>
                  <p className="text-3xl sm:text-4xl font-sans font-bold text-foreground tracking-tight">
                    {stat.value}<span className="text-xl sm:text-2xl text-white/40 ml-0.5">{stat.unit}</span>
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 mt-2.5 font-body">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── HOW IT WORKS ── */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <div className="inline-block relative z-10 bg-black/90 px-6 sm:px-8 py-3 rounded-full border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-1 sm:mb-2 font-body">Process</p>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-foreground text-glow">
                  Websites in. AI data out.
                </h2>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { num: "01", title: "Input a Website", desc: "Provide any URL to standard pipeline APIs.", icon: Code },
                { num: "02", title: "SCRAPR Analyzes", desc: "Detects how the site loads data through APIs and network layers.", icon: GitBranch },
                { num: "03", title: "Extract Structure", desc: "Content transformed into structured, machine-readable data.", icon: Database },
                { num: "04", title: "Deliver AI-Ready", desc: "Perfect for LLM pipelines, autonomous agents, and data ingestion.", icon: Cpu },
              ].map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <motion.div key={step.num} {...fadeUp(i * 0.1)}
                    className="glass-card rounded-xl p-4 sm:p-5 group hover:bg-white/[0.04] transition-all duration-500 flex flex-col"
                    whileHover={{ y: -4 }}>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-[11px] font-mono font-bold text-white/15 tracking-widest">{step.num}</span>
                      <StepIcon className="w-3.5 h-3.5 text-white/20 group-hover:text-white/45 transition-colors duration-300" />
                    </div>
                    <h4 className="text-base font-sans font-semibold text-foreground mb-1.5">{step.title}</h4>
                    <p className="text-xs text-white/30 font-body leading-relaxed flex-grow">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── HEADLINE BREAK ── */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <motion.div {...fadeUp()} className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-foreground leading-[1.1] text-glow">
              STOP FIXING<br />BROKEN SCRAPERS.<br />
              <span className="text-white/30">START SCALING DATA.</span>
            </h2>
          </motion.div>
        </section>

        <BranchDivider />

        {/* ── API REFERENCE BENTO ── */}
        <section id="api" className="py-8 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <div className="inline-block relative z-10 bg-black/90 px-6 sm:px-8 py-3 rounded-full border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-1 sm:mb-2 font-body">// api</p>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-foreground text-glow">
                  Built for developers.
                </h2>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* GET */}
              <motion.div {...fadeUp(0.1)} className="md:col-span-2 glass-card rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="px-2.5 py-0.5 bg-white text-black font-mono text-[10px] font-bold tracking-widest rounded-full">GET</span>
                  <span className="font-mono text-xs font-medium text-foreground">/api/scrape</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "url", type: "string, required" },
                    { name: "output", type: "json | markdown | xml" },
                    { name: "interactive", type: "boolean · Default: true" },
                    { name: "timeout", type: "integer · Default: 30000ms" },
                  ].map((p) => (
                    <div key={p.name} className="border-l border-white/[0.08] pl-3 py-0.5">
                      <p className="font-mono text-[11px] font-medium text-foreground">{p.name}</p>
                      <p className="text-[10px] text-white/25 font-body">{p.type}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Start */}
              <motion.div {...fadeUp(0.2)} className="glass-card rounded-xl p-5 sm:p-6">
                <p className="text-[9px] font-mono font-bold text-white/20 uppercase tracking-[0.2em] mb-3">Quick Start</p>
                <pre className="bg-black/30 border border-white/[0.05] rounded-lg p-3 text-[10px] font-mono text-white/40 leading-relaxed">
                  {`curl https://api.scrapr.sh \\
  -H "Authorization: KEY" \\
  -G --data-urlencode \\
  "url=https://example.com"`}
                </pre>
              </motion.div>

              {/* POST */}
              <motion.div {...fadeUp(0.3)} className="glass-card rounded-xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-white text-black font-mono text-[10px] font-bold tracking-widest rounded-full">POST</span>
                  <span className="font-mono text-[11px] font-medium text-foreground">/api/scrape</span>
                </div>
                <p className="text-[10px] text-white/25 font-body mb-3">Complex operations with form fills, clicks, and sequential actions.</p>
                <div className="space-y-1.5">
                  <div className="border-l border-white/[0.08] pl-3">
                    <p className="font-mono text-[11px] font-medium text-foreground">actions</p>
                    <p className="text-[10px] text-white/25 font-body">Click, fill, submit</p>
                  </div>
                  <div className="border-l border-white/[0.08] pl-3">
                    <p className="font-mono text-[11px] font-medium text-foreground">webhook</p>
                    <p className="text-[10px] text-white/25 font-body">Async notification</p>
                  </div>
                </div>
              </motion.div>

              {/* Response */}
              <motion.div {...fadeUp(0.4)} className="md:col-span-2 glass-card rounded-xl p-5 sm:p-6">
                <p className="text-[9px] font-mono font-bold text-white/20 uppercase tracking-[0.2em] mb-3">200 OK</p>
                <pre className="bg-black/30 border border-white/[0.05] rounded-lg p-3 text-[10px] font-mono text-white/40 leading-relaxed">
                  {`{
  "status": "success",
  "data": { "title": "...", "content": "...", "links": [] },
  "meta": { "time_ms": 234, "url": "https://..." }
}`}
                </pre>
              </motion.div>
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── USE CASES ── */}
        <section className="py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <div className="inline-block relative z-10 bg-black/90 px-6 sm:px-8 py-3 rounded-full border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-1 sm:mb-2 font-body">Use Cases</p>
                <h2 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-foreground text-glow">Works everywhere.</h2>
              </div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Bot, title: "AI Agents", desc: "Give agents reliable access to real-time web data without browser overhead." },
                { icon: Database, title: "RAG Pipelines", desc: "Convert websites into structured knowledge sources for dense embedding arrays." },
                { icon: TrendingUp, title: "Market Intelligence", desc: "Extract structured insights and real-time updates from across the web at scale." },
                { icon: Code, title: "Dataset Creation", desc: "Generate clean datasets suitable for LLM fine-tuning from unstructured sites." },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={i} {...fadeUp(i * 0.08)}
                    className="glass-card rounded-xl p-4 group hover:bg-white/[0.04] transition-all duration-500 flex flex-col"
                    whileHover={{ y: -2 }}>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-3 group-hover:border-white/[0.1] transition-colors duration-300">
                      <Icon className="w-4 h-4 text-white/25 group-hover:text-white/45 transition-colors duration-300" />
                    </div>
                    <h4 className="text-sm font-sans font-semibold text-foreground mb-1.5">{f.title}</h4>
                    <p className="text-xs text-white/30 font-body leading-relaxed flex-grow">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── PRICING ── */}
        <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-3 font-body">Pricing</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">Pay for what you use.</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "FREE", price: "$0", features: ["1,000 requests/month", "JSON output", "Community support", "Basic rate limits"] },
                { name: "PRO", price: "$49", period: "/mo", featured: true, features: ["100,000 requests/month", "All file formats", "Priority support", "Webhook notifications", "Action engine"] },
                { name: "ENTERPRISE", price: "Custom", features: ["Unlimited requests", "Dedicated infra", "99.9% SLA", "Custom integrations", "Team training"] },
              ].map((plan, i) => (
                <motion.div key={plan.name} {...fadeUp(i * 0.1)}
                  className={`rounded-xl p-5 sm:p-7 flex flex-col transition-all duration-500 ${plan.featured ? "glass-card border border-white/[0.1] glow-subtle" : "glass-card"
                    }`}
                  whileHover={{ y: -4 }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-body">{plan.name}</p>
                  <p className="text-2xl sm:text-3xl font-sans font-bold text-foreground mb-5">
                    {plan.price}{plan.period && <span className="text-base text-white/25">{plan.period}</span>}
                  </p>
                  <ul className="space-y-2.5 flex-grow">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-white/20 flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-body text-white/35">{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── COMPARISON ── */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-14">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-3 font-body">Comparison</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">Why SCRAPR?</h2>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="glass-card rounded-xl p-5 overflow-x-auto hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Feature", "SCRAPR", "Puppeteer", "Scrapy", "Bright Data"].map((h, i) => (
                      <th key={h} className={`font-sans font-medium py-2.5 px-3 border-b border-white/[0.06] text-[10px] uppercase tracking-wider ${i === 0 ? "text-left text-white/40" : i === 1 ? "text-center text-foreground bg-white/[0.02]" : "text-center text-white/35"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: "Speed", d: [{ v: "<200ms", g: true }, { v: "5-15s", g: false }, { v: "1-5s", g: false }, { v: "2-8s", g: false }] },
                    { f: "Browser", d: [{ v: "NO", g: true }, { v: "YES", g: false }, { v: "NO", g: true }, { v: "YES", g: false }] },
                    { f: "Network Interception", d: [{ v: "YES", g: true }, { v: "NO", g: false }, { v: "NO", g: false }, { v: "NO", g: false }] },
                    { f: "Formats", d: [{ v: "ALL", g: true }, { v: "HTML", g: false }, { v: "HTML", g: false }, { v: "HTML", g: false }] },
                    { f: "Setup", d: [{ v: "0 min", g: true }, { v: "30+ min", g: false }, { v: "45+ min", g: false }, { v: "15+ min", g: false }] },
                  ].map((row) => (
                    <tr key={row.f}>
                      <td className="font-sans font-medium text-foreground py-2.5 px-3 border-b border-white/[0.04] text-[11px]">{row.f}</td>
                      {row.d.map((item, j) => (
                        <td key={j} className={`text-center py-2.5 px-3 border-b border-white/[0.04] text-[11px] ${j === 0 ? "bg-white/[0.02]" : ""}`}>
                          <span className={`font-mono ${item.g ? "font-medium text-foreground" : "text-white/25"}`}>{item.v}</span>
                          {item.g ? <Check className="w-3 h-3 text-green-400/50 inline ml-1.5" /> : <X className="w-3 h-3 text-white/10 inline ml-1.5" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <BranchDivider />

        {/* ── INVESTMENT MEMO ── */}
        <section id="invest" className="py-12 sm:py-16 px-4 sm:px-6 relative z-10 w-full overflow-hidden">
          {/* Subtle glowing orb behind investor card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

          <div className="max-w-4xl mx-auto glass-card border border-white/[0.06] rounded-2xl p-6 sm:p-10 relative bg-black/80 shadow-2xl z-10">
            {/* Memo Header */}
            <div className="flex flex-col gap-3 mb-8 border-b border-white/[0.06] pb-6">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded-[4px] bg-white/[0.03] text-[9px] font-mono tracking-widest uppercase border border-white/[0.08] text-white/50">Confidential Memo</span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400/70"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Bootstrapped</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-foreground tracking-tight leading-[1.1] text-glow">The Data Infrastructure<br />for Autonomous Agents</h2>
            </div>

            {/* Content Body */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_250px] gap-8 sm:gap-12 mb-10">
              <div className="space-y-4">
                <p className="text-sm text-white/40 font-body leading-relaxed">
                  <span className="text-white/80 font-medium">The Prompt:</span> Autonomous AI agents and LLM pipelines require immense volumes of structured internet data. Doing this with Selenium/Puppeteer DOM parsing is fragile, slow, and expensive.
                </p>
                <p className="text-sm text-white/40 font-body leading-relaxed">
                  <span className="text-white/80 font-medium">Our Solution:</span> SCRAPR bypasses browsers entirely. We reverse-engineer website network layers into pure REST endpoints, achieving 10-100x speedups. Sub-200ms extraction directly to JSON.
                </p>
                <p className="text-sm text-white/40 font-body leading-relaxed">
                  <span className="text-white/80 font-medium">Traction:</span> Live in production. 400+ B2B waitlist signups in 72 hours. Product of the Day on Product Hunt. Zero marketing spend.
                </p>
              </div>

              {/* Data Sidebar */}
              <div className="flex flex-col gap-3">
                {[
                  { label: "Extraction Speed", value: "<200ms" },
                  { label: "Browser Overhead", value: "0%" },
                  { label: "B2B Waitlist", value: "400+" },
                  { label: "Funding Status", value: "Pre-Seed" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                    <span className="text-[10px] font-mono uppercase text-white/30 tracking-wider">{stat.label}</span>
                    <span className="text-xs font-mono font-medium text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/[0.06]">
              <motion.a href="mailto:sukritvemula@outlook.com"
                className="px-6 py-2.5 rounded-lg bg-white text-black font-sans font-semibold text-xs tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.08)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 text-center flex-1"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                Request Full Pitch Deck
              </motion.a>
              <motion.a href="mailto:sukritvemula@outlook.com?subject=SCRAPR Data Room Access"
                className="px-6 py-2.5 rounded-lg border border-white/[0.1] font-sans font-semibold text-xs tracking-wide text-white/60 hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300 text-center flex-1"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                Access Data Room
              </motion.a>
            </div>
          </div>
        </section>

        <BranchDivider />

        {/* ── FAQ ── */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <div className="inline-block relative z-10 bg-black/90 px-6 sm:px-8 py-3 rounded-full border border-white/[0.05] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] tracking-[0.35em] uppercase text-white/25 mb-1 sm:mb-2 font-body">FAQ</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground text-glow">
                  Questions answered.
                </h2>
              </div>
            </motion.div>
            <div>
              {[
                { q: "How does SCRAPR differ from traditional web scraping?", a: "SCRAPR uses network interception instead of DOM parsing. No browser overhead, no Selenium. Pure HTTP speed — 10-100x faster extraction." },
                { q: "Can I scrape JavaScript-heavy sites?", a: "Yes. SCRAPR intercepts the actual network calls the site makes, so JavaScript rendering is unnecessary. Works on SPAs, React, Vue, Next.js apps." },
                { q: "What about rate limiting and IP blocking?", a: "SCRAPR handles intelligent rate limiting and rotation out of the box. We support proxy integration for high-volume extraction." },
                { q: "Can I use actions to interact with sites?", a: "With the Action Engine, you can fill forms, click buttons, navigate flows, and extract data at each step sequentially." },
                { q: "Is my data secure?", a: "All data is encrypted in transit and at rest. We never store your scraped data. API keys are encrypted and rotated automatically." },
                { q: "Do I need to write parsing logic?", a: "No. SCRAPR returns structured JSON automatically. You specify the output format and we handle extraction. Zero CSS selectors." },
              ].map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── WAITLIST COUNTER ── */}
        <WaitlistCounter />

        {/* ── FOOTER ── */}
        <section className="px-4 sm:px-6 py-10 sm:py-14 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-14">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold text-foreground mb-3">
                Join the data layer for AI agents.
              </h3>
              <p className="text-xs sm:text-sm text-white/30 font-body mb-7 max-w-lg mx-auto">
                Get early access to SCRAPR — the infrastructure powering the next generation of AI-native data workflows.
              </p>
              <WaitlistForm source="footer" />
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-7 border-t border-white/[0.04] pt-10">
              {[
                { title: "Product", links: [{ l: "Features", h: "#features" }, { l: "Pricing", h: "#pricing" }, { l: "API", h: "#api" }, { l: "Status", h: "#" }] },
                { title: "Company", links: [{ l: "About", h: "#" }, { l: "Blog", h: "#" }, { l: "Careers", h: "#" }, { l: "Contact", h: "mailto:sukritvemula@outlook.com" }] },
                { title: "Legal", links: [{ l: "Privacy", h: "#" }, { l: "Terms", h: "#" }, { l: "Cookie Policy", h: "#" }, { l: "License", h: "#" }] },
                { title: "Connect", links: [{ l: "GitHub", h: "#" }, { l: "Twitter", h: "#" }, { l: "Discord", h: "#" }, { l: "Email", h: "mailto:sukritvemula@outlook.com" }] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 mb-3 font-body">{col.title}</p>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.l}>
                        <a href={link.h} className="text-xs text-white/25 hover:text-white/50 transition-colors duration-300 font-body">{link.l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center border-t border-white/[0.04] pt-7 mt-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <img src="/images/logo - nobg.png" alt="SCRAPR Logo" className="w-4 h-4 object-contain opacity-50" />
                <span className="text-xs font-sans font-medium text-white/15">SCRAPR</span>
              </div>
              <p className="text-[10px] text-white/10 tracking-[0.15em] font-body">v1.0 · © 2026 · All rights reserved</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Index;
