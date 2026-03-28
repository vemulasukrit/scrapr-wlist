import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Check } from "lucide-react";

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

  if (status === "success" || status === "duplicate") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center gap-2 px-4 py-3 border-2 ${
          dark 
            ? "border-amber-500 bg-amber-500/10 text-amber-400" 
            : "border-stone-900 bg-stone-900 text-white"
        }`}
      >
        <Check className="w-4 h-4" />
        <span className="font-bold text-sm">You're on the list</span>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter your email"
        disabled={status === "loading"}
        className={`flex-1 px-4 py-3 text-sm outline-none transition-colors ${
          dark
            ? "bg-white text-black placeholder:text-stone-400 border-2 border-r-0 border-stone-900"
            : "bg-white text-black placeholder:text-stone-400 border-2 border-r-0 border-stone-900"
        }`}
      />
      <motion.button
        type="submit"
        disabled={status === "loading"}
        className={`px-6 py-3 font-bold text-sm uppercase tracking-wide border-2 transition-colors ${
          dark
            ? "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
            : "border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <span className="flex items-center gap-2">
            Join <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </motion.button>
    </form>
  );
};

export default WaitlistForm;
