<template>
<!--  <div class="lds-default">-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--    <div></div>-->
<!--  </div>-->
  <div class="lds-ripple"><div></div><div></div></div>
</template>

<style scoped lang="scss">
//.lds-default {
//  display: inline-block;
//  position: relative;
//  width: 80px;
//  height: 80px;
//}
//.lds-default div {
//  position: absolute;
//  width: 6px;
//  height: 6px;
//  background: #7E27ED;
//  border-radius: 50%;
//  animation: lds-default 1.2s linear infinite;
//}
//.lds-default div:nth-child(1) {
//  animation-delay: 0s;
//  top: 37px;
//  left: 66px;
//}
//.lds-default div:nth-child(2) {
//  animation-delay: -0.1s;
//  top: 22px;
//  left: 62px;
//}
//.lds-default div:nth-child(3) {
//  animation-delay: -0.2s;
//  top: 11px;
//  left: 52px;
//}
//.lds-default div:nth-child(4) {
//  animation-delay: -0.3s;
//  top: 7px;
//  left: 37px;
//}
//.lds-default div:nth-child(5) {
//  animation-delay: -0.4s;
//  top: 11px;
//  left: 22px;
//}
//.lds-default div:nth-child(6) {
//  animation-delay: -0.5s;
//  top: 22px;
//  left: 11px;
//}
//.lds-default div:nth-child(7) {
//  animation-delay: -0.6s;
//  top: 37px;
//  left: 7px;
//}
//.lds-default div:nth-child(8) {
//  animation-delay: -0.7s;
//  top: 52px;
//  left: 11px;
//}
//.lds-default div:nth-child(9) {
//  animation-delay: -0.8s;
//  top: 62px;
//  left: 22px;
//}
//.lds-default div:nth-child(10) {
//  animation-delay: -0.9s;
//  top: 66px;
//  left: 37px;
//}
//.lds-default div:nth-child(11) {
//  animation-delay: -1s;
//  top: 62px;
//  left: 52px;
//}
//.lds-default div:nth-child(12) {
//  animation-delay: -1.1s;
//  top: 52px;
//  left: 62px;
//}
//@keyframes lds-default {
//  0%, 20%, 80%, 100% {
//    transform: scale(1);
//  }
//  50% {
//    transform: scale(1.5);
//  }
//}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #7E27ED;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -1s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

</style>
