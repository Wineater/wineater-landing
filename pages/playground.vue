<template>
  <Header :show-links="false"/>
  <div class="playground">
    <div id="wineater-widget-conteiner"></div> <!-- Контейнер для виджета -->
  </div>
</template>
<script>
import Button from '~/components/Buttons/Button.vue';
import Preloader from "~/components/Buttons/Preloader.vue";
import Header from "~/components/LandingComponents/Header.vue";
import {fetchRecommendations} from "~/services/api-layer.ts";

export default {
  components: {Preloader, Button, Header},
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      supportedLocales: this.$i18n.locales,
      searchQuery: '',
      results: [],
      loading: false,
    };
  },
  created() {
  },
  methods: {
    searchChange(event) {
      this.searchQuery = event.target.value;
    },
    openLink(link) {
      window.open(link, '_blank')
    },
    async handleInput() {
      if (!this.loading) {
        this.loading = true;
        try {
          const store = this.$route.query['store'];
          const apiData = await fetchRecommendations(this.searchQuery, store);
          this.results = apiData;
          this.loading = false;
        } catch (error) {
          console.error('Error in handleInput:', error);
        }
      }
    },
    clearResults() {
      this.results = [];
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.searchInput.focus();
    }, 100)
  },
};
</script>
<style lang="scss">
.playground {
  min-height: 100vh;
  background: var(--brand-7);
  padding-top: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 50px;
}

.wineater-widget-conteiner {
  max-width: 1200px;
  min-width: 1200px;
}

.playground__title {
  color: var(--text);
  margin-bottom: 42px;
  max-width: 1155px;
}

.playground__description {
  color: var(--dark-100);
  max-width: 908px;
  margin-bottom: 40px;
}

.playground__title-circle {
  position: relative;
  display: inline-flex;

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -25px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/text-circle.png);
    width: 614px;
    height: 155px;
  }
}

.playground__title-underline {
  position: relative;
  display: inline-flex;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 1px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/text-underline.png);
    width: 588px;
    height: 21px;
  }
}

.playground__input {
  max-width: 916px;
  width: 100%;
  height: 80px;
  background: #FFFFFF;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding-left: 24px;
  padding-right: 6px;

  input {
    font-family: 'PoppinsMedium';
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    height: 80px;
    flex: 1;
  }

  ::placeholder {
    color: var(--dark-90);
  }
}

.playground__input-btn {
  height: 67px;
  padding: 0 24px !important;
}

.playground__input {
  margin-bottom: 80px;
}

.playground__input-icon {
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/search.svg);
  margin-right: 8px;
}

.playground__cards {
  display: flex;
  gap: 34px;
  width: calc(100% - 180px);
  max-width: 1750px;
  justify-content: center;
}

.playground__card-wrapper {
  flex: 1;
  width: 33%;
  max-width: 33%;
}

.playground__card {
  padding: 32px 20px 20px 20px;
  background-color: #7E27ED;
  border-radius: 32px;
}

.playground__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid #FFFFFF;

  .p1 {
    color: #FFFFFF;
    font-size: 18px;
  }
}

.playground__card-title {
  padding: 24px 24px 32px 0px;
  color: #FFFFFF;
  font-size: 30px;
  text-align: left;
  min-height: 120px;
}

.playground__card-info {
  padding: 32px 22px 24px 22px;
  border-radius: 20px;
  background-color: #FFFFFF;
}

.playground__card-info-header {
  padding-bottom: 22px;
  margin-bottom: 22px;
  border-bottom: 1px solid #333333;
}

.playground__card-info-title {
  color: var(--dark-100)
}

.playground__card-info-description {
  color: var(--text);
  max-width: 90px;
}
.playground__card-info-grape {
  min-height: 80px;
}

.playground__card-info-grape, .playground__card-info-header {
  display: flex;
  justify-content: space-between;

  .p1 {
    color: var(--dark-100);
    font-size: 18px;
    text-align: left;
  }

  .p2 {
    color: var(--text);
    font-size: 18px;
    flex: 1;
    padding-left: 30px;
    text-align: right;
  }
}

.playground__card-img {
  height: 262px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.playground__card-btn {
  padding: 19px 40px;
  width: 100%;

  .p1 {
    font-size: 18px;
  }
}

.playground__input-btn--mobile {
  display: none;
}

@media only screen and (max-width: 1440px) {
  .playground {
    padding-top: 200px;
  }
  .playground__title-circle {
    &:before {
      top: -2px;
      left: -25px;
      width: 444px;
      height: 106px;
    }
  }
  .playground__title-underline {
    &:before {
      bottom: -2px;
      left: 1px;
      width: 415px;
      height: 21px;
    }
  }
  .playground__title {
    max-width: 933px;
  }
}

@media only screen and (max-width: 1280px) {
  .playground__cards {
    width: calc(100% - 80px);
  }

  .playground__card {
    padding: 32px 16px 20px 25px;
  }
  .playground__cards {
    gap: 24px;
  }

  .playground__card-header {
    padding-bottom: 16px;
  }

  .playground__card-title {
    padding: 16px 0px 24px 0px;
    font-size: 30px;
  }

  .playground__card-info {
    padding: 24px 16px 16px 16px;
  }

  .playground__card-info-header {
    padding-bottom: 16px;
    margin-bottom: 16px;
    min-height: 60px;
  }

  .playground__card-img {
    height: 218px;
  }

  .playground__card-btn {
    padding: 13px 56px;

    .p1 {
    }
  }
}

@media only screen and (max-width: 1024px) {
  .playground__title {
    max-width: 633px;
  }
  .playground__description {
    max-width: 633px;
  }
  .playground__input {
    max-width: 633px;
  }
  .playground {
    padding: 200px 40px 0px;
  }
  .playground__input {
    width: 100%;
    height: 58px;

    input {
      font-size: 16px;
      height: 58px;
      flex: 1;
    }
  }
  .playground__input-btn {
    height: 46px;
    padding: 16px 24px;
  }

  .playground__title-circle {
    &:before {
      top: 0px;
      left: -12px;
      width: 303px;
      height: 67px;
    }
  }
  .playground__title-underline {
    &:before {
      bottom: -7px;
      left: 1px;
      width: 320px;
      height: 21px;
    }
  }

  .playground__card-wrapper {
    width: calc(50% - 12px);
    max-width: calc(50% - 12px);
    flex: auto;
  }
  .playground__cards {
    width: calc(100% - 25px);
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 768px) {
  .playground {
    padding: 140px 12px 0px;
  }
  .playground__title {
    max-width: 433px;
  }
  .playground__description {
    max-width: 433px;
  }
  .playground__input {
    max-width: 433px;
    margin-bottom: 40px;

    input {
      font-size: 14px;
    }
  }
  .playground__input-btn {
    display: none !important;
  }
  .playground__input-btn--mobile {
    display: flex !important;
    width: 50px;
    height: 50px;
    background-color: var(--text);
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .playground__input-btn-icon {
    width: 32px;
    height: 32px;
    background-image: url(https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/search--white.svg);
  }
  .playground__title-circle {
    &:before {
      top: 0px;
      left: -12px;
      width: 233px;
      height: 67px;
    }
  }
  .playground__description {
    max-width: 533px;
  }
  .playground__title-underline {
    &:before {
      bottom: -15px;
      left: 1px;
      width: 230px;
      height: 21px;
    }
  }
  .playground__input-icon {
    display: none !important;
  }
  .playground__card-wrapper {
    max-width: 400px;
    width: 100%;
  }
  .playground__cards {
    justify-content: center;
    gap: 16px;
  }
  .playground__card {
    padding: 22px 16px 22px 16px;
  }
  .playground__card-header {
    padding-bottom: 8px;

    .p1 {
      font-size: 16px;
    }
  }
  .playground__card-info-header {
    .p1, .p2 {
      font-size: 16px;
    }
  }
  .playground__card-title {
    padding: 11px 0px 16px 0px;
    font-size: 22px;
  }
  .playground__card-info-header {
    padding-bottom: 8px;
    margin-bottom: 8px;
  }
  .playground__card-info-grape {
    min-height: 0;
    .p1, .p2 {
      font-size: 16px;
    }
  }
  .playground__card-img {
    height: 158px;
  }
}

</style>
