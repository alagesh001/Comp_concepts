import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Brain, Zap, Globe, Lock, Unlock,
  Shuffle, CheckCircle, Activity, Bot, ArrowRight,
  Mail, ShieldAlert, ShieldCheck, RefreshCw, Play
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────

const envData = [
  { id: "fully", label: "Fully Observable", icon: Unlock, color: "#0369a1", bg: "#e0f2fe", border: "#7dd3fc", description: "Agent sees the entire environment state at all times.", example: "Chess — both players see the full board.", badge: "Complete info" },
  { id: "partially", label: "Partially Observable", icon: Eye, color: "#6d28d9", bg: "#ede9fe", border: "#c4b5fd", description: "Agent only perceives a limited view of the world.", example: "Poker — you can't see opponents' cards.", badge: "Hidden state" },
  { id: "deterministic", label: "Deterministic", icon: CheckCircle, color: "#065f46", bg: "#d1fae5", border: "#6ee7b7", description: "Same action always produces the same outcome.", example: "A calculator — 2+2 is always 4.", badge: "Predictable" },
  { id: "stochastic", label: "Stochastic", icon: Shuffle, color: "#92400e", bg: "#fef3c7", border: "#fcd34d", description: "Outcomes contain randomness, even for the same action.", example: "Self-driving car — other drivers are unpredictable.", badge: "Randomness" },
  { id: "static", label: "Static", icon: Lock, color: "#881337", bg: "#ffe4e6", border: "#fda4af", description: "Environment doesn't change while agent is deciding.", example: "Crossword puzzle — words don't move while you think.", badge: "Frozen world" },
  { id: "dynamic", label: "Dynamic", icon: Activity, color: "#1e3a5f", bg: "#dbeafe", border: "#93c5fd", description: "Environment evolves even while the agent deliberates.", example: "Stock trading — prices shift in real time.", badge: "Always changing" },
];

const agentSteps = [
  { id: "perceive", icon: Eye, label: "Perceive", sublabel: "Observe", color: "#0369a1", bg: "#e0f2fe", border: "#38bdf8", description: "Sensors gather raw data from the environment — pixels, words, numbers, signals.", example: "A spam filter reads the incoming email's text." },
  { id: "think", icon: Brain, label: "Decide", sublabel: "Think", color: "#6d28d9", bg: "#ede9fe", border: "#a78bfa", description: "The agent processes information and selects the best action using its model.", example: "It scores keywords like 'free money' or 'click here'." },
  { id: "act", icon: Zap, label: "Act", sublabel: "Execute", color: "#92400e", bg: "#fef3c7", border: "#fbbf24", description: "The chosen action is executed, changing the environment state.", example: "The email is moved to Spam — environment updated." },
];

const emailSamples = [
  { text: "FREE MONEY!!! Click here NOW to claim your $1000 prize. LIMITED TIME OFFER!", isSpam: true, reason: "All-caps urgency, prize claim, excessive exclamation marks" },
  { text: "Hi team, meeting rescheduled to 3pm tomorrow. Please update your calendars.", isSpam: false, reason: "Professional tone, no suspicious links, normal context" },
  { text: "Congratulations! You've been selected for a special deal. Buy now, act fast!", isSpam: true, reason: "Fake congratulations, urgency trigger words, vague offer" },
  { text: "Your invoice #4821 is attached. Payment due by end of month.", isSpam: false, reason: "Transactional language, specific invoice number, no pressure tactics" },
  { text: "VERIFY YOUR ACCOUNT or it will be suspended in 24 hours. Click link below.", isSpam: true, reason: "Account threat, artificial deadline, suspicious link prompt" },
];

const spamKeywords = ["free", "money", "click", "now", "prize", "offer", "congratulations", "selected", "deal", "act fast", "verify", "suspended", "limited", "buy", "!!!"];

// ── Helpers ───────────────────────────────────────────────────────────────

function PulsingDot({ color }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10, marginRight: 8, verticalAlign: "middle" }}>
      <motion.span animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color }} />
      <span style={{ position: "relative", borderRadius: "50%", width: 10, height: 10, background: color, display: "block" }} />
    </span>
  );
}

function SectionTab({ id, label, icon: Icon, active, onClick }) {
  return (
    <button onClick={() => onClick(id)} style={{
      flex: 1, padding: "10px 8px", fontSize: 13, fontWeight: active ? 600 : 400,
      color: active ? "#0f172a" : "#64748b", background: active ? "#fff" : "transparent",
      border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center",
      justifyContent: "center", gap: 6, transition: "all 0.15s",
      boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none"
    }}>
      <Icon size={15} />
      {label}
    </button>
  );
}

function Badge({ label, color, bg }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: bg, color, display: "inline-block" }}>
      {label}
    </span>
  );
}

// ── Section: Overview ─────────────────────────────────────────────────────

function OverviewSection() {
  const examples = [
    { label: "Language", ex: "ChatGPT translates & writes text", color: "#6d28d9", bg: "#ede9fe", icon: "💬" },
    { label: "Vision", ex: "Face ID unlocks your phone", color: "#0369a1", bg: "#e0f2fe", icon: "👁" },
    { label: "Strategy", ex: "AlphaGo beats world champions", color: "#065f46", bg: "#d1fae5", icon: "♟" },
    { label: "Prediction", ex: "Netflix recommends your next show", color: "#92400e", bg: "#fef3c7", icon: "🎯" },
    { label: "Robotics", ex: "Warehouse robots sort packages", color: "#881337", bg: "#ffe4e6", icon: "🤖" },
    { label: "Medicine", ex: "AI detects cancer in scans", color: "#1e3a5f", bg: "#dbeafe", icon: "🏥" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Definition */}
        <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={24} color="#0369a1" />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0369a1", marginBottom: 2 }}>Definition</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>Artificial Intelligence</div>
            </div>
          </div>
          <p style={{ color: "#475569", lineHeight: 1.7, margin: 0 }}>
            Machines performing tasks that <strong style={{ color: "#0f172a" }}>normally require human intelligence</strong> — like recognising faces, understanding language, or making strategic decisions.
          </p>
          <div style={{ marginTop: 20, padding: "14px 16px", background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Key idea</div>
            <p style={{ margin: 0, color: "#334155", fontSize: 14, lineHeight: 1.6 }}>
              AI doesn't copy how humans think — it achieves <em>human-level results</em> through patterns, data, and optimisation.
            </p>
          </div>
        </div>

        {/* Examples grid */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: 14 }}>Real-world examples</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {examples.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                style={{ background: item.bg, borderRadius: 12, padding: "14px 16px", cursor: "default", transition: "box-shadow 0.2s" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>{item.ex}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI vs traditional */}
      <div style={{ marginTop: 24, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>AI vs. traditional programming</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Traditional", items: ["Rules written by humans", "Handles known situations", "Rigid — breaks on edge cases", "Example: a thermostat"], color: "#64748b", border: "#e2e8f0", bg: "#f8fafc" },
            { label: "AI / Machine Learning", items: ["Learns rules from data", "Adapts to new situations", "Improves with more examples", "Example: voice assistant"], color: "#0369a1", border: "#7dd3fc", bg: "#f0f9ff" },
          ].map(col => (
            <div key={col.label} style={{ background: col.bg, border: `1px solid ${col.border}`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: col.color, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>{col.label}</div>
              {col.items.map(item => (
                <div key={item} style={{ fontSize: 13, color: "#334155", marginBottom: 6, display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: col.color, marginTop: 1 }}>—</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section: Agent ────────────────────────────────────────────────────────

function AgentSection() {
  const [active, setActive] = useState(null);
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);

  const runLoop = async () => {
    setRunning(true); setActive(null);
    for (let i = 0; i < agentSteps.length; i++) {
      setStepIdx(i);
      await new Promise(r => setTimeout(r, 900));
    }
    setStepIdx(-1); setRunning(false);
  };

  const displayed = active !== null ? agentSteps.find(s => s.id === active) : null;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: concept */}
        <div>
          <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24, marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0369a1", marginBottom: 10 }}>What is an agent?</div>
            <p style={{ color: "#475569", lineHeight: 1.7, margin: 0 }}>
              An <strong style={{ color: "#0f172a" }}>Intelligent Agent</strong> perceives its environment through sensors, reasons about what action to take, and executes that action through actuators — then repeats.
            </p>
          </div>

          {/* Loop diagram */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
              The agent loop — tap a step
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {agentSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = active === step.id;
                const isRunning = stepIdx === i;
                return (
                  <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      animate={isRunning ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 0.35 }}
                      onClick={() => setActive(isActive ? null : step.id)}
                      style={{
                        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        padding: "14px 8px", borderRadius: 12, cursor: "pointer", border: "none",
                        background: isActive || isRunning ? step.bg : "#f8fafc",
                        outline: `2px solid ${isActive || isRunning ? step.border : "transparent"}`,
                        boxShadow: isRunning ? `0 0 0 4px ${step.bg}` : "none",
                        transition: "all 0.2s"
                      }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: isActive || isRunning ? step.bg : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${isActive || isRunning ? step.border : "#e2e8f0"}` }}>
                        <Icon size={18} color={step.color} />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{step.label}</div>
                        <div style={{ fontSize: 11, color: step.color, fontWeight: 600 }}>{step.sublabel}</div>
                      </div>
                    </motion.button>
                    {i < agentSteps.length - 1 && <ArrowRight size={14} color="#cbd5e1" style={{ flexShrink: 0 }} />}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {displayed && (
                <motion.div key={displayed.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden", marginTop: 14 }}>
                  <div style={{ background: displayed.bg, border: `1px solid ${displayed.border}`, borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 13, color: "#0f172a", fontWeight: 500, marginBottom: 6 }}>{displayed.description}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <Badge label="eg." color={displayed.color} bg={displayed.bg} />
                      <span style={{ fontSize: 13, color: "#475569" }}>{displayed.example}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={runLoop} disabled={running}
              style={{
                width: "100%", marginTop: 14, padding: "10px 0", borderRadius: 10, border: "1.5px solid #bfdbfe",
                background: running ? "#f8fafc" : "#eff6ff", color: running ? "#94a3b8" : "#0369a1",
                fontWeight: 600, fontSize: 13, cursor: running ? "not-allowed" : "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: 8
              }}>
              <Play size={13} /> {running ? "Running loop…" : "Animate the agent loop"}
            </motion.button>
          </div>
        </div>

        {/* Right: interactive spam filter */}
        <SpamFilterDemo />
      </div>
    </motion.div>
  );
}

// ── Interactive: Spam Filter Agent ────────────────────────────────────────

function SpamFilterDemo() {
  const [emailText, setEmailText] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | perceiving | thinking | acting | done
  const [result, setResult] = useState(null);
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [score, setScore] = useState(0);
  const timerRef = useRef(null);

  const analyzeEmail = async (text) => {
    if (!text.trim()) return;
    setPhase("perceiving"); setResult(null); setHighlightedWords([]); setScore(0);

    await new Promise(r => setTimeout(r, 900));
    setPhase("thinking");

    const lower = text.toLowerCase();
    const found = spamKeywords.filter(kw => lower.includes(kw));
    setHighlightedWords(found);

    await new Promise(r => setTimeout(r, 1100));
    setPhase("acting");

    const spamScore = Math.min(100, found.length * 18 + (text.includes("!!!") ? 20 : 0) + (/[A-Z]{4,}/.test(text) ? 20 : 0));
    setScore(spamScore);

    await new Promise(r => setTimeout(r, 700));
    setResult({ isSpam: spamScore >= 40, score: spamScore, keywords: found });
    setPhase("done");
  };

  const loadSample = (sample) => {
    setEmailText(sample.text);
    setPhase("idle"); setResult(null); setHighlightedWords([]); setScore(0);
  };

  const reset = () => { setEmailText(""); setPhase("idle"); setResult(null); setHighlightedWords([]); setScore(0); };

  const phaseInfo = {
    idle: null,
    perceiving: { step: 0, label: "Reading email content…", color: "#0369a1", bg: "#e0f2fe" },
    thinking: { step: 1, label: "Scanning for spam signals…", color: "#6d28d9", bg: "#ede9fe" },
    acting: { step: 2, label: "Making decision…", color: "#92400e", bg: "#fef3c7" },
    done: { step: 2, label: "Decision made", color: "#065f46", bg: "#d1fae5" },
  };
  const pi = phaseInfo[phase];

  const highlightText = (text) => {
    if (!highlightedWords.length) return <span style={{ color: "#334155" }}>{text}</span>;
    const parts = [];
    let remaining = text;
    let lastIdx = 0;
    const allPositions = [];
    highlightedWords.forEach(kw => {
      let idx = remaining.toLowerCase().indexOf(kw);
      while (idx !== -1) {
        allPositions.push({ start: idx, end: idx + kw.length });
        idx = remaining.toLowerCase().indexOf(kw, idx + 1);
      }
    });
    allPositions.sort((a, b) => a.start - b.start);
    let i = 0, cursor = 0;
    while (cursor < text.length) {
      const pos = allPositions.find(p => p.start >= cursor);
      if (!pos) { parts.push(<span key={i++} style={{ color: "#334155" }}>{text.slice(cursor)}</span>); break; }
      if (pos.start > cursor) parts.push(<span key={i++} style={{ color: "#334155" }}>{text.slice(cursor, pos.start)}</span>);
      parts.push(<mark key={i++} style={{ background: "#fef08a", color: "#854d0e", borderRadius: 3, padding: "0 2px" }}>{text.slice(pos.start, pos.end)}</mark>);
      cursor = pos.end;
    }
    return parts;
  };

  return (
    <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <Mail size={16} color="#0369a1" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Live: Spam Filter Agent</span>
        </div>
        <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Type or load an email. Watch the agent perceive → decide → act.</p>
      </div>

      {/* Sample emails */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Load a sample</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {emailSamples.map((s, i) => (
            <button key={i} onClick={() => loadSample(s)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 999, cursor: "pointer", fontWeight: 600,
              background: s.isSpam ? "#ffe4e6" : "#d1fae5", color: s.isSpam ? "#881337" : "#065f46",
              border: `1px solid ${s.isSpam ? "#fda4af" : "#6ee7b7"}`
            }}>
              {s.isSpam ? "🚫" : "✅"} Email {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div style={{ position: "relative" }}>
        {phase === "done" && emailText ? (
          <div style={{ minHeight: 80, fontSize: 13, lineHeight: 1.7, padding: "10px 12px", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
            {highlightText(emailText)}
          </div>
        ) : (
          <textarea value={emailText} onChange={e => setEmailText(e.target.value)} placeholder="Paste or type an email here…"
            style={{ width: "100%", minHeight: 80, fontSize: 13, lineHeight: 1.7, padding: "10px 12px", borderRadius: 8, border: "1px solid #e2e8f0", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: "#334155" }} />
        )}
      </div>

      {/* Agent status bar */}
      {phase !== "idle" && (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {agentSteps.map((step, i) => {
            const isActive = pi && pi.step === i && phase !== "done";
            const isDone = pi && (pi.step > i || phase === "done");
            return (
              <div key={step.id} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                <div style={{
                  flex: 1, padding: "6px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, textAlign: "center",
                  background: isDone ? "#d1fae5" : isActive ? step.bg : "#f1f5f9",
                  color: isDone ? "#065f46" : isActive ? step.color : "#94a3b8",
                  border: `1px solid ${isDone ? "#6ee7b7" : isActive ? step.border : "#e2e8f0"}`,
                  transition: "all 0.3s"
                }}>
                  {isDone ? "✓ " : isActive ? "⟳ " : ""}{step.label}
                </div>
                {i < agentSteps.length - 1 && <ArrowRight size={10} color="#cbd5e1" style={{ flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      )}

      {/* Score meter */}
      {(phase === "acting" || phase === "done") && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em" }}>Spam score</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: score >= 40 ? "#b91c1c" : "#15803d" }}>{score}/100</span>
          </div>
          <div style={{ height: 8, background: "#f1f5f9", borderRadius: 999, overflow: "hidden" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ height: "100%", borderRadius: 999, background: score >= 70 ? "#ef4444" : score >= 40 ? "#f97316" : "#22c55e" }} />
          </div>
          {highlightedWords.length > 0 && (
            <div style={{ marginTop: 8, fontSize: 11, color: "#92400e" }}>
              <span style={{ fontWeight: 700 }}>Flagged signals: </span>{highlightedWords.join(", ")}
            </div>
          )}
        </div>
      )}

      {/* Result */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ borderRadius: 12, padding: "14px 16px", background: result.isSpam ? "#fff1f2" : "#f0fdf4", border: `1.5px solid ${result.isSpam ? "#fecdd3" : "#bbf7d0"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              {result.isSpam ? <ShieldAlert size={22} color="#b91c1c" /> : <ShieldCheck size={22} color="#15803d" />}
              <span style={{ fontSize: 16, fontWeight: 700, color: result.isSpam ? "#b91c1c" : "#15803d" }}>
                {result.isSpam ? "Moved to Spam" : "Delivered to Inbox"}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.6 }}>
              Agent decision: <strong>{result.isSpam ? "spam" : "legitimate"}</strong> (confidence {result.isSpam ? `high — ${result.score}/100 spam signals` : `high — only ${result.score}/100 spam score`}){result.keywords.length > 0 ? `, triggered by ${result.keywords.length} keyword${result.keywords.length > 1 ? "s" : ""}` : ""}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => analyzeEmail(emailText)} disabled={!emailText.trim() || (phase !== "idle" && phase !== "done")}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none", fontWeight: 700, fontSize: 13, cursor: emailText.trim() ? "pointer" : "not-allowed",
            background: emailText.trim() ? "#0369a1" : "#e2e8f0", color: emailText.trim() ? "#fff" : "#94a3b8"
          }}>
          {phase !== "idle" && phase !== "done" ? "Analyzing…" : "Run agent"}
        </button>
        <button onClick={reset} style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#64748b", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <RefreshCw size={13} /> Reset
        </button>
      </div>
    </div>
  );
}

// ── Section: Environments ─────────────────────────────────────────────────

function EnvironmentsSection() {
  const [selected, setSelected] = useState(null);
  const sel = envData.find(e => e.id === selected);

  const axes = [
    { label: "Observability", pair: ["fully", "partially"] },
    { label: "Outcome", pair: ["deterministic", "stochastic"] },
    { label: "Change", pair: ["static", "dynamic"] },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: card grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {axes.map(({ label, pair }) => (
            <div key={label}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: 8 }}>{label}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {pair.map(id => {
                  const env = envData.find(e => e.id === id);
                  const Icon = env.icon;
                  const isSelected = selected === id;
                  return (
                    <motion.button key={id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setSelected(isSelected ? null : id)}
                      style={{
                        textAlign: "left", padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                        background: isSelected ? env.bg : "#f8fafc",
                        border: `1.5px solid ${isSelected ? env.border : "#e2e8f0"}`,
                        transition: "all 0.2s"
                      }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Icon size={15} color={env.color} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{env.label}</span>
                      </div>
                      <Badge label={env.badge} color={env.color} bg={isSelected ? "#fff" : env.bg} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right: detail + interactive classifier */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AnimatePresence mode="wait">
            {sel ? (
              <motion.div key={sel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ background: sel.bg, border: `1.5px solid ${sel.border}`, borderRadius: 16, padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <PulsingDot color={sel.color} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{sel.label}</span>
                </div>
                <p style={{ color: "#334155", lineHeight: 1.7, margin: "0 0 12px 0" }}>{sel.description}</p>
                <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Badge label="eg." color={sel.color} bg={sel.bg} />
                  <span style={{ fontSize: 13, color: "#475569" }}>{sel.example}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ background: "#f8fafc", border: "1.5px dashed #e2e8f0", borderRadius: 16, padding: 22, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 120 }}>
                <span style={{ color: "#94a3b8", fontSize: 13 }}>← Select an environment type</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Environment classifier game */}
          <EnvironmentClassifier />
        </div>
      </div>
    </motion.div>
  );
}

// ── Mini-game: classify a scenario ────────────────────────────────────────

const scenarios = [
  { text: "You're playing Sudoku — the grid doesn't change while you think.", answers: { observability: "fully", outcome: "deterministic", change: "static" } },
  { text: "A robot navigating a crowded market — people move unpredictably.", answers: { observability: "partially", outcome: "stochastic", change: "dynamic" } },
  { text: "A thermostat reading room temperature — it sees the full state and the outcome is fixed.", answers: { observability: "fully", outcome: "deterministic", change: "static" } },
  { text: "Trading stocks online — prices move in real-time, you can't see all buy orders.", answers: { observability: "partially", outcome: "stochastic", change: "dynamic" } },
];

function EnvironmentClassifier() {
  const [idx, setIdx] = useState(0);
  const [choices, setChoices] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const scenario = scenarios[idx];
  const axes = [
    { key: "observability", label: "Observability", opts: [{ id: "fully", label: "Fully observable" }, { id: "partially", label: "Partially observable" }] },
    { key: "outcome", label: "Outcome", opts: [{ id: "deterministic", label: "Deterministic" }, { id: "stochastic", label: "Stochastic" }] },
    { key: "change", label: "Change", opts: [{ id: "static", label: "Static" }, { id: "dynamic", label: "Dynamic" }] },
  ];

  const allChosen = axes.every(a => choices[a.key]);
  const correct = submitted && axes.every(a => choices[a.key] === scenario.answers[a.key]);

  const next = () => {
    setIdx((idx + 1) % scenarios.length);
    setChoices({}); setSubmitted(false);
  };

  return (
    <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0369a1", marginBottom: 10 }}>
        Classify this scenario
      </div>
      <p style={{ fontSize: 13, color: "#0f172a", lineHeight: 1.6, marginBottom: 16, padding: "10px 12px", background: "#f0f9ff", borderRadius: 8 }}>
        {scenario.text}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {axes.map(axis => (
          <div key={axis.key}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginBottom: 6 }}>{axis.label}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {axis.opts.map(opt => {
                const chosen = choices[axis.key] === opt.id;
                const isCorrect = submitted && scenario.answers[axis.key] === opt.id;
                const isWrong = submitted && chosen && !isCorrect;
                return (
                  <button key={opt.id} onClick={() => !submitted && setChoices(c => ({ ...c, [axis.key]: opt.id }))}
                    style={{
                      flex: 1, padding: "7px 0", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: submitted ? "default" : "pointer",
                      border: `1.5px solid ${isCorrect ? "#6ee7b7" : isWrong ? "#fda4af" : chosen ? "#93c5fd" : "#e2e8f0"}`,
                      background: isCorrect ? "#d1fae5" : isWrong ? "#ffe4e6" : chosen ? "#dbeafe" : "#f8fafc",
                      color: isCorrect ? "#065f46" : isWrong ? "#881337" : chosen ? "#1e3a5f" : "#64748b",
                      transition: "all 0.15s"
                    }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {!submitted ? (
          <button onClick={() => setSubmitted(true)} disabled={!allChosen}
            style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", fontWeight: 700, fontSize: 13, cursor: allChosen ? "pointer" : "not-allowed", background: allChosen ? "#0369a1" : "#e2e8f0", color: allChosen ? "#fff" : "#94a3b8" }}>
            Check answer
          </button>
        ) : (
          <>
            <div style={{ flex: 1, padding: "9px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, background: correct ? "#d1fae5" : "#fff1f2", color: correct ? "#065f46" : "#b91c1c", border: `1px solid ${correct ? "#6ee7b7" : "#fecdd3"}`, textAlign: "center" }}>
              {correct ? "✓ Correct!" : "✗ Not quite"}
            </div>
            <button onClick={next} style={{ padding: "9px 16px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#64748b", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
              Next →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────

export default function AIFoundations() {
  const [section, setSection] = useState("overview");

  const tabs = [
    { id: "overview", label: "AI Basics", icon: Bot },
    { id: "agent", label: "Agents", icon: Brain },
    { id: "environments", label: "Environments", icon: Globe },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif", padding: "32px 40px 64px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#0369a1", display: "block", marginBottom: 4 }}>Chapter 01</span>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>Foundations of AI</h1>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0, maxWidth: 260, textAlign: "right", lineHeight: 1.6 }}>
            Tap, interact, and build intuition for the core building blocks of artificial intelligence.
          </p>
        </div>
      </motion.div>

      {/* Tab bar */}
      <div style={{ background: "#f1f5f9", borderRadius: 10, padding: 4, display: "flex", gap: 2, marginBottom: 28, maxWidth: 480 }}>
        {tabs.map(t => <SectionTab key={t.id} {...t} active={section === t.id} onClick={setSection} />)}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {section === "overview" && <OverviewSection key="overview" />}
        {section === "agent" && <AgentSection key="agent" />}
        {section === "environments" && <EnvironmentsSection key="environments" />}
      </AnimatePresence>

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "#cbd5e1" }}>AI · Chapter 1 · Foundations</span>
      </div>
    </div>
  );
}
