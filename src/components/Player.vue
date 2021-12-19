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
        :displayOptions="displayOptions"
        v-if="pitches"
        :pitches="pitches"
      />
    </div>
  </div>
</template>
<script>
import PlayerBanner from "./PlayerBanner.vue";
import PitchPlot from "./Pitches.vue";

export default {
  components: {
    PlayerBanner,
    PitchPlot,
  },

  data() {
    return {
      loading: true,
      playerInfo: {},
      pitches: null,
      pitchButtons: {},
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
          this.pitches = data.pitches;

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
