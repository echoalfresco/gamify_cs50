// Mini-game: put steps in the right order. Teaches: the compile pipeline and the debugging process.
export function mount(el,cfg,onDone){
 let r=0,errors=0,done=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Puzzle <b id="r">1</b>/${cfg.rounds.length}</span><span>Mistakes: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><ol class="chosen" id="chosen"></ol><div class="row" id="cards"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 function start(){const R=cfg.rounds[r];done=0;$("#r").textContent=r+1;$("#q").textContent=R.prompt;$("#chosen").innerHTML="";say("");
  const cards=$("#cards");cards.innerHTML="";
  R.cards.forEach(c=>{const b=document.createElement("button");b.className="card";b.textContent=c;b.onclick=()=>click(b,c);cards.append(b)})}
 function click(b,c){const R=cfg.rounds[r];
  if(c!==R.order[done]){errors++;$("#e").textContent=errors;say(R.wrong[c]||R.generic,"bad");return}
  b.disabled=true;done++;const li=document.createElement("li");li.textContent=c;$("#chosen").append(li);say("");
  if(done===R.order.length){say(R.explain,"good");const nb=document.createElement("button");const last=r===cfg.rounds.length-1;
   nb.textContent=last?"Continue":"Next puzzle";nb.onclick=()=>{if(last)onDone(errors===0?3:errors<=2?2:1);else{nb.remove();r++;start()}};msg.after(nb)}}
 start();
}
