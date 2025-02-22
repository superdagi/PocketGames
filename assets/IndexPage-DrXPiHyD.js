import{c as H,g as I,f as u,a as L,h as K,e as S,j as N,D as O,r as _,o as b,F as G,I as P,J as z,K as B,L as E,S as T,N as W}from"./index-DZpVw_BH.js";import{h as j}from"./render-2NZaA0LH.js";const $=H({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(t,{slots:i}){const{proxy:{$q:a}}=I(),n=S(N,u);if(n===u)return console.error("QPage needs to be a deep child of QLayout"),u;if(S(O,u)===u)return console.error("QPage needs to be child of QPageContainer"),u;const c=L(()=>{const e=(n.header.space===!0?n.header.size:0)+(n.footer.space===!0?n.footer.size:0);if(typeof t.styleFn=="function"){const g=n.isContainer.value===!0?n.containerHeight.value:a.screen.height;return t.styleFn(e,g)}return{minHeight:n.isContainer.value===!0?n.containerHeight.value-e+"px":a.screen.height===0?e!==0?`calc(100vh - ${e}px)`:"100vh":a.screen.height-e+"px"}}),d=L(()=>`q-page${t.padding===!0?" q-layout-padding":""}`);return()=>K("main",{class:d.value,style:c.value},j(i.default))}}),F="ABCDEFGHIJKLMNOPQRSTUVWXYÆØÅ".split("");function V(t){const i="/PocketGames/",a=_(0),n=_(0);let r="",c=[],d=[],e=null;const g=new Audio(i+"/sounds/correct.wav"),M=new Audio(i+"/sounds/fail.mp3");let p=null;function Q(){return F[Math.floor(Math.random()*F.length)]??"A"}function q(o){const l=new Set;for(l.add(o.toLowerCase());l.size<5;)l.add(String.fromCharCode(97+Math.floor(Math.random()*26)));return Array.from(l).sort(()=>Math.random()-.5)}function v(){if(!e||!t.value)return;const o=t.value;e.clearRect(0,0,o.width,o.height),h&&(e.strokeStyle=h,e.lineWidth=10,e.strokeRect(0,0,o.width,o.height)),e.font="80px Arial",e.fillStyle="black",e.textAlign="center",e.fillText(r,o.width/2,80),e.font="20px Arial",e.textAlign="right",e.fillStyle="blue",e.fillText(`Poeng: ${a.value}`,o.width-10,30),e.textAlign="left",e.fillStyle="red",e.fillText(`Feil: ${n.value}`,10,30),e.font="40px Arial",e.fillStyle="black",e.textAlign="center",d=[];const l=c.length,m=o.width/(l+1);c.forEach((f,s)=>{const k=m*(s+1),A=200;d.push({x:k,y:A,letter:f}),e?.fillText(f,k,A)}),p=requestAnimationFrame(v)}function w(){r=Q(),c=q(r),v()}let h=null,x=null;function C(o){if(!t.value)return;const l=t.value.getBoundingClientRect(),m=o.clientX-l.left,f=o.clientY-l.top;d.forEach(s=>{m>s.x-20&&m<s.x+20&&f>s.y-40&&f<s.y+10&&(s.letter===r.toLowerCase()?(a.value++,h="rgba(0, 255, 0, 0.5)",g.play(),setTimeout(w,200)):(n.value++,h="rgba(255, 0, 0, 0.5)",M.play()),x&&clearTimeout(x),x=setTimeout(()=>{h=null},300))})}const y=()=>{t.value&&(t.value.width=window.innerWidth*.8,t.value.height=window.innerHeight*.6,v())};return b(()=>{if(!t.value)return;const o=t.value;e=o.getContext("2d"),e&&(y(),window.addEventListener("resize",y),o.addEventListener("click",C),w())}),G(()=>{window.removeEventListener("resize",y),t.value&&t.value.removeEventListener("click",C),p!==null&&cancelAnimationFrame(p)}),{score:a,mistakes:n,startGame:w}}const X=P({__name:"GameBoard",setup(t){const i=_(null),a=V(i),n=()=>{const r=i.value;r&&(r.width=window.innerWidth*.8,r.height=window.innerHeight*.6)};return b(()=>{n(),window.addEventListener("resize",n),a.startGame()}),G(()=>{window.removeEventListener("resize",n)}),(r,c)=>(B(),z($,{class:"fle x"},{default:E(()=>[T("canvas",{ref_key:"canvasRef",ref:i},null,512)]),_:1}))}}),Y=(t,i)=>{const a=t.__vccOpts||t;for(const[n,r]of i)a[n]=r;return a},D=Y(X,[["__scopeId","data-v-02812a23"]]),J={class:"q-ma-xl q-pb-xl"},R=P({__name:"IndexPage",setup(t){return(i,a)=>(B(),z($,{class:"row justify-evenly"},{default:E(()=>[T("div",J,[W(D)])]),_:1}))}});export{R as default};
