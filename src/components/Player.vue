<template>
  <div class="player-page">
    <div v-if="loading" class="loading">
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          viewBox="0 0 144 204"
        >
          <path
            fill="#d40234"
            d="M110.5 72.4H144V0h-33.5v7.9l-8-7.9H34.1L0 34v136l34 34h76l33.7-33.7v-38.9h-33.2v24.7l-14.1 14H48.9L34 155.3V48l14.5-14.4h48l14.1 14.1z"
          />
        </svg>
        <div class="anim">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            viewBox="0 0 70 70"
          >
            <path fill="none" d="M136.6-13h24v24h-24v-24z" />
            <path
              d="M35 14.6V7L24.8 17.2 35 27.4v-7.6c8.4 0 15.3 6.8 15.3 15.3 0 2.6-.6 5-1.8 7.1l3.7 3.7c2.1-3.2 3.2-7 3.2-10.8 0-11.4-9.1-20.5-20.4-20.5zm0 35.7c-8.4 0-15.3-6.8-15.3-15.3 0-2.6.6-5 1.8-7.1l-3.7-3.7c-2.1 3.2-3.2 7-3.2 10.8 0 11.3 9.1 20.4 20.4 20.4V63l10.2-10.2L35 42.6v7.7z"
            />
          </svg>
        </div>
      </div>
    </div>

    <Menu
      :playerID="playerID"
      :displayOptions="displayOptions"
      :pitchMenu="pitchMenu"
      :playerInfo="playerInfo"
      @changePlayer="updatePlayer"
      @changeCookieOptions="updateCookieOptions"
    />

    <div
      :class="`player-container children-${this.numChildren}`"
      v-if="playerID"
    >
      <PlayerInfo
        v-if="displayOptions.showPlayerInfo"
        :playerInfo="playerInfo"
        :displayOptions="displayOptions"
        :inMenu="false"
        class=""
      />
      <PitchPlot
        v-if="pitches"
        :displayOptions="displayOptions"
        :selectedPitch="selectedPitch"
        :pitches="pitches"
        @changeSelectedPitch="updateSelectedPitch"
      />
      <PitchList
        v-if="pitches"
        :displayOptions="displayOptions"
        :selectedPitch="selectedPitch"
        :sortBy="sortBy"
        :pitches="pitches"
        @changeSelectedPitch="updateSelectedPitch"
        @changeSortBy="updateSortBy"
      />
    </div>
  </div>
</template>
<script>
import PlayerInfo from "./PlayerInfo.vue";
import PitchPlot from "./Pitches.vue";
import PitchList from "./PitchList.vue";
import Menu from "./Menu.vue";

export default {
  components: {
    PlayerInfo,
    PitchPlot,
    PitchList,
    Menu,
  },

  data() {
    return {
      loading: true,
      playerInfo: {},
      pitches: null,
      pitchButtons: {},
      selectedPitch: null,
      numChildren: null,
      sortBy: "gameDate",
      playerID: 105859,
      pitchMenu: {},
      displayOptions: {
        showPlayerInfo: true,
        showPhoto: true,
        showBio: true,
        showContractInfo: true,
        showPitches: true,
      },
    };
  },

  props: {},

  created() {
    this.updateCookies();
  },

  watch: {
    playerID: function () {
      this.fetchData();
    },
  },

  updated: function () {
    let numChildren = document.querySelector(".player-container");
    this.numChildren = numChildren.children.length;
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    updateSortBy(reSort) {
      this.sortBy = reSort.target.value;
    },

    checkNumChildren() {
      let numChildren = document.querySelector(".player-container");
      console.log(numChildren.children.length);
    },

    updateSelectedPitch(el) {
      this.selectedPitch = Number(el.target.attributes.index.value);

      let selected = document.querySelectorAll(".selected");
      let pitchPlotEl = document.querySelector(
        `.pitch-plot-container circle[index="${this.selectedPitch}"]`
      );
      let parentEl = document.querySelector(".pitch-plot-container svg");

      if (selected.length) {
        selected.forEach((check) => {
          check.classList.remove("selected"); // REMOVE ALL .selected
        });
      }
      pitchPlotEl.classList.add("selected"); // ADD .selected

      // Move to the top .selected
      parentEl.removeChild(pitchPlotEl);
      parentEl.appendChild(pitchPlotEl);

      // Scoll .pitch-list-container
      const scrollToThis = document.querySelector(
        `#pitch-list-${this.selectedPitch}`
      );
      selected = document.querySelectorAll(".pitch-list-container li");
      if (selected.length) {
        selected.forEach((check) => {
          check.classList.remove("selected");
        });
      }
      document.querySelector(".pitch-list-container").scrollTop =
        scrollToThis.offsetTop;
      scrollToThis.classList.add("selected");
    },

    fetchData() {
      let fetchURL =
        "https://cle-endpoints.consumedesign.com/api/players?playerId=" +
        this.playerID;
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          this.playerInfo = data.playerDetail;
        });

      fetchURL =
        "https://cle-endpoints.consumedesign.com/api/pitches?playerId=" +
        this.playerID;
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          this.pitches = data.pitches.sort((a, b) =>
            a[this.sortBy] > b[this.sortBy] ? 1 : -1
          );

          const pitchMenu = {};
          this.pitches.forEach((p) => {
            pitchMenu[p.pitchName] = p.pitchType;
          });
          this.pitchMenu = pitchMenu;

          setTimeout(() => {
            document.querySelector("body").classList.remove("active");
            this.loading = false;
          }, 1000);
        });
    },

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
<style lang="css" scoped>
@import "../scss/player.min.css";
</style>
