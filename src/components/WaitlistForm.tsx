import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  source: "hero" | "footer";
}

const WaitlistForm = ({ source }: WaitlistFormProps) => {
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

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "success"}
            className="w-full h-full px-6 py-3.5 rounded-full bg-black/40 backdrop-blur-md border border-white/[0.15] text-white font-body text-base outline-none hover:bg-black/60 hover:border-white/[0.25] focus:border-white/[0.4] focus:bg-black/80 disabled:opacity-50 placeholder:text-white/40 transition-all duration-300 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="px-8 py-3.5 rounded-full bg-gradient-to-b from-white to-white/90 text-black font-sans font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2 border border-white/20 whitespace-nowrap"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 text-sm text-white/50 font-body"
        >
          You're on the list. We'll be in touch ✦
        </motion.p>
      )}
      {status === "duplicate" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 text-sm text-white/50 font-body"
        >
          Already on the list.
        </motion.p>
      )}
      {status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-4 text-sm text-red-400/70 font-body"
        >
          Something went wrong. Try again.
        </motion.p>
      )}
    </div>
  );
};

export default WaitlistForm;
