// Mini-game: re-link train cars in the right order. Teaches: pointer order matters in a linked list.
export function mount(el,cfg,onDone){
 let r=0,errors=0,done=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Track <b id="r">1</b>/${cfg.rounds.length}</span><span>Mistakes: <b id="e">0</b></span></div>
  <div class="train" id="train"></div><div class="order" id="q"></div>
  <div class="row" id="steps"></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),train=$("#train"),steps=$("#steps"),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const drawTrain=list=>{train.innerHTML="";
  list.concat(["NULL"]).forEach((n,i)=>{if(i)train.append(Object.assign(document.createElement("span"),{className:"link",textContent:"\u2192"}));
   train.append(Object.assign(document.createElement("span"),{className:"car"+(n==="NULL"?" nil":""),textContent:n}))})};
 function start(){const R=cfg.rounds[r];done=0;$("#r").textContent=r+1;$("#q").textContent=R.prompt;say("");
  drawTrain(R.before);steps.innerHTML="";
  R.cards.forEach(card=>{const b=document.createElement("button");b.className="card";b.textContent=card;b.onclick=()=>click(b,card);steps.append(b)})}
 function click(b,card){const R=cfg.rounds[r];
  if(card===R.order[done]){b.disabled=true;done++;say(R.order.length===done?"":"Good. Next step?","good");
   if(done===R.order.length){drawTrain(R.after);say(R.explain,"good");steps.innerHTML="";
    const nb=document.createElement("button");const last=r===cfg.rounds.length-1;nb.textContent=last?"Continue":"Next track";
    nb.onclick=()=>{if(last){onDone(errors===0?3:errors<=2?2:1)}else{nb.remove();r++;start()}};msg.after(nb)}}
  else{errors++;$("#e").textContent=errors;say(R.wrong[card]||"Not that one.","bad")}}
 start();
}
