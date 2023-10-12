<template>
  <div class="science-behind" :class="{ 'visible': visible }">
    <div class="science-behind__bottles">
      <div class="science-behind__bottles-text">
        <h2 class="h2 color-brand-4">
          The science behind
        </h2>
        <p class="p1 color-brand-4">
          The algorithm selects combinations based on the taste characteristics of wine and food, their compatibility,
          analyzing a huge amount of information.
        </p>
      </div>
    </div>
    <div class="science-behind__bottle"></div>
  </div>
</template>
<script setup>
const props = defineProps({
  visible: Boolean,
});
</script>

<style scoped lang="scss">
.science-behind {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 1080px;
  opacity: 0;
  transition: 1s ease;
  transform: translateY(100px);
}

.science-behind.visible {
  opacity: 1;
  transform: translateY(0px);
}

.science-behind__bottles {
  display: flex;
  width: 956px;
  height: 950px;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(assets/imgs/bottles.png);
  align-items: center;
  margin-right: 5%;
}

.science-behind__bottles-text {
  padding-left: 100px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .h2 {
    max-width: 509px;
  }

  .p1 {
    max-width: 664px;
  }
}

.science-behind__bottle {
  display: flex;
  flex: 1;
  max-width: 800px;
  height: 950px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(assets/imgs/bottle.png);
}

@media only screen and (max-width: 1440px) {
  .science-behind {
    min-height: 803px;
  }
  .science-behind__bottles {
    width: 710px;
    height: 825px;
    margin-left: -100px;
  }
  .science-behind__bottle {
    height: 825px;
    margin-right: -100px;
    background-position: right;
    background-image: url(assets/imgs/bottle-2.png);
  }
  .science-behind__bottles-text {
    gap: 20px;

    .h2 {
      max-width: 409px;
    }

    .p1 {
      max-width: 530px;
    }
  }
}

@media only screen and (max-width: 1280px) {
  .science-behind {
    min-height: 720px;
  }
  .science-behind__bottles {
    width: 630px;
    height: 720px;
    margin-left: -60px;
  }
  .science-behind__bottle {
    height: 720px;
    margin-right: -60px;
  }

  .science-behind__bottles-text {
    padding-left: 55px;
    gap: 20px;
    padding-top: 35px;

    .h2 {
      max-width: 409px;
    }

    .p1 {
      max-width: 409px;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .science-behind {
    transform: translateY(50px);
  }
  .science-behind__bottles {
    width: 500px;
    height: 570px;
  }
  .science-behind__bottle {
    height: 570px;
  }
  .science-behind__bottles-text {
    padding-left: 40px;
    gap: 20px;
    padding-top: 35px;

    .h2 {
      max-width: 409px;
    }

    .p1 {
      max-width: 409px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .science-behind {
    min-height: 500px;
    transform: translateY(50px);
  }
  .science-behind__bottles {
    width: 372px;
    height: 652px;
    background-image: url(assets/imgs/bottles--small.png);
    margin-right: 24px;
    margin-left: -40px;
  }
  .science-behind__bottle {
    height: 584px;
  }
  .science-behind__bottles-text {
    padding-left: 40px;
    gap: 20px;
    padding-top: 35px;

    .h2 {
      max-width: 281px;
    }

    .p1 {
      max-width: 292px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .science-behind {
    padding: 0 16px 0 0;
    min-height: auto;
    height: auto;
    transform: translateY(30px);
  }
  .science-behind__bottles {
    width: 100%;
    height: 511px;
    background-position: center;
    background-image: url(assets/imgs/bottles--mobile.png);
    justify-content: center;
    margin-left: 0px;
    margin-right: 0px;
  }
  .science-behind__bottle {
    display: none;
  }
  .science-behind__bottles-text {
    padding-left: 24px;
    gap: 16px;
    padding-top: 0px;

    .h2 {
      max-width: 197px;
    }

    .p1 {
      max-width: 273px;
    }
  }
}
</style>


