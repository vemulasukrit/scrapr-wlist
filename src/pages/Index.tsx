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
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }} />
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

            <motion.div
              className="mt-6 sm:mt-8 flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.div
                className="border-2 border-foreground p-4 sm:p-6 max-w-sm group hover:border-blue-400 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <img
                    alt="SCRAPR — Universal Web Scraping API"
                    src="https://ph-files.imgix.net/139cf19d-fb8c-475d-8dc3-264bbb9283ac.png?auto=format&fit=crop&w=64&h=64"
                    className="w-16 h-16 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-base sm:text-lg font-bold text-foreground leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">SCRAPR — Universal Web Scraping API</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-tight mt-1 line-clamp-2">Turn any website into an API</p>
                  </div>
                </div>
                <a
                  href="https://www.producthunt.com/products/scrapr-universal-web-scraping-api?embed=true&utm_source=embed&utm_medium=post_embed"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-foreground text-background font-mono text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-background hover:text-foreground border-2 border-foreground transition-colors group-hover:border-blue-400"
                >
                  View on PH →
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="hidden md:block relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            {/* Interactive CLI mockup - Simple brutalist card */}
            <motion.div
              className="border-2 border-foreground p-4 sm:p-5 md:p-6 h-full flex flex-col group hover:border-blue-400 transition-colors"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-base sm:text-lg font-mono font-bold text-foreground mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors">CLI Example</h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed mb-4">Parse any URL in seconds</p>
              <div className="font-mono text-xs sm:text-sm text-foreground space-y-2 flex-grow">
                <div><span className="text-muted-foreground">$</span> scrapr parse --url github.com</div>
                <div><span className="text-muted-foreground">✓</span> Extracted 459 repositories</div>
                <div><span className="text-muted-foreground">✓</span> Complete in 156ms</div>
              </div>
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
            <motion.div className="border-2 border-foreground bg-secondary p-3 sm:p-4 md:p-6 font-mono text-xs overflow-auto max-h-[350px] sm:max-h-[450px]">
              <motion.div
                className="text-muted-foreground mb-2 sm:mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-foreground">Status:</span> <span className="text-green-600">200 OK</span>
              </motion.div>
              <motion.div
                className="text-muted-foreground mb-2 sm:mb-3 text-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="text-foreground">Response time:</span> <span className="inline-block"><motion.span animate={{ opacity: [0, 1] }} transition={{ duration: 0.5, delay: 0.4 }}>6939ms</motion.span></span>
              </motion.div>

              <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-2 text-muted-foreground">
                {[
                  { title: "Requests for Startups", desc: "Y Combinator is looking for startups working on these ideas. If you're working on something we're interested in, we'd love to hear from you." },
                  { title: "Spring 2026", desc: "The way startups are built has shifted quickly. AI-native companies can now be built faster, cheaper, and with more ambition than ever.", isSection: true },
                  { title: "Cursor for Product Managers", desc: "Imagine a tool where you upload customer interviews and product usage data, ask \"what should we build next?\", and get the outline of a new feature complete with an explanation based on customer feedback." },
                  { title: "AI-Native Hedge Funds", desc: "The biggest funds in the world have been slow to adapt. We think the hedge funds of the future will use AI to come up with entirely new strategies." },
                  { title: "AI-Native Agencies", desc: "Agencies have always been tough to scale. But AI changes this—instead of selling software, charge way more by using it yourself and selling the finished product at 100x the price." },
                  { title: "Modern Metal Mills", desc: "American metal mills are slow by design. If you buy rolled aluminum or steel tube, lead times of 8-30 weeks are normal. Software and energy technology are finally good enough to rethink the system." },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className={item.isSection ? "text-xs font-bold text-foreground mb-1" : "text-xs font-bold text-foreground mb-0.5"}>{item.title}</h3>
                    <p className="text-xs">{item.desc}</p>
                  </motion.div>
                ))}

                <motion.p
                  className="text-xs pt-2 border-t border-border"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  ✓ Response contains 16,087 characters | ✓ Page parsed in 6939ms | ✓ 12 embeds detected
                </motion.p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* HEADLINE */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground relative">
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-50"
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-20 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-50"
          animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-2 sm:mb-3 relative">
              THE API FOR
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-2 sm:mb-3">
              THE ENTIRE
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground text-center mb-6 sm:mb-8 relative">
              INTERNET
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />
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
      <ScrollReveal>
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground">
          <div className="max-w-4xl">
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-5 uppercase">// api reference</p>
            <div className="border-2 border-foreground bg-secondary px-3 sm:px-5 py-2 sm:py-3 mb-6 sm:mb-8 inline-block">
              <span className="font-mono text-base sm:text-lg font-bold text-foreground">GET</span>
              <span className="font-mono text-base sm:text-lg font-bold text-foreground ml-2 sm:ml-4">/api/scrape</span>
            </div>
            
            <h4 className="font-mono text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4 uppercase">Parameters</h4>
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {[
                { param: "url", desc: "required · target URL to scrape" },
                { param: "output", desc: "json | markdown · default: markdown" },
                { param: "interactive", desc: "boolean · default: true" },
              ].map((row) => (
                <div key={row.param} className="border-b border-foreground pb-2 sm:pb-3">
                  <div className="font-mono font-bold text-foreground text-sm mb-0.5">{row.param}</div>
                  <div className="text-muted-foreground font-sans text-xs">{row.desc}</div>
                </div>
              ))}
            </div>
            
            <h4 className="font-mono text-sm sm:text-base font-bold text-foreground mb-3 sm:mb-4 uppercase">Responses</h4>
            <div className="flex gap-2 flex-wrap">
              <div className="border-2 border-foreground px-3 sm:px-4 py-1.5 sm:py-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-foreground">200 OK</span>
              </div>
              <div className="border-2 border-foreground px-3 sm:px-4 py-1.5 sm:py-2">
                <span className="font-mono text-xs sm:text-sm font-bold text-foreground">422 Validation Error</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {[
              { title: "Book flights & hotels", desc: "Search availability, compare prices, complete purchase flows automatically." },
              { title: "Fill out forms", desc: "Submit applications, fill registration, complete checkout flows programmatically." },
              { title: "Make reservations", desc: "Book restaurants, schedule appointments, reserve venues via natural language." },
            ].map((cap, idx) => (
              <ScrollReveal key={cap.title} delay={idx * 0.2}>
                <motion.div
                  className="border border-foreground p-4 sm:p-5 md:p-6 h-full flex flex-col group hover:border-purple-400 transition-colors"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-mono text-xs text-muted-foreground tracking-widest mb-2 sm:mb-3 block uppercase group-hover:text-purple-400 transition-colors">Action</span>
                  <h4 className="text-base sm:text-lg md:text-xl font-mono font-bold text-foreground mb-2 sm:mb-3 leading-tight group-hover:text-purple-400 transition-colors">{cap.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed flex-grow">{cap.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
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
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-12 sm:py-16 border-t border-foreground relative">
          <motion.div
            className="absolute top-6 right-20 w-3 h-3 bg-blue-500 rounded-full opacity-40"
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-20 w-2 h-2 bg-purple-500 rounded-full opacity-40"
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          />
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <WaitlistForm source="footer" />
            </motion.div>
            <motion.p
              className="text-center font-mono text-xs text-muted-foreground mt-6 sm:mt-8 tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              SCRAPR · v1.0 · © 2026
            </motion.p>
          </div>
        </section>
      </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;
