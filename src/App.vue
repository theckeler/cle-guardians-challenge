<template>
  <div id="app">
    <Player :playerID="playerID" />
  </div>
</template>

<script>
import Player from "./components/Player";

export default {
  name: "App",
  components: {
    Player,
  },
  data() {
    return {
      playerID: 105859,
    };
  },
};
</script>

<style lang="css"></style>
