// Mini-game: spot the hallucinated claim in an AI answer. Teaches: verify AI output.
export function mount(el,cfg,onDone){
 let r=0,errors=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Answer <b id="r">1</b>/${cfg.rounds.length}</span><span>Wrong flags: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><div id="claims"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(x,c)=>{msg.className="msg "+(c||"");msg.textContent=x};
 function draw(){const R=cfg.rounds[r];$("#r").textContent=r+1;$("#q").textContent="You asked the Oracle: "+R.prompt;say("");
  const box=$("#claims");box.innerHTML="";
  R.claims.forEach((c,i)=>{const d=document.createElement("button");d.className="claim";d.textContent=c;d.onclick=()=>pick(d,i);box.append(d)})}
 function pick(d,i){const R=cfg.rounds[r];
  if(i!==R.bad){errors++;$("#e").textContent=errors;d.disabled=true;say("That claim checks out. Keep looking for the made-up one.","bad");return}
  el.querySelectorAll(".claim").forEach(x=>x.disabled=true);d.classList.add("fake");say(R.why,"good");
  const nb=document.createElement("button");const last=r===cfg.rounds.length-1;nb.textContent=last?"Continue":"Next answer";
  nb.onclick=()=>{if(last)onDone(errors===0?3:errors<=2?2:1);else{nb.remove();r++;draw()}};msg.after(nb)}
 draw();
}
