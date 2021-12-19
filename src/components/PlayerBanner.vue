<template>
  <div class="player-banner">
    <h1>{{ playerInfo.fullName }}</h1>
    <div class="player-hero" v-if="displayOptions.showPlayerBanner">
      <div class="player-info">
        <div v-if="displayOptions.showBio">
          <h2>Bio:</h2>
          <ul class="player-bio columns">
            <li>Age:</li>
            <li>{{ Math.round(playerInfo.ageDecimal) }}</li>
            <li>Position:</li>
            <li>{{ playerInfo.position }}</li>
            <li>Throws:</li>
            <li>
              {{ playerInfo.throws === "R" ? "Right" : "Left" }}
            </li>
          </ul>
        </div>
        <div v-if="displayOptions.showContractInfo">
          <h2>Contract Info:</h2>
          <ul class="player-contract-info player-bio columns">
            <li>Org:</li>
            <li>{{ playerInfo.orgAbbr }}</li>
            <li>Service Time:</li>
            <li>{{ Math.round(playerInfo.serviceTime) }} Years</li>
          </ul>
        </div>
      </div>
      <img
        :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${playerInfo.imgId}/headshot/67/current`"
        :alt="playerInfo.fullName"
        v-if="displayOptions.showPhoto"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerInfo: {
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
};
</script>

<style scoped>
@import "../scss/player-banner.min.css";
</style>
