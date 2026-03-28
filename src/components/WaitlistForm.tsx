import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface WaitlistFormProps {
  source: "hero" | "footer";
  dark?: boolean;
}

const WaitlistForm = ({ source, dark = false }: WaitlistFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("waitlist").insert({ email, source });
      if (error) {
        if (error.code === "23505") {
          setStatus("duplicate");
        } else {
          setStatus("error");
        }
      } else {
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-3 px-6 py-4 rounded-full border ${
          dark
            ? "bg-white/[0.05] border-white/10 text-white/70"
            : "bg-amber-50 border-amber-200/60 text-amber-800"
        }`}
      >
        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${dark ? "text-amber-400" : "text-amber-600"}`} />
        <span className="font-body text-sm">You're in. We'll reach out when doors open.</span>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === "loading"}
            className={`w-full px-5 py-3.5 rounded-full font-body text-sm outline-none transition-all duration-300 disabled:opacity-50 placeholder:font-body ${
              dark
                ? "bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:border-amber-400/50 focus:bg-white/[0.09] focus:shadow-[0_0_0_3px_rgba(193,123,42,0.15)]"
                : "bg-white border border-black/8 text-stone-800 placeholder:text-stone-400 shadow-sm focus:border-amber-400/70 focus:shadow-[0_0_0_3px_rgba(193,123,42,0.12)]"
            }`}
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === "loading"}
          className="px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #C17B2A 0%, #A86720 100%)",
            color: "#FDFBF7",
            boxShadow: "0 2px 12px rgba(193,123,42,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 4px 24px rgba(193,123,42,0.45), inset 0 1px 0 rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.98 }}
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {status === "duplicate" && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mt-3 text-xs font-body ${dark ? "text-white/40" : "text-stone-500"}`}
        >
          Already registered — we've got you.
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-3 text-xs text-red-500 font-body"
        >
          Something went wrong. Try again.
        </motion.p>
      )}
    </div>
  );
};

export default WaitlistForm;
