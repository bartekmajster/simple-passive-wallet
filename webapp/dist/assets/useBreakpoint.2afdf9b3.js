import{a as i,j as o,a7 as u,T as l,a8 as d}from"./index.0ebe11e4.js";class m{constructor(t){this.name=t}hasTwoOrMoreWords(){return this.name.split(" ").length>1}getFirstChars(){return this.name.split(" ").map(t=>t[0]).slice(0,2).join("")}toUpperCase(t){return t.toUpperCase()}getInitials(){return this.toUpperCase(this.hasTwoOrMoreWords()?this.getFirstChars():this.name.slice(0,2))}}const f=({name:e})=>{console.log({name:e});const t=i.exports.useMemo(()=>new m(e),[e]);return o(u,{justifyContent:"center",alignItems:"center",children:o(l,{fontColor:"white",fontSize:"1.25",children:t.getInitials()})})},x=(e,t)=>{const r=d[e],a=(s=>s==="min"?`(min-width: ${r}px)`:`(max-width: ${r}px)`)(t),[c,h]=i.exports.useState(typeof window<"u"?window.matchMedia(a).matches:!1);return i.exports.useEffect(()=>{const s=p=>h(p.matches),n=window.matchMedia(a);return n.addListener(s),()=>n.removeListener(s)},[r,a]),c};export{f as A,x as u};
