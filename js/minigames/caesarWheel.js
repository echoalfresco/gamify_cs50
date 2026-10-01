// Mini-game: crack Caesar ciphers by dialing the key. Teaches: ciphers as arithmetic on letters (mod 26).
export function mount(el,cfg,onDone){
 let r=0,errors=0,k=0;
 const shift=(s,n)=>s.replace(/[A-Z]/g,c=>String.fromCharCode((c.charCodeAt(0)-65+n+26*10)%26+65));
 el.innerHTML=`<div class="panel"><h2>${cfg.title}</h2><p>${cfg.instructions}</p>
  <div class="hud"><span>Cipher <b id="r">1</b>/${cfg.rounds.length}</span><span>Wrong locks: <b id="e">0</b></span></div>
  <div class="order">Intercepted: <b id="cipher"></b></div>
  <div class="row"><button id="minus">Key \u2212</button><b class="key" id="key"></b><button id="plus">Key +</button><button id="lock">Lock it in</button></div>
  <div class="order">Decoded with this key: <b id="plain"></b></div><div class="msg" id="msg"></div></div>`;
 const $=s=>el.querySelector(s),msg=$("#msg");
 const say=(t,c)=>{msg.className="msg "+(c||"");msg.textContent=t};
 const R=()=>cfg.rounds[r],cipher=()=>shift(R().plain,R().key);
 const draw=()=>{$("#r").textContent=r+1;$("#cipher").textContent=cipher();$("#key").textContent="key = "+k;$("#plain").textContent=shift(cipher(),-k)};
 $("#minus").onclick=()=>{k=(k+25)%26;draw()};$("#plus").onclick=()=>{k=(k+1)%26;draw()};
 $("#lock").onclick=()=>{
  if(k!==R().key){errors++;$("#e").textContent=errors;say("Gibberish means the wrong key. Keep dialing until a real sentence appears.","bad");return}
  say(`Key ${k}: each letter was shifted ${k} places. ${R().note}`,"good");
  const b=document.createElement("button");const last=r===cfg.rounds.length-1;b.textContent=last?"Continue":"Next message";
  b.onclick=()=>{if(last)onDone(errors===0?3:errors<=2?2:1);else{b.remove();r++;k=0;say("");draw()}};msg.after(b)};
 draw();
}
