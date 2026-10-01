// Mini-game: write real Python that runs in the browser (Pyodide) and must pass hidden tests.
const CDN="https://cdn.jsdelivr.net/pyodide/v0.25.1/full/";
let pyP=null;
function loadPy(){
 if(pyP)return pyP;
 pyP=new Promise((res,rej)=>{const s=document.createElement("script");s.src=CDN+"pyodide.js";
  s.onload=()=>window.loadPyodide({indexURL:CDN}).then(res,rej);
  s.onerror=()=>rej(new Error("Could not load Pyodide from the CDN. Check your internet connection."));
  document.head.append(s)});
 return pyP;
}
export async function mount(el,cfg,onDone){
 el.innerHTML=`<div class="panel">Waking up the Python interpreter (first load can take a few seconds)\u2026</div>`;
 let py;try{py=await loadPy()}catch(err){el.innerHTML=`<div class="panel msg bad"></div>`;el.firstChild.textContent=err.message;return}
 let t=0,hints=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Task <b id="t">1</b>/${cfg.tasks.length}</span><span>Hints used: <b id="h">0</b></span></div>
  <div class="order" id="q"></div><textarea id="code" class="codebox" spellcheck="false" rows="9"></textarea>
  <div class="row"><button id="run">Run tests</button><button id="hint">Hint</button></div>
  <div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(x,c)=>{msg.className="msg "+(c||"");msg.textContent=x};
 const show=()=>{$("#t").textContent=t+1;$("#q").textContent=cfg.tasks[t].prompt;$("#code").value=cfg.tasks[t].starter;say("")};
 $("#code").addEventListener("keydown",e=>{if(e.key==="Tab"){e.preventDefault();const a=e.target,p=a.selectionStart;a.value=a.value.slice(0,p)+"    "+a.value.slice(a.selectionEnd);a.selectionStart=a.selectionEnd=p+4}});
 $("#run").onclick=()=>{
  const T=cfg.tasks[t];py.globals.set("SRC",$("#code").value+"\n"+T.tests.join("\n"));
  try{py.runPython("exec(SRC, {'__name__': '__main__'})")}
  catch(err){const last=String(err.message).trim().split("\n").filter(Boolean).pop();
   say(`Not yet: ${last}. ${last.startsWith("AssertionError")?"Your function ran but returned a wrong answer for one of the hidden tests.":""}`,"bad");return}
  say(T.solved,"good");
  const b=document.createElement("button");const last=t===cfg.tasks.length-1;b.textContent=last?"Continue":"Next task";
  b.onclick=()=>{if(last)onDone(hints===0?3:hints<=2?2:1);else{b.remove();t++;show()}};msg.after(b)};
 $("#hint").onclick=()=>{hints++;$("#h").textContent=hints;say("Hint: "+cfg.tasks[t].hint)};
 show();
}
