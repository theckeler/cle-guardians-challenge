<template>
  <div class="player-banner">
    <!-- https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/{imgid}/headshot/67/current -->

    <div class="player-hero">
      <h1 class="player-name">{{ playerInfo.fullName }}</h1>
      <img
        src="https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_426,q_auto:best/v1/people/615698/headshot/67/current"
        :alt="playerInfo.fullName"
      />
    </div>

    <div class="player-info">
      <h2>Bio:</h2>
      <ul class="player-bio">
        <li>Age:</li>
        <li>{{ Math.round(playerInfo.ageDecimal) }}</li>
        <li>Position:</li>
        <li>{{ playerInfo.position }}</li>
        <li>Throws:</li>
        <li>
          {{ playerInfo.throws === "R" ? "Right" : "Left" }}
        </li>
      </ul>
      <h2>Contract Info:</h2>
      <ul class="player-contract-info">
        <li>Org:</li>
        <li>{{ playerInfo.orgAbbr }}</li>
        <li>Service Time:</li>
        <li>{{ Math.round(playerInfo.serviceTime) }} Years</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playerInfo: {
      type: Object,
      default: null,
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import "../scss/player-banner.min.css";
</style>
