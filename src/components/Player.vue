<template>
  <div class="player-page">
    <div v-if="loading" class="loading"></div>
    <div v-if="playerID">
      <PlayerBanner
        v-if="displayOptions.showPlayerBanner"
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
    };
  },
  props: {
    playerID: {
      type: Number,
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
      //console.log("watching");
      this.fetchData();
    },
  },
  mounted() {
    //  console.log("this.playerID", this.playerID);
    this.fetchData();
  },
  methods: {
    fetchData() {
      //console.log("fetchData", Number(this.playerID));

      let fetchURL =
        "https://cle-fe-challenge-services.vercel.app/api/players?playerId=" +
        this.playerID;
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          this.playerInfo = data.playerDetail;
          //console.log("playerDetail", data.playerDetail);
        });

      fetchURL =
        "https://cle-fe-challenge-services.vercel.app/api/pitches?playerId=" +
        this.playerID;
      fetch(fetchURL)
        .then((res) => res.json())
        .then((data) => {
          this.pitches = data.pitches;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
  },
};
</script>
<style lang="css" scoped>
@import "../scss/player.min.css";
</style>
