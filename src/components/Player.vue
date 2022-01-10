<template>
  <div class="player-page" :class="`children-${this.numChildren}`">
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
      :playerId="playerId"
      :displayOptions="displayOptions"
      :pitchMenu="pitchMenu"
      :playerInfo="playerInfo"
      @changePlayer="updatePlayer"
      @changeCookieOptions="updateCookieOptions"
      @updateURL="updateURL"
      @resetSelectedPitch="resetSelectedPitch"
    />

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
      @updateURL="updateURL"
    />

    <PitchList
      :pitches="pitches"
      @changeSelectedPitch="updateSelectedPitch"
      @updateURL="updateURL"
    />
  </div>
</template>
<script>
import PlayerInfo from "./PlayerInfo.vue";
import PitchPlot from "./PitchPlot.vue";
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
      playerId: 105859,
      pitchMenu: {},
      displayOptions: {
        showPlayerInfo: true,
        showPhoto: true,
        showBio: true,
        showContractInfo: true,
        showPitches: true,
      },
      historyURL: [],
    };
  },

  props: {},

  created() {
    this.breakDownURL(window.location.pathname.split("/").splice(1));
    this.updateCookies();
    this.fetchData();
    this.updateURL();

    window.onpopstate = (event) => {
      this.breakDownURL(event.target.location.pathname.split("/").splice(1));
      this.updateSelectedPitch(this.selectedPitch);
    };
  },

  watch: {
    playerId: function () {
      this.fetchData();
      this.updateURL();
    },
  },

  updated: function () {
    let numChildren = document.querySelector(".player-page");
    this.numChildren = numChildren.children.length;
  },

  mounted() {
    window.addEventListener("resize", () => {
      this.resetSelectedPitch();
    });
  },

  methods: {
    breakDownURL(pathArray) {
      //console.log("breakDownURL");
      pathArray.forEach((p, i) => {
        if (p === "playerId" || p === "selectedPitch") {
          this[pathArray[i]] = Number(pathArray[i + 1]);
        }
      });
    },

    resetSelectedPitch() {
      //console.log("resetSelectedPitch");
      this.selectedPitch = null;
      this.resetAllSelected();
      this.updateURL();
      this.updatetitle(this.playerInfo["fullName"], this.selectedPitch);
      document.querySelector(".pitch-list-container").scrollTop = 0;
    },

    resetAllSelected() {
      //console.log("resetAllSelected");
      let selected = document.querySelectorAll(".selected");
      if (selected.length) {
        selected.forEach((check) => {
          check.classList.remove("selected");
        });
      }

      selected = document.querySelectorAll(".pitch-list-container li");
      if (selected.length) {
        selected.forEach((check) => {
          check.classList.remove("selected");
        });
      }
    },

    // updateSortBy(reSort) {
    //   this.sortBy = reSort.target.value;
    // },

    updateURL() {
      //console.log("updateURL");
      history.pushState(
        "",
        "",
        `/playerId/${this.playerId}/selectedPitch/${this.selectedPitch}`
      );
    },

    updateSelectedPitch(num) {
      //console.log("updateSelectedPitch", num);
      this.selectedPitch = Number(num);
      if (this.selectedPitch >= 0) {
        let pitchPlotEl = document.querySelector(
          `.pitch-plot-container circle[index="${this.selectedPitch}"]`
        );
        let parentEl = document.querySelector("#pitch-plot-svg");
        this.resetAllSelected();
        const scrollToThis = document.querySelector(
          `#pitch-list-${this.selectedPitch}`
        );
        pitchPlotEl.classList.add("selected");
        parentEl.removeChild(pitchPlotEl);
        parentEl.appendChild(pitchPlotEl);
        this.scrollTo(scrollToThis);
        scrollToThis.classList.add("selected");
        this.updatetitle(this.playerInfo["fullName"], this.selectedPitch);
      }
    },

    scrollTo(scrollToThis) {
      let containerHeight =
        document.querySelector(".pitch-list-container").clientHeight / 2;
      let thisHeight = scrollToThis.clientHeight / 2;
      document.querySelector(".pitch-list-container").scrollTop =
        scrollToThis.offsetTop - (containerHeight - thisHeight);
    },

    async runFetch(url) {
      //console.log("runFetch");
      const data = await fetch(url)
        .then((r) => r.json())
        .catch((error) => {
          console.error("Oops, something bad happened:", error);
          document.querySelector(".logo").classList.add("error");
          document.querySelector(
            ".logo"
          ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 155 155"><path d="M77.5 0C34.7 0 0 34.7 0 77.5S34.7 155 77.5 155 155 120.3 155 77.5 120.3 0 77.5 0zm7.7 116.2H69.8v-15.5h15.5v15.5zm0-31H69.8V38.8h15.5v46.4z"/></svg><p>Oops, something bad happened.</p>`;
        });

      return { data };
    },

    updatetitle(player, pitch) {
      //console.log("updatetitle");
      document.title = `${player ? player + " ›" : ""} ${
        this.pitch ? "Pitch #" + this.pitches[pitch].pitchNum + " ›" : ""
      }  Pitcher Assessment`;
    },

    async fetchData() {
      //console.log("fetchData");
      const playerInfo = await this.runFetch(
        "https://cle-endpoints.consumedesign.com/api/players?playerId=" +
          this.playerId
      );
      if (playerInfo.data.playerDetail) {
        this.playerInfo = playerInfo.data.playerDetail;
      }

      const playerPitches = await this.runFetch(
        "https://cle-endpoints.consumedesign.com/api/pitches?playerId=" +
          this.playerId
      );

      if (playerPitches.data.pitches) {
        this.pitches = playerPitches.data.pitches.sort((a, b) =>
          a[this.sortBy] > b[this.sortBy] ? 1 : -1
        );

        const pitchMenu = {};
        this.pitches.forEach((p) => {
          pitchMenu[p.pitchName] = p.pitchType;
        });
        this.pitchMenu = pitchMenu;

        setTimeout(() => {
          if (
            this.selectedPitch >= 0 &&
            document.querySelector(
              `.pitch-plot-container circle[index="${this.selectedPitch}"]`
            )
          ) {
            this.updateSelectedPitch(this.selectedPitch);
          }

          document.querySelector("body").classList.remove("active");
          this.loading = false;
        }, 1000);
      }

      this.updatetitle(this.playerInfo["fullName"], this.selectedPitch);
    },

    updatePlayer(newPlayer) {
      //console.log("updatePlayer");
      this.loading = true;
      this.playerId = Number(newPlayer);
      document.cookie = `playerId=${Number(newPlayer)}`;
      document.querySelectorAll("circle").forEach((el) => {
        el.classList.add("active");
        el.setAttribute("r", 0.12);
      });

      this.selectedPitch = null;
      this.updateURL();
    },

    updatePitchMenu(pitchMenu) {
      //console.log("updatePitchMenu");
      this.pitchMenu = pitchMenu;
    },

    updateCookieOptions() {
      //console.log("updateCookieOptions");
      this.updateCookies();
    },

    updateCookies() {
      //console.log("updateCookies");
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
<style lang="scss">
@import "../styles/player.scss";
</style>
