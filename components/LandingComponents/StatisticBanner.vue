<template>
  <div class="statistic-banner" :class="{ 'visible': visible }">
    <div class="statistic-banner__title h2 color-text">
      Consumers hate to choose <br>
      <span class="color-brand-6">a wine for dinner</span>
    </div>
    <div class="statistic-banner__descriptions">
      <div class="statistic-banner__description statistic-banner__description--left">
        <span class="statistic-banner__description-percent h2 color-text">
          <span>{{ animatedPercent1 }}</span>%</span>
        <span class="statistic-banner__description-text p1 color-dark-100">of consumers choose a wine for dinner, not vice versa</span>
      </div>
      <div class="statistic-banner__description statistic-banner__description--right">
        <span class="statistic-banner__description-percent h2 color-text"><span>{{ animatedPercent2 }}</span>%</span>
        <span class="statistic-banner__description-text p1 color-dark-100">feel difficulties to choose a wine for dinner due to the lack of knowledge about wine</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  },
  data() {
    return {
      animatedPercent1: 0,
      animatedPercent2: 0,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.animatePercents();
      } else {
        this.animatedPercent1 = 0;
        this.animatedPercent2 = 0;
      }
    },
  },
  methods: {
    animatePercents() {
      const targetPercent1 = 66;
      const targetPercent2 = 72;
      const duration = 700;
      const interval = duration / (targetPercent1 - this.animatedPercent1);

      const updatePercentages = () => {
        if (this.animatedPercent1 < targetPercent1) {
          this.animatedPercent1 += 1;
        }
        if (this.animatedPercent2 < targetPercent2) {
          this.animatedPercent2 += 1;
        }
        if (this.animatedPercent1 < targetPercent1 || this.animatedPercent2 < targetPercent2) {
          setTimeout(updatePercentages, interval);
        }
      };

      updatePercentages();
    },
  },
};
</script>

<style scoped lang="scss">
.statistic-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 800px;
  gap: 64px;
  opacity: 0;
  transition: 1s ease;
  transform: translateY(100px);
}

.statistic-banner.visible {
  opacity: 1;
  transform: translateY(0px);
}

.statistic-banner__descriptions {
  display: flex;
  gap: 112px;
}

.statistic-banner__title {
  text-align: center;
}

.statistic-banner__description {
  display: flex;
  gap: 20px;
}

.statistic-banner__description-percent {
  display: flex;
}

.statistic-banner__description-text {
  max-width: 440px;
}

.statistic-banner__description--left {
  .statistic-banner__description-percent {
    span {
      width: 108px;
      display: inline-flex;
    }
  }
}

.statistic-banner__description--right {
  .statistic-banner__description-percent {
    span {
      width: 97px;
      display: inline-flex;
    }
  }
}

@media only screen and (max-width: 1440px) {
  .statistic-banner {
    min-height: 700px;
  }
  .statistic-banner__description-text {
    max-width: 270px;
  }
  .statistic-banner__description--left {
    .statistic-banner__description-percent {
      span {
        width: 85px;
      }
    }
  }
  .statistic-banner__description--right {
    .statistic-banner__description-percent {
      span {
        width: 75px;
      }
    }
  }
}

@media only screen and (max-width: 1280px) {
  .statistic-banner {
    min-height: 620px;
  }
}

@media only screen and (max-width: 1024px) {
  .statistic-banner__descriptions {
    gap: 64px;
  }
  .statistic-banner {
    transform: translateY(50px);
    gap: 40px;
  }
  .statistic-banner__description-text {
    max-width: 240px;
  }
  .statistic-banner__description--left {
    .statistic-banner__description-percent {
      span {
        width: 59px;
      }
    }
  }
  .statistic-banner__description--right {
    .statistic-banner__description-percent {
      span {
        width: 52px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .statistic-banner {
    min-height: 500px;
    transform: translateY(50px);
  }
  .statistic-banner__descriptions {
    gap: 135px;
  }
  .statistic-banner__description {
    flex-direction: column;
    gap: 10px;
  }
}

@media only screen and (max-width: 600px) {
  .statistic-banner {
    padding: 60px 16px 80px 0px;
    min-height: auto;
    height: auto;
    transform: translateY(30px);
  }
  .statistic-banner__title {
    text-align: left;

    br {
      display: none;
    }
  }
  .statistic-banner__descriptions{
    flex-direction: column;
    width: 100%;
    gap: 40px;
  }
  .statistic-banner__description--left {
    .statistic-banner__description-text{
      max-width: 245px;
    }
    .statistic-banner__description-percent {
      span {
        width: 42px;
      }
    }
  }
  .statistic-banner__description--right {
    .statistic-banner__description-text{
      max-width: 270px;
    }
    .statistic-banner__description-percent {
      span {
        width: 37px;
      }
    }
  }
}
</style>

