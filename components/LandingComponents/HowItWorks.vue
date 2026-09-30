<template>
  <div class="how-it-works" :class="{ 'visible': visible }">
    <h2 id="how-it-works-title" class="h2 color-text">
      {{ $t('HowItWorks.title') }}
    </h2>

    <ol class="how-it-works__steps">
      <li class="how-it-works__step" v-for="n in 3" :key="n">
        <span class="how-it-works__num" aria-hidden="true">{{ n }}</span>
        <h3 class="how-it-works__step-title">{{ $t(`HowItWorks.step${n}Title`) }}</h3>
        <p class="p1 color-dark-100">{{ $t(`HowItWorks.step${n}Text`) }}</p>
      </li>
    </ol>

    <p class="p1 color-dark-100 how-it-works__note">{{ $t('HowItWorks.catalogNote') }}</p>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
});
</script>

<style scoped lang="scss">
.how-it-works {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0 80px;
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.how-it-works__steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.how-it-works__step {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid #ededed;

  p {
    margin: 0;
    line-height: 1.6;
    max-width: 38ch;
  }
}

.how-it-works__num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F2FF;
  color: #7E27ED;
  font-family: 'PoppinsMedium', sans-serif;
  font-size: 16px;
}

.how-it-works__step-title {
  margin: 0;
  font-family: 'PoppinsMedium', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 1.3;
  color: #333;
}

.how-it-works__note {
  margin: 0;
  max-width: 68ch;
  line-height: 1.6;
}

@media only screen and (max-width: 768px) {
  .how-it-works {
    padding: 24px 0 60px;
    gap: 28px;
  }

  .how-it-works__steps {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
