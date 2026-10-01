// Mini-game: multiple choice with explanations. Reused across districts.
export function mount(el,cfg,onDone){
 let r=0,errors=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Question <b id="r">1</b>/${cfg.rounds.length}</span><span>Misses: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><pre class="snippet" id="snip"></pre><div class="opts" id="opts"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(x,c)=>{msg.className="msg "+(c||"");msg.textContent=x};
 function draw(){const R=cfg.rounds[r];$("#r").textContent=r+1;$("#q").textContent=R.q;
  const sn=$("#snip");sn.textContent=R.code||"";sn.style.display=R.code?"block":"none";say("");
  const o=$("#opts");o.innerHTML="";
  R.options.forEach((t,i)=>{const b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=()=>pick(b,i);o.append(b)})}
 function pick(b,i){const R=cfg.rounds[r];
  if(i!==R.answer){errors++;$("#e").textContent=errors;b.disabled=true;say("Not quite. Try another option.","bad");return}
  el.querySelectorAll(".opt").forEach(x=>x.disabled=true);b.classList.add("right");say(R.explain,"good");
  const nb=document.createElement("button");const last=r===cfg.rounds.length-1;nb.textContent=last?"Continue":"Next question";
  nb.onclick=()=>{if(last)onDone(errors===0?3:errors<=2?2:1);else{nb.remove();r++;draw()}};msg.after(nb)}
 draw();
}
