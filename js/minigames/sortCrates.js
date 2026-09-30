// Mini-game: sort crates by swapping adjacent pairs under a move budget.
export function mount(el,cfg,onDone){
 const a=[...cfg.crates];let moves=0,sel=null;
 const sorted=[...a].sort((x,y)=>x-y);
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Moves: <b id="m">0</b> / ${cfg.budget}</span><button id="undo">Undo</button><button id="reset">Reset</button></div>
  <div class="row" id="row"></div><div class="msg" id="msg"></div></div>`;
 const row=el.querySelector("#row"),msg=el.querySelector("#msg"),m=el.querySelector("#m");
 const hist=[];let over=false;
 const draw=()=>{row.innerHTML="";a.forEach((v,i)=>{const c=document.createElement("div");
  c.className="crate"+(sel===i?" sel":"")+(v===sorted[i]?" ok":"");c.textContent=v;
  c.onclick=()=>pick(i);row.append(c)});m.textContent=moves};
 function pick(i){if(over)return;
  if(sel===null){sel=i}else if(sel===i){sel=null}
  else if(Math.abs(sel-i)===1){hist.push([...a]);[a[sel],a[i]]=[a[i],a[sel]];moves++;sel=null;check()}
  else{msg.className="msg bad";msg.textContent="The crane can only swap neighbours.";sel=i}
  draw()}
 function check(){
  if(a.every((v,i)=>v===sorted[i])){over=true;
   const stars=moves<=cfg.par?3:moves<=cfg.budget?2:1;
   msg.className="msg good";msg.textContent=`Sorted in ${moves} moves! (par ${cfg.par}) ${"★".repeat(stars)}`;
   const b=document.createElement("button");b.textContent="Continue";b.onclick=()=>onDone(stars);msg.after(b)}
  else if(moves>=cfg.budget){msg.className="msg bad";msg.textContent="Out of moves. Reset and plan your swaps."}}
 el.querySelector("#undo").onclick=()=>{if(over||!hist.length)return;a.splice(0,a.length,...hist.pop());moves--;draw()};
 el.querySelector("#reset").onclick=()=>{a.splice(0,a.length,...cfg.crates);hist.length=0;moves=0;sel=null;msg.textContent="";draw()};
 draw();
}
