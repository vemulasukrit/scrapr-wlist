import { useState } from "react";

const LiveDemo = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    if (!url) return;
    setLoading(true);
    setOutput(null);
    setError(null);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const apiKey = import.meta.env.VITE_API_KEY || "";
      const headers: Record<string, string> = {};
      if (apiKey) headers["X-API-Key"] = apiKey;

      const res = await fetch(
        `${baseUrl}/api/scrape?url=${encodeURIComponent(url)}&output=json&interactive=true`,
        { headers }
      );
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-16 lg:px-32 py-16">
      <p className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">// try it</p>
      <div className="border border-terminal-border bg-terminal-bg p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-terminal-border">
          <span className="font-mono text-xs text-muted-foreground tracking-widest">LIVE DEMO</span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 border border-terminal-border inline-block" />
            <span className="w-2.5 h-2.5 border border-terminal-border inline-block" />
            <span className="w-2.5 h-2.5 bg-primary-foreground inline-block" style={{ backgroundColor: "hsl(var(--foreground))" }} />
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-0">
            <span className="font-mono text-sm text-muted-foreground mr-2 self-center whitespace-nowrap">url →</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-3 py-2 bg-transparent border border-terminal-border font-mono text-sm text-primary-foreground focus:outline-none focus:border-accent placeholder:text-muted-foreground"
              style={{ color: "hsl(var(--terminal-green))" }}
              onKeyDown={(e) => e.key === "Enter" && handleRun()}
            />
            <button
              onClick={handleRun}
              disabled={loading || !url}
              className="px-5 py-2 bg-accent text-accent-foreground font-mono text-sm tracking-widest uppercase transition-opacity duration-150 hover:opacity-80 disabled:opacity-50 border border-accent"
            >
              RUN
            </button>
          </div>
          <div className="mt-4 font-mono text-xs min-h-[60px] overflow-x-auto">
            {loading && <span style={{ color: "hsl(var(--terminal-green))" }}>fetching...</span>}
            {error && <span style={{ color: "hsl(var(--terminal-red))" }}>error: {error}</span>}
            {output && (
              <pre className="whitespace-pre-wrap break-all" style={{ color: "hsl(var(--terminal-green))" }}>
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
