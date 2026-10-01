// Mini-game: solve a case by writing real SQL (sql.js / SQLite in the browser).
const CDN="https://cdn.jsdelivr.net/npm/sql.js@1.14.0/dist/";
let sqlP=null;
function loadSql(){
 if(sqlP)return sqlP;
 sqlP=new Promise((res,rej)=>{const s=document.createElement("script");s.src=CDN+"sql-wasm.js";
  s.onload=()=>window.initSqlJs({locateFile:f=>CDN+f}).then(res,rej);
  s.onerror=()=>rej(new Error("Could not load sql.js from the CDN. Check your internet connection."));
  document.head.append(s)});
 return sqlP;
}
const esc=t=>String(t).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const table=r=>!r?"":`<table><tr>${r.columns.map(c=>`<th>${esc(c)}</th>`).join("")}</tr>${r.values.map(v=>`<tr>${v.map(x=>`<td>${x===null?"NULL":esc(x)}</td>`).join("")}</tr>`).join("")}</table>`;

export async function mount(el,cfg,onDone){
 el.innerHTML=`<div class="panel">Loading the case files\u2026</div>`;
 let SQL;try{SQL=await loadSql()}catch(err){el.innerHTML=`<div class="panel msg bad">${esc(err.message)}</div>`;return}
 const db=new SQL.Database();cfg.db.forEach(s=>db.run(s));
 let p=0,hints=0;
 el.innerHTML=`<div class="panel case"><h2>${esc(cfg.title)}</h2>
  <div class="briefing" id="brief"></div>
  <details class="schema"><summary>Case files (tables)</summary><pre>${esc(cfg.schemaHelp)}</pre></details>
  <textarea id="sql" spellcheck="false" rows="5" placeholder="Type your SQL here"></textarea>
  <div class="row"><button id="run">Run query</button><button id="peek">Browse a table</button><button id="hint">Hint</button></div>
  <div class="msg" id="msg"></div><div class="result" id="out"></div></div>`;
 const $=s=>el.querySelector(s);
 const show=()=>{const q=cfg.puzzles[p];$("#brief").innerHTML=`<div class="speaker">Case ${p+1} of ${cfg.puzzles.length}</div>${esc(q.briefing)}`;$("#sql").value="";$("#out").innerHTML="";$("#msg").textContent="";$("#msg").className="msg"};
 const run=sql=>{const r=db.exec(sql);return r.length?r[r.length-1]:{columns:[],values:[]}};
 $("#run").onclick=()=>{
  const q=cfg.puzzles[p],msg=$("#msg");let r;
  try{r=run($("#sql").value)}catch(err){msg.className="msg bad";msg.textContent="SQL error: "+err.message;return}
  $("#out").innerHTML=table(r);
  const idx=r.columns.map(c=>c.toLowerCase()).indexOf(q.column);
  if(idx<0){msg.className="msg bad";msg.textContent=`Your result needs a column called "${q.column}".`;return}
  const got=[...new Set(r.values.map(v=>String(v[idx])))].sort(),want=q.expect.map(String).sort();
  if(JSON.stringify(got)!==JSON.stringify(want)){msg.className="msg bad";
   msg.textContent=got.length<want.length?"Not everyone is in there yet. Check your WHERE conditions.":got.length>want.length||got.some(x=>!want.includes(x))?"Too many names. Tighten your conditions.":"Close, but not quite.";return}
  msg.className="msg good";msg.textContent=q.solved;
  const b=document.createElement("button");b.textContent=p===cfg.puzzles.length-1?"Close the case":"Next lead";
  b.onclick=()=>{if(p===cfg.puzzles.length-1){onDone(hints===0?3:hints<=2?2:1)}else{p++;show()}};msg.after(b)};
 $("#peek").onclick=()=>{const t=prompt("Which table? ("+cfg.tables.join(", ")+")");
  if(t&&cfg.tables.includes(t)){$("#sql").value=`SELECT * FROM ${t} LIMIT 20;`;$("#run").click()}};
 $("#hint").onclick=()=>{hints++;$("#msg").className="msg";$("#msg").textContent="Hint: "+cfg.puzzles[p].hint};
 show();
}
