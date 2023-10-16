import{u as D,d as L,c as R,h as W,r as y,o as N,a as z,b as H,e as O,f as M,g as V,i as A,p as j,j as K,w as X,k as Y,l as T,n as Q,_ as k,m as b,q as g,s as n,t as i,v as m,x,y as q,z as p,A as I,B as P,C as Z,F as U,D as G,E as J}from"./entry.5ea0ece4.js";import{B as C,H as ee}from"./Header.646fccfe.js";async function F(e,s=D()){const{path:r,matched:t}=s.resolve(e);if(!t.length||(s._routePreloaded||(s._routePreloaded=new Set),s._routePreloaded.has(r)))return;const o=s._preloadPromises=s._preloadPromises||[];if(o.length>4)return Promise.all(o).then(()=>F(e,s));s._routePreloaded.add(r);const c=t.map(a=>{var _;return(_=a.components)==null?void 0:_.default}).filter(a=>typeof a=="function");for(const a of c){const _=Promise.resolve(a()).catch(()=>{}).finally(()=>o.splice(o.indexOf(_)));o.push(_)}await Promise.all(o)}const te=(...e)=>e.find(s=>s!==void 0),ne="noopener noreferrer";/*! @__NO_SIDE_EFFECTS__ */function se(e){const s=e.componentName||"NuxtLink",r=(t,o)=>{if(!t||e.trailingSlash!=="append"&&e.trailingSlash!=="remove")return t;const c=e.trailingSlash==="append"?X:Y;if(typeof t=="string")return c(t,!0);const a="path"in t?t.path:o(t).path;return{...t,name:void 0,path:c(a,!0)}};return L({name:s,props:{to:{type:[String,Object],default:void 0,required:!1},href:{type:[String,Object],default:void 0,required:!1},target:{type:String,default:void 0,required:!1},rel:{type:String,default:void 0,required:!1},noRel:{type:Boolean,default:void 0,required:!1},prefetch:{type:Boolean,default:void 0,required:!1},noPrefetch:{type:Boolean,default:void 0,required:!1},activeClass:{type:String,default:void 0,required:!1},exactActiveClass:{type:String,default:void 0,required:!1},prefetchedClass:{type:String,default:void 0,required:!1},replace:{type:Boolean,default:void 0,required:!1},ariaCurrentValue:{type:String,default:void 0,required:!1},external:{type:Boolean,default:void 0,required:!1},custom:{type:Boolean,default:void 0,required:!1}},setup(t,{slots:o}){const c=D(),a=R(()=>{const l=t.to||t.href||"";return r(l,c.resolve)}),_=R(()=>t.external||t.target&&t.target!=="_self"?!0:typeof a.value=="object"?!1:a.value===""||W(a.value,{acceptRelative:!0})),u=y(!1),h=y(null),B=l=>{var f;h.value=t.custom?(f=l==null?void 0:l.$el)==null?void 0:f.nextElementSibling:l==null?void 0:l.$el};if(t.prefetch!==!1&&t.noPrefetch!==!0&&t.target!=="_blank"&&!ie()){const f=T();let v,d=null;N(()=>{const S=oe();z(()=>{v=H(()=>{var w;(w=h==null?void 0:h.value)!=null&&w.tagName&&(d=S.observe(h.value,async()=>{d==null||d(),d=null;const $=typeof a.value=="string"?a.value:c.resolve(a.value).fullPath;await Promise.all([f.hooks.callHook("link:prefetch",$).catch(()=>{}),!_.value&&F(a.value,c).catch(()=>{})]),u.value=!0}))})})}),O(()=>{v&&M(v),d==null||d(),d=null})}return()=>{var S,w;if(!_.value){const $={ref:B,to:a.value,activeClass:t.activeClass||e.activeClass,exactActiveClass:t.exactActiveClass||e.exactActiveClass,replace:t.replace,ariaCurrentValue:t.ariaCurrentValue,custom:t.custom};return t.custom||(u.value&&($.class=t.prefetchedClass||e.prefetchedClass),$.rel=t.rel),V(A("RouterLink"),$,o.default)}const l=typeof a.value=="object"?((S=c.resolve(a.value))==null?void 0:S.href)??null:a.value||null,f=t.target||null,v=t.noRel?null:te(t.rel,e.externalRelAttribute,l?ne:"")||null,d=()=>Q(l,{replace:t.replace});return t.custom?o.default?o.default({href:l,navigate:d,get route(){if(!l)return;const $=j(l);return{path:$.pathname,fullPath:$.pathname,get query(){return K($.search)},hash:$.hash,params:{},name:void 0,matched:[],redirectedFrom:void 0,meta:{},href:l}},rel:v,target:f,isExternal:_.value,isActive:!1,isExactActive:!1}):null:V("a",{ref:h,href:l,rel:v,target:f},(w=o.default)==null?void 0:w.call(o))}}})}const ae=se({componentName:"NuxtLink"});function oe(){const e=T();if(e._observer)return e._observer;let s=null;const r=new Map,t=(c,a)=>(s||(s=new IntersectionObserver(_=>{for(const u of _){const h=r.get(u.target);(u.isIntersecting||u.intersectionRatio>0)&&h&&h()}})),r.set(c,a),s.observe(c),()=>{r.delete(c),s.unobserve(c),r.size===0&&(s.disconnect(),s=null)});return e._observer={observe:t}}function ie(){const e=navigator.connection;return!!(e&&(e.saveData||/2g/.test(e.effectiveType)))}const re={},E=e=>(x("data-v-6c741c91"),e=e(),q(),e),ce={class:"main-banner"},le={class:"main-banner__info"},de={class:"h1 main-banner__info-title color-text"},_e={class:"main-banner__info-description"},ue={class:"p1 color-text"},he={class:"color-brand-1"},fe=E(()=>n("div",{class:"main-banner__info-hint"},null,-1)),ve=E(()=>n("div",{class:"main-banner__img"},null,-1));function pe(e,s){return b(),g("div",ce,[n("div",le,[n("h1",de,i(e.$t("startBanner.WineAndFoodPairing")),1),n("div",_e,[n("p",ue,[m(i(e.$t("startBanner.title1"))+" ",1),n("span",he,i(e.$t("startBanner.title2")),1),m(" "+i(e.$t("startBanner.title2")),1)]),fe])]),ve])}const me=k(re,[["render",pe],["__scopeId","data-v-6c741c91"]]);const be={class:"h2 color-text algorithm-info__text"},ge={class:"color-brand-6"},$e={__name:"AlgorithmInfo",props:{visible:Boolean},setup(e){return(s,r)=>{const t=ae;return b(),g("div",{class:P(["algorithm-info",{visible:e.visible}])},[n("h2",be,[m(i(s.$t("algorithm.title1"))+" ",1),n("span",ge,i(s.$t("algorithm.title2")),1),m(" "+i(s.$t("algorithm.title3")),1)]),p(t,{to:"/playground/all"},{default:I(()=>[p(C,{class:"algorithm-info__btn"},{default:I(()=>[m(i(s.$t("playground.FindAMatch")),1)]),_:1})]),_:1})],2)}}},ye=k($e,[["__scopeId","data-v-1a07d4a0"]]);const Be=e=>(x("data-v-166fe7a0"),e=e(),q(),e),we={class:"science-behind__bottles"},ke={class:"science-behind__bottles-text"},Se={class:"h2 color-brand-4"},Pe={class:"p1 color-brand-4"},xe=Be(()=>n("div",{class:"science-behind__bottle"},null,-1)),qe={__name:"ScienceBehind",props:{visible:Boolean},setup(e){return(s,r)=>(b(),g("div",{class:P(["science-behind",{visible:e.visible}])},[n("div",we,[n("div",ke,[n("h2",Se,i(s.$t("scienceBehind.title")),1),n("p",Pe,i(s.$t("scienceBehind.text")),1)])]),xe],2))}},Ie=k(qe,[["__scopeId","data-v-166fe7a0"]]);const Ce={props:{visible:Boolean},data(){return{animatedPercent1:0,animatedPercent2:0}},watch:{visible(e){e?this.animatePercents():(this.animatedPercent1=0,this.animatedPercent2=0)}},methods:{animatePercents(){const t=700/(66-this.animatedPercent1),o=()=>{this.animatedPercent1<66&&(this.animatedPercent1+=1),this.animatedPercent2<72&&(this.animatedPercent2+=1),(this.animatedPercent1<66||this.animatedPercent2<72)&&setTimeout(o,t)};o()}}},Ae=e=>(x("data-v-ea9ff99f"),e=e(),q(),e),Re={class:"statistic-banner__title h2 color-text"},Ve=Ae(()=>n("br",null,null,-1)),De={class:"color-brand-6"},Ne={class:"statistic-banner__descriptions"},Te={class:"statistic-banner__description statistic-banner__description--left"},Ue={class:"statistic-banner__description-percent h2 color-text"},Fe={class:"statistic-banner__description-text p1 color-dark-100"},Ee={class:"statistic-banner__description statistic-banner__description--right"},Le={class:"statistic-banner__description-percent h2 color-text"},We={class:"statistic-banner__description-text p1 color-dark-100"};function ze(e,s,r,t,o,c){return b(),g("div",{class:P(["statistic-banner",{visible:r.visible}])},[n("div",Re,[m(i(e.$t("StatisticBanner.title1"))+" ",1),Ve,n("span",De,i(e.$t("StatisticBanner.title2")),1)]),n("div",Ne,[n("div",Te,[n("span",Ue,[n("span",null,i(o.animatedPercent1),1),m("%")]),n("span",Fe,i(e.$t("StatisticBanner.text1")),1)]),n("div",Ee,[n("span",Le,[n("span",null,i(o.animatedPercent2),1),m("%")]),n("span",We,i(e.$t("StatisticBanner.text2")),1)])])],2)}const He=k(Ce,[["render",ze],["__scopeId","data-v-ea9ff99f"]]);const Oe={components:{Button:C},props:{visible:Boolean}};function Me(e,s,r,t,o,c){return b(),g("div",{class:P(["how-it-works",{visible:r.visible,"how-it-works--fr":e.$i18n.locale==="fr"}])},null,2)}const je=k(Oe,[["render",Me],["__scopeId","data-v-8225fc09"]]);const Ke={components:{Button:C},methods:{openDemoPage(){window.open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8","_blank")}}},Xe=e=>(x("data-v-71c17de9"),e=e(),q(),e),Ye={class:"footer"},Qe={class:"footer__content"},Ze={class:"footer__texts"},Ge={class:"footer__title color-brand-4 decorative-1"},Je={class:"footer__text h2 color-brand-4"},et=Xe(()=>n("div",{class:"footer__text-arrow"},null,-1)),tt={class:"footer__btn"},nt=Z('<div class="footer__info" data-v-71c17de9><div class="footer__logo" data-v-71c17de9></div><div class="footer__links" data-v-71c17de9><a class="p1 color-brand-4" href="vladimir@wineater.com" data-v-71c17de9>vladimir@wineater.com</a><a class="p1 color-brand-4" href="https://instagram.com/ah_vladimir?igshid=MzRlODBiNWFlZA==" target="_blank" data-v-71c17de9>Instagram</a></div></div>',1);function st(e,s,r,t,o,c){const a=A("Button");return b(),g("div",Ye,[n("div",Qe,[n("div",Ze,[n("div",Ge,i(e.$t("Footer.title")),1),n("div",Je,[m(i(e.$t("Footer.text"))+" ",1),et]),n("div",tt,[p(a,{onBtnClick:c.openDemoPage},{default:I(()=>[m(i(e.$t("playground.BookDemo")),1)]),_:1},8,["onBtnClick"])])]),nt])])}const at=k(Ke,[["render",st],["__scopeId","data-v-71c17de9"]]);const ot={components:{Button:C},props:{visible:Boolean},methods:{openDemoPage(){window.open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8","_blank")}}},it=e=>(x("data-v-fa600328"),e=e(),q(),e),rt={class:"book-demo__title h2"},ct={class:"decorative-1 color-brand-1"},lt={class:"book-demo__btn"},dt=it(()=>n("div",{class:"book-demo__arrow"},null,-1));function _t(e,s,r,t,o,c){const a=A("Button");return b(),g("div",{class:P(["book-demo",{visible:r.visible}])},[n("div",rt,[m(i(e.$t("BookDemo.title1"))+" ",1),n("span",ct,i(e.$t("BookDemo.title2")),1)]),n("div",lt,[p(a,{onClick:c.openDemoPage},{default:I(()=>[m(i(e.$t("playground.BookDemo")),1)]),_:1},8,["onClick"]),dt])],2)}const ut=k(ot,[["render",_t],["__scopeId","data-v-fa600328"]]);const ht={props:{visible:Boolean},data(){return{cards:{en:[{description:"Upload all wine and food SKUs, the algorithm will analyze your catalog and select combinations and specific SKU.",infographic:"some infographics",title:"Retailers"},{description:"Upload your menu, the algorithm will analyze the ingredients and help you make a suitable wine list.",infographic:"some infographics",title:"Horeca"},{description:"some text",infographic:"some infographics",title:"Manufacturers"}],fr:[{description:"Téléchargez tous les SKU de vins et de produits alimentaires, l'algorithme analysera votre catalogue et sélectionnera des combinaisons et des SKU spécifiques.",infographic:"quelques infographies",title:"Détaillants"},{description:"Téléchargez votre menu, l'algorithme analysera les ingrédients et vous aidera à établir une liste de vins appropriée.",infographic:"quelques infographies",title:"Horeca"},{description:"quelque texte",infographic:"quelques infographies",title:"Fabricants"}]}}},watch:{},created(){},methods:{}},ft={class:"h2 color-brand-6"},vt={class:"for-whom__cards"},pt={class:"for-whom__card"},mt={class:"for-whom__card-texts"},bt={class:"for-whom__card-title h3"},gt={class:"for-whom__card-description p1 color-dark-100"},$t={class:"for-whom__card-infographic decorative-2 color-brand-1"};function yt(e,s,r,t,o,c){return b(),g("div",{class:P(["for-whom",{visible:r.visible}])},[n("h2",ft,i(e.$t("ForWhom.title")),1),n("div",vt,[(b(!0),g(U,null,G(o.cards[e.$i18n.locale],a=>(b(),g("div",pt,[n("div",mt,[n("div",bt,i(a.title),1),n("div",gt,i(a.description),1)]),n("div",$t,i(a.infographic),1)]))),256))])],2)}const Bt=k(ht,[["render",yt],["__scopeId","data-v-5a50f5b7"]]);const wt={class:"main-page"},Pt={__name:"index",setup(e){const s=y(!1),r=y(!1),t=y(!1),o=y(!1),c=y(!1),a=y(!1),_=y(!1),u=(B,l)=>{const f=B.getBoundingClientRect(),v=window.innerHeight,d=(f.top-v/2+f.bottom)/2;return d>=v/3&&d<=v*2/3},h=()=>{const B=document.querySelector(".algorithm-info"),l=document.querySelector(".science-behind"),f=document.querySelector(".statistic-banner"),v=document.querySelector(".about-banner"),d=document.querySelector(".for-whom"),S=document.querySelector(".book-demo"),w=document.querySelector(".how-it-works");B&&(s.value=s.value?!0:u(B)),l&&(r.value=r.value?!0:u(l)),f&&(t.value=t.value?!0:u(f)),v&&(o.value=o.value?!0:u(v)),d&&(c.value=c.value?!0:u(d)),S&&(a.value=a.value?!0:u(S)),w&&(_.value=_.value?!0:u(w))};return N(()=>{window.addEventListener("scroll",h),h()}),J(()=>{window.removeEventListener("scroll",h)}),(B,l)=>(b(),g(U,null,[p(ee,{"show-links":!0}),n("div",wt,[p(me),p(ye,{visible:s.value},null,8,["visible"]),p(Ie,{visible:r.value},null,8,["visible"]),p(He,{visible:t.value},null,8,["visible"]),p(Bt,{visible:c.value},null,8,["visible"]),p(ut,{visible:a.value},null,8,["visible"]),p(je,{visible:_.value},null,8,["visible"])]),p(at)],64))}};export{Pt as default};
