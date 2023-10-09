<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script>
import Tracker from '@openreplay/tracker/cjs';
const tracker = new Tracker({
  projectKey: "XkscRWp9UTyrXtkhPbQV",
});
export default {
  created() {
    tracker.start();
  }
}
</script>
