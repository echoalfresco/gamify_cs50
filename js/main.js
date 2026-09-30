import {playDialogue} from "./engine/story.js";
import {load,complete} from "./engine/save.js";
import * as sortCrates from "./minigames/sortCrates.js";
import * as searchCrates from "./minigames/searchCrates.js";

const GAMES={sortCrates,searchCrates};
const stage=document.getElementById("stage");
const nav=document.getElementById("nav");
const getJSON=u=>fetch(u).then(r=>r.json());
const setTheme=t=>{document.body.className="theme-"+t};

async function showMap(){
 setTheme("pixel");
 const world=await getJSON("data/districts.json");const s=load();
 nav.textContent=`Districts cleared: ${Object.keys(s.done).length}/${world.length}`;
 stage.innerHTML=`<h2>Choose a district</h2><div class="map" id="map"></div>`;
 const map=stage.querySelector("#map");
 world.forEach((d,i)=>{const b=document.createElement("button");b.className="tile";
  const unlocked=d.status==="ready"&&(i===0||s.done[world[i-1].week]||d.week===3);
  b.disabled=!unlocked;
  b.innerHTML=`<div>Week ${d.week}</div><b>${d.name}</b><div>${"★".repeat(s.stars[d.week]||0)||d.topic}</div>`;
  b.onclick=()=>playDistrict(d);map.append(b)});
}

async function playDistrict(d){
 const data=await getJSON(d.file);setTheme(d.theme);
 stage.innerHTML=`<h2>${d.name}</h2><p><a href="${data.lecture.url}" target="_blank" rel="noopener">Watch: ${data.lecture.label}</a></p><div id="scene"></div>`;
 const scene=stage.querySelector("#scene");let total=0;
 const steps=[...data.sequence];
 const next=()=>{const st=steps.shift();
  if(!st){const stars=Math.round(total/data.games.length);complete(d.week,stars);
   scene.innerHTML=`<div class="dialogue">District cleared ${"★".repeat(stars)}</div><button id="back">Back to map</button>`;
   scene.querySelector("#back").onclick=showMap;return}
  scene.innerHTML="";
  if(st.type==="dialogue")playDialogue(scene,data.dialogue[st.id],next);
  else GAMES[data.games[st.id].type].mount(scene,data.games[st.id],s=>{total+=s;next()})};
 next();
}
showMap();
