<template>
  <div class="header">
    <div class="header__logo"></div>
    <div class="header__right-container">
      <div class="header__links">
        <div class="header__link">About</div>
        <div class="header__link">Try me</div>
        <div class="header__link">For whom</div>
        <div class="header__link">How it works</div>
      </div>
      <div class="header__btns">
        <Button>123123</Button>
      </div>
    </div>
  </div>
</template>
<script>

import {defineComponent} from "vue";
import Button from "~/components/Buttons/Button.vue";

export default defineComponent({
  components: {Button}
})
</script>
<style scoped lang="scss">
.header {

}
</style>
