<template>
  <div id="app">
    <Menu
      :playerID="playerID"
      :displayOptions="displayOptions"
      :pitchMenu="pitchMenu"
      @changePlayer="updatePlayer"
      @changeCookieOptions="updateCookieOptions"
    />
    <Player
      :playerID="playerID"
      :displayOptions="displayOptions"
      :pitchMenu="pitchMenu"
      @changePlayer="updatePlayer"
      @changePitchMenu="updatePitchMenu"
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

  created() {
    this.updateCookies();
  },

  data() {
    return {
      playerID: 105859,
      pitchMenu: {},
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
      this.playerID = Number(newPlayer);
      document.cookie = `playerID=${Number(newPlayer)}`;
    },

    updatePitchMenu(pitchMenu) {
      this.pitchMenu = pitchMenu;
    },

    updateCookieOptions() {
      this.updateCookies();
    },

    updateCookies() {
      if (document.cookie) {
        let cookies;

        cookies = document.cookie.replace(/\s/g, "");
        cookies = cookies.split(";");

        cookies.forEach((cookie) => {
          let cookiePair = cookie.split("=");
          if (cookiePair[0] === "displayOptions") {
            let cookiePharsed = JSON.parse(cookiePair[1]);
            for (const [c, b] of Object.entries(cookiePharsed)) {
              this.displayOptions[c] = b;
            }
          } else {
            this[cookiePair[0]] = Number(cookiePair[1]);
          }
        });
      }
    },
  },
};
</script>

<style lang="css"></style>
