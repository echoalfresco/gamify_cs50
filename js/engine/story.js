export function playDialogue(el,lines,onEnd){
 let i=0;
 const box=document.createElement("div");box.className="dialogue";
 const btn=document.createElement("button");btn.textContent="Next";
 el.append(box,btn);
 const show=()=>{const l=lines[i];box.innerHTML=`<div class="speaker"></div><div class="text"></div>`;
  box.querySelector(".speaker").textContent=l.who;box.querySelector(".text").textContent=l.text;
  btn.textContent=i===lines.length-1?"Continue":"Next"};
 btn.onclick=()=>{if(++i>=lines.length){box.remove();btn.remove();onEnd()}else show()};
 show();
}
