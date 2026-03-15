import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const WaitlistCounter = () => {
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
    <section className="py-20 sm:py-28 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-5xl sm:text-7xl font-sans font-bold text-foreground text-glow tracking-tight">
          {count.toLocaleString()}
        </p>
        <p className="text-sm text-white/40 mt-3 tracking-[0.2em] uppercase font-body">
          engineers already waiting
        </p>
      </motion.div>
    </section>
  );
};

export default WaitlistCounter;
