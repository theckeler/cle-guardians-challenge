<template>
  <div id="app">
    <Menu
      :playerID="playerID"
      :displayOptions="displayOptions"
      @changePlayer="updatePlayer"
      @changeCookieOptions="updateCookieOptions"
    />
    <Player
      :playerID="playerID"
      :displayOptions="displayOptions"
      @changePlayer="updatePlayer"
    />
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Player from "./components/Player";

export default {
  name: "App",
  components: {
    Menu,
    Player,
  },
  data() {
    return {
      playerID: 105859,
      displayOptions: {
        showPlayerBanner: true,
        showPhoto: true,
        showBio: true,
        showContractInfo: true,
        showPitches: true,
      },
    };
  },
  methods: {
    updatePlayer(newPlayer) {
      //  console.log("newData", Number(newPlayer));
      this.playerID = Number(newPlayer);
      document.cookie = `playerID=${Number(newPlayer)}`;
    },

    // updateOptions(options) {
    //   // console.log("Parent updateOptions", options);
    //   this.displayOptions[options.id] = options.checked;
    // },

    updateCookieOptions() {
      let cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        let cookiePair = cookie.split("=");
        let cookiePharsed = JSON.parse(cookiePair[1]);
        // Object.keys(cookiePharsed).forEach((cookieName) => {
        //   console.log("cookieUpdate", cookieUpdate);
        // });

        for (const [key, value] of Object.entries(cookiePharsed)) {
          console.log(`${key}: ${value}`);
        }
      });
    },
  },
};
</script>

<style lang="css"></style>
