import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    <section className="px-6 md:px-16 lg:px-32 py-20 text-center">
      <p className="font-mono text-3xl md:text-5xl tracking-tight text-foreground">
        {count.toLocaleString()}
      </p>
      <p className="font-mono text-sm text-muted-foreground mt-2 tracking-widest">
        engineers already waiting
      </p>
    </section>
  );
};

export default WaitlistCounter;
