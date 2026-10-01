// Mini-game: toggle 8 lamps (bits) to show a number. Teaches: binary and ASCII.
export function mount(el,cfg,onDone){
 const W=[128,64,32,16,8,4,2,1];let r=0,errors=0,bits=Array(8).fill(0);
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Round <b id="r">1</b>/${cfg.targets.length}</span><span>Misses: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><div class="row lamps" id="row"></div>
  <div class="row"><button id="check">Check</button></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const draw=()=>{$("#q").textContent=cfg.targets[r].prompt;$("#r").textContent=r+1;const row=$("#row");row.innerHTML="";
  W.forEach((w,i)=>{const d=document.createElement("div");d.className="lamp"+(bits[i]?" on":"");
   d.innerHTML=`<span>${bits[i]}</span><small>${w}</small>`;d.onclick=()=>{bits[i]^=1;draw()};row.append(d)})};
 $("#check").onclick=()=>{const v=bits.reduce((a,b,i)=>a+b*W[i],0);
  if(v!==cfg.targets[r].value){errors++;$("#e").textContent=errors;say(`That lamp pattern is ${v}. Add up the weights of the lit lamps.`,"bad");return}
  say(cfg.targets[r].explain,"good");r++;bits=Array(8).fill(0);
  if(r>=cfg.targets.length){const st=errors===0?3:errors<=2?2:1;$("#q").textContent="All numbers lit.";$("#row").innerHTML="";$("#check").remove();
   msg.textContent+=` ${"\u2605".repeat(st)}`;const b=document.createElement("button");b.textContent="Continue";b.onclick=()=>onDone(st);msg.after(b)}
  else draw()};
 draw();
}
