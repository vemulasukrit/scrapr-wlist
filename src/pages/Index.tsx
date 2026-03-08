import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import LiveDemo from "@/components/LiveDemo";
import WaitlistCounter from "@/components/WaitlistCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, Terminal, Code, Zap, ChevronDown } from "lucide-react";

// FAQ Item Component
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="border border-foreground p-4 sm:p-5 md:p-6 group hover:border-blue-400 transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-base sm:text-lg font-mono font-bold text-foreground leading-tight group-hover:text-blue-400 transition-colors">
            {question}
          </h4>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-foreground group-hover:text-blue-400" />
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

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden bg-background relative">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-50 opacity-40" />
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
              {["AVG RESPONSE < 200MS", "MCP NATIVE", "REST + JSON", "FREE TO START"].map((pill, i) => (
                <motion.span
                  key={pill}
                  className="font-mono text-[11px] sm:text-xs border border-foreground px-2 sm:px-3 py-1 sm:py-2 text-foreground tracking-wide hover:bg-foreground hover:text-background transition-colors"
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
              PARSE —<br />
              TURN ANY<br />
              WEBSITE<br />
              INTO AN<br />
              API
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {["NO BROWSER", "NO SELENIUM", "PURE HTTP SPEED"].map((feature, i) => (
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
              Turn any URL into structured data. No browsers. No code. No API keys for sources.
            </motion.p>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
            >
              <WaitlistForm source="hero" />
            </motion.div>
          </div>

          <motion.div
            className="hidden md:block relative space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {/* Product Hunt Card */}
            <motion.div
              className="border-2 border-foreground p-5 md:p-6 group hover:border-blue-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  alt="SCRAPR — Universal Web Scraping API"
                  src="https://ph-files.imgix.net/139cf19d-fb8c-475d-8dc3-264bbb9283ac.png?auto=format&fit=crop&w=56&h=56"
                  className="w-14 h-14 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-1">Featured On</p>
                  <h3 className="font-mono text-base font-bold text-foreground leading-tight group-hover:text-blue-400 transition-colors">Product Hunt</h3>
                </div>
              </div>
              <a
                href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api?embed=true&utm_source=embed&utm_medium=post_embed"
                target="_blank"
                rel="noopener"
                className="block w-full text-center px-3 py-2 bg-foreground text-background font-mono text-xs font-bold tracking-widest uppercase hover:bg-background hover:text-foreground border-2 border-foreground transition-colors"
              >
                View Product
              </a>
            </motion.div>

            {/* CLI Example Mockup */}
            <motion.div
              className="border-2 border-foreground p-5 md:p-6 flex flex-col group hover:border-blue-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-sm font-mono font-bold text-foreground mb-3 group-hover:text-blue-400 transition-colors">Try it now</h4>
              <div className="bg-secondary border border-foreground p-3 mb-3 flex-grow">
                <div className="font-mono text-xs text-foreground space-y-1.5">
                  <div><span className="text-muted-foreground">$</span> scrapr parse --url github.com</div>
                  <div><span className="text-muted-foreground">✓</span> Extracted 459 repos</div>
                  <div><span className="text-muted-foreground">✓</span> Complete 156ms</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">Instant extraction into JSON or any format</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
        <ScrollReveal>
          <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-4 uppercase">Live Demo</p>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-6 sm:mb-8">
            Enter a URL and click run to see live extraction...
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* INPUT PANEL */}
          <ScrollReveal direction="left">
            <motion.div
              className="border-2 border-foreground p-3 sm:p-4 md:p-6 group hover:border-blue-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label className="font-mono text-xs text-muted-foreground tracking-widest block mb-2 sm:mb-3 uppercase">URL</label>
              <div className="flex gap-2 mb-4 sm:mb-5">
                <input
                  type="text"
                  value="https://www.ycombinator.com/rfs"
                  className="flex-1 bg-background border border-foreground font-mono text-xs px-3 py-2 text-foreground focus:outline-none overflow-x-auto"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-5">
                <div>
                  <label className="font-mono text-xs text-muted-foreground tracking-widest block mb-1 uppercase">output</label>
                  <div className="border border-foreground bg-secondary px-2 sm:px-3 py-1 sm:py-1.5">
                    <span className="font-mono text-xs text-foreground">markdown</span>
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground tracking-widest block mb-1 uppercase">interactive</label>
                  <div className="border border-foreground bg-secondary px-2 sm:px-3 py-1 sm:py-1.5">
                    <span className="font-mono text-xs text-foreground">true</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-foreground text-background font-mono font-bold py-2 px-4 hover:bg-background hover:text-foreground border-2 border-foreground transition-colors text-xs sm:text-sm group">
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  RUN
                </motion.span>
              </button>

              <p className="text-xs text-muted-foreground mt-3 sm:mt-4 font-sans leading-relaxed">
                APIs are shared across Parse to improve speed for everyone. Never include passwords or sensitive data.
              </p>
            </motion.div>
          </ScrollReveal>

          {/* RESPONSE PANEL */}
          <ScrollReveal direction="right">
            <motion.div className="border-2 border-foreground bg-secondary p-4 sm:p-5 md:p-6 font-mono text-xs overflow-auto max-h-[350px] sm:max-h-[450px]">
              <motion.div
                className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-muted-foreground"><span className="text-foreground">Status:</span> 200 OK</p>
                <p className="text-muted-foreground mt-1"><span className="text-foreground">Response time:</span> 234ms</p>
              </motion.div>

              <div className="space-y-3 text-muted-foreground leading-relaxed">
                {[
                  { title: "Requests for Startups", desc: "Y Combinator is looking for startups working on these ideas." },
                  { title: "Spring 2026", desc: "The way startups are built has shifted quickly. AI-native companies..." },
                  { title: "Cursor for Product Managers", desc: "Imagine a tool where you upload customer interviews..." },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-foreground font-bold text-xs">{item.title}</p>
                    <p className="text-xs mt-0.5">{item.desc}</p>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-3 sm:pt-4 border-t border-foreground mt-3 sm:mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xs text-foreground">✓ 3 results | ✓ 412 chars | ✓ Clean JSON ready</p>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* HEADLINE */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-2 sm:mb-3">
              THE API FOR
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-2 sm:mb-3">
              THE ENTIRE
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-6 sm:mb-8">
              INTERNET
            </h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              {["Every site.", "Every action.", "One API."].map((text, idx) => (
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

      {/* PROCESS */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 uppercase">Process</p>
            <h3 className="text-lg sm:text-2xl md:text-4xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-10">
              URL in. API out.
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { num: "01", title: "Send a URL", desc: "Drop any URL into the API. Webpage, PDF, DOCX, XLSX, feed." },
              { num: "02", title: "Engine intercepts", desc: "SCRAPR reverse-engineers the site's real network calls." },
              { num: "03", title: "Get clean JSON", desc: "Structured data back in under 200ms. No parsing needed." },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.2}>
                <motion.div
                  className="border border-foreground p-4 sm:p-5 md:p-6 h-full flex flex-col group hover:border-blue-400 transition-colors"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-mono text-sm sm:text-base font-bold text-foreground tracking-widest block mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">{step.num}</span>
                  <h4 className="text-base sm:text-lg md:text-xl font-mono font-bold mb-2 sm:mb-3 text-foreground leading-tight group-hover:text-blue-400 transition-colors">{step.title}</h4>
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
                icon: Code,
                title: "REST API",
                desc: "Standard HTTP endpoints with JSON responses. Works with any language, framework, or platform.",
                code: `curl -X POST https://api.scrapr.sh/parse \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -d '{
    "url": "https://example.com",
    "output": "json"
  }'`,
              },
              {
                icon: Terminal,
                title: "CLI Tool",
                desc: "Command-line interface for quick one-off scrapes or automation scripts.",
                code: `scrapr parse --url https://example.com \\
  --selector ".product" \\
  --output json \\
  | jq '.[] | {name, price}'`,
              },
              {
                icon: Zap,
                title: "Webhooks",
                desc: "Real-time notifications when scraping completes. Perfect for background jobs.",
                code: `scrapr parse --url https://example.com \\
  --webhook https://your-server.com/hook \\
  --async true`,
              },
              {
                icon: Check,
                title: "SDKs",
                desc: "Official SDKs for Python, Node.js, Go, and Rust. More coming soon.",
                code: `from scrapr import Client

client = Client(api_key="YOUR_KEY")
result = client.parse(
  url="https://example.com"
)
print(result.json())`,
              },
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <motion.div
                    className="border border-foreground p-4 sm:p-5 md:p-6 group hover:border-blue-400 transition-colors h-full flex flex-col"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <IconComponent className="w-5 h-5 text-blue-400 group-hover:text-blue-500" />
                      <h4 className="text-base sm:text-lg font-mono font-bold text-foreground group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-4 flex-grow">
                      {feature.desc}
                    </p>
                    <div className="border border-foreground bg-secondary p-3 sm:p-4 overflow-x-auto flex-grow">
                      <pre className="font-mono text-xs text-foreground leading-relaxed whitespace-pre">
                        {feature.code}
                      </pre>
                    </div>
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
                className="md:col-span-2 border-2 border-foreground p-4 sm:p-6 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-foreground text-background font-mono text-xs font-bold tracking-widest">GET</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-foreground group-hover:text-blue-400 transition-colors">/api/scrape</span>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-2 group-hover:text-blue-400 transition-colors">Parameters</h4>
                  <div className="space-y-2">
                    <div className="border-l-2 border-blue-400/50 pl-2.5">
                      <div className="font-mono text-xs font-bold text-foreground">url</div>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">string, required</p>
                    </div>
                    <div className="border-l-2 border-blue-400/50 pl-2.5">
                      <div className="font-mono text-xs font-bold text-foreground">output</div>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">json | markdown | xml</p>
                    </div>
                    <div className="border-l-2 border-blue-400/50 pl-2.5">
                      <div className="font-mono text-xs font-bold text-foreground">interactive</div>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">boolean · Default: true</p>
                    </div>
                    <div className="border-l-2 border-blue-400/50 pl-2.5">
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
                className="border-2 border-foreground p-4 sm:p-5 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-3 group-hover:text-blue-400 transition-colors">Quick Start</h4>
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
                className="border-2 border-foreground p-4 sm:p-5 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block px-2 py-0.5 bg-foreground text-background font-mono text-xs font-bold tracking-widest">POST</span>
                  <span className="font-mono text-xs font-bold text-foreground group-hover:text-blue-400 transition-colors">/api/scrape</span>
                </div>
                <p className="text-xs text-muted-foreground font-sans mb-3">For complex operations like form fills, clicks, and actions.</p>
                <div className="space-y-1.5 flex-grow">
                  <div className="border-l-2 border-blue-400/50 pl-2">
                    <p className="font-mono text-xs font-bold text-foreground">actions</p>
                    <p className="text-xs text-muted-foreground">Click, fill, submit</p>
                  </div>
                  <div className="border-l-2 border-blue-400/50 pl-2">
                    <p className="font-mono text-xs font-bold text-foreground">webhook</p>
                    <p className="text-xs text-muted-foreground">Get notified</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Success Response */}
            <ScrollReveal direction="up" delay={0.3}>
              <motion.div
                className="md:col-span-2 border-2 border-foreground p-4 sm:p-5 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-3 group-hover:text-blue-400 transition-colors">200 OK Response</h4>
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
                className="border-2 border-foreground p-4 sm:p-5 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-3 group-hover:text-blue-400 transition-colors">422 Error</h4>
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
                className="md:col-span-3 border-2 border-foreground p-4 sm:p-5 group hover:border-blue-400 transition-colors"
                whileHover={{ scale: 1.01 }}
              >
                <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-widest mb-4 group-hover:text-blue-400 transition-colors">// HTTP Status Codes</h4>
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
                    className="border border-foreground p-4 sm:p-5 md:p-6 text-center group hover:border-blue-400 transition-colors"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="w-6 h-6 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <motion.div
                      className="text-2xl sm:text-3xl font-mono font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors"
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
              Read and Act.
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Book Flights & Hotels */}
            <ScrollReveal delay={0}>
              <motion.div
                className="border-2 border-foreground p-4 sm:p-5 md:p-6 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-mono text-xs text-muted-foreground tracking-widest mb-3 block uppercase group-hover:text-blue-400 transition-colors">Action 01</span>
                <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 leading-tight group-hover:text-blue-400 transition-colors">Book flights & hotels</h4>
                
                {/* Mockup */}
                <div className="bg-secondary border border-foreground/50 p-3 mb-4 flex-grow">
                  <div className="text-xs space-y-2">
                    <motion.div
                      className="border-b border-foreground/30 pb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-mono font-bold text-foreground">SEARCH→</p>
                      <p className="text-muted-foreground">JFK to LAX</p>
                    </motion.div>
                    
                    <motion.div
                      className="border-b border-foreground/30 pb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-mono font-bold text-foreground">COMPARE</p>
                      <p className="text-muted-foreground">3 flights • $450-$890</p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-mono font-bold text-foreground">BOOK ✓</p>
                      <p className="text-muted-foreground">Confirmed in 2s</p>
                    </motion.div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">Search availability, compare prices, complete purchase flows automatically.</p>
              </motion.div>
            </ScrollReveal>

            {/* Fill out forms */}
            <ScrollReveal delay={0.1}>
              <motion.div
                className="border-2 border-foreground p-4 sm:p-5 md:p-6 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-mono text-xs text-muted-foreground tracking-widest mb-3 block uppercase group-hover:text-blue-400 transition-colors">Action 02</span>
                <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 leading-tight group-hover:text-blue-400 transition-colors">Fill out forms</h4>

                {/* Mockup */}
                <div className="bg-secondary border border-foreground/50 p-3 mb-4 flex-grow space-y-2">
                  <div className="text-xs space-y-1.5">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="origin-left"
                    >
                      <div className="border-b border-foreground/30 pb-1">
                        <p className="font-mono text-foreground/60 text-[10px]">name</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="origin-left"
                    >
                      <div className="border-b border-foreground/30 pb-1">
                        <p className="font-mono text-foreground/60 text-[10px]">email</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="origin-left"
                    >
                      <div className="border-b border-foreground/30 pb-1">
                        <p className="font-mono text-foreground/60 text-[10px]">message</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-mono font-bold text-foreground">SUBMIT ✓</p>
                    </motion.div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">Submit applications, fill registration, complete checkout flows programmatically.</p>
              </motion.div>
            </ScrollReveal>

            {/* Make reservations */}
            <ScrollReveal delay={0.2}>
              <motion.div
                className="border-2 border-foreground p-4 sm:p-5 md:p-6 group hover:border-blue-400 transition-colors h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-mono text-xs text-muted-foreground tracking-widest mb-3 block uppercase group-hover:text-blue-400 transition-colors">Action 03</span>
                <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-4 leading-tight group-hover:text-blue-400 transition-colors">Make reservations</h4>

                {/* Mockup */}
                <div className="bg-secondary border border-foreground/50 p-3 mb-4 flex-grow">
                  <div className="text-xs space-y-2">
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="border-b border-foreground/30 pb-2"
                    >
                      <p className="font-mono font-bold text-foreground">PARSE</p>
                      <p className="text-muted-foreground text-[10px]">Find restaurant</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                      className="border-b border-foreground/30 pb-2"
                    >
                      <p className="font-mono font-bold text-foreground">SELECT</p>
                      <p className="text-muted-foreground text-[10px]">8 PM • Party of 4</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                      className="bg-foreground text-background px-2 py-1 mt-2"
                    >
                      <p className="font-mono font-bold text-[11px]">BOOKED ✓</p>
                    </motion.div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">Book restaurants, schedule appointments, reserve venues via natural language.</p>
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
                  className="border-2 border-foreground p-4 sm:p-5 md:p-6 flex flex-col h-full group hover:border-blue-400 hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-mono font-bold text-foreground text-lg sm:text-xl mb-2 sm:mb-3 group-hover:text-blue-400 transition-colors">{plan.name}</h4>
                  <p className="font-mono text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 group-hover:text-blue-400 transition-colors">{plan.price}</p>
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
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-sans border-collapse">
                <thead>
                  <tr>
                    <th className="font-mono font-bold text-foreground text-left py-2 sm:py-3 px-2 sm:px-3 border-b-2 border-foreground text-xs">Feature</th>
                    <th className="font-mono font-bold text-foreground text-center py-2 sm:py-3 px-1 sm:px-3 border-b-2 border-foreground text-xs">SCRAPR</th>
                    <th className="font-mono font-bold text-foreground text-center py-2 sm:py-3 px-1 sm:px-3 border-b-2 border-foreground text-xs">Puppeteer</th>
                    <th className="font-mono font-bold text-foreground text-center py-2 sm:py-3 px-1 sm:px-3 border-b-2 border-foreground text-xs">Scrapy</th>
                    <th className="font-mono font-bold text-foreground text-center py-2 sm:py-3 px-1 sm:px-3 border-b-2 border-foreground text-xs">Bright Data</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Speed", values: ["<200ms", "5-15s", "1-5s", "2-8s"] },
                    { feature: "Browser Required", values: ["NO", "YES", "NO", "YES"] },
                    { feature: "Network Interception", values: ["YES", "NO", "NO", "NO"] },
                    { feature: "File Formats", values: ["ALL", "HTML", "HTML", "HTML"] },
                    { feature: "Setup Time", values: ["0 min", "30+ min", "45+ min", "15+ min"] },
                  ].map((row, idx) => (
                    <tr key={row.feature} className={idx % 2 === 0 ? "bg-secondary" : ""}>
                      <td className="font-mono font-bold text-foreground py-2 sm:py-3 px-2 sm:px-3 border-b border-foreground text-xs">{row.feature}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className="text-center text-muted-foreground py-2 sm:py-3 px-1 sm:px-3 border-b border-foreground font-sans text-xs">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-foreground mb-4 sm:mb-6 text-center">Ready to parse anything?</h3>
              <p className="text-sm sm:text-base text-muted-foreground font-sans text-center mb-8 sm:mb-10 max-w-2xl mx-auto">Join thousands of developers using SCRAPR to extract structured data from any website instantly.</p>
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
