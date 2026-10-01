// Mini-game: click the buggy line of a C snippet. Teaches: reading compiler-style errors and common C slips.
export function mount(el,cfg,onDone){
 let r=0,errors=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Snippet <b id="r">1</b>/${cfg.rounds.length}</span><span>Wrong lines: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><div class="code" id="code"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 function draw(){const R=cfg.rounds[r];$("#r").textContent=r+1;$("#q").textContent=R.symptom;const code=$("#code");code.innerHTML="";say("");
  R.code.forEach((line,i)=>{const d=document.createElement("div");d.className="line";
   const n=document.createElement("span");n.className="ln";n.textContent=i+1;
   const t=document.createElement("code");t.textContent=line;d.append(n,t);d.onclick=()=>pick(d,i);code.append(d)})}
 function pick(d,i){const R=cfg.rounds[r];
  if(i!==R.bug){errors++;$("#e").textContent=errors;d.classList.add("wrongline");say("That line is fine. Re-read the symptom.","bad");return}
  d.classList.add("bugline");say(`Found it. ${R.why} Fix: ${R.fix}`,"good");
  el.querySelectorAll(".line").forEach(x=>x.onclick=null);
  const b=document.createElement("button");const last=r===cfg.rounds.length-1;b.textContent=last?"Continue":"Next snippet";
  b.onclick=()=>{if(last)onDone(errors===0?3:errors<=2?2:1);else{b.remove();r++;draw()}};msg.after(b)}
 draw();
}
