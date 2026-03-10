import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import LiveDemo from "@/components/LiveDemo";
import WaitlistCounter from "@/components/WaitlistCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Terminal, Code, Zap, ChevronDown, TrendingUp, BarChart3, GitBranch, Database, Cpu, X, Loader2, Play, RefreshCw } from "lucide-react";

// FAQ Item Component
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="border border-foreground p-4 sm:p-5 md:p-6 group hover:border-foreground/60 transition-all cursor-pointer backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-base sm:text-lg font-mono font-bold text-foreground leading-tight group-hover:text-foreground/80 transition-colors">
            {question}
          </h4>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-foreground group-hover:text-foreground" />
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  );
};

const LiveDemoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const examples = [
    { 
      url: "github.com/trending", 
      cmd: "scrapr extract github.com/trending",
      time: "156ms",
      json: {
        projects: [
          { name: "litestar", stars: "2.4k", desc: "Python API framework" },
          { name: "mastodon", stars: "32k", desc: "Decentralized social network" },
          { name: "nuxt", stars: "98k", desc: "Vue.js framework" }
        ]
      }
    },
    { 
      url: "news.ycombinator.com", 
      cmd: "scrapr extract news.ycombinator.com",
      time: "89ms",
      json: {
        stories: [
          { title: "Show HN: I built an AI data layer", points: "247", comments: "89" },
          { title: "The future of RAG pipelines", points: "512", comments: "156" },
          { title: "Building autonomous agents", points: "389", comments: "67" }
        ]
      }
    },
    { 
      url: "producthunt.com", 
      cmd: "scrapr extract producthunt.com",
      time: "112ms",
      json: {
        products: [
          { name: "SCRAPR", category: "Developer Tools", votes: "521" },
          { name: "Cursor AI", category: "AI Code Editor", votes: "892" },
          { name: "Bolt", category: "AI App Builder", votes: "734" }
        ]
      }
    },
    { 
      url: "hackernews.io", 
      cmd: "scrapr extract hackernews.io",
      time: "203ms",
      json: {
        items: [
          { title: "Show HN: Scrapr - AI Data Layer", by: "sukrit", score: "156" },
          { title: "Ask HN: Best practices for RAG", by: "ai_dev", score: "89" },
          { title: "Launch: Beta access now open", by: "founder", score: "234" }
        ]
      }
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [examples.length]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);
    
    const current = examples[activeIndex];
    const jsonStr = JSON.stringify(current.json, null, 2);
    const lines = jsonStr.split('\n');

    let delay = 0;
    lines.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (i === lines.length - 1) {
          setTimeout(() => setIsRunning(false), 300);
        }
      }, delay);
      delay += 80 + Math.random() * 50;
    });
  };

  return (
    <motion.div
      className="border border-foreground/30 p-4 md:p-5 backdrop-blur-sm group hover:border-foreground/50 transition-all"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-mono font-bold text-foreground">Live Demo</h4>
        <div className="flex gap-1">
          {examples.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setOutput([]); }}
              className={`w-2 h-2 transition-colors ${i === activeIndex ? 'bg-foreground' : 'bg-foreground/30 hover:bg-foreground/60'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 bg-secondary/50 border border-foreground/20 px-3 py-2">
          <span className="font-mono text-xs text-foreground/80">{examples[activeIndex].url}</span>
        </div>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-3 py-2 bg-foreground text-background font-mono text-xs font-bold hover:bg-foreground/80 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isRunning ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
          {isRunning ? "Running" : "Run"}
        </button>
      </div>

      <div className="bg-secondary/30 border border-foreground/20 p-3 font-mono text-xs min-h-[140px]">
        {output.length === 0 ? (
          <div className="text-muted-foreground/50">
            <p>$ {examples[activeIndex].cmd}</p>
            <p className="mt-2 text-[10px]">Click Run to see live extraction...</p>
          </div>
        ) : (
          <div className="space-y-1">
            {output.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.startsWith('$') ? 'text-muted-foreground' : line.startsWith('→') ? 'text-foreground/60' : 'text-foreground'}
              >
                {line}
              </motion.p>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 text-[10px] font-mono">
        <span className="text-muted-foreground">{examples[activeIndex].time}</span>
        <span className="text-foreground/60">Structured JSON</span>
      </div>
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden bg-background relative">
      {/* Background - subtle monochrome */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      </div>
      <div className="relative z-10">
        {/* NAV */}
        <motion.nav
          className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-32 py-3 sm:py-4 border-b border-foreground sticky top-0 z-50 backdrop-blur-sm"
          style={{ backgroundColor: "hsla(var(--background) / 0.95)" }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="font-mono font-bold text-lg sm:text-xl tracking-widest text-foreground">SCRAPR</span>
            <div className="hidden sm:flex gap-4 sm:gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Docs</a>
              <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="hover:text-foreground transition-colors">Blog</a>
            </div>
          </div>
          <span className="font-mono text-[10px] sm:text-xs border border-foreground px-2 sm:px-3 py-1 text-foreground tracking-widest">
            v1.0
          </span>
        </motion.nav>

        {/* HERO */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div>
              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {["WAITLIST", "IN DEVELOPMENT", "SEEKING FUNDRAISERS", "FREE TO JOIN"].map((pill, i) => (
                  <motion.span
                    key={pill}
                    className={`font-mono text-[11px] sm:text-xs border px-2 sm:px-3 py-1 sm:py-2 tracking-wide hover:opacity-80 transition-all ${pill === "WAITLIST"
                        ? "bg-foreground text-background border-foreground"
                        : pill === "IN DEVELOPMENT"
                          ? "bg-foreground/80 text-background border-foreground/80"
                          : pill === "SEEKING FUNDRAISERS"
                            ? "bg-foreground/60 text-background border-foreground/60"
                            : "border-foreground text-foreground"
                      }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    {pill}
                  </motion.span>
                ))}
              </motion.div>

              <motion.h1
                className="text-2xl sm:text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                THE DATA<br />
                LAYER BETWEEN<br />
                THE WEB<br />
                AND<br />
                AI
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {["STRUCTURED DATA", "AGENTS", "AI PIPELINES"].map((feature, i) => (
                  <motion.span
                    key={feature}
                    className="font-mono text-[11px] sm:text-xs border border-foreground px-2 sm:px-3 py-1 sm:py-2 text-foreground tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 + i * 0.08 }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mb-4 sm:mb-6 font-sans leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                SCRAPR converts websites into structured data that AI models and autonomous agents can reliably understand. Currently in private beta—join the waitlist for early access.
              </motion.p>

              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95 }}
              >
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-foreground font-mono mb-3 tracking-widest uppercase">
                    Join Early Access
                  </p>
                  <WaitlistForm source="hero" />
                </div>
                <p className="text-xs text-muted-foreground font-sans mt-3">
                  Interested in fundraising? <a href="mailto:sukritvemula@outlook.com" className="text-foreground hover:underline underline-offset-4">Connect with us</a>
                </p>
              </motion.div>
            </div>

            <motion.div
              className="hidden md:block relative space-y-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              {/* Product Hunt Card - Glassy Monochrome */}
              <motion.div
                className="border border-foreground/30 p-5 md:p-6 group hover:border-foreground/60 transition-all flex justify-center items-center backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <a 
                  href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-center gap-3 px-4 py-2 border border-foreground/40 hover:border-foreground/80 transition-colors bg-background/50 backdrop-blur">
                    <div className="w-8 h-8 flex items-center justify-center border border-foreground/60">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold tracking-wide">SCRAPR</span>
                      <span className="font-mono text-[10px] text-muted-foreground tracking-wider">#5 Product of the Day</span>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Live CLI Demo */}
              <LiveDemoCarousel />
            </motion.div>

            {/* Mobile Product Hunt - Visible */}
            <motion.div
              className="md:hidden mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center gap-3 px-4 py-3 border border-foreground/40 bg-background/50 backdrop-blur">
                  <div className="w-8 h-8 flex items-center justify-center border border-foreground/60">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold tracking-wide">SCRAPR</span>
                    <span className="font-mono text-[10px] text-muted-foreground tracking-wider">#5 Product of the Day</span>
                  </div>
                </div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* FUNDRAISING CTA - PROMINENT */}
        <section className="px-0 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-24 md:py-32 border-t-4 border-b-4 border-foreground">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block border-2 border-foreground px-4 py-2 mb-8">
                <p className="font-mono text-xs sm:text-sm tracking-widest uppercase">Seeking Investment</p>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-mono font-bold mb-6 leading-tight">
                BUILD THE<br />DATA LAYER
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
                AI agents need structured web data. We're building the infrastructure. Proven on Product Hunt. Ready to scale globally.
              </p>
            </motion.div>

            {/* FUNDING STATS - PROMINENT */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 mb-16">
              {[
                { icon: TrendingUp, label: "PH Rank", value: "#5", desc: "Product of Day" },
                { icon: BarChart3, label: "Waitlist", value: "400+", desc: "Signups" },
                { icon: Database, label: "Status", value: "MVP", desc: "Bootstrapped" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-4" />
                    <p className="text-4xl sm:text-5xl font-mono font-bold mb-2">{stat.value}</p>
                    <p className="font-mono text-xs tracking-widest uppercase mb-1">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs - PROMINENT */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <a
                href="mailto:sukritvemula@outlook.com"
                className="px-10 py-5 bg-foreground text-background font-mono font-bold text-sm tracking-widest uppercase hover:bg-foreground/80 transition-colors border-2 border-foreground"
              >
                Let's Talk
              </a>
              <a
                href="mailto:sukritvemula@outlook.com?subject=SCRAPR Investment"
                className="px-10 py-5 border-2 border-foreground font-mono font-bold text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
              >
                Investor Inquiry
              </a>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans text-center font-mono tracking-widest">
              FOUNDED IN INDIA • BOOTSTRAPPED • PRE-SEED • YC/VC PITCH READY
            </p>
          </div>
        </section>

        {/* THE PITCH */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Why We're Raising</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                The Real Problem We're Solving
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-2 border-foreground p-6 space-y-4"
              >
                <h4 className="font-mono text-lg font-bold text-foreground">Bootstrapped MVP</h4>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Built SCRAPR to solve our own data extraction pain points. Validated the market on Product Hunt. Now we're raising seed to:
                </p>
                <ul className="space-y-2 text-sm font-sans text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>Scale hosting and infrastructure globally</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>Build the team and accelerate product</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>Go-to-market for AI agent ecosystem</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>Target YC & tier-1 VC backing</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-foreground p-6 space-y-4"
              >
                <h4 className="font-mono text-lg font-bold text-foreground">The Opportunity</h4>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Web scraping is a $300M+ market. AI agents need clean data. We're building the infrastructure layer for the agentic era.
                </p>
                <ul className="space-y-2 text-sm font-sans text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>Zero-maintenance = lower churn</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>10x cheaper = massive TAM</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>A/I-ready positioning = future-proof</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">→</span>
                    <span>Founder-led from India = lean unit economics</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* API EXAMPLE */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <ScrollReveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-4 uppercase">How It Works</p>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-6 sm:mb-8">
              One API call. Structured data back.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* REQUEST EXAMPLE */}
            <ScrollReveal direction="left">
              <motion.div
                className="border-2 border-foreground p-3 sm:p-4 md:p-6"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs text-foreground/50">EXAMPLE REQUEST</span>
                </div>
                
                <div className="bg-secondary border border-foreground/30 p-4 font-mono text-xs sm:text-sm">
                  <p className="text-foreground/60 mb-2">curl -X GET \</p>
                  <p className="text-foreground/60">  "https://api.scrapr.sh/v1/extract" \</p>
                  <p className="text-foreground/60">  -H "Authorization: Bearer YOUR_KEY" \</p>
                  <p className="text-foreground/60">  -d url="https://example.com" \</p>
                  <p className="text-foreground/60">  -d output=json</p>
                </div>

                <div className="mt-4 pt-4 border-t border-foreground/20">
                  <p className="font-mono text-[10px] text-foreground/40 mb-2">RESPONSE →</p>
                  <pre className="font-mono text-[10px] text-foreground/70 overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "title": "Example Domain",
    "content": "...",
    "schema": "auto-detected"
  },
  "meta": { "time_ms": 89 }
}`}
                  </pre>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* USE CASES */}
            <ScrollReveal direction="right">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { title: "AI Agents", desc: "Give agents real-time web data without browser overhead" },
                  { title: "RAG Pipelines", desc: "Convert websites into structured knowledge for LLMs" },
                  { title: "Market Intelligence", desc: "Extract insights from any site at scale" },
                  { title: "Dataset Creation", desc: "Build training data from unstructured sources" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-foreground/30 p-4 hover:border-foreground/60 transition-colors"
                  >
                    <h4 className="font-mono text-sm font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* HEADLINE */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-2 sm:mb-3">
                STOP FIXING
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-2 sm:mb-3">
                BROKEN SCRAPERS
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-6 sm:mb-8">
                START SCALING DATA
              </h2>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                {["Zero maintenance.", "Network-native.", "AI-ready."].map((text, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <p className="font-mono text-xs sm:text-lg md:text-xl font-bold text-foreground">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* WHY AI SYSTEMS STRUGGLE */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">The Problem</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Why AI Systems Struggle With The Web
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="border-2 border-foreground p-6 md:p-8 flex flex-col justify-center bg-secondary/30"
              >
                <p className="font-sans text-lg sm:text-xl text-foreground font-bold mb-4">
                  Websites are built for humans, not AI systems.
                </p>
                <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                  HTML is messy, dynamic, and constantly changing. Traditional scrapers break when UI updates, leaving agents and pipelines with fragile dependencies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-2 border-foreground p-6 md:p-8 flex flex-col justify-center border-blue-400 bg-foreground/5 group"
              >
                <p className="font-sans text-lg sm:text-xl text-foreground font-bold mb-4 group-hover:text-blue-500 transition-colors">
                  The SCRAPR Solution
                </p>
                <p className="font-sans text-sm sm:text-base text-foreground leading-relaxed">
                  SCRAPR extracts structured data directly from how sites load information, so AI systems receive clean, reliable data instead of fragile HTML.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROCESS FLOW DIAGRAM */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">The Flow</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                How SCRAPR Works
              </h3>
            </ScrollReveal>

            {/* Visual Flow - Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="border-2 border-foreground p-8 mb-12 bg-secondary hidden md:block"
            >
              <div className="flex items-center justify-between">
                {[
                  { icon: Code, label: "WEBSITES" },
                  { icon: GitBranch, label: "SCRAPR" },
                  { icon: Database, label: "STRUCTURED DATA" },
                  { icon: Cpu, label: "AI MODELS" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                      >
                        {<item.icon className="w-8 h-8 text-foreground" />}
                      </motion.div>
                      <p className="font-mono text-xs text-muted-foreground text-center">{item.label}</p>
                    </div>
                    {idx < 3 && <p className="font-mono text-2xl text-foreground flex-shrink-0 mx-2">↓</p>}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual Flow - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="border-2 border-foreground p-6 mb-12 bg-secondary md:hidden space-y-4"
            >
              {[
                { icon: Code, label: "WEBSITES" },
                { icon: GitBranch, label: "SCRAPR" },
                { icon: Database, label: "STRUCTURED DATA" },
                { icon: Cpu, label: "AI MODELS" },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-3 mb-3">
                    {<item.icon className="w-6 h-6 text-foreground flex-shrink-0" />}
                    <p className="font-mono text-sm font-bold text-foreground">{item.label}</p>
                  </div>
                  {idx < 3 && <div className="flex justify-center mb-3"><p className="font-mono text-lg text-foreground">↓</p></div>}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Process</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Websites in. AI Data out.
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { num: "01", title: "Input a Website", desc: "Provide any webpage or domain to standard pipeline APIs." },
                { num: "02", title: "SCRAPR Analyzes", desc: "SCRAPR detects how the site loads its data through APIs and network layers." },
                { num: "03", title: "Extract Structure", desc: "Content is transformed into structured, machine-readable data." },
                { num: "04", title: "Deliver AI-Ready", desc: "Perfect for LLM pipelines, autonomous agents, and data ingestion." },
              ].map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.2}>
                  <motion.div
                    className="border border-foreground p-4 sm:p-5 md:p-6 h-full flex flex-col group hover:border-foreground/60 transition-colors"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-mono text-sm sm:text-base font-bold text-foreground tracking-widest block mb-2 sm:mb-3 group-hover:text-foreground transition-colors">{step.num}</span>
                    <h4 className="text-base sm:text-lg md:text-xl font-mono font-bold mb-2 sm:mb-3 text-foreground leading-tight group-hover:text-foreground transition-colors">{step.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed flex-grow">{step.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES IN ACTION */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Use Cases</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Works everywhere.
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                {
                  icon: GitBranch,
                  title: "AI Agents",
                  desc: "Give agents reliable access to real-time web data directly without browser overhead.",
                },
                {
                  icon: Database,
                  title: "RAG Pipelines",
                  desc: "Convert websites into structured knowledge sources tailored directly for dense embedding arrays.",
                },
                {
                  icon: TrendingUp,
                  title: "Market Intelligence",
                  desc: "Extract structured insights and real-time updates from across the web at massive scale.",
                },
                {
                  icon: Code,
                  title: "Dataset Creation",
                  desc: "Generate clean and massive datasets suitable for LLM fine-tuning entirely from unstructured sites.",
                },
              ].map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <motion.div
                      className="border border-foreground p-4 sm:p-5 md:p-6 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <IconComponent className="w-5 h-5 text-foreground group-hover:text-blue-500" />
                        <h4 className="text-base sm:text-lg font-mono font-bold text-foreground group-hover:text-foreground transition-colors">
                          {feature.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-4 flex-grow">
                        {feature.desc}
                      </p>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* API REFERENCE */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 sm:mb-16">
                <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">// api reference</p>
                <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground">
                  Built for developers.
                </h3>
              </div>
            </ScrollReveal>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* GET Endpoint - spans 2 columns on desktop */}
              <ScrollReveal direction="up" delay={0}>
                <motion.div
                  className="md:col-span-2 border-2 border-foreground p-4 sm:p-6 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-4">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-foreground text-background font-mono text-xs font-bold tracking-widest">GET</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-foreground group-hover:text-foreground transition-colors">/api/scrape</span>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-2 group-hover:text-foreground transition-colors">Parameters</h4>
                    <div className="space-y-2">
                      <div className="border-l-2 border-foreground/30 pl-2.5">
                        <div className="font-mono text-xs font-bold text-foreground">url</div>
                        <p className="text-xs text-muted-foreground font-sans mt-0.5">string, required</p>
                      </div>
                      <div className="border-l-2 border-foreground/30 pl-2.5">
                        <div className="font-mono text-xs font-bold text-foreground">output</div>
                        <p className="text-xs text-muted-foreground font-sans mt-0.5">json | markdown | xml</p>
                      </div>
                      <div className="border-l-2 border-foreground/30 pl-2.5">
                        <div className="font-mono text-xs font-bold text-foreground">interactive</div>
                        <p className="text-xs text-muted-foreground font-sans mt-0.5">boolean · Default: true</p>
                      </div>
                      <div className="border-l-2 border-foreground/30 pl-2.5">
                        <div className="font-mono text-xs font-bold text-foreground">timeout</div>
                        <p className="text-xs text-muted-foreground font-sans mt-0.5">integer · Default: 30000ms</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-foreground pt-4 mt-auto">
                    <p className="text-xs font-mono text-muted-foreground">Response: <span className="text-foreground font-bold">200 OK</span> or <span className="text-foreground font-bold">422 Error</span></p>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Curl Example */}
              <ScrollReveal direction="up" delay={0.1}>
                <motion.div
                  className="border-2 border-foreground p-4 sm:p-5 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-3 group-hover:text-foreground transition-colors">Quick Start</h4>
                  <pre className="bg-secondary border border-foreground/30 p-2.5 text-[10px] sm:text-xs overflow-x-auto font-mono text-foreground leading-tight flex-grow">
                    {`curl https://api.scrapr.sh \\
  -H "Authorization: KEY" \\
  -G --data-urlencode \\
  "url=https://example.com"`}
                  </pre>
                </motion.div>
              </ScrollReveal>

              {/* POST Endpoint */}
              <ScrollReveal direction="up" delay={0.2}>
                <motion.div
                  className="border-2 border-foreground p-4 sm:p-5 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2 py-0.5 bg-foreground text-background font-mono text-xs font-bold tracking-widest">POST</span>
                    <span className="font-mono text-xs font-bold text-foreground group-hover:text-foreground transition-colors">/api/scrape</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-sans mb-3">For complex operations like form fills, clicks, and actions.</p>
                  <div className="space-y-1.5 flex-grow">
                    <div className="border-l-2 border-foreground/30 pl-2">
                      <p className="font-mono text-xs font-bold text-foreground">actions</p>
                      <p className="text-xs text-muted-foreground">Click, fill, submit</p>
                    </div>
                    <div className="border-l-2 border-foreground/30 pl-2">
                      <p className="font-mono text-xs font-bold text-foreground">webhook</p>
                      <p className="text-xs text-muted-foreground">Get notified</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Success Response */}
              <ScrollReveal direction="up" delay={0.3}>
                <motion.div
                  className="md:col-span-2 border-2 border-foreground p-4 sm:p-5 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-3 group-hover:text-foreground transition-colors">200 OK Response</h4>
                  <pre className="bg-secondary border border-foreground/30 p-2.5 text-[10px] sm:text-xs overflow-x-auto font-mono text-foreground leading-tight flex-grow">
                    {`{
  "status": "success",
  "data": {
    "title": "...",
    "content": "...",
    "links": []
  },
  "meta": {
    "time_ms": 234,
    "url": "https://..."
  }
}`}
                  </pre>
                </motion.div>
              </ScrollReveal>

              {/* Error Response */}
              <ScrollReveal direction="up" delay={0.4}>
                <motion.div
                  className="border-2 border-foreground p-4 sm:p-5 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-3 group-hover:text-foreground transition-colors">422 Error</h4>
                  <pre className="bg-secondary border border-foreground/30 p-2.5 text-[10px] sm:text-xs overflow-x-auto font-mono text-foreground leading-tight flex-grow">
                    {`{
  "status": "error",
  "error": {
    "code": "INVALID_URL",
    "message": "Valid URL required"
  }
}`}
                  </pre>
                </motion.div>
              </ScrollReveal>

              {/* Status Codes */}
              <ScrollReveal direction="up" delay={0.5}>
                <motion.div
                  className="md:col-span-3 border-2 border-foreground p-4 sm:p-5 group hover:border-foreground/60 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-4 group-hover:text-foreground transition-colors">// HTTP Status Codes</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 sm:gap-2">
                    {[
                      { code: "200", status: "OK" },
                      { code: "400", status: "Bad Req" },
                      { code: "401", status: "Unauth" },
                      { code: "422", status: "Validation" },
                      { code: "429", status: "Rate Limit" },
                      { code: "500", status: "Error" },
                    ].map((item) => (
                      <div key={item.code} className="border border-foreground/50 p-1.5 text-center leading-tight">
                        <p className="font-mono font-bold text-foreground text-xs sm:text-sm">{item.code}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.status}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Why Teams Love SCRAPR</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Built for scale.
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                { stat: "10x", label: "Faster than Puppeteer", icon: Zap },
                { stat: "0ms", label: "Setup time", icon: Terminal },
                { stat: "200+", label: "Integrations", icon: Code },
                { stat: "99.9%", label: "Uptime SLA", icon: Check },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <motion.div
                      className="border border-foreground p-4 sm:p-5 md:p-6 text-center group hover:border-foreground/60 transition-colors"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent className="w-6 h-6 text-foreground mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <motion.div
                        className="text-2xl sm:text-3xl font-mono font-bold text-foreground mb-2 group-hover:text-foreground transition-colors"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        {item.stat}
                      </motion.div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-sans">{item.label}</p>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Capabilities</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                AI-Ready Data Extraction
              </h3>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* LLM Context */}
              <ScrollReveal delay={0}>
                <motion.div
                  className="border-2 border-foreground p-4 sm:p-5 md:p-6 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-mono text-xs text-muted-foreground tracking-widest mb-3 block uppercase group-hover:text-foreground transition-colors">For LLMs</span>
                  <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 leading-tight group-hover:text-foreground transition-colors">LLM Context Windows</h4>

                  <div className="bg-secondary border border-foreground/50 p-3 mb-4 flex-grow font-mono text-[10px]">
                    <p className="text-foreground/40 mb-2">// Structured for context</p>
                    <pre className="text-foreground/80 overflow-x-auto">
{`{
  "title": "GitHub Trending",
  "chunks": [
    {
      "repo": "litestar",
      "stars": "2.4k",
      "topic": ["api", "python"]
    }
  ],
  "embeddings_ready": true
}`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">Extract structured data optimized for LLM context windows and RAG pipelines.</p>
                </motion.div>
              </ScrollReveal>

              {/* Autonomous Agents */}
              <ScrollReveal delay={0.1}>
                <motion.div
                  className="border-2 border-foreground p-4 sm:p-5 md:p-6 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-mono text-xs text-muted-foreground tracking-widest mb-3 block uppercase group-hover:text-foreground transition-colors">For Agents</span>
                  <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 leading-tight group-hover:text-foreground transition-colors">Autonomous Actions</h4>

                  <div className="bg-secondary border border-foreground3 mb-4 flex-grow font-m/50 p-ono text-[10px]">
                    <p className="text-foreground/40 mb-2">// Agent-readable actions</p>
                    <pre className="text-foreground/80 overflow-x-auto">
{`{
  "actions": [
    {
      "type": "click",
      "target": ".submit-btn",
      "selector": "#form button"
    },
    {
      "type": "fill",
      "field": "email",
      "value": "user@ai.com"
    }
  ],
  "state": "ready_to_execute"
}`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">Give agents actionable steps to interact with any website programmatically.</p>
                </motion.div>
              </ScrollReveal>

              {/* Data Pipelines */}
              <ScrollReveal delay={0.2}>
                <motion.div
                  className="border-2 border-foreground p-4 sm:p-5 md:p-6 group hover:border-foreground/60 transition-colors h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-mono text-xs text-muted-foreground tracking-widest mb-3 block uppercase group-hover:text-foreground transition-colors">For Pipelines</span>
                  <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 leading-tight group-hover:text-foreground transition-colors">Structured Outputs</h4>

                  <div className="bg-secondary border border-foreground/50 p-3 mb-4 flex-grow font-mono text-[10px]">
                    <p className="text-foreground/40 mb-2">// Multiple formats</p>
                    <div className="flex gap-2 mb-2">
                      <span className="border border-foreground/30 px-1">JSON</span>
                      <span className="border border-foreground/30 px-1">Markdown</span>
                      <span className="border border-foreground/30 px-1">CSV</span>
                      <span className="border border-foreground/30 px-1">XML</span>
                    </div>
                    <pre className="text-foreground/80 overflow-x-auto">
{`{
  "status": "success",
  "items": [...],
  "pagination": {...},
  "metadata": {...}
}`}
                    </pre>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">Output in any format your data pipeline needs. Instant integration.</p>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Pricing</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Pay for what you use.
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                {
                  name: "FREE",
                  price: "$0",
                  features: [
                    "1,000 requests/month",
                    "JSON output",
                    "Community support",
                    "Basic rate limits",
                  ],
                  cta: "START FREE",
                },
                {
                  name: "PRO",
                  price: "$49/mo",
                  features: [
                    "100,000 requests/month",
                    "All file formats",
                    "Priority support",
                    "Webhook notifications",
                    "Action engine access",
                  ],
                  cta: "GET PRO",
                },
                {
                  name: "ENTERPRISE",
                  price: "Custom",
                  features: [
                    "Unlimited requests",
                    "Dedicated infrastructure",
                    "99.9% SLA",
                    "Custom integrations",
                    "Team training",
                  ],
                  cta: "CONTACT SALES",
                },
              ].map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 0.2}>
                  <motion.div
                    className="border-2 border-foreground p-4 sm:p-5 md:p-6 flex flex-col h-full group hover:border-foreground/60 hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-mono font-bold text-foreground text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-foreground transition-colors">{plan.name}</h4>
                    <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 group-hover:text-foreground transition-colors">{plan.price}</p>
                    <ul className="space-y-1.5 sm:space-y-2 flex-grow">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Comparison</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Why SCRAPR?
              </h3>
            </ScrollReveal>
            <ScrollReveal direction="up">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="font-mono font-bold text-foreground text-left py-3 px-4 border-b-2 border-foreground text-xs">Feature</th>
                      <th className="font-mono font-bold text-foreground text-center py-3 px-4 border-b-2 border-foreground text-xs bg-secondary">SCRAPR</th>
                      <th className="font-mono font-bold text-foreground text-center py-3 px-4 border-b-2 border-foreground text-xs">Puppeteer</th>
                      <th className="font-mono font-bold text-foreground text-center py-3 px-4 border-b-2 border-foreground text-xs">Scrapy</th>
                      <th className="font-mono font-bold text-foreground text-center py-3 px-4 border-b-2 border-foreground text-xs">Bright Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Speed", data: [{ val: "<200ms", good: true }, { val: "5-15s", good: false }, { val: "1-5s", good: false }, { val: "2-8s", good: false }] },
                      { feature: "Browser Required", data: [{ val: "NO", good: true }, { val: "YES", good: false }, { val: "NO", good: true }, { val: "YES", good: false }] },
                      { feature: "Network Interception", data: [{ val: "YES", good: true }, { val: "NO", good: false }, { val: "NO", good: false }, { val: "NO", good: false }] },
                      { feature: "File Formats", data: [{ val: "ALL", good: true }, { val: "HTML", good: false }, { val: "HTML", good: false }, { val: "HTML", good: false }] },
                      { feature: "Setup Time", data: [{ val: "0 min", good: true }, { val: "30+ min", good: false }, { val: "45+ min", good: false }, { val: "15+ min", good: false }] },
                    ].map((row, idx) => (
                      <tr key={row.feature} className={idx % 2 === 0 ? "bg-secondary bg-opacity-20" : ""}>
                        <td className="font-mono font-bold text-foreground py-3 px-4 border-b border-foreground text-xs text-left">{row.feature}</td>
                        {row.data.map((item, i) => (
                          <td key={i} className={`text-center py-3 px-4 border-b border-foreground text-xs ${i === 0 ? "bg-secondary bg-opacity-40" : ""}`}>
                            <div className="flex items-center justify-center gap-2 font-mono">
                              <span className={item.good ? "font-bold text-foreground" : "text-muted-foreground"}>{item.val}</span>
                              {item.good ? (
                                <Check className="w-3.5 h-3.5 text-foreground" />
                              ) : (
                                <X className="w-3.5 h-3.5 text-muted-foreground opacity-40" />
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {[
                  { feature: "Speed", data: [{ tool: "SCRAPR", val: "<200ms", good: true }, { tool: "Puppeteer", val: "5-15s", good: false }, { tool: "Scrapy", val: "1-5s", good: false }, { tool: "Bright Data", val: "2-8s", good: false }] },
                  { feature: "Browser Required", data: [{ tool: "SCRAPR", val: "NO", good: true }, { tool: "Puppeteer", val: "YES", good: false }, { tool: "Scrapy", val: "NO", good: true }, { tool: "Bright Data", val: "YES", good: false }] },
                  { feature: "Network Interception", data: [{ tool: "SCRAPR", val: "YES", good: true }, { tool: "Puppeteer", val: "NO", good: false }, { tool: "Scrapy", val: "NO", good: false }, { tool: "Bright Data", val: "NO", good: false }] },
                  { feature: "File Formats", data: [{ tool: "SCRAPR", val: "ALL", good: true }, { tool: "Puppeteer", val: "HTML", good: false }, { tool: "Scrapy", val: "HTML", good: false }, { tool: "Bright Data", val: "HTML", good: false }] },
                  { feature: "Setup Time", data: [{ tool: "SCRAPR", val: "0 min", good: true }, { tool: "Puppeteer", val: "30+ min", good: false }, { tool: "Scrapy", val: "45+ min", good: false }, { tool: "Bright Data", val: "15+ min", good: false }] },
                ].map((row, idx) => (
                  <motion.div key={row.feature} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} className="border-2 border-foreground p-4 space-y-3">
                    <p className="font-mono font-bold text-foreground text-sm">{row.feature}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {row.data.map((item, i) => (
                        <div key={i} className={`border border-foreground p-3 flex flex-col items-center gap-1 ${item.good ? "bg-secondary" : ""}`}>
                          <span className="font-mono text-xs text-muted-foreground text-center">{item.tool}</span>
                          <div className="flex items-center gap-1 justify-center">
                            <span className={`font-mono text-xs font-bold ${item.good ? "text-foreground" : "text-muted-foreground"}`}>{item.val}</span>
                            {item.good ? (
                              <Check className="w-3 h-3 text-foreground" />
                            ) : (
                              <X className="w-3 h-3 text-muted-foreground opacity-40" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ/Q&A */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">FAQ</p>
              <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
                Questions answered.
              </h3>
            </ScrollReveal>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  q: "How does SCRAPR differ from traditional web scraping?",
                  a: "SCRAPR uses network interception instead of DOM parsing, making it 10-100x faster. No browser overhead, no Selenium, pure HTTP speed.",
                },
                {
                  q: "Can I scrape JavaScript-heavy sites?",
                  a: "Yes! SCRAPR's engine intercepts the actual network calls the site makes, so JavaScript rendering is unnecessary. It works on SPAs, React apps, Vue apps, etc.",
                },
                {
                  q: "What about rate limiting and IP blocking?",
                  a: "SCRAPR handles intelligent rate limiting and rotation out of the box. We also support proxy integration for high-volume scraping.",
                },
                {
                  q: "Can I use actions to interact with sites?",
                  a: "Absolutely. With the Action Engine, you can fill forms, click buttons, navigate flows, and extract data at each step sequentially.",
                },
                {
                  q: "Is my data secure?",
                  a: "Yes. All data is encrypted in transit and at rest. We never store your scraped data. Your API keys are encrypted and rotated automatically.",
                },
                {
                  q: "Do I need to write parsing logic?",
                  a: "No! SCRAPR returns structured JSON automatically. You can specify the output format and we'll handle extraction. No CSS selectors needed.",
                },
              ].map((item, idx) => (
                <FAQItem key={idx} question={item.q} answer={item.a} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST COUNTER */}
        <ScrollReveal direction="none">
          <div className="border-t border-foreground">
            <WaitlistCounter />
          </div>
        </ScrollReveal>

        {/* FOOTER CTA */}
        <ScrollReveal>
          <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-foreground mb-4 sm:mb-6 text-center">Join the data layer for AI agents.</h3>
                <p className="text-sm sm:text-base text-muted-foreground font-sans text-center mb-8 sm:mb-10 max-w-2xl mx-auto">Get early access to SCRAPR—the infrastructure powering the next generation of AI-native data workflows. Enterprise-grade extraction without the maintenance headaches or the enterprise price tag.</p>
                <div className="flex justify-center mb-12 sm:mb-16">
                  <WaitlistForm source="footer" />
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-foreground pt-8 sm:pt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Product</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans">
                    <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">API Docs</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Company</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans">
                    <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Legal</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans">
                    <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">License</a></li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">Connect</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground font-sans">
                    <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Email</a></li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="text-center border-t border-foreground pt-8 sm:pt-10 mt-8 sm:mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="font-mono text-xs text-muted-foreground tracking-widest">
                  SCRAPR · v1.0 · © 2026 · All rights reserved
                </p>
              </motion.div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;
