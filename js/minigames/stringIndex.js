// Mini-game: click array/string positions. Teaches: zero-based indexing and the NUL terminator.
export function mount(el,cfg,onDone){
 let r=0,errors=0;const chars=[...cfg.word,"\\0"];
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Delivery <b id="r">1</b>/${cfg.rounds.length}</span><span>Wrong boxes: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><div class="row" id="row"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const draw=()=>{$("#r").textContent=r+1;$("#q").textContent=cfg.rounds[r].prompt;const row=$("#row");row.innerHTML="";
  chars.forEach((c,i)=>{const d=document.createElement("div");d.className="crate shelf full addr"+(i===chars.length-1?" nul":"");
   d.innerHTML=`<small>[${i}]</small><span></span>`;d.querySelector("span").textContent=c;d.onclick=()=>pick(i);row.append(d)})};
 function pick(i){const R=cfg.rounds[r];
  if(i!==R.answer){errors++;$("#e").textContent=errors;say(R.hint,"bad");return}
  say(R.explain,"good");const b=document.createElement("button");const last=r===cfg.rounds.length-1;b.textContent=last?"Continue":"Next delivery";
  b.onclick=()=>{if(last)onDone(errors===0?3:errors<=2?2:1);else{b.remove();r++;say("");draw()}};msg.after(b);
  el.querySelectorAll(".crate").forEach(c=>c.onclick=null)}
 draw();
}
