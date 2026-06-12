import { useState, useRef, useEffect } from "react";

/* ============================================================
   LAVA — Cold Calling Mock Call Trainer
   AI-powered roleplay + rubric scoring for virtual assistants
   Source: "Final Mock Call (Cold Calling)" deck
   ============================================================ */

const C = {
  teal: "#16424E",
  teal700: "#1B4D5C",
  tealSoft: "#2B6678",
  coral: "#E6402E",
  coral600: "#CC3320",
  paper: "#F6F5F2",
  card: "#FFFFFF",
  ink: "#19262B",
  muted: "#6C7C81",
  line: "#E4E2DC",
  green: "#2E9E6B",
  gold: "#C08A1E",
};

const RUBRIC = [
  {
    name: "Opening & Introduction",
    weight: 15,
    ni: "Lacks clear identification; weak or scripted hook; low energy.",
    me: "Clearly identifies self and company; states purpose concisely; polite tone.",
    ee: "High energy; compelling, personalized hook; builds immediate curiosity.",
  },
  {
    name: "Rapport & Active Listening",
    weight: 20,
    ni: "Monopolizes conversation; fails to acknowledge prospect's statements; rushed.",
    me: "Asks open-ended questions; listens for cues; maintains professional, friendly tone.",
    ee: "Establishes immediate trust; rephrases prospect's needs accurately; demonstrates empathy.",
  },
  {
    name: "Needs Assessment & Discovery",
    weight: 25,
    ni: "Asks only superficial/yes-no questions; no attempt to uncover specific pain points.",
    me: "Asks targeted questions to understand current coverage and pain points; identifies a gap.",
    ee: "Masterfully links specific pain points to potential insurance solutions; uncovers latent needs.",
  },
  {
    name: "Product Pitch & Solution",
    weight: 15,
    ni: "Reads features; generic solution; uses jargon; fails to connect to need.",
    me: "Tailors product features to address identified needs; uses clear, benefit-driven language.",
    ee: "Confidently positions the product as the essential solution; uses persuasive language and social proof.",
  },
  {
    name: "Objection Handling",
    weight: 15,
    ni: "Argues with prospect; dismisses concerns; fails to address root objection.",
    me: "Acknowledges objection respectfully; provides a credible, concise rebuttal; reframes positively.",
    ee: "Preempts common objections; skillfully isolates and overcomes complex objections to keep the sale moving.",
  },
  {
    name: "Closing & Next Steps",
    weight: 10,
    ni: "Ends call abruptly; fails to ask for commitment or define next steps.",
    me: "Clearly requests a small commitment (e.g., send information, brief follow-up call); sets a definite next step.",
    ee: "Strong, confident ask for the sale/appointment; overcomes hesitation; locks in the next action immediately.",
  },
];

const BASE_RULES = `You are role-playing as a sales prospect in a cold-call training simulation for a life & general insurance company. A trainee virtual assistant (the caller) is practicing on you.

Rules:
- Stay 100% in character. Never mention you are an AI, never coach, never break the fourth wall.
- Speak like a real person on a phone: short, natural, 1–3 sentences (under ~45 words). Use interruptions, filler, and realistic reactions.
- React dynamically to how well the caller handles you. Reward genuine empathy, good questions, and confidence. Punish pushiness, scripts, and arguing.
- Do not make it artificially easy. Only warm up if the caller earns it.
- Never narrate actions in asterisks. Just speak your line.`;

const SCENARIOS = [
  {
    id: "irate-no-future",
    num: "I",
    title: "Irate Lead",
    tag: "No opt-out request",
    difficulty: "Hard",
    leadName: "Margaret Doyle",
    blurb:
      "Caught at a bad moment and clearly annoyed about the interruption — but she never asks to be removed. Your job is to de-escalate without arguing.",
    objective:
      "De-escalate. Stay composed, apologize sincerely, and either earn 30 seconds of real attention or exit gracefully — never argue back.",
    firstLine: "Hello?… Who is this? I'm right in the middle of something.",
    persona: `${BASE_RULES}

CHARACTER: Margaret Doyle, 48, a busy homeowner. You just got interrupted by an unsolicited insurance call and you are IRRITATED.
- Open annoyed and suspicious. Use short, clipped lines. "How did you get my number?" "I don't have time for this."
- You do NOT ask to be removed and you do NOT mention future contact — that is not your move in this scenario.
- If the caller argues, talks over you, or launches into a script, get colder and shorter.
- If the caller genuinely apologizes, lowers their energy, and respects your time, you soften slightly and may grant ~30 seconds. You stay skeptical though.
- If they earn it, you might admit one small real concern (your premium went up this year). You never become eager.`,
  },
  {
    id: "irate-remove",
    num: "I.I",
    title: "Irate Lead",
    tag: 'Says "remove me"',
    difficulty: "Hard",
    leadName: "Frank Mercer",
    blurb:
      'Angry and explicit: he wants off the list. The correct play is to comply professionally and confirm removal — not to keep pitching.',
    objective:
      "Honor the opt-out immediately. Apologize, confirm you'll remove him, do NOT pitch. A clean, respectful exit is a win here.",
    firstLine: "Yeah, hello? Look — who is this and what do you want?",
    persona: `${BASE_RULES}

CHARACTER: Frank Mercer, 55, irritated and blunt. You are done with cold calls.
- Within your first or second line, demand to be taken off the list: "Take me off your list," "Remove me, do not call again."
- If the caller keeps pitching or tries to handle the objection instead of complying, you get angrier and more insistent.
- If the caller calmly apologizes, confirms they will remove your number, and offers to end the call, you de-escalate fast and end politely ("Fine. Thank you.").
- The ONLY correct outcome is the caller respecting the opt-out. Reward that. Anything else makes you hang-up-level angry.`,
  },
  {
    id: "interested-no-type",
    num: "II",
    title: "Interested Lead",
    tag: "No insurance type mentioned",
    difficulty: "Medium",
    leadName: "Priya Nair",
    blurb:
      "Open to talking but vague — she hasn't said what kind of coverage she needs. This is a discovery test: uncover the real need.",
    objective:
      "Run real discovery. Ask targeted, open-ended questions to surface her situation and the specific insurance gap before pitching anything.",
    firstLine: "Oh, hi — yeah, insurance? I guess I've been meaning to look into that, actually.",
    persona: `${BASE_RULES}

CHARACTER: Priya Nair, 34, friendly and genuinely open. You've vaguely meant to "sort out insurance" but you don't volunteer specifics.
- Be warm but vague at first. Do NOT state which insurance you need unless the caller asks good discovery questions.
- You have a real (hidden) situation: you just bought a small condo and started freelancing, so you lost your employer coverage. You worry about income if you got sick, and you have no life cover but a partner who depends on you.
- Reveal these details gradually, ONLY in response to good open-ended questions. If the caller pitches before discovering, give lukewarm "mm, maybe" answers.
- Warm up noticeably when the caller listens and connects a real need to a solution.`,
  },
  {
    id: "interested-later",
    num: "III",
    title: "Interested Lead",
    tag: "Transition later",
    difficulty: "Medium",
    leadName: "Daniel Okafor",
    blurb:
      "Interested and qualified — but it's a bad time to talk. The whole call hinges on locking a concrete follow-up.",
    objective:
      "Secure a specific next step. Don't force the pitch now; confirm interest and book a real follow-up with a day and time.",
    firstLine: "Hey, sorry — this actually sounds useful but you've caught me on my way into a meeting.",
    persona: `${BASE_RULES}

CHARACTER: Daniel Okafor, 41, polite and genuinely interested in reviewing his insurance — but truly pressed for time right now.
- Make it clear early that it's a bad moment ("on my way into a meeting", "can't really talk now").
- If the caller tries to push the full pitch anyway, get a little impatient and start trying to get off the phone.
- If the caller respects your time and proposes a specific follow-up, engage and help nail down a day/time. You prefer late afternoons.
- You only "commit" to the follow-up if the caller asks for a concrete time and confirms it back to you. Vague "I'll call you sometime" doesn't land.`,
  },
  {
    id: "previously-contacted",
    num: "IV",
    title: "Previously Contacted Lead",
    tag: "Re-engagement",
    difficulty: "Medium",
    leadName: "Sandra Klein",
    blurb:
      "Someone from the company spoke to her weeks ago and nothing happened. She half-remembers it. Acknowledge the history and re-earn the conversation.",
    objective:
      "Acknowledge prior contact gracefully, reference it, rebuild trust, and re-open the conversation without making her repeat everything.",
    firstLine: "Hello?… Wait — didn't someone from your company already call me a while back?",
    persona: `${BASE_RULES}

CHARACTER: Sandra Klein, 39. Someone from this insurance company called you about a month ago. You half-remember it and you're mildly wary that this is a repeat.
- Bring up the prior contact early and a little skeptically ("I think I already talked to someone…").
- If the caller pretends it's a fresh first call or seems unaware, get annoyed at the disorganization.
- If the caller acknowledges the prior touch warmly, doesn't make you re-explain everything, and adds a reason this call is worth your time, you relax and re-engage.
- You had a mild real interest last time (reviewing your home & contents cover) that fizzled because no one followed up.`,
  },
];

const DIFF_COLOR = { Hard: C.coral, Medium: C.gold, Easy: C.green };

function levelFromScore(s) {
  if (s <= 2) return { label: "Needs Improvement", color: C.coral };
  if (s <= 4) return { label: "Meets Expectations", color: C.gold };
  return { label: "Exceeds Expectations", color: C.green };
}

const GLOBAL = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
* { box-sizing: border-box; }
.lava-root { font-family: 'Inter', system-ui, sans-serif; color: ${C.ink}; }
.lava-head { font-family: 'Poppins', sans-serif; }
@keyframes lavaFade { from { opacity:0; transform: translateY(8px);} to {opacity:1; transform:none;} }
@keyframes lavaBlink { 0%,100%{opacity:.35;} 50%{opacity:1;} }
@keyframes lavaDot { 0%,60%,100%{transform:translateY(0);opacity:.4;} 30%{transform:translateY(-4px);opacity:1;} }
@keyframes lavaPulse { 0%{box-shadow:0 0 0 0 rgba(230,64,46,.45);} 70%{box-shadow:0 0 0 12px rgba(230,64,46,0);} 100%{box-shadow:0 0 0 0 rgba(230,64,46,0);} }
@keyframes lavaSpin { to { transform: rotate(360deg);} }
.lava-msg { animation: lavaFade .25s ease both; }
.lava-btn { transition: transform .12s ease, background .15s ease, opacity .15s; cursor:pointer; border:none; }
.lava-btn:hover { transform: translateY(-1px); }
.lava-btn:active { transform: translateY(0); }
.lava-btn:focus-visible { outline: 3px solid ${C.tealSoft}; outline-offset:2px; }
.lava-card { transition: transform .15s ease, box-shadow .15s ease, border-color .15s; }
.lava-scn:hover { transform: translateY(-3px); box-shadow: 0 14px 34px -18px rgba(22,66,78,.45); border-color:${C.teal}; }
.lava-scn:focus-visible { outline:3px solid ${C.tealSoft}; outline-offset:3px; }
.lava-bar { animation: lavaGrow .5s ease both; }
@keyframes lavaGrow { from { width:0;} }
textarea:focus, input:focus { outline:none; }
@media (prefers-reduced-motion: reduce){ *{animation:none !important; transition:none !important;} }
::-webkit-scrollbar{width:9px;height:9px;}
::-webkit-scrollbar-thumb{background:#cfd8da;border-radius:6px;}
`;

function Logo({ size = 26 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 7,
          background: C.coral,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span style={{ display: "flex", gap: 3 }}>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#fff" }} />
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#fff" }} />
        </span>
        <span
          style={{
            position: "absolute",
            top: -4,
            width: 2,
            height: 4,
            background: C.coral,
            borderRadius: 2,
          }}
        />
      </span>
      <span
        className="lava-head"
        style={{ fontWeight: 800, letterSpacing: 1, color: C.teal, fontSize: size * 0.66 }}
      >
        LAVA
      </span>
    </span>
  );
}

export default function App() {
  const [view, setView] = useState("home"); // home | call | score
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [showRubric, setShowRubric] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [scoring, setScoring] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [scoreErr, setScoreErr] = useState("");
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (view === "call") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [view]);

  function startCall(scn) {
    setActive(scn);
    setMessages([{ role: "prospect", text: scn.firstLine }]);
    setSeconds(0);
    setScoreData(null);
    setScoreErr("");
    setView("call");
  }

  function fmtTime(s) {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${m}:${ss}`;
  }

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;
    const next = [...messages, { role: "va", text }];
    setMessages(next);
    setInput("");
    setThinking(true);
    try {
      const apiMsgs = next
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "va" ? "user" : "assistant",
          content: m.text,
        }));
      // ensure history starts with a user turn for the API
      const trimmed = apiMsgs[0]?.role === "assistant" ? apiMsgs.slice(1) : apiMsgs;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: active.persona,
          messages: trimmed,
        }),
      });
      const data = await res.json();
      const reply = (data.content || [])
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join(" ")
        .trim();
      setMessages((m) => [
        ...m,
        { role: "prospect", text: reply || "…(silence on the line)" },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "prospect", text: "…(the line crackled — try that again)" },
      ]);
    } finally {
      setThinking(false);
    }
  }

  async function endAndScore() {
    clearInterval(timerRef.current);
    setView("score");
    setScoring(true);
    setScoreErr("");
    const transcript = messages
      .map((m) => `${m.role === "va" ? "CALLER" : active.leadName.toUpperCase()}: ${m.text}`)
      .join("\n");
    const rubricText = RUBRIC.map(
      (r) =>
        `- ${r.name} (weight ${r.weight}%). Needs Improvement(1-2): ${r.ni} Meets(3-4): ${r.me} Exceeds(5): ${r.ee}`
    ).join("\n");

    const prompt = `You are a strict but fair sales coach grading a cold-call training transcript for an insurance virtual assistant.

SCENARIO: ${active.title} — ${active.tag}. Objective for the caller: ${active.objective}

RUBRIC (score each criterion 0-5; 0 only if utterly absent):
${rubricText}

TRANSCRIPT:
${transcript}

Grade the CALLER only. If the call was very short, grade what evidence exists and keep scores low where criteria weren't demonstrated.

Respond with ONLY valid JSON, no markdown, no preamble, in exactly this shape:
{"criteria":[{"name":"Opening & Introduction","score":0,"feedback":"1 short sentence"},{"name":"Rapport & Active Listening","score":0,"feedback":"..."},{"name":"Needs Assessment & Discovery","score":0,"feedback":"..."},{"name":"Product Pitch & Solution","score":0,"feedback":"..."},{"name":"Objection Handling","score":0,"feedback":"..."},{"name":"Closing & Next Steps","score":0,"feedback":"..."}],"strength":"one specific thing they did well","fix":"the single highest-impact fix","summary":"2 sentence overall verdict"}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      let raw = (data.content || [])
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("")
        .trim();
      raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
      const start = raw.indexOf("{");
      const end = raw.lastIndexOf("}");
      if (start >= 0) raw = raw.slice(start, end + 1);
      const parsed = JSON.parse(raw);
      // merge weights + compute weighted total
      const merged = RUBRIC.map((r) => {
        const f = parsed.criteria.find((c) => c.name === r.name) || {};
        const score = Math.max(0, Math.min(5, Number(f.score) || 0));
        return { ...r, score, feedback: f.feedback || "" };
      });
      const total = Math.round(
        merged.reduce((sum, c) => sum + (c.score / 5) * c.weight, 0)
      );
      setScoreData({ criteria: merged, total, ...parsed });
    } catch (e) {
      setScoreErr("Couldn't grade the call this time. Check your connection and try again.");
    } finally {
      setScoring(false);
    }
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div className="lava-root" style={{ background: C.paper, minHeight: "100vh", paddingBottom: 40 }}>
      <style>{GLOBAL}</style>

      {/* top bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px clamp(16px,4vw,40px)",
          borderBottom: `1px solid ${C.line}`,
          background: "rgba(246,245,242,.85)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <button
          className="lava-btn"
          onClick={() => view !== "call" && setView("home")}
          style={{ background: "none", padding: 0 }}
          aria-label="LAVA home"
        >
          <Logo />
        </button>
        <button
          className="lava-btn"
          onClick={() => setShowRubric(true)}
          style={{
            background: "transparent",
            color: C.teal,
            border: `1.5px solid ${C.teal}`,
            borderRadius: 999,
            padding: "8px 16px",
            fontWeight: 600,
            fontSize: 13.5,
          }}
        >
          Scoring rubric
        </button>
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "0 clamp(16px,4vw,28px)" }}>
        {view === "home" && <Home onStart={startCall} />}
        {view === "call" && (
          <CallScreen
            scn={active}
            messages={messages}
            input={input}
            setInput={setInput}
            send={send}
            thinking={thinking}
            scrollRef={scrollRef}
            time={fmtTime(seconds)}
            onEnd={endAndScore}
            onBack={() => setView("home")}
          />
        )}
        {view === "score" && (
          <ScoreScreen
            scn={active}
            scoring={scoring}
            data={scoreData}
            err={scoreErr}
            onRetry={endAndScore}
            onReplay={() => startCall(active)}
            onHome={() => setView("home")}
          />
        )}
      </main>

      {showRubric && <RubricModal onClose={() => setShowRubric(false)} />}
    </div>
  );
}

/* ---------------- HOME ---------------- */
function Home({ onStart }) {
  return (
    <div className="lava-msg">
      <section style={{ padding: "44px 0 30px", maxWidth: 680 }}>
        <span
          className="lava-head"
          style={{
            display: "inline-block",
            color: C.coral,
            fontWeight: 700,
            letterSpacing: 2,
            fontSize: 12.5,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Final Mock Call · Cold Calling
        </span>
        <h1
          className="lava-head"
          style={{ fontSize: "clamp(30px,5vw,46px)", lineHeight: 1.05, margin: "0 0 16px", color: C.teal }}
        >
          Pick up the phone.
          <br />
          <span style={{ color: C.coral }}>Earn the conversation.</span>
        </h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.55, color: C.muted, margin: 0 }}>
          Run a live cold call against a simulated insurance lead. They'll react like a real person —
          irate, vague, rushed, or wary. End the call and you're scored against the LAVA rubric, with
          specific notes on what to fix next.
        </p>
      </section>

      <h2
        className="lava-head"
        style={{ fontSize: 15, letterSpacing: 1, textTransform: "uppercase", color: C.teal, margin: "8px 0 16px" }}
      >
        Choose a scenario
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            className="lava-card lava-scn"
            onClick={() => onStart(s)}
            style={{
              textAlign: "left",
              background: C.card,
              border: `1px solid ${C.line}`,
              borderRadius: 16,
              padding: "20px 20px 18px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                className="lava-head"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  background: C.teal,
                  borderRadius: 7,
                  padding: "3px 9px",
                  letterSpacing: 0.5,
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: DIFF_COLOR[s.difficulty],
                }}
              >
                {s.difficulty}
              </span>
            </div>
            <div>
              <h3 className="lava-head" style={{ margin: "2px 0 2px", fontSize: 19, color: C.ink }}>
                {s.title}
              </h3>
              <span style={{ fontSize: 13, color: C.tealSoft, fontWeight: 600 }}>{s.tag}</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.5, color: C.muted, margin: 0 }}>{s.blurb}</p>
            <span
              style={{
                marginTop: 6,
                fontSize: 13,
                fontWeight: 700,
                color: C.coral,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Start call →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CALL SCREEN ---------------- */
function CallScreen({ scn, messages, input, setInput, send, thinking, scrollRef, time, onEnd, onBack }) {
  const enough = messages.filter((m) => m.role === "va").length >= 1;
  return (
    <div className="lava-msg" style={{ paddingTop: 22 }}>
      {/* call console header */}
      <div
        style={{
          background: C.teal,
          borderRadius: "16px 16px 0 0",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "rgba(255,255,255,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {scn.leadName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="lava-head" style={{ fontWeight: 600, fontSize: 16 }}>
              {scn.leadName}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, opacity: 0.85 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.green,
                  animation: "lavaBlink 1.4s infinite",
                }}
              />
              Live · {time}
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            background: "rgba(255,255,255,.14)",
            borderRadius: 999,
            padding: "5px 11px",
          }}
        >
          {scn.num} · {scn.tag}
        </span>
      </div>

      {/* objective strip */}
      <div
        style={{
          background: "#FFF6F4",
          borderLeft: `3px solid ${C.coral}`,
          padding: "10px 18px",
          fontSize: 13,
          color: C.ink,
        }}
      >
        <strong style={{ color: C.coral }}>Your objective:</strong> {scn.objective}
      </div>

      {/* transcript */}
      <div
        ref={scrollRef}
        style={{
          background: C.card,
          border: `1px solid ${C.line}`,
          borderTop: "none",
          height: "min(46vh, 420px)",
          overflowY: "auto",
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.text} name={scn.leadName} />
        ))}
        {thinking && (
          <div style={{ display: "flex", gap: 5, padding: "6px 14px", alignSelf: "flex-start" }}>
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.tealSoft,
                  animation: `lavaDot 1s infinite ${d * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* input bar */}
      <div
        style={{
          background: C.card,
          border: `1px solid ${C.line}`,
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
          padding: 12,
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder="Type what you'd say on the call…"
          style={{
            flex: 1,
            resize: "none",
            border: `1px solid ${C.line}`,
            borderRadius: 12,
            padding: "12px 14px",
            fontFamily: "Inter, sans-serif",
            fontSize: 14.5,
            lineHeight: 1.4,
            maxHeight: 120,
            background: C.paper,
            color: C.ink,
          }}
        />
        <button
          className="lava-btn"
          onClick={send}
          disabled={!input.trim() || thinking}
          style={{
            background: C.teal,
            color: "#fff",
            borderRadius: 12,
            padding: "12px 18px",
            fontWeight: 600,
            fontSize: 14.5,
            opacity: !input.trim() || thinking ? 0.5 : 1,
          }}
        >
          Say it
        </button>
      </div>

      {/* controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <button
          className="lava-btn"
          onClick={onBack}
          style={{ background: "none", color: C.muted, fontSize: 14, fontWeight: 600, padding: "8px 4px" }}
        >
          ← Leave without scoring
        </button>
        <button
          className="lava-btn"
          onClick={onEnd}
          disabled={!enough}
          style={{
            background: C.coral,
            color: "#fff",
            borderRadius: 999,
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: 14.5,
            animation: enough ? "lavaPulse 2.2s infinite" : "none",
            opacity: enough ? 1 : 0.5,
          }}
        >
          End call & get scored
        </button>
      </div>
    </div>
  );
}

function Bubble({ role, text, name }) {
  const va = role === "va";
  return (
    <div
      className="lava-msg"
      style={{ display: "flex", flexDirection: "column", alignItems: va ? "flex-end" : "flex-start" }}
    >
      <span style={{ fontSize: 11, fontWeight: 700, color: va ? C.coral : C.tealSoft, marginBottom: 3, letterSpacing: 0.3 }}>
        {va ? "YOU" : name.toUpperCase()}
      </span>
      <div
        style={{
          maxWidth: "82%",
          padding: "11px 15px",
          borderRadius: va ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          background: va ? C.teal : "#EEF1F1",
          color: va ? "#fff" : C.ink,
          fontSize: 14.5,
          lineHeight: 1.45,
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* ---------------- SCORE SCREEN ---------------- */
function ScoreScreen({ scn, scoring, data, err, onRetry, onReplay, onHome }) {
  if (scoring) {
    return (
      <div className="lava-msg" style={{ textAlign: "center", padding: "90px 0" }}>
        <div
          style={{
            width: 46,
            height: 46,
            border: `4px solid ${C.line}`,
            borderTopColor: C.coral,
            borderRadius: "50%",
            margin: "0 auto 20px",
            animation: "lavaSpin .8s linear infinite",
          }}
        />
        <p className="lava-head" style={{ color: C.teal, fontSize: 18, margin: 0 }}>
          Scoring your call…
        </p>
        <p style={{ color: C.muted, fontSize: 14 }}>Reviewing the transcript against the LAVA rubric</p>
      </div>
    );
  }
  if (err) {
    return (
      <div className="lava-msg" style={{ textAlign: "center", padding: "80px 0", maxWidth: 420, margin: "0 auto" }}>
        <p className="lava-head" style={{ color: C.teal, fontSize: 19 }}>Scoring didn't go through</p>
        <p style={{ color: C.muted }}>{err}</p>
        <button className="lava-btn" onClick={onRetry} style={primaryBtn}>Try scoring again</button>
      </div>
    );
  }
  if (!data) return null;

  const overallLevel =
    data.total >= 70 ? { label: "Exceeds Expectations", color: C.green } :
    data.total >= 45 ? { label: "Meets Expectations", color: C.gold } :
    { label: "Needs Improvement", color: C.coral };

  return (
    <div className="lava-msg" style={{ paddingTop: 26 }}>
      {/* headline score */}
      <div
        style={{
          background: C.teal,
          borderRadius: 18,
          padding: "26px 24px",
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span style={{ fontSize: 12.5, letterSpacing: 1, textTransform: "uppercase", opacity: 0.8 }}>
            {scn.title} · {scn.tag}
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
            <span className="lava-head" style={{ fontSize: 54, fontWeight: 800, lineHeight: 1 }}>
              {data.total}
            </span>
            <span style={{ fontSize: 20, opacity: 0.7 }}>/ 100</span>
          </div>
          <span
            style={{
              display: "inline-block",
              marginTop: 8,
              background: overallLevel.color,
              borderRadius: 999,
              padding: "4px 13px",
              fontSize: 12.5,
              fontWeight: 700,
            }}
          >
            {overallLevel.label}
          </span>
        </div>
        <p style={{ flex: 1, minWidth: 220, fontSize: 14.5, lineHeight: 1.55, opacity: 0.92, margin: 0 }}>
          {data.summary}
        </p>
      </div>

      {/* strength / fix */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14, marginTop: 16 }}>
        <Callout color={C.green} label="What worked" text={data.strength} />
        <Callout color={C.coral} label="Fix this first" text={data.fix} />
      </div>

      {/* per-criterion */}
      <h2 className="lava-head" style={{ fontSize: 14, letterSpacing: 1, textTransform: "uppercase", color: C.teal, margin: "26px 0 12px" }}>
        Rubric breakdown
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.criteria.map((c) => {
          const lvl = levelFromScore(c.score);
          return (
            <div key={c.name} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: "15px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span className="lava-head" style={{ fontSize: 15.5, color: C.ink, fontWeight: 600 }}>
                  {c.name}
                  <span style={{ color: C.muted, fontWeight: 500, fontSize: 12.5, marginLeft: 7 }}>· {c.weight}% weight</span>
                </span>
                <span style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: 15, color: lvl.color, whiteSpace: "nowrap" }}>
                  {c.score}/5
                </span>
              </div>
              <div style={{ background: C.line, height: 7, borderRadius: 99, marginTop: 10, overflow: "hidden" }}>
                <div className="lava-bar" style={{ width: `${(c.score / 5) * 100}%`, height: "100%", background: lvl.color, borderRadius: 99 }} />
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: C.muted, margin: "10px 0 0" }}>{c.feedback}</p>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
        <button className="lava-btn" onClick={onReplay} style={primaryBtn}>Run this scenario again</button>
        <button className="lava-btn" onClick={onHome} style={ghostBtn}>Try another scenario</button>
      </div>
    </div>
  );
}

function Callout({ color, label, text }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.line}`, borderLeft: `4px solid ${color}`, borderRadius: 12, padding: "14px 16px" }}>
      <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color }}>{label}</span>
      <p style={{ fontSize: 14, lineHeight: 1.5, color: C.ink, margin: "6px 0 0" }}>{text}</p>
    </div>
  );
}

const primaryBtn = {
  background: C.coral,
  color: "#fff",
  borderRadius: 999,
  padding: "13px 24px",
  fontWeight: 700,
  fontSize: 14.5,
};
const ghostBtn = {
  background: "transparent",
  color: C.teal,
  border: `1.5px solid ${C.teal}`,
  borderRadius: 999,
  padding: "13px 24px",
  fontWeight: 600,
  fontSize: 14.5,
};

/* ---------------- RUBRIC MODAL ---------------- */
function RubricModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(22,40,43,.5)",
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5vh 16px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="lava-msg"
        style={{ background: C.paper, borderRadius: 18, maxWidth: 760, width: "100%", padding: "24px 22px 28px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <h2 className="lava-head" style={{ color: C.teal, fontSize: 22, margin: 0 }}>Scoring rubric</h2>
          <button className="lava-btn" onClick={onClose} style={{ background: "none", color: C.muted, fontSize: 22, lineHeight: 1, padding: 4 }} aria-label="Close">×</button>
        </div>
        <p style={{ color: C.muted, fontSize: 13.5, margin: "0 0 18px" }}>
          Every call is graded on these six criteria. Weights total 100%.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {RUBRIC.map((r) => (
            <div key={r.name} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="lava-head" style={{ fontWeight: 600, fontSize: 15.5, color: C.ink }}>{r.name}</span>
                <span style={{ background: C.teal, color: "#fff", borderRadius: 999, padding: "3px 11px", fontSize: 12.5, fontWeight: 700 }}>{r.weight}%</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8, marginTop: 11 }}>
                <Level color={C.coral} title="Needs Improvement (1–2)" text={r.ni} />
                <Level color={C.gold} title="Meets Expectations (3–4)" text={r.me} />
                <Level color={C.green} title="Exceeds Expectations (5)" text={r.ee} />
              </div>
            </div>
          ))}
        </div>
        <button className="lava-btn" onClick={onClose} style={{ ...primaryBtn, marginTop: 20, width: "100%" }}>Got it</button>
      </div>
    </div>
  );
}

function Level({ color, title, text }) {
  return (
    <div style={{ background: C.paper, borderRadius: 9, padding: "9px 11px", borderTop: `3px solid ${color}` }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase", color }}>{title}</span>
      <p style={{ fontSize: 12.5, lineHeight: 1.42, color: C.ink, margin: "5px 0 0" }}>{text}</p>
    </div>
  );
}
