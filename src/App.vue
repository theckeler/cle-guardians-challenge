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
  beforeUpdate() {
    window.addEventListener("load", function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  },
};
</script>

<style lang="css">
@import "./scss/media.min.css";
</style>
