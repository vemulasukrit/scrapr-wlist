import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={status === "success"}
        className="flex-1 px-4 py-3 border border-foreground bg-background text-foreground font-mono text-sm focus:outline-none focus:border-accent disabled:opacity-50 placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="px-6 py-3 bg-foreground text-primary-foreground font-mono text-sm tracking-widest uppercase transition-opacity duration-150 hover:opacity-80 disabled:opacity-50 border border-foreground"
      >
        {status === "loading" ? "..." : "Get Early Access"}
      </button>
      {status === "success" && (
        <p className="sm:ml-4 mt-2 sm:mt-0 self-center font-mono text-xs text-muted-foreground">
          you're on the list. we'll be in touch.
        </p>
      )}
      {status === "duplicate" && (
        <p className="sm:ml-4 mt-2 sm:mt-0 self-center font-mono text-xs text-muted-foreground">
          already on the list.
        </p>
      )}
      {status === "error" && (
        <p className="sm:ml-4 mt-2 sm:mt-0 self-center font-mono text-xs text-terminal-red">
          something went wrong. try again.
        </p>
      )}
    </form>
  );
};

export default WaitlistForm;
