<template>
  <div class="solutions" :class="{ 'visible': visible }">
    <h2 class="h2 color-brand-6">
      {{ $t('Solutions.title') }}
    </h2>

    <div class="solutions-container">
      <div class="solution-card">
        <h3 class="h3">Online Widget</h3>
        <p class="p1 color-text">Our embedded widget suggests perfect wine pairings for meals and occasions, giving customers confidence in their selections and increasing your average order value.</p>
      </div>

<!--            <div class="solution-card">
              <h3 class="h3">Wine POS</h3>
              <p class="p1">Smart POS system recommends profitable wines for each dish, tracks customer preferences, and creates personalized experiences that boost repeat business.</p>
            </div>-->

      <div class="solution-card">
        <h3 class="h3">Offline Stores</h3>
        <p class="p1">By offering a unique value proposition, we make it convenient for users to choose wines, encouraging repeat visits and purchases.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.solutions {
  padding: 60px 0;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.2s ease, transform 0.2s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .solutions-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    // This makes cards stretch properly in flex layout
    @media only screen and (min-width: 1025px) {
      & > * {
        flex: 1 1 calc(33.333% - 20px);
        min-width: 250px;
      }
    }

    @media only screen and (max-width: 1024px) and (min-width: 768px) {
      & > * {
        flex: 1 1 calc(50% - 15px);
        min-width: 200px;
      }
    }

    @media only screen and (max-width: 767px) {
      flex-direction: column;
      & > * {
        flex: 1 1 100%;
      }
    }
  }

  .solution-card {
    padding: 30px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;

    // Title styling
    h3 {
      margin-top: 0;
      margin-bottom: 16px;
    }

    // Paragraph styling
    p {
      margin: 0;
      flex-grow: 1; // Makes the paragraph take up available space
    }
  }
}
</style>