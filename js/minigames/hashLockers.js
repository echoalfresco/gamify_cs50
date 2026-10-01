// Mini-game: place parcels in hash-table lockers (separate chaining), then look them up.
export function mount(el,cfg,onDone){
 const B=cfg.buckets,chains=Array.from({length:B},()=>[]);let i=0,j=0,errors=0,phase="place";
 const h=n=>n.length%B;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Mistakes: <b id="e">0</b></span></div>
  <div class="order" id="q"></div><div class="row lockers" id="row"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),row=$("#row"),msg=$("#msg"),q=$("#q");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const bad=t=>{errors++;$("#e").textContent=errors;say(t,"bad")};
 const draw=()=>{
  if(phase==="place")q.textContent=`Parcel "${cfg.parcels[i]}": hash = number of letters mod ${B}. Click its locker.`;
  else if(phase==="find")q.textContent=`Lookup: which locker holds "${cfg.lookups[j]}"?`;
  row.innerHTML="";chains.forEach((c,k)=>{const d=document.createElement("div");d.className="locker";
   d.innerHTML=`<b>#${k}</b>`+c.map(x=>`<span class="tag">${x}</span>`).join("");d.onclick=()=>click(k);row.append(d)})};
 function click(k){
  if(phase==="place"){const n=cfg.parcels[i];
   if(k!==h(n)){bad(`"${n}" has ${n.length} letters, and ${n.length} mod ${B} = ${h(n)}.`);return}
   chains[k].push(n);say(chains[k].length>1?`Collision! Locker #${k} is taken, so chain "${n}" onto the end of it.`:`"${n}" goes in locker #${k}.`,"good");
   i++;if(i>=cfg.parcels.length)phase="find";draw()}
  else if(phase==="find"){const n=cfg.lookups[j];
   if(k!==h(n)){bad(`Hash "${n}" first: ${n.length} letters mod ${B} = ${h(n)}.`);return}
   const steps=chains[k].indexOf(n)+1;
   say(`Found "${n}" after checking ${steps} parcel${steps>1?"s":""} in the chain: ${chains[k].slice(0,steps).join(" \u2192 ")}.`,"good");
   j++;if(j>=cfg.lookups.length){phase="done";const stars=errors===0?3:errors<=2?2:1;
    q.textContent="Every parcel is findable.";msg.textContent+=` ${"\u2605".repeat(stars)}`;
    const b=document.createElement("button");b.textContent="Continue";b.onclick=()=>onDone(stars);msg.after(b)}
   draw()}}
 draw();
}
