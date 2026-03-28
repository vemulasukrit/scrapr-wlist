import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface WaitlistCounterProps {
  dark?: boolean;
}

const WaitlistCounter = ({ dark = false }: WaitlistCounterProps) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { count: c } = await supabase
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      setCount(c ?? 0);
    };
    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="flex items-center gap-3"
    >
      <span
        className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight"
        style={{
          background: "linear-gradient(135deg, #C17B2A 0%, #E8A94D 50%, #C17B2A 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count.toLocaleString()}+
      </span>
      <span className={`text-sm font-body ${dark ? "text-white/40" : "text-stone-500"}`}>
        engineers on the waitlist
      </span>
    </motion.div>
  );
};

export default WaitlistCounter;
