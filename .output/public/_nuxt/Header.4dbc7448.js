import{_ as g,m as d,q as c,s,S as f,B as m,T as w,r as k,J as i,U as b,R as y,t as r,P as B,z as u,A as C,v as T,n as S}from"./entry.332a2258.js";const H={class:"p1"},L={__name:"Button",props:{bgColor:{type:String,required:!1,default:"black"},disabled:{type:Boolean}},setup(l){const t=l;return(a,e)=>(d(),c("div",{class:m(`button button--${t.bgColor} ${t.disabled?"button--disabled":""}`),onClick:e[0]||(e[0]=o=>!t.disabled&&a.$emit("btnClick"))},[s("span",H,[f(a.$slots,"default",{},void 0,!0)])],2))}},v=g(L,[["__scopeId","data-v-159576da"]]);const P=s("span",{class:"p1"},"FR",-1),z=s("span",{class:"p1"},"EN",-1),q=[P,z],M={__name:"LangSwitcher",setup(l){const{locales:t,locale:a,setLocale:e}=w();let o=a.value,n=k(o);const $=_=>{n.value=_,setTimeout(()=>{e(_)},150)};return(_,p)=>(d(),c("div",{onClick:p[0]||(p[0]=A=>$(i(n)==="fr"?"en":"fr")),class:m(["switcher",{"switcher--active":i(n)==="en"}])},q,2))}},h=M;const N={class:"header"},V={key:0,class:"header__links"},W={class:"header__right-container"},D={class:"header__btns"},I={class:"header__btn"},R={components:{Button:v,LangSwitcher:h},props:{showLinks:{type:Boolean},logo:{type:String,default:"Wineater"}},data:()=>({logos:{Wineater:"https://landing-static.s3.eu-central-1.amazonaws.com/images/logo.svg",Telckel:"https://landing-static.s3.eu-central-1.amazonaws.com/images/Telckel.png",Climats:"https://landing-static.s3.eu-central-1.amazonaws.com/images/Climats.png"}}),methods:{openDemoPage(){window.open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8","_blank")},openMainPage(){S("/")},scrollToBlock(l){const t=document.querySelector(l);window.scrollTo({top:t.offsetTop-200,behavior:"smooth"})}}},U=Object.assign(R,{__name:"Header",setup(l){const t=b(),a=k(t.query.store?t.query.store:"");return(e,o)=>(d(),c("div",N,[s("div",{class:"header__logo",onClick:o[0]||(o[0]=(...n)=>e.openMainPage&&e.openMainPage(...n)),style:y({"background-image":`url(${i(a)&&e.logos[i(a)]?e.logos[i(a)]:e.logos.Wineater})`})},null,4),l.showLinks?(d(),c("div",V,[s("div",{class:"header__link p1 color-text",onClick:o[1]||(o[1]=n=>e.scrollToBlock(".algorithm-info"))},r(e.$t("Header.About")),1),s("div",{class:"header__link p1 color-text",onClick:o[2]||(o[2]=n=>e.scrollToBlock(".science-behind"))},r(e.$t("Header.TryMe")),1),s("div",{class:"header__link p1 color-text",onClick:o[3]||(o[3]=n=>e.scrollToBlock(".for-whom"))},r(e.$t("Header.ForWhom")),1),s("div",{class:"header__link p1 color-text",onClick:o[4]||(o[4]=n=>e.scrollToBlock(".how-it-works"))},r(e.$t("Header.HowItWorks")),1)])):B("",!0),s("div",W,[s("div",D,[u(h),s("div",I,[u(v,{onBtnClick:e.openDemoPage},{default:C(()=>[T(r(e.$t("playground.BookDemo")),1)]),_:1},8,["onBtnClick"])])])])]))}}),F=g(U,[["__scopeId","data-v-4cdad271"]]);export{v as B,F as H};
