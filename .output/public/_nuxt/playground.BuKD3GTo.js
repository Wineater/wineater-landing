import{B as U,H as A}from"./Header.j6Ortxk9.js";import{_ as F,o as g,c as D,p as V,d as z,a as o,J as N,r as T,K as j,L as K,M as Q,I as E,N as W,y as q,O as G,P as Y,Q as J,f as X,R as Z,S as ee,T as te,U as b,C as B,b as P,t as h,V as ae,W as ne,D as M,X as se,Y as R,G as L,H as x,n as O,Z as re}from"./entry.jZmHbDFR.js";const oe={},S=e=>(V("data-v-aa6ba8e6"),e=e(),z(),e),ie={class:"lds-ripple"},le=S(()=>o("div",null,null,-1)),ce=S(()=>o("div",null,null,-1)),ue=[le,ce];function de(e,s){return g(),D("div",ie,ue)}const pe=F(oe,[["render",de],["__scopeId","data-v-aa6ba8e6"]]),he=e=>e==="defer"||e===!1;function fe(...e){var k;const s=typeof e[e.length-1]=="string"?e.pop():void 0;typeof e[0]!="string"&&e.unshift(s);let[n,i,a={}]=e;if(typeof n!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof i!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");const t=q(),d=i,f=()=>null,w=()=>t.isHydrating?t.payload.data[n]:t.static.data[n];a.server=a.server??!0,a.default=a.default??f,a.getCachedData=a.getCachedData??w,a.lazy=a.lazy??!1,a.immediate=a.immediate??!0,a.deep=a.deep??N.deep,a.dedupe=a.dedupe??"cancel";const l=()=>![null,void 0].includes(a.getCachedData(n));if(!t._asyncData[n]||!a.immediate){(k=t.payload._errors)[n]??(k[n]=null);const u=a.deep?T:j;t._asyncData[n]={data:u(a.getCachedData(n)??a.default()),pending:T(!l()),error:K(t.payload._errors,n),status:T("idle")}}const r={...t._asyncData[n]};r.refresh=r.execute=(u={})=>{if(t._asyncDataPromises[n]){if(he(u.dedupe??a.dedupe))return t._asyncDataPromises[n];t._asyncDataPromises[n].cancelled=!0}if((u._initial||t.isHydrating&&u._initial!==!1)&&l())return Promise.resolve(a.getCachedData(n));r.pending.value=!0,r.status.value="pending";const _=new Promise((c,p)=>{try{c(d(t))}catch($){p($)}}).then(c=>{if(_.cancelled)return t._asyncDataPromises[n];let p=c;a.transform&&(p=a.transform(c)),a.pick&&(p=_e(p,a.pick)),t.payload.data[n]=p,r.data.value=p,r.error.value=null,r.status.value="success"}).catch(c=>{if(_.cancelled)return t._asyncDataPromises[n];r.error.value=G(c),r.data.value=Y(a.default()),r.status.value="error"}).finally(()=>{_.cancelled||(r.pending.value=!1,delete t._asyncDataPromises[n])});return t._asyncDataPromises[n]=_,t._asyncDataPromises[n]};const m=()=>r.refresh({_initial:!0}),I=a.server!==!1&&t.payload.serverRendered;{const u=J();if(u&&!u._nuxtOnBeforeMountCbs){u._nuxtOnBeforeMountCbs=[];const c=u._nuxtOnBeforeMountCbs;u&&(Q(()=>{c.forEach(p=>{p()}),c.splice(0,c.length)}),E(()=>c.splice(0,c.length)))}I&&t.isHydrating&&(r.error.value||l())?(r.pending.value=!1,r.status.value=r.error.value?"error":"success"):u&&(t.payload.serverRendered&&t.isHydrating||a.lazy)&&a.immediate?u._nuxtOnBeforeMountCbs.push(m):a.immediate&&m(),a.watch&&W(a.watch,()=>r.refresh());const _=t.hook("app:data:refresh",async c=>{(!c||c.includes(n))&&await r.refresh()});u&&E(_)}const C=Promise.resolve(t._asyncDataPromises[n]).then(()=>r);return Object.assign(C,r),C}function _e(e,s){const n={};for(const i of s)n[i]=e[i];return n}function ye(e,s,n){const[i={},a]=typeof s=="string"?[{},s]:[s,n],t=X(()=>{let v=e;return typeof v=="function"&&(v=v()),b(v)}),d=i.key||Z([a,typeof t.value=="string"?t.value:"",...ge(i)]);if(!d||typeof d!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+d);if(!e)throw new Error("[nuxt] [useFetch] request is missing.");const f=d===a?"$f"+d:d;if(!i.baseURL&&typeof t.value=="string"&&t.value[0]==="/"&&t.value[1]==="/")throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');const{server:w,lazy:l,default:r,transform:m,pick:I,watch:C,immediate:k,getCachedData:u,deep:_,...c}=i,p=ee({...te,...c,cache:typeof i.cache=="boolean"?void 0:i.cache}),$={server:w,lazy:l,default:r,transform:m,pick:I,immediate:k,getCachedData:u,deep:_,watch:C===!1?[]:[p,t,...C||[]]};let y;return fe(f,()=>{var H;(H=y==null?void 0:y.abort)==null||H.call(y),y=typeof AbortController<"u"?new AbortController:{};const v=b(i.timeout);return v&&setTimeout(()=>y.abort(),v),(i.$fetch||globalThis.$fetch)(t.value,{signal:y.signal,...p})},$)}function ge(e){var n;const s=[((n=b(e.method))==null?void 0:n.toUpperCase())||"GET",b(e.baseURL)];for(const i of[e.params||e.query]){const a=b(i);if(!a)continue;const t={};for(const[d,f]of Object.entries(a))t[b(d)]=b(f);s.push(t)}return s}const me="https://api.wineater.com/";async function ve(e,s){console.log(e,s);try{return(await ye(`${me}dish/recommendations`,{method:"POST",body:{text:e,store:s}},"$zVUsFkll1w")).data}catch(n){throw console.error("Error fetching data from API:",n),n}}const De={components:{Preloader:pe,Button:U,Header:A},data(){return{selectedLanguage:this.$i18n.locale,supportedLocales:this.$i18n.locales,searchQuery:"",results:[],loading:!1}},created(){},methods:{searchChange(e){this.searchQuery=e.target.value},openLink(e){window.open(e,"_blank")},async handleInput(){if(!this.loading){this.loading=!0;try{const e=this.$route.query.store,s=await ve(this.searchQuery,e);this.results=s,this.loading=!1}catch(e){console.error("Error in handleInput:",e)}}},clearResults(){this.results=[]}},mounted(){setTimeout(()=>{this.$refs.searchInput.focus()},100)}},be={class:"playground"},we={class:"h2 playground__title"},Ce=["innerHTML"],ke=["innerHTML"],Pe={class:"p1 playground__description"},Ie={class:"playground__input"},$e=o("div",{class:"playground__input-icon"},null,-1),Te=["placeholder"],Be=o("div",{class:"playground__input-btn-icon"},null,-1),Le=[Be],Oe={key:1,class:"playground__cards"},He={class:"playground__card-wrapper"},Ee={class:"playground__card"},Me={class:"playground__card-title h3"},Re={class:"playground__card-info"},xe={class:"playground__card-info-header"},Fe={class:"p1"},Se={class:"p2"},Ue={class:"playground__card-info-grape"},Ae={class:"p1"},Ve={class:"p2"};function ze(e,s,n,i,a,t){const d=O("Header"),f=O("Button"),w=O("Preloader");return g(),D(L,null,[B(d,{"show-links":!1}),o("div",be,[o("h2",we,[P(h(e.$t("playground.WineaterFind"))+" ",1),o("span",{class:"playground__title-circle",innerHTML:e.$t("playground.perfectWine")+"<br/>"},null,8,Ce),P(" "+h(e.$t("playground.forYour"))+" ",1),o("span",{class:"playground__title-underline",innerHTML:e.$t("playground.perfectDinner")},null,8,ke)]),o("p",Pe,h(e.$t("playground.BeSureToProvideDetails")),1),o("div",Ie,[$e,o("input",{ref:"searchInput",type:"text",placeholder:e.$t("playground.WhatDoYouWannaEat"),onInput:s[0]||(s[0]=(...l)=>t.searchChange&&t.searchChange(...l)),onKeydown:s[1]||(s[1]=ae(ne((...l)=>t.handleInput&&t.handleInput(...l),["prevent"]),["enter"]))},null,40,Te),B(f,{onClick:t.handleInput,disabled:!a.searchQuery,class:"playground__input-btn"},{default:M(()=>[P(h(e.$t("playground.FindAMatch")),1)]),_:1},8,["onClick","disabled"]),o("div",{onClick:s[2]||(s[2]=(...l)=>t.handleInput&&t.handleInput(...l)),class:"playground__input-btn--mobile"},Le)]),a.loading?(g(),se(w,{key:0})):R("",!0),a.results.length&&!a.loading?(g(),D("div",Oe,[(g(!0),D(L,null,x(a.results.slice(0,3),(l,r)=>(g(),D("div",He,[o("div",Ee,[o("div",Me,h(l.Title),1),o("div",Re,[o("div",xe,[o("p",Fe,h(e.$t("playground.Region")),1),o("p",Se,h(l.Region),1)]),o("div",Ue,[o("p",Ae,h(e.$t("playground.Grape")),1),o("p",Ve,[(g(!0),D(L,null,x(l.Grape.split(","),m=>(g(),D("p",null,h(m),1))),256))])]),o("div",{class:"playground__card-img",style:re({"background-image":"url("+l.Image+")"})},null,4),B(f,{onClick:m=>t.openLink(l.Url),class:"playground__card-btn"},{default:M(()=>[P(h(e.$t("playground.Buy")),1)]),_:2},1032,["onClick"])])])]))),256))])):R("",!0)])],64)}const We=F(De,[["render",ze]]);export{We as default};
