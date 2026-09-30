// Mini-game: find a target crate in a sorted row within a probe budget.
export function mount(el,cfg,onDone){
 const a=[...cfg.crates].sort((x,y)=>x-y);let probes=0,lo=0,hi=a.length-1,over=false;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Target: <b>${cfg.target}</b></span><span>Probes: <b id="p">0</b> / ${cfg.budget}</span></div>
  <div class="row" id="row"></div><div class="msg" id="msg"></div></div>`;
 const row=el.querySelector("#row"),msg=el.querySelector("#msg"),p=el.querySelector("#p");
 const revealed={};
 const draw=()=>{row.innerHTML="";a.forEach((v,i)=>{const c=document.createElement("div");
  const r=i in revealed;c.className="crate"+(r?"":" hidden")+(i<lo||i>hi?" dim":"")+(r&&v===cfg.target?" hit":"");
  c.textContent=r?v:"?";c.onclick=()=>probe(i);row.append(c)});p.textContent=probes};
 function probe(i){if(over||i in revealed)return;probes++;revealed[i]=1;const v=a[i];
  if(v===cfg.target){over=true;const stars=probes<=cfg.par?3:2;msg.className="msg good";
   msg.textContent=`Found in ${probes} probes (par ${cfg.par}). ${"★".repeat(stars)}`;
   const b=document.createElement("button");b.textContent="Continue";b.onclick=()=>onDone(stars);msg.after(b)}
  else{if(v<cfg.target)lo=Math.max(lo,i+1);else hi=Math.min(hi,i-1);
   msg.className="msg";msg.textContent=v<cfg.target?`${v} is too small: everything left of it is ruled out.`:`${v} is too big: everything right of it is ruled out.`;
   if(probes>=cfg.budget){over=true;msg.className="msg bad";msg.textContent="Out of probes. Try the middle crate first, then halve again.";
    const b=document.createElement("button");b.textContent="Retry";b.onclick=()=>mount(el,cfg,onDone);msg.after(b)}}
  draw()}
 draw();
}
