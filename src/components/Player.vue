<template>
  <div class="player-page">
    <div v-if="loading" class="loading"></div>
    <div v-if="playerID">
      <PlayerBanner v-if="playerInfo" :playerInfo="playerInfo" />
      <Panel v-if="pitches" title="All Pitches">
        <PitchPlot :pitches="pitches" />
      </Panel>
    </div>
  </div>
</template>
<script>
import PlayerBanner from "./PlayerBanner.vue";
import Panel from "./layout/Panel.vue";
import PitchPlot from "./plots/PitchPlot.vue";

export default {
  components: {
    PlayerBanner,
    Panel,
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
  },
  mounted() {
    //  console.log("this.playerID", this.playerID);

    let fetchURL =
      "https://cle-fe-challenge-services.vercel.app/api/players?playerId=" +
      this.playerID;
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        this.playerInfo = data.playerDetail;
        //console.log(data.playerDetail);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });

    fetchURL =
      "https://cle-fe-challenge-services.vercel.app/api/pitches?playerId=" +
      this.playerID;
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        this.pitches = data.pitches;
        //console.log("data", data);
        // console.log("this.pitches", this.pitches);
      });
  },
};
</script>
<style lang="css" scoped>
@import "../scss/player.min.css";
</style>
