// Mini-game: act out malloc/free on warehouse shelves. Teaches: every malloc needs a free.
export function mount(el,cfg,onDone){
 const slots=Array(cfg.shelves).fill(null);let step=0,errors=0,closing=false,over=false;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Mistakes: <b id="e">0</b></span></div>
  <div class="order" id="order"></div><div class="row" id="row"></div><div class="msg" id="msg"></div></div>`;
 const row=el.querySelector("#row"),msg=el.querySelector("#msg"),ord=el.querySelector("#order"),e=el.querySelector("#e");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const bad=t=>{errors++;e.textContent=errors;say(t,"bad")};
 const draw=()=>{
  if(!closing&&step<cfg.events.length){const ev=cfg.events[step];
   ord.textContent=ev.op==="alloc"?`Order ${step+1}: malloc a shelf for "${ev.name}". Click an EMPTY shelf.`:`Order ${step+1}: free "${ev.name}". Click the shelf holding it.`}
  else if(!over){closing=true;const left=slots.filter(Boolean).length;
   ord.textContent=left?`Closing time! ${left} shelf(s) still hold crates nobody freed. Free them all before the water rises.`:"All shelves are empty."}
  row.innerHTML="";slots.forEach((s,i)=>{const c=document.createElement("div");
   c.className="crate shelf"+(s?" full":"");c.textContent=s||"";c.title="shelf "+i;c.onclick=()=>click(i);row.append(c)})};
 function click(i){if(over)return;
  if(!closing){const ev=cfg.events[step];
   if(ev.op==="alloc"){if(slots[i]){bad(`Shelf ${i} is taken. Writing there overwrites "${slots[i]}" (heap corruption).`);return}
     slots[i]=ev.name;step++;say(`malloc OK: "${ev.name}" on shelf ${i}.`,"good")}
   else{if(slots[i]!==ev.name){bad(`That shelf doesn't hold "${ev.name}". Freeing the wrong block is a bug.`);return}
     slots[i]=null;step++;say(`free OK: "${ev.name}" released.`,"good")}}
  else{if(!slots[i]){bad("Shelf already empty: freeing twice is a double free.");return}
     say(`Freed "${slots[i]}" late. In C you must do this before the program ends.`);slots[i]=null}
  if(step>=cfg.events.length&&slots.every(s=>!s)){over=true;
   const stars=errors===0?3:errors<=2?2:1;
   ord.textContent="Warehouse clean: no leaks.";say(`Zero leaks. ${"\u2605".repeat(stars)}`,"good");
   const b=document.createElement("button");b.textContent="Continue";b.onclick=()=>onDone(stars);msg.after(b)}
  draw()}
 draw();
}
