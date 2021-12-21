<template>
  <div class="player-banner">
    <div class="player-info">
      <div v-if="this.displayOptions.showBio || this.inMenu">
        <h2>Bio:</h2>
        <ul class="player-bio columns">
          <li>Age:</li>
          <li>{{ Math.round(playerInfo.ageDecimal) }}</li>
          <li>Pos:</li>
          <li>{{ playerInfo.position }}</li>
          <li>Throws:</li>
          <li>
            {{ playerInfo.throws === "R" ? "Right" : "Left" }}
          </li>
        </ul>
      </div>
      <div v-if="displayOptions.showContractInfo || this.inMenu">
        <h2>Contract Info:</h2>
        <ul class="player-contract-info player-bio columns">
          <li>Org:</li>
          <li>{{ playerInfo.orgAbbr }}</li>
          <li>Service Time:</li>
          <li>{{ Math.round(playerInfo.serviceTime) }} Years</li>
        </ul>
      </div>
    </div>
    <div class="player-img" v-if="displayOptions.showPhoto || this.inMenu">
      <img
        :src="`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/${playerInfo.imgId}/headshot/67/current`"
        :alt="playerInfo.fullName"
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

    inMenu: {
      type: Boolean,
    },

    displayOptions: {
      type: Object,
      default: function () {
        return {
          showPlayerInfo: true,
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
@import "../scss/player-info.min.css";
</style>
