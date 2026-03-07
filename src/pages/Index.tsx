import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import WaitlistForm from "@/components/WaitlistForm";
import LiveDemo from "@/components/LiveDemo";
import WaitlistCounter from "@/components/WaitlistCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { Check } from "lucide-react";

const HeroGlobe = lazy(() => import("@/components/HeroGlobe"));

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden bg-background">
      {/* NAV */}
      <motion.nav
        className="flex items-center justify-between px-4 sm:px-6 md:px-16 lg:px-32 py-6 sm:py-8 border-b border-foreground sticky top-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "hsla(var(--background) / 0.95)" }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="font-mono font-bold text-xl sm:text-2xl tracking-widest text-foreground">SCRAPR</span>
        <span className="font-mono text-xs border border-foreground px-2 sm:px-3 py-1 sm:py-2 text-foreground tracking-widest text-[10px] sm:text-xs">
          v1.0
        </span>
      </motion.nav>

      {/* HERO */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-16 sm:py-24 md:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div>
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12"
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
              className="text-3xl sm:text-5xl md:text-7xl font-mono font-bold tracking-tight text-foreground mb-6 sm:mb-8 leading-tight"
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
              className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12"
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
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 sm:mb-12 font-sans leading-relaxed"
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
            className="hidden md:flex items-center justify-center h-screen max-h-[700px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <Suspense fallback={<div className="w-full h-[600px] bg-secondary" />}>
              <HeroGlobe />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* LIVE DEMO */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
        <ScrollReveal>
          <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-8 uppercase">Live Demo</p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground mb-8 sm:mb-16">
            Enter a URL and click run to see live extraction...
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* INPUT PANEL */}
          <ScrollReveal direction="left">
            <div className="border-2 border-foreground p-4 sm:p-6 md:p-8">
              <label className="font-mono text-xs text-muted-foreground tracking-widest block mb-3 sm:mb-4 uppercase">URL</label>
              <div className="flex gap-2 mb-6 sm:mb-8">
                <input
                  type="text"
                  value="https://www.ycombinator.com/rfs"
                  className="flex-1 bg-background border border-foreground font-mono text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 text-foreground focus:outline-none overflow-x-auto"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div>
                  <label className="font-mono text-xs text-muted-foreground tracking-widest block mb-1 sm:mb-2 uppercase">output</label>
                  <div className="border border-foreground bg-secondary px-2 sm:px-4 py-1.5 sm:py-2">
                    <span className="font-mono text-xs sm:text-sm text-foreground">markdown</span>
                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs text-muted-foreground tracking-widest block mb-1 sm:mb-2 uppercase">interactive</label>
                  <div className="border border-foreground bg-secondary px-2 sm:px-4 py-1.5 sm:py-2">
                    <span className="font-mono text-xs sm:text-sm text-foreground">true</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-foreground text-background font-mono font-bold py-2.5 sm:py-3 px-4 sm:px-6 hover:bg-background hover:text-foreground border-2 border-foreground transition-colors text-sm sm:text-base">
                RUN
              </button>

              <p className="text-xs text-muted-foreground mt-4 sm:mt-6 font-sans leading-relaxed">
                APIs are shared across Parse to improve speed for everyone. Never include passwords or sensitive data.
              </p>
            </div>
          </ScrollReveal>

          {/* RESPONSE PANEL */}
          <ScrollReveal direction="right">
            <div className="border-2 border-foreground bg-secondary p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm overflow-auto max-h-[400px] sm:max-h-[600px]">
              <div className="text-muted-foreground mb-4 sm:mb-6">
                <span className="text-foreground">Status:</span> <span className="text-green-600">200 OK</span>
              </div>
              <div className="text-muted-foreground mb-3 sm:mb-4 text-xs">
                <span className="text-foreground">Response time:</span> 6939ms
              </div>

              <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-3 sm:space-y-4 text-muted-foreground">
                <div>
                  <h1 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">Requests for Startups</h1>
                  <p className="text-xs sm:text-sm">Y Combinator is looking for startups working on these ideas. If you're working on something we're interested in, we'd love to hear from you.</p>
                </div>

                <div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground mb-1 sm:mb-2">Spring 2026</h2>
                  <p className="text-xs sm:text-sm">The way startups are built has shifted quickly. AI-native companies can now be built faster, cheaper, and with more ambition than ever.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1">Cursor for Product Managers</h3>
                  <p className="text-xs sm:text-sm">Imagine a tool where you upload customer interviews and product usage data, ask "what should we build next?", and get the outline of a new feature complete with an explanation based on customer feedback.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1">AI-Native Hedge Funds</h3>
                  <p className="text-xs sm:text-sm">The biggest funds in the world have been slow to adapt. We think the hedge funds of the future will use AI to come up with entirely new strategies.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1">AI-Native Agencies</h3>
                  <p className="text-xs sm:text-sm">Agencies have always been tough to scale. But AI changes this—instead of selling software, charge way more by using it yourself and selling the finished product at 100x the price.</p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1">Modern Metal Mills</h3>
                  <p className="text-xs sm:text-sm">American metal mills are slow by design. If you buy rolled aluminum or steel tube, lead times of 8-30 weeks are normal. Software and energy technology are finally good enough to rethink the system.</p>
                </div>

                <p className="text-xs pt-3 sm:pt-4 border-t border-border">
                  ✓ Response contains 16,087 characters | ✓ Page parsed in 6939ms | ✓ 12 embeds detected
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* HEADLINE */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 md:py-48 border-t border-foreground">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-mono font-bold tracking-tight text-foreground text-center mb-4 sm:mb-8">
              THE API FOR
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-mono font-bold tracking-tight text-foreground text-center mb-4 sm:mb-8">
              THE ENTIRE
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-8xl font-mono font-bold tracking-tight text-foreground text-center mb-10 sm:mb-20">
              INTERNET
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 text-center">
              <div>
                <p className="font-mono text-sm sm:text-2xl md:text-3xl font-bold text-foreground mb-1">Every site.</p>
              </div>
              <div>
                <p className="font-mono text-sm sm:text-2xl md:text-3xl font-bold text-foreground mb-1">Every action.</p>
              </div>
              <div>
                <p className="font-mono text-sm sm:text-2xl md:text-3xl font-bold text-foreground mb-1">One API.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* PROCESS */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-6 uppercase">Process</p>
            <h3 className="text-2xl sm:text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground mb-12 sm:mb-20">
              URL in. API out.
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { num: "01", title: "Send a URL", desc: "Drop any URL into the API. Webpage, PDF, DOCX, XLSX, feed." },
              { num: "02", title: "Engine intercepts", desc: "SCRAPR reverse-engineers the site's real network calls." },
              { num: "03", title: "Get clean JSON", desc: "Structured data back in under 200ms. No parsing needed." },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.2}>
                <div className="border border-foreground p-6 sm:p-8 md:p-10 h-full flex flex-col">
                  <span className="font-mono text-base sm:text-lg font-bold text-foreground tracking-widest block mb-4 sm:mb-6">{step.num}</span>
                  <h4 className="text-lg sm:text-2xl md:text-3xl font-mono font-bold mb-4 sm:mb-6 text-foreground leading-tight">{step.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed flex-grow">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* API REFERENCE */}
      <ScrollReveal>
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
          <div className="max-w-4xl">
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-8 sm:mb-12 uppercase">// api reference</p>
            <div className="border-2 border-foreground bg-secondary px-4 sm:px-8 py-4 sm:py-6 mb-12 sm:mb-16 inline-block">
              <span className="font-mono text-lg sm:text-2xl font-bold text-foreground">GET</span>
              <span className="font-mono text-lg sm:text-2xl font-bold text-foreground ml-3 sm:ml-6">/api/scrape</span>
            </div>
            
            <h4 className="font-mono text-base sm:text-lg font-bold text-foreground mb-6 sm:mb-8 uppercase">Parameters</h4>
            <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
              {[
                { param: "url", desc: "required · target URL to scrape" },
                { param: "output", desc: "json | markdown · default: markdown" },
                { param: "interactive", desc: "boolean · default: true" },
              ].map((row) => (
                <div key={row.param} className="border-b border-foreground pb-4 sm:pb-6">
                  <div className="font-mono font-bold text-foreground text-base sm:text-lg mb-1 sm:mb-2">{row.param}</div>
                  <div className="text-muted-foreground font-sans text-sm sm:text-base">{row.desc}</div>
                </div>
              ))}
            </div>
            
            <h4 className="font-mono text-base sm:text-lg font-bold text-foreground mb-6 sm:mb-8 uppercase">Responses</h4>
            <div className="flex gap-2 sm:gap-4 flex-wrap">
              <div className="border-2 border-foreground px-3 sm:px-6 py-2 sm:py-4">
                <span className="font-mono text-sm sm:text-base font-bold text-foreground">200 OK</span>
              </div>
              <div className="border-2 border-foreground px-3 sm:px-6 py-2 sm:py-4">
                <span className="font-mono text-sm sm:text-base font-bold text-foreground">422 Validation Error</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CAPABILITIES */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-6 uppercase">Capabilities</p>
            <h3 className="text-2xl sm:text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground mb-12 sm:mb-20">
              Read and Act.
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { title: "Book flights & hotels", desc: "Search availability, compare prices, complete purchase flows automatically." },
              { title: "Fill out forms", desc: "Submit applications, fill registration, complete checkout flows programmatically." },
              { title: "Make reservations", desc: "Book restaurants, schedule appointments, reserve venues via natural language." },
            ].map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 0.2}>
                <div className="border border-foreground p-6 sm:p-8 md:p-10 h-full flex flex-col">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-6 block uppercase">Action</span>
                  <h4 className="text-lg sm:text-2xl md:text-3xl font-mono font-bold text-foreground mb-4 sm:mb-6 leading-tight">{cap.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground font-sans leading-relaxed flex-grow">{cap.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-6 uppercase">Pricing</p>
            <h3 className="text-2xl sm:text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground mb-12 sm:mb-20">
              Pay for what you use.
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                <div className="border-2 border-foreground p-6 sm:p-8 md:p-10 flex flex-col h-full">
                  <h4 className="font-mono font-bold text-foreground text-2xl sm:text-3xl mb-3 sm:mb-4">{plan.name}</h4>
                  <p className="font-mono text-3xl sm:text-5xl font-bold text-foreground mb-8 sm:mb-12">{plan.price}</p>
                  <ul className="space-y-2 sm:space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full border-2 border-foreground bg-foreground text-background font-mono font-bold py-3 sm:py-4 px-4 sm:px-6 hover:bg-background hover:text-foreground transition-colors text-sm sm:text-lg">
                    {plan.cta}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 sm:mb-6 uppercase">Comparison</p>
            <h3 className="text-2xl sm:text-4xl md:text-6xl font-mono font-bold tracking-tight text-foreground mb-12 sm:mb-20">
              Why SCRAPR?
            </h3>
          </ScrollReveal>
          <ScrollReveal direction="up">
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm font-sans border-collapse">
                <thead>
                  <tr>
                    <th className="font-mono font-bold text-foreground text-left py-3 sm:py-6 px-2 sm:px-6 border-b-2 border-foreground">Feature</th>
                    <th className="font-mono font-bold text-foreground text-center py-3 sm:py-6 px-1 sm:px-6 border-b-2 border-foreground text-xs sm:text-sm">SCRAPR</th>
                    <th className="font-mono font-bold text-foreground text-center py-3 sm:py-6 px-1 sm:px-6 border-b-2 border-foreground text-xs sm:text-sm">Puppeteer</th>
                    <th className="font-mono font-bold text-foreground text-center py-3 sm:py-6 px-1 sm:px-6 border-b-2 border-foreground text-xs sm:text-sm">Scrapy</th>
                    <th className="font-mono font-bold text-foreground text-center py-3 sm:py-6 px-1 sm:px-6 border-b-2 border-foreground text-xs sm:text-sm">Bright Data</th>
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
                      <td className="font-mono font-bold text-foreground py-3 sm:py-6 px-2 sm:px-6 border-b border-foreground text-xs sm:text-sm">{row.feature}</td>
                      {row.values.map((val, i) => (
                        <td key={i} className="text-center text-muted-foreground py-3 sm:py-6 px-1 sm:px-6 border-b border-foreground font-sans text-xs sm:text-sm">
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

      {/* WAITLIST COUNTER */}
      <ScrollReveal direction="none">
        <div className="border-t border-foreground">
          <WaitlistCounter />
        </div>
      </ScrollReveal>

      {/* FOOTER CTA */}
      <ScrollReveal>
        <section className="px-4 sm:px-6 md:px-16 lg:px-32 py-20 sm:py-32 border-t border-foreground">
          <div className="max-w-lg mx-auto text-center">
            <WaitlistForm source="footer" />
            <p className="text-center font-mono text-xs text-muted-foreground mt-10 sm:mt-16 tracking-widest">
              SCRAPR · v1.0 · © 2026
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Index;
