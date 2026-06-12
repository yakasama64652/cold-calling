<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>LAVA · Cold Call Trainer</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');

:root{
  --teal:#16424E; --teal700:#1B4D5C; --tealSoft:#2B6678;
  --coral:#E6402E; --coral600:#CC3320;
  --paper:#F6F5F2; --card:#FFFFFF; --ink:#19262B; --muted:#6C7C81;
  --line:#E4E2DC; --green:#2E9E6B; --gold:#C08A1E;
}
*{box-sizing:border-box;}
body{margin:0;background:var(--paper);color:var(--ink);font-family:'Inter',system-ui,sans-serif;}
.head{font-family:'Poppins',sans-serif;}
button{font-family:inherit;}

@keyframes fade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
@keyframes blink{0%,100%{opacity:.35;}50%{opacity:1;}}
@keyframes dot{0%,60%,100%{transform:translateY(0);opacity:.4;}30%{transform:translateY(-4px);opacity:1;}}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(230,64,46,.45);}70%{box-shadow:0 0 0 12px rgba(230,64,46,0);}100%{box-shadow:0 0 0 0 rgba(230,64,46,0);}}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes grow{from{width:0;}}
.fade{animation:fade .25s ease both;}

.btn{transition:transform .12s ease,background .15s,opacity .15s;cursor:pointer;border:none;}
.btn:hover{transform:translateY(-1px);}
.btn:active{transform:translateY(0);}
.btn:focus-visible{outline:3px solid var(--tealSoft);outline-offset:2px;}
.btn:disabled{cursor:default;}
.btn:disabled:hover{transform:none;}

.scn{transition:transform .15s ease,box-shadow .15s ease,border-color .15s;}
.scn:hover{transform:translateY(-3px);box-shadow:0 14px 34px -18px rgba(22,66,78,.45);border-color:var(--teal);}
.scn:focus-visible{outline:3px solid var(--tealSoft);outline-offset:3px;}

textarea:focus,input:focus{outline:none;}
::-webkit-scrollbar{width:9px;height:9px;}
::-webkit-scrollbar-thumb{background:#cfd8da;border-radius:6px;}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}

/* logo */
.logo{display:inline-flex;align-items:center;gap:8px;}
.logo .mark{width:26px;height:26px;border-radius:7px;background:var(--coral);display:inline-flex;align-items:center;justify-content:center;position:relative;}
.logo .mark .eyes{display:flex;gap:3px;}
.logo .mark .eyes span{width:4px;height:4px;border-radius:50%;background:#fff;}
.logo .mark .ant{position:absolute;top:-4px;width:2px;height:4px;background:var(--coral);border-radius:2px;}
.logo .word{font-family:'Poppins';font-weight:800;letter-spacing:1px;color:var(--teal);font-size:17px;}

header.topbar{display:flex;align-items:center;justify-content:space-between;padding:16px clamp(16px,4vw,40px);border-bottom:1px solid var(--line);background:rgba(246,245,242,.85);backdrop-filter:blur(8px);position:sticky;top:0;z-index:20;}
main{max-width:980px;margin:0 auto;padding:0 clamp(16px,4vw,28px);}

.pill-outline{background:transparent;color:var(--teal);border:1.5px solid var(--teal);border-radius:999px;padding:8px 16px;font-weight:600;font-size:13.5px;}
.primary{background:var(--coral);color:#fff;border-radius:999px;padding:13px 24px;font-weight:700;font-size:14.5px;}
.ghost{background:transparent;color:var(--teal);border:1.5px solid var(--teal);border-radius:999px;padding:13px 24px;font-weight:600;font-size:14.5px;}
</style>
</head>
<body>
<header class="topbar">
  <button id="logoBtn" class="btn" style="background:none;padding:0;">
    <span class="logo"><span class="mark"><span class="ant"></span><span class="eyes"><span></span><span></span></span></span><span class="word">LAVA</span></span>
  </button>
  <button id="rubricBtn" class="btn pill-outline">Scoring rubric</button>
</header>
<main id="app"></main>
<div id="modalRoot"></div>

<script>
const C = {
  teal:"#16424E", teal700:"#1B4D5C", tealSoft:"#2B6678",
  coral:"#E6402E", coral600:"#CC3320", paper:"#F6F5F2", card:"#FFFFFF",
  ink:"#19262B", muted:"#6C7C81", line:"#E4E2DC", green:"#2E9E6B", gold:"#C08A1E"
};

const RUBRIC = [
  {name:"Opening & Introduction",weight:15,
   ni:"Lacks clear identification; weak or scripted hook; low energy.",
   me:"Clearly identifies self and company; states purpose concisely; polite tone.",
   ee:"High energy; compelling, personalized hook; builds immediate curiosity."},
  {name:"Rapport & Active Listening",weight:20,
   ni:"Monopolizes conversation; fails to acknowledge prospect's statements; rushed.",
   me:"Asks open-ended questions; listens for cues; maintains professional, friendly tone.",
   ee:"Establishes immediate trust; rephrases prospect's needs accurately; demonstrates empathy."},
  {name:"Needs Assessment & Discovery",weight:25,
   ni:"Asks only superficial/yes-no questions; no attempt to uncover specific pain points.",
   me:"Asks targeted questions to understand current coverage and pain points; identifies a gap.",
   ee:"Masterfully links specific pain points to potential insurance solutions; uncovers latent needs."},
  {name:"Product Pitch & Solution",weight:15,
   ni:"Reads features; generic solution; uses jargon; fails to connect to need.",
   me:"Tailors product features to address identified needs; uses clear, benefit-driven language.",
   ee:"Confidently positions the product as the essential solution; uses persuasive language and social proof."},
  {name:"Objection Handling",weight:15,
   ni:"Argues with prospect; dismisses concerns; fails to address root objection.",
   me:"Acknowledges objection respectfully; provides a credible, concise rebuttal; reframes positively.",
   ee:"Preempts common objections; skillfully isolates and overcomes complex objections to keep the sale moving."},
  {name:"Closing & Next Steps",weight:10,
   ni:"Ends call abruptly; fails to ask for commitment or define next steps.",
   me:"Clearly requests a small commitment (e.g., send information, brief follow-up call); sets a definite next step.",
   ee:"Strong, confident ask for the sale/appointment; overcomes hesitation; locks in the next action immediately."}
];

const BASE_RULES = `You are role-playing as a sales prospect in a cold-call training simulation for a life & general insurance company. A trainee virtual assistant (the caller) is practicing on you.

Rules:
- Stay 100% in character. Never mention you are an AI, never coach, never break the fourth wall.
- Speak like a real person on a phone: short, natural, 1-3 sentences (under ~45 words). Use interruptions, filler, and realistic reactions.
- React dynamically to how well the caller handles you. Reward genuine empathy, good questions, and confidence. Punish pushiness, scripts, and arguing.
- Do not make it artificially easy. Only warm up if the caller earns it.
- Never narrate actions in asterisks. Just speak your line.`;

const SCENARIOS = [
  {id:"irate-no-future",num:"I",title:"Irate Lead",tag:"No opt-out request",difficulty:"Hard",leadName:"Margaret Doyle",
   blurb:"Caught at a bad moment and clearly annoyed about the interruption — but she never asks to be removed. Your job is to de-escalate without arguing.",
   objective:"De-escalate. Stay composed, apologize sincerely, and either earn 30 seconds of real attention or exit gracefully — never argue back.",
   firstLine:"Hello?\u2026 Who is this? I'm right in the middle of something.",
   persona:BASE_RULES+`

CHARACTER: Margaret Doyle, 48, a busy homeowner. You just got interrupted by an unsolicited insurance call and you are IRRITATED.
- Open annoyed and suspicious. Use short, clipped lines. "How did you get my number?" "I don't have time for this."
- You do NOT ask to be removed and you do NOT mention future contact — that is not your move in this scenario.
- If the caller argues, talks over you, or launches into a script, get colder and shorter.
- If the caller genuinely apologizes, lowers their energy, and respects your time, you soften slightly and may grant ~30 seconds. You stay skeptical though.
- If they earn it, you might admit one small real concern (your premium went up this year). You never become eager.`},

  {id:"irate-remove",num:"I.I",title:"Irate Lead",tag:'Says "remove me"',difficulty:"Hard",leadName:"Frank Mercer",
   blurb:"Angry and explicit: he wants off the list. The correct play is to comply professionally and confirm removal — not to keep pitching.",
   objective:"Honor the opt-out immediately. Apologize, confirm you'll remove him, do NOT pitch. A clean, respectful exit is a win here.",
   firstLine:"Yeah, hello? Look — who is this and what do you want?",
   persona:BASE_RULES+`

CHARACTER: Frank Mercer, 55, irritated and blunt. You are done with cold calls.
- Within your first or second line, demand to be taken off the list: "Take me off your list," "Remove me, do not call again."
- If the caller keeps pitching or tries to handle the objection instead of complying, you get angrier and more insistent.
- If the caller calmly apologizes, confirms they will remove your number, and offers to end the call, you de-escalate fast and end politely ("Fine. Thank you.").
- The ONLY correct outcome is the caller respecting the opt-out. Reward that. Anything else makes you hang-up-level angry.`},

  {id:"interested-no-type",num:"II",title:"Interested Lead",tag:"No insurance type mentioned",difficulty:"Medium",leadName:"Priya Nair",
   blurb:"Open to talking but vague — she hasn't said what kind of coverage she needs. This is a discovery test: uncover the real need.",
   objective:"Run real discovery. Ask targeted, open-ended questions to surface her situation and the specific insurance gap before pitching anything.",
   firstLine:"Oh, hi — yeah, insurance? I guess I've been meaning to look into that, actually.",
   persona:BASE_RULES+`

CHARACTER: Priya Nair, 34, friendly and genuinely open. You've vaguely meant to "sort out insurance" but you don't volunteer specifics.
- Be warm but vague at first. Do NOT state which insurance you need unless the caller asks good discovery questions.
- You have a real (hidden) situation: you just bought a small condo and started freelancing, so you lost your employer coverage. You worry about income if you got sick, and you have no life cover but a partner who depends on you.
- Reveal these details gradually, ONLY in response to good open-ended questions. If the caller pitches before discovering, give lukewarm "mm, maybe" answers.
- Warm up noticeably when the caller listens and connects a real need to a solution.`},

  {id:"interested-later",num:"III",title:"Interested Lead",tag:"Transition later",difficulty:"Medium",leadName:"Daniel Okafor",
   blurb:"Interested and qualified — but it's a bad time to talk. The whole call hinges on locking a concrete follow-up.",
   objective:"Secure a specific next step. Don't force the pitch now; confirm interest and book a real follow-up with a day and time.",
   firstLine:"Hey, sorry — this actually sounds useful but you've caught me on my way into a meeting.",
   persona:BASE_RULES+`

CHARACTER: Daniel Okafor, 41, polite and genuinely interested in reviewing his insurance — but truly pressed for time right now.
- Make it clear early that it's a bad moment ("on my way into a meeting", "can't really talk now").
- If the caller tries to push the full pitch anyway, get a little impatient and start trying to get off the phone.
- If the caller respects your time and proposes a specific follow-up, engage and help nail down a day/time. You prefer late afternoons.
- You only "commit" to the follow-up if the caller asks for a concrete time and confirms it back to you. Vague "I'll call you sometime" doesn't land.`},

  {id:"previously-contacted",num:"IV",title:"Previously Contacted Lead",tag:"Re-engagement",difficulty:"Medium",leadName:"Sandra Klein",
   blurb:"Someone from the company spoke to her weeks ago and nothing happened. She half-remembers it. Acknowledge the history and re-earn the conversation.",
   objective:"Acknowledge prior contact gracefully, reference it, rebuild trust, and re-open the conversation without making her repeat everything.",
   firstLine:"Hello?\u2026 Wait — didn't someone from your company already call me a while back?",
   persona:BASE_RULES+`

CHARACTER: Sandra Klein, 39. Someone from this insurance company called you about a month ago. You half-remember it and you're mildly wary that this is a repeat.
- Bring up the prior contact early and a little skeptically ("I think I already talked to someone\u2026").
- If the caller pretends it's a fresh first call or seems unaware, get annoyed at the disorganization.
- If the caller acknowledges the prior touch warmly, doesn't make you re-explain everything, and adds a reason this call is worth your time, you relax and re-engage.
- You had a mild real interest last time (reviewing your home & contents cover) that fizzled because no one followed up.`}
];

const DIFF_COLOR = {Hard:C.coral, Medium:C.gold, Easy:C.green};

function levelFromScore(s){
  if(s<=2) return {label:"Needs Improvement",color:C.coral};
  if(s<=4) return {label:"Meets Expectations",color:C.gold};
  return {label:"Exceeds Expectations",color:C.green};
}
function esc(t){const d=document.createElement("div");d.textContent=t==null?"":String(t);return d.innerHTML;}
function fmtTime(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");}

/* ---------------- STATE ---------------- */
const app = document.getElementById("app");
let state = { view:"home", active:null, messages:[], thinking:false, seconds:0, timer:null, scoreData:null };

document.getElementById("logoBtn").onclick = ()=>{ if(state.view!=="call") go("home"); };
document.getElementById("rubricBtn").onclick = openRubric;

function go(view){
  if(state.timer){clearInterval(state.timer);state.timer=null;}
  state.view = view;
  if(view==="home") renderHome();
  if(view==="call") renderCall();
  if(view==="score") renderScore();
  window.scrollTo({top:0,behavior:"smooth"});
}

function startCall(scn){
  state.active = scn;
  state.messages = [{role:"prospect",text:scn.firstLine}];
  state.seconds = 0;
  state.scoreData = null;
  go("call");
}

/* ---------------- HOME ---------------- */
function renderHome(){
  const cards = SCENARIOS.map(s=>`
    <button class="btn scn" data-id="${s.id}" style="text-align:left;background:${C.card};border:1px solid ${C.line};border-radius:16px;padding:20px 20px 18px;display:flex;flex-direction:column;gap:10px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="head" style="font-size:12px;font-weight:700;color:#fff;background:${C.teal};border-radius:7px;padding:3px 9px;letter-spacing:.5px;">${s.num}</span>
        <span style="font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:${DIFF_COLOR[s.difficulty]};">${s.difficulty}</span>
      </div>
      <div>
        <h3 class="head" style="margin:2px 0;font-size:19px;color:${C.ink};">${esc(s.title)}</h3>
        <span style="font-size:13px;color:${C.tealSoft};font-weight:600;">${esc(s.tag)}</span>
      </div>
      <p style="font-size:13.5px;line-height:1.5;color:${C.muted};margin:0;">${esc(s.blurb)}</p>
      <span style="margin-top:6px;font-size:13px;font-weight:700;color:${C.coral};">Start call →</span>
    </button>`).join("");

  app.innerHTML = `
  <div class="fade">
    <section style="padding:44px 0 30px;max-width:680px;">
      <span class="head" style="display:inline-block;color:${C.coral};font-weight:700;letter-spacing:2px;font-size:12.5px;text-transform:uppercase;margin-bottom:14px;">Final Mock Call · Cold Calling</span>
      <h1 class="head" style="font-size:clamp(30px,5vw,46px);line-height:1.05;margin:0 0 16px;color:${C.teal};">Pick up the phone.<br><span style="color:${C.coral};">Earn the conversation.</span></h1>
      <p style="font-size:16.5px;line-height:1.55;color:${C.muted};margin:0;">Run a live cold call against a simulated insurance lead. They'll react like a real person — irate, vague, rushed, or wary. End the call and you're scored against the LAVA rubric, with specific notes on what to fix next.</p>
    </section>
    <h2 class="head" style="font-size:15px;letter-spacing:1px;text-transform:uppercase;color:${C.teal};margin:8px 0 16px;">Choose a scenario</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">${cards}</div>
  </div>`;

  app.querySelectorAll(".scn").forEach(b=>{
    b.onclick = ()=> startCall(SCENARIOS.find(s=>s.id===b.dataset.id));
  });
}

/* ---------------- CALL ---------------- */
function renderCall(){
  const s = state.active;
  const initials = s.leadName.split(" ").map(n=>n[0]).join("");
  app.innerHTML = `
  <div class="fade" style="padding-top:22px;">
    <div style="background:${C.teal};border-radius:16px 16px 0 0;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;color:#fff;flex-wrap:wrap;gap:10px;">
      <div style="display:flex;align-items:center;gap:13px;">
        <div style="width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-family:Poppins;font-weight:700;font-size:16px;">${esc(initials)}</div>
        <div>
          <div class="head" style="font-weight:600;font-size:16px;">${esc(s.leadName)}</div>
          <div style="display:flex;align-items:center;gap:7px;font-size:12.5px;opacity:.85;">
            <span style="width:8px;height:8px;border-radius:50%;background:${C.green};animation:blink 1.4s infinite;"></span>
            Live · <span id="timer">00:00</span>
          </div>
        </div>
      </div>
      <span style="font-size:11.5px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;background:rgba(255,255,255,.14);border-radius:999px;padding:5px 11px;">${esc(s.num)} · ${esc(s.tag)}</span>
    </div>

    <div style="background:#FFF6F4;border-left:3px solid ${C.coral};padding:10px 18px;font-size:13px;color:${C.ink};">
      <strong style="color:${C.coral};">Your objective:</strong> ${esc(s.objective)}
    </div>

    <div id="transcript" style="background:${C.card};border:1px solid ${C.line};border-top:none;height:min(46vh,420px);overflow-y:auto;padding:20px 18px;display:flex;flex-direction:column;gap:12px;"></div>

    <div style="background:${C.card};border:1px solid ${C.line};border-top:none;border-radius:0 0 16px 16px;padding:12px;display:flex;gap:10px;align-items:flex-end;">
      <textarea id="input" rows="1" placeholder="Type what you'd say on the call…" style="flex:1;resize:none;border:1px solid ${C.line};border-radius:12px;padding:12px 14px;font-family:Inter,sans-serif;font-size:14.5px;line-height:1.4;max-height:120px;background:${C.paper};color:${C.ink};"></textarea>
      <button id="sendBtn" class="btn" style="background:${C.teal};color:#fff;border-radius:12px;padding:12px 18px;font-weight:600;font-size:14.5px;">Say it</button>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;gap:12px;flex-wrap:wrap;">
      <button id="leaveBtn" class="btn" style="background:none;color:${C.muted};font-size:14px;font-weight:600;padding:8px 4px;">← Leave without scoring</button>
      <button id="endBtn" class="btn" disabled style="background:${C.coral};color:#fff;border-radius:999px;padding:12px 24px;font-weight:700;font-size:14.5px;opacity:.5;">End call & get scored</button>
    </div>
  </div>`;

  const transcript = document.getElementById("transcript");
  state.messages.forEach(m=> transcript.appendChild(makeBubble(m.role, m.text, s.leadName)));
  transcript.scrollTop = transcript.scrollHeight;

  const input = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");
  const endBtn = document.getElementById("endBtn");

  function refreshEnd(){
    const enough = state.messages.filter(m=>m.role==="va").length>=1;
    endBtn.disabled = !enough;
    endBtn.style.opacity = enough?1:.5;
    endBtn.style.animation = enough?"pulse 2.2s infinite":"none";
  }
  refreshEnd();
  window._refreshEnd = refreshEnd;

  sendBtn.onclick = send;
  input.onkeydown = e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} };
  input.oninput = ()=>{ input.style.height="auto"; input.style.height=Math.min(input.scrollHeight,120)+"px"; };
  document.getElementById("leaveBtn").onclick = ()=> go("home");
  endBtn.onclick = endAndScore;

  state.timer = setInterval(()=>{
    state.seconds++;
    const t=document.getElementById("timer");
    if(t) t.textContent = fmtTime(state.seconds);
  },1000);
}

function makeBubble(role, text, name){
  const va = role==="va";
  const wrap = document.createElement("div");
  wrap.className="fade";
  wrap.style.cssText=`display:flex;flex-direction:column;align-items:${va?"flex-end":"flex-start"};`;
  wrap.innerHTML = `
    <span style="font-size:11px;font-weight:700;color:${va?C.coral:C.tealSoft};margin-bottom:3px;letter-spacing:.3px;">${va?"YOU":esc(name.toUpperCase())}</span>
    <div style="max-width:82%;padding:11px 15px;border-radius:${va?"14px 14px 4px 14px":"14px 14px 14px 4px"};background:${va?C.teal:"#EEF1F1"};color:${va?"#fff":C.ink};font-size:14.5px;line-height:1.45;">${esc(text)}</div>`;
  return wrap;
}

function showThinking(on){
  const t=document.getElementById("transcript");
  let dots=document.getElementById("dots");
  if(on){
    if(dots) return;
    dots=document.createElement("div");
    dots.id="dots";
    dots.style.cssText="display:flex;gap:5px;padding:6px 14px;align-self:flex-start;";
    dots.innerHTML=[0,1,2].map(d=>`<span style="width:7px;height:7px;border-radius:50%;background:${C.tealSoft};animation:dot 1s infinite ${d*.15}s;"></span>`).join("");
    t.appendChild(dots); t.scrollTop=t.scrollHeight;
  } else if(dots){ dots.remove(); }
}

async function send(){
  if(state.thinking) return;
  const input=document.getElementById("input");
  const text=input.value.trim();
  if(!text) return;
  state.messages.push({role:"va",text});
  const t=document.getElementById("transcript");
  t.appendChild(makeBubble("va",text,state.active.leadName));
  t.scrollTop=t.scrollHeight;
  input.value=""; input.style.height="auto";
  state.thinking=true;
  if(window._refreshEnd) window._refreshEnd();
  showThinking(true);

  try{
    const apiMsgs = state.messages.map(m=>({role:m.role==="va"?"user":"assistant",content:m.text}));
    const trimmed = apiMsgs[0] && apiMsgs[0].role==="assistant" ? apiMsgs.slice(1) : apiMsgs;
    const res = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:state.active.persona,messages:trimmed})
    });
    const data = await res.json();
    const reply = (data.content||[]).filter(c=>c.type==="text").map(c=>c.text).join(" ").trim();
    pushProspect(reply||"…(silence on the line)");
  }catch(e){
    pushProspect("…(the line crackled — try that again)");
  }finally{
    state.thinking=false;
    showThinking(false);
  }
}
function pushProspect(text){
  state.messages.push({role:"prospect",text});
  const t=document.getElementById("transcript");
  if(t){ t.appendChild(makeBubble("prospect",text,state.active.leadName)); t.scrollTop=t.scrollHeight; }
}

/* ---------------- SCORE ---------------- */
async function endAndScore(){
  if(state.timer){clearInterval(state.timer);state.timer=null;}
  state.view="score";
  renderScoring();

  const s=state.active;
  const transcript = state.messages.map(m=>`${m.role==="va"?"CALLER":s.leadName.toUpperCase()}: ${m.text}`).join("\n");
  const rubricText = RUBRIC.map(r=>`- ${r.name} (weight ${r.weight}%). Needs Improvement(1-2): ${r.ni} Meets(3-4): ${r.me} Exceeds(5): ${r.ee}`).join("\n");
  const prompt = `You are a strict but fair sales coach grading a cold-call training transcript for an insurance virtual assistant.

SCENARIO: ${s.title} — ${s.tag}. Objective for the caller: ${s.objective}

RUBRIC (score each criterion 0-5; 0 only if utterly absent):
${rubricText}

TRANSCRIPT:
${transcript}

Grade the CALLER only. If the call was very short, grade what evidence exists and keep scores low where criteria weren't demonstrated.

Respond with ONLY valid JSON, no markdown, no preamble, in exactly this shape:
{"criteria":[{"name":"Opening & Introduction","score":0,"feedback":"1 short sentence"},{"name":"Rapport & Active Listening","score":0,"feedback":"..."},{"name":"Needs Assessment & Discovery","score":0,"feedback":"..."},{"name":"Product Pitch & Solution","score":0,"feedback":"..."},{"name":"Objection Handling","score":0,"feedback":"..."},{"name":"Closing & Next Steps","score":0,"feedback":"..."}],"strength":"one specific thing they did well","fix":"the single highest-impact fix","summary":"2 sentence overall verdict"}`;

  try{
    const res = await fetch("https://api.anthropic.com/v1/messages",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:prompt}]})
    });
    const data = await res.json();
    let raw = (data.content||[]).filter(c=>c.type==="text").map(c=>c.text).join("").trim();
    raw = raw.replace(/```json/gi,"").replace(/```/g,"").trim();
    const start=raw.indexOf("{"), end=raw.lastIndexOf("}");
    if(start>=0) raw=raw.slice(start,end+1);
    const parsed = JSON.parse(raw);
    const merged = RUBRIC.map(r=>{
      const f=(parsed.criteria||[]).find(c=>c.name===r.name)||{};
      const score=Math.max(0,Math.min(5,Number(f.score)||0));
      return {...r,score,feedback:f.feedback||""};
    });
    const total = Math.round(merged.reduce((sum,c)=>sum+(c.score/5)*c.weight,0));
    state.scoreData = {criteria:merged,total,strength:parsed.strength,fix:parsed.fix,summary:parsed.summary};
    renderScore();
  }catch(e){
    renderScoreError();
  }
}

function renderScoring(){
  app.innerHTML = `
  <div class="fade" style="text-align:center;padding:90px 0;">
    <div style="width:46px;height:46px;border:4px solid ${C.line};border-top-color:${C.coral};border-radius:50%;margin:0 auto 20px;animation:spin .8s linear infinite;"></div>
    <p class="head" style="color:${C.teal};font-size:18px;margin:0;">Scoring your call…</p>
    <p style="color:${C.muted};font-size:14px;">Reviewing the transcript against the LAVA rubric</p>
  </div>`;
}
function renderScoreError(){
  app.innerHTML = `
  <div class="fade" style="text-align:center;padding:80px 0;max-width:420px;margin:0 auto;">
    <p class="head" style="color:${C.teal};font-size:19px;">Scoring didn't go through</p>
    <p style="color:${C.muted};">Couldn't grade the call this time. Check your connection and try again.</p>
    <button id="retryBtn" class="btn primary">Try scoring again</button>
  </div>`;
  document.getElementById("retryBtn").onclick = endAndScore;
}

function renderScore(){
  const d=state.scoreData, s=state.active;
  if(!d) return;
  const overall = d.total>=70 ? {label:"Exceeds Expectations",color:C.green}
               : d.total>=45 ? {label:"Meets Expectations",color:C.gold}
               : {label:"Needs Improvement",color:C.coral};

  const crit = d.criteria.map(c=>{
    const lvl=levelFromScore(c.score);
    return `
    <div style="background:${C.card};border:1px solid ${C.line};border-radius:14px;padding:15px 18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <span class="head" style="font-size:15.5px;color:${C.ink};font-weight:600;">${esc(c.name)}<span style="color:${C.muted};font-weight:500;font-size:12.5px;margin-left:7px;">· ${c.weight}% weight</span></span>
        <span style="font-family:Poppins;font-weight:700;font-size:15px;color:${lvl.color};white-space:nowrap;">${c.score}/5</span>
      </div>
      <div style="background:${C.line};height:7px;border-radius:99px;margin-top:10px;overflow:hidden;">
        <div style="width:${(c.score/5)*100}%;height:100%;background:${lvl.color};border-radius:99px;animation:grow .5s ease both;"></div>
      </div>
      <p style="font-size:13.5px;line-height:1.5;color:${C.muted};margin:10px 0 0;">${esc(c.feedback)}</p>
    </div>`;
  }).join("");

  app.innerHTML = `
  <div class="fade" style="padding-top:26px;">
    <div style="background:${C.teal};border-radius:18px;padding:26px 24px;color:#fff;display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between;">
      <div>
        <span style="font-size:12.5px;letter-spacing:1px;text-transform:uppercase;opacity:.8;">${esc(s.title)} · ${esc(s.tag)}</span>
        <div style="display:flex;align-items:baseline;gap:8px;margin-top:4px;">
          <span class="head" style="font-size:54px;font-weight:800;line-height:1;">${d.total}</span>
          <span style="font-size:20px;opacity:.7;">/ 100</span>
        </div>
        <span style="display:inline-block;margin-top:8px;background:${overall.color};border-radius:999px;padding:4px 13px;font-size:12.5px;font-weight:700;">${overall.label}</span>
      </div>
      <p style="flex:1;min-width:220px;font-size:14.5px;line-height:1.55;opacity:.92;margin:0;">${esc(d.summary)}</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:16px;">
      <div style="background:${C.card};border:1px solid ${C.line};border-left:4px solid ${C.green};border-radius:12px;padding:14px 16px;">
        <span style="font-size:11.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:${C.green};">What worked</span>
        <p style="font-size:14px;line-height:1.5;color:${C.ink};margin:6px 0 0;">${esc(d.strength)}</p>
      </div>
      <div style="background:${C.card};border:1px solid ${C.line};border-left:4px solid ${C.coral};border-radius:12px;padding:14px 16px;">
        <span style="font-size:11.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:${C.coral};">Fix this first</span>
        <p style="font-size:14px;line-height:1.5;color:${C.ink};margin:6px 0 0;">${esc(d.fix)}</p>
      </div>
    </div>

    <h2 class="head" style="font-size:14px;letter-spacing:1px;text-transform:uppercase;color:${C.teal};margin:26px 0 12px;">Rubric breakdown</h2>
    <div style="display:flex;flex-direction:column;gap:12px;">${crit}</div>

    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:26px;">
      <button id="replayBtn" class="btn primary">Run this scenario again</button>
      <button id="homeBtn" class="btn ghost">Try another scenario</button>
    </div>
  </div>`;

  document.getElementById("replayBtn").onclick = ()=> startCall(state.active);
  document.getElementById("homeBtn").onclick = ()=> go("home");
}

/* ---------------- RUBRIC MODAL ---------------- */
function openRubric(){
  const rows = RUBRIC.map(r=>`
    <div style="background:${C.card};border:1px solid ${C.line};border-radius:12px;padding:14px 16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span class="head" style="font-weight:600;font-size:15.5px;color:${C.ink};">${esc(r.name)}</span>
        <span style="background:${C.teal};color:#fff;border-radius:999px;padding:3px 11px;font-size:12.5px;font-weight:700;">${r.weight}%</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:11px;">
        ${lvlBox(C.coral,"Needs Improvement (1–2)",r.ni)}
        ${lvlBox(C.gold,"Meets Expectations (3–4)",r.me)}
        ${lvlBox(C.green,"Exceeds Expectations (5)",r.ee)}
      </div>
    </div>`).join("");

  const mr = document.getElementById("modalRoot");
  mr.innerHTML = `
  <div id="overlay" style="position:fixed;inset:0;background:rgba(22,40,43,.5);z-index:50;display:flex;align-items:flex-start;justify-content:center;padding:5vh 16px;overflow-y:auto;">
    <div id="sheet" class="fade" style="background:${C.paper};border-radius:18px;max-width:760px;width:100%;padding:24px 22px 28px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <h2 class="head" style="color:${C.teal};font-size:22px;margin:0;">Scoring rubric</h2>
        <button id="closeRubric" class="btn" style="background:none;color:${C.muted};font-size:22px;line-height:1;padding:4px;">×</button>
      </div>
      <p style="color:${C.muted};font-size:13.5px;margin:0 0 18px;">Every call is graded on these six criteria. Weights total 100%.</p>
      <div style="display:flex;flex-direction:column;gap:12px;">${rows}</div>
      <button id="closeRubric2" class="btn primary" style="margin-top:20px;width:100%;">Got it</button>
    </div>
  </div>`;
  const close=()=> mr.innerHTML="";
  document.getElementById("overlay").onclick = e=>{ if(e.target.id==="overlay") close(); };
  document.getElementById("closeRubric").onclick = close;
  document.getElementById("closeRubric2").onclick = close;
}
function lvlBox(color,title,text){
  return `<div style="background:${C.paper};border-radius:9px;padding:9px 11px;border-top:3px solid ${color};">
    <span style="font-size:10.5px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;color:${color};">${title}</span>
    <p style="font-size:12.5px;line-height:1.42;color:${C.ink};margin:5px 0 0;">${esc(text)}</p>
  </div>`;
}

/* boot */
renderHome();
</script>
</body>
</html>
