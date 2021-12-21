<template>
  <div class="player-page">
    <h1>{{ playerInfo.fullName }}</h1>
    
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
    
    <div
      :class="`player-container children-${this.numChildren}`"
      v-if="playerID"
    >
      <PlayerBanner
        v-if="displayOptions.showPlayerBanner"
        :playerInfo="playerInfo"
        :displayOptions="displayOptions"
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
import PlayerBanner from "./PlayerBanner.vue";
import PitchPlot from "./Pitches.vue";
import PitchList from "./PitchList.vue";

export default {
  components: {
    PlayerBanner,
    PitchPlot,
    PitchList,
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
    };
  },

  props: {
    playerID: {
      type: Number,
    },

    pitchMenu: {
      type: Object,
    },

    displayOptions: {
      type: Object,
      default: function () {
        return {
          showPlayerBanner: true,
          showPhoto: true,
          showBio: true,
          showContractInfo: true,
          showPitches: true,
        };
      },
    },
  },

  watch: {
    playerID: function () {
      this.fetchData();
    },
  },

  updated: function () {
    let numChildren = document.querySelector(".player-container");
    //console.log(numChildren.children.length);
    // numChildren.classList.add("num");
    this.numChildren = numChildren.children.length;
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    updateSortBy(reSort) {
      //console.log("updateSortBy", reSort.target.value);
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
      scrollToThis.scrollIntoView();
      scrollToThis.classList.add("selected");
    },

    fetchData() {
      let fetchURL =
        "https://cle-fe-challenge-services.vercel.app/api/players?playerId=" +
        this.playerID;
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          this.playerInfo = data.playerDetail;
        });

      fetchURL =
        "https://cle-fe-challenge-services.vercel.app/api/pitches?playerId=" +
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
          this.$emit("changePitchMenu", pitchMenu);

          setTimeout(() => {
            document.querySelector("body").classList.remove("active");
            this.loading = false;
          }, 1000);
        });
    },
  },
};
</script>
<style lang="css" scoped>
@import "../scss/player.min.css";
</style>
