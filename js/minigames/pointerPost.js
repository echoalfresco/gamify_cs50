// Mini-game: follow pointers to shelves addressed in hex. Teaches: addresses, *p, and pointer arithmetic.
export function mount(el,cfg,onDone){
 let r=0,errors=0;const base=cfg.base,size=cfg.size;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Round <b id="r">1</b>/${cfg.rounds.length}</span><span>Wrong deliveries: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><div class="row" id="row"></div><div class="msg" id="msg"></div></div>`;
 const row=el.querySelector("#row"),msg=el.querySelector("#msg"),q=el.querySelector("#q");
 const hex=n=>"0x"+n.toString(16).toUpperCase();
 const draw=()=>{q.textContent=cfg.rounds[r].prompt;el.querySelector("#r").textContent=r+1;row.innerHTML="";
  cfg.values.forEach((v,i)=>{const c=document.createElement("div");c.className="crate shelf full addr";
   c.innerHTML=`<small>${hex(base+i*size)}</small><span>${v}</span>`;c.onclick=()=>pick(i);row.append(c)})};
 function pick(i){const ok=base+i*size===cfg.rounds[r].answer;
  if(!ok){errors++;el.querySelector("#e").textContent=errors;msg.className="msg bad";msg.textContent=`${hex(base+i*size)} is not the right address. ${cfg.rounds[r].hint}`;return}
  msg.className="msg good";msg.textContent=cfg.rounds[r].explain;r++;
  if(r>=cfg.rounds.length){const stars=errors===0?3:errors<=2?2:1;
   q.textContent="All parcels delivered.";row.innerHTML="";msg.textContent+=` ${"\u2605".repeat(stars)}`;
   const b=document.createElement("button");b.textContent="Continue";b.onclick=()=>onDone(stars);msg.after(b)}
  else draw()}
 draw();
}
