import{_ as u,u as m,c as e,a as s,b as n,d,t as g,F as _,r as p,o as t,p as h,e as k}from"./BCtVJg73.js";const c=a=>(h("data-v-c1efd1b5"),a=a(),k(),a),v={class:"skeleton-wrapper"},f={class:"skeleton-header"},y=["src"],b={key:1,class:"h3"},w={key:2,class:"skeleton-logo"},S={key:3,class:"skeleton-title"},x={class:"skeleton-content"},z={class:"skeleton-sidebar"},B={class:"skeleton-cards"},C=c(()=>s("div",{class:"skeleton-card-image"},null,-1)),I=c(()=>s("div",{class:"skeleton-card-text"},null,-1)),W=c(()=>s("div",{class:"skeleton-card-text"},null,-1)),F=c(()=>s("div",{class:"skeleton-card-text shorter"},null,-1)),K=[C,I,W,F],L={name:"SkeletonScreen",data(){return{store:null,logoUrl:null,storeKey:null}}},N=Object.assign(L,{setup(a){const l={Wineater:"https://landing-static.s3.eu-central-1.amazonaws.com/images/logo.svg",Telckel:"https://landing-static.s3.eu-central-1.amazonaws.com/images/Telckel.png",Climats:"https://landing-static.s3.eu-central-1.amazonaws.com/images/Climats.png",Biobio:"https://landing-static.s3.eu-central-1.amazonaws.com/images/Biobio.png",Winepoint:"https://landing-static.s3.eu-central-1.amazonaws.com/images/Weinpoint.png"},o=m().params.id,i=(o||"").toString().charAt(0).toUpperCase()+o.slice(1);return(U,V)=>(t(),e("div",v,[s("div",f,[n(o)?(t(),e("img",{key:0,src:n(o)&&l[i]?l[i]:l.Wineater,alt:"Logo",class:"dynamic-logo"},null,8,y)):d("",!0),n(o)?(t(),e("h1",b,g(i))):(t(),e("div",w)),n(o)?d("",!0):(t(),e("div",S))]),s("div",x,[s("div",z,[(t(),e(_,null,p(10,r=>s("div",{class:"skeleton-filter",key:`filter-${r}`})),64))]),s("div",B,[(t(),e(_,null,p(9,r=>s("div",{class:"skeleton-card",key:`card-${r}`},K)),64))])])]))}}),j=u(N,[["__scopeId","data-v-c1efd1b5"]]);export{j as default};
