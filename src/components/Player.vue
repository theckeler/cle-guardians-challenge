<template>
  <div class="player-page">
    <div v-if="loading" class="loading"></div>
    <div class="player-container" v-if="playerID">
      <PlayerBanner
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
        :pitches="pitches"
        @changeSelectedPitch="updateSelectedPitch"
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

  mounted() {
    this.fetchData();
  },

  methods: {
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
            a.pitchNum > b.pitchNum ? 1 : -1
          );

          const pitchMenu = {};
          this.pitches.forEach((p) => {
            pitchMenu[p.pitchName] = p.pitchType;
          });
          this.$emit("changePitchMenu", pitchMenu);

          setTimeout(() => {
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
