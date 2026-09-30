const KEY="segfault-city-save-v1";
export const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{done:{},stars:{}}}catch{return{done:{},stars:{}}}};
export const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
export function complete(week,stars){const s=load();s.done[week]=true;s.stars[week]=Math.max(s.stars[week]||0,stars);save(s);return s}
