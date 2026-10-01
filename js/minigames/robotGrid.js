// Mini-game: build a block program (with repeat loops) to guide a robot. Teaches: sequences and loops.
const ARROW=["\u25B2","\u25B6","\u25BC","\u25C0"],DX=[0,1,0,-1],DY=[-1,0,1,0];
export function mount(el,cfg,onDone){
 let r=0,total=0,prog=[],pending=1,running=false,rob;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Level <b id="r">1</b>/${cfg.rounds.length}</span><span>Blocks: <b id="n">0</b>/<span id="mx"></span></span></div>
  <div class="grid" id="grid"></div>
  <div class="row"><button data-op="F">Forward</button><button data-op="L">Turn left</button><button data-op="R">Turn right</button>
   <button data-rep="2">Repeat 2\u00D7</button><button data-rep="3">Repeat 3\u00D7</button><button data-rep="4">Repeat 4\u00D7</button></div>
  <div class="program" id="prog"></div>
  <div class="row"><button id="run">Run</button><button id="undo">Undo</button><button id="clear">Clear</button></div>
  <div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const L=()=>cfg.rounds[r];
 const drawGrid=()=>{const g=$("#grid"),n=L().size;g.style.gridTemplateColumns=`repeat(${n},44px)`;g.innerHTML="";
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){const c=document.createElement("div");c.className="cell";
   if(L().walls.some(w=>w[0]===x&&w[1]===y)){c.classList.add("wall")}
   else if(L().goal[0]===x&&L().goal[1]===y){c.classList.add("goal");c.textContent="\u2605"}
   if(rob.x===x&&rob.y===y){c.classList.add("bot");c.textContent=ARROW[rob.d]}
   g.append(c)}};
 const drawProg=()=>{$("#prog").textContent=prog.map(p=>(p.n>1?p.n+"\u00D7 ":"")+({F:"forward",L:"left",R:"right"})[p.op]).join(" , ")||"(empty program)";$("#n").textContent=prog.length};
 function reset(){const s=L().start;rob={x:s[0],y:s[1],d:s[2]};drawGrid()}
 function load(){prog=[];pending=1;$("#r").textContent=r+1;$("#mx").textContent=L().max;reset();drawProg();say("")}
 el.querySelectorAll("[data-op]").forEach(b=>b.onclick=()=>{if(running)return;
  if(prog.length>=L().max){say("Out of blocks! Use a repeat to save space.","bad");return}
  prog.push({op:b.dataset.op,n:pending});pending=1;drawProg();say("")});
 el.querySelectorAll("[data-rep]").forEach(b=>b.onclick=()=>{pending=+b.dataset.rep;say(`Next block will repeat ${pending}\u00D7.`)});
 $("#undo").onclick=()=>{if(!running){prog.pop();drawProg()}};
 $("#clear").onclick=()=>{if(!running){prog=[];reset();drawProg();say("")}};
 $("#run").onclick=async()=>{if(running)return;running=true;reset();say("");
  const steps=[];prog.forEach(p=>{for(let i=0;i<p.n;i++)steps.push(p.op)});
  for(const s of steps){await new Promise(r=>setTimeout(r,280));
   if(s==="L")rob.d=(rob.d+3)%4;else if(s==="R")rob.d=(rob.d+1)%4;
   else{const nx=rob.x+DX[rob.d],ny=rob.y+DY[rob.d],n=L().size;
    if(nx<0||ny<0||nx>=n||ny>=n||L().walls.some(w=>w[0]===nx&&w[1]===ny)){drawGrid();say("Bump! The robot hit a wall.","bad");running=false;return}
    rob.x=nx;rob.y=ny}
   drawGrid()}
  running=false;
  if(rob.x===L().goal[0]&&rob.y===L().goal[1]){const st=prog.length<=L().par?3:2;total+=st;
   say(`Goal reached with ${prog.length} blocks (par ${L().par}). ${"\u2605".repeat(st)}`,"good");
   const b=document.createElement("button");const last=r===cfg.rounds.length-1;b.textContent=last?"Continue":"Next level";
   b.onclick=()=>{if(last)onDone(Math.round(total/cfg.rounds.length));else{b.remove();r++;load()}};msg.after(b)}
  else say("The robot stopped short of the star. Adjust the program and run again.","bad")};
 load();
}
