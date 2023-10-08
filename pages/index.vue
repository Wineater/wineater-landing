<template>
  <Header/>
  <div class="playground">
    <h2 class="h2 playground__title">
      Wineater find <span class="playground__title-circle">perfect wine <br/></span> for your <span
        class="playground__title-underline">perfect dinner</span>
    </h2>
    <p class="p1 playground__description">
      Be sure to provide details about your dish, such as whether your tartare is made with salmon or beef. This helps
      the algorithm determine the ideal wine for your meal.
    </p>
    <div class="playground__input">
      <div class="playground__input-icon"></div>
      <input
          ref="searchInput"
          type="text"
          :placeholder="'What do you wanna eat? newtext'"
          @input="searchChange"
          @keydown.enter.prevent="handleInput"
      />
      <Button
          @click="handleInput"
          :disabled="!searchQuery"
          class="playground__input-btn">
        Find a match
      </Button>
    </div>
    {{ loading ? 'loading' : '' }}
    <div class="playground__cards" v-if="results.length">
      <div v-for="(card, cardIndex) in results.slice(0, 3)" class="playground__card-wrapper">
        <div class="playground__card">
          <div class="playground__card-header">
            <p class="p1">Type</p>
            <p class="p1">{{ card.Type }}</p>
          </div>
          <div class="playground__card-title h3">
            {{ card.Title }}
          </div>
          <div class="playground__card-info">
            <div class="playground__card-info-header">
              <p class="p1">Region</p>
              <p class="p2">{{ card.Region }}</p>
            </div>
            <div class="playground__card-info-grape">
              <p class="p1">Grape</p>
              <p class="p2"><p v-for="(grape) in card.Grape.split(',')">{{ grape }}</p></p>
            </div>
            <div
                class="playground__card-img"
                :style="{'background-image': 'url(' + card.Image + ')'}"
            ></div>
            <Button class="playground__card-btn">
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {fetchRecommendations} from '../services/api-layer';
import Button from '~/components/Buttons/Button.vue';

export default {
  components: {Button},
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      supportedLocales: this.$i18n.locales,
      searchQuery: '',
      results: [],
      loading: false,
    };
  },
  methods: {
    searchChange(event) {
      this.searchQuery = event.target.value;
    },
    async handleInput() {
      if (!this.loading) {
        this.loading = true;
        try {
          const apiData = await fetchRecommendations(this.searchQuery);
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
  padding-top: 309px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
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

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -25px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(assets/imgs/text-circle.png);
    width: 614px;
    height: 155px;
  }
}

.playground__title-underline {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 1px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(assets/imgs/text-underline.png);
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
    font-size: 28px;
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
  background-image: url(assets/imgs/search.svg);
  margin-right: 8px;
}

.playground__cards {
  display: flex;
  gap: 34px;
  width: calc(100% - 180px);
}

.playground__card-wrapper {
  flex: 1;
}

.playground__card {
  padding: 32px 20px 20px 44px;
  background-color: #7E27ED;
  border-radius: 32px;
}

.playground__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 1px solid #FFFFFF;

  .p1 {
    color: #FFFFFF;
    font-size: 18px;
  }
}

.playground__card-title {
  padding: 24px 24px 32px 0px;
  color: #FFFFFF;
  font-size: 40px;
  text-align: left;
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
  height: 364px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: 0 20px;
  background-size: contain;
}

.playground__card-btn {
  padding: 19px 40px;
  width: 100%;

  .p1 {
    font-size: 18px;
  }
}

@media only screen and (max-width: 1440px) {
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
}

@media only screen and (max-width: 1024px) {
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
}

@media only screen and (max-width: 768px) {
  .playground {
    padding-top: 162px;
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
}

</style>
