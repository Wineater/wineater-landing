<template>
  <div class="book-demo" :class="{ 'visible': visible }">
    <div class="book-demo__title h2">
      {{ $t('BookDemo.title1') }}
      <span class="decorative-1 color-brand-1">{{ $t('BookDemo.title2') }}</span>
    </div>
    <div class="book-demo__btn">
      <Button @click="openDemoPage">{{ $t("playground.BookDemo") }}</Button>
      <div class="book-demo__arrow"></div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/Buttons/Button.vue";

export default {
  components: {
    Button,
  },
  props: {
    visible: Boolean,
  },
  methods: {
    openDemoPage() {
      window.open('https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf', '_blank')
    },
  },
};
</script>

<style scoped lang="scss">
.book-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  gap: 64px;
  opacity: 0;
  transition: 0.5s ease;
  transform: translateY(100px);
}

.book-demo.visible {
  opacity: 1;
  transform: translateY(0px);
}

.book-demo__title {
  text-align: center;
  max-width: 1297px;
}
.book-demo__btn {
  position: relative;
  display: flex;
  .button{
    width: 325px;
  }
  .book-demo__arrow{
    position: absolute;
    width: 140px;
    height: 91px;
    right: -215px;
    top: -50px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/arrow.svg);
  }
}
@media only screen and (max-width: 1440px) {
  .book-demo {
    min-height: 700px;
  }
  .book-demo__title {
    text-align: center;
    max-width: 996px;
  }
}

@media only screen and (max-width: 1280px) {
  .book-demo {
    min-height: 620px;
  }
}

@media only screen and (max-width: 1024px) {
  .book-demo {
    transform: translateY(50px);
    gap: 40px;
  }
  .book-demo__btn {
    .button {
      width: 271px;
    }
    .book-demo__arrow{
      width: 100px;
      height: 91px;
      right: -129px;
      top: -29px;
    }
  }
  .book-demo__title {
    text-align: center;
    max-width: 700px;
  }
}

@media only screen and (max-width: 768px) {
  .book-demo {
    min-height: 500px;
    transform: translateY(50px);
    padding-right: 16px;
  }
  .book-demo__btn {
    width: 100%;
    .button {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 767px) {
  .book-demo{
    padding: 60px 16px 80px 0px;
    min-height: auto;
    height: auto;
    transform: translateY(30px);
  }
  .book-demo__arrow{
    display: none;
  }
  .book-demo__title{
    text-align: left;
  }
}
</style>

