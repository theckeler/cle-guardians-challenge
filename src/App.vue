<template>
  <div id="app">
    <Player />
  </div>
</template>

<script>
import Player from "./components/Player";
export default {
  name: "App",
  components: {
    Player,
  },
};
</script>

<style lang="css">
@import "./scss/media.min.css";
</style>
