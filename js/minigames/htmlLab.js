// Mini-game: edit HTML/CSS and watch a live preview; checks read the rendered page. Teaches: HTML structure and CSS rules.
export function mount(el,cfg,onDone){
 let t=0,hints=0;
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Job <b id="t">1</b>/${cfg.tasks.length}</span><span>Hints used: <b id="h">0</b></span></div>
  <div class="order" id="q"></div>
  <div class="lab"><textarea id="code" class="codebox" spellcheck="false" rows="10"></textarea>
  <iframe id="frame" class="preview" sandbox="allow-same-origin" title="preview"></iframe></div>
  <div class="row"><button id="run">Update and check</button><button id="hint">Hint</button></div>
  <ul class="checks" id="checks"></ul><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg"),frame=$("#frame");
 const say=(x,c)=>{msg.className="msg "+(c||"");msg.textContent=x};
 const show=()=>{$("#t").textContent=t+1;$("#q").textContent=cfg.tasks[t].prompt;$("#code").value=cfg.tasks[t].html;$("#checks").innerHTML="";say("");render(false)};
 function render(check){
  frame.onload=()=>{if(check)evaluate()};
  frame.srcdoc=`<!doctype html><html><body style="font-family:sans-serif">${$("#code").value}</body></html><!--${Date.now()}-->`}
 function evaluate(){
  const doc=frame.contentDocument,win=frame.contentWindow,ul=$("#checks");ul.innerHTML="";let all=true;
  cfg.tasks[t].checks.forEach(c=>{const n=doc.querySelector(c.sel);let ok=!!n;
   if(ok&&c.prop)ok=win.getComputedStyle(n)[c.prop]===c.value;
   if(ok&&c.attr)ok=n.hasAttribute(c.attr);
   all=all&&ok;const li=document.createElement("li");li.textContent=(ok?"\u2713 ":"\u2717 ")+c.label;li.className=ok?"yes":"no";ul.append(li)});
  if(!all){say("Some checks are still failing.","bad");return}
  say(cfg.tasks[t].solved,"good");
  const b=document.createElement("button");const last=t===cfg.tasks.length-1;b.textContent=last?"Continue":"Next job";
  b.onclick=()=>{if(last)onDone(hints===0?3:hints<=2?2:1);else{b.remove();t++;show()}};msg.after(b)}
 $("#run").onclick=()=>render(true);
 $("#hint").onclick=()=>{hints++;$("#h").textContent=hints;say("Hint: "+cfg.tasks[t].hint)};
 show();
}
