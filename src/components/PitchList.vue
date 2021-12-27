<template>
  <div
    ref="container"
    class="pitch-list-container"
    v-if="displayOptions.showPitches"
  >
    <!-- <div class="sort-by">
      <select @change="changeSortBy">
        <option value="gameDate">Game Date</option>
        <option value="gameId">Game ID</option>
        <option value="pitchNum">Pitch Nums</option>
        <option value="pitchType">Pitch Type</option>
        <option value="batterId">Batter</option>
        <option value="result">Result</option>
      </select>
    </div> -->
    <ul>
      <li
        v-for="(p, i) in pitches"
        :key="'pitch-' + i"
        :id="'pitch-list-' + i"
        :class="'pitch-list active ' + p.pitchType.toLowerCase()"
      >
        <ul class="columns two">
          <li>Game Date:</li>
          <li>{{ new Date(p.gameDate).toDateString() }}</li>
          <li class="test">pitch #:</li>
          <li>{{ p.pitchNum }}</li>
          <li>Pitch:</li>
          <li>{{ p.pitchName }}</li>
          <li>Batter:</li>
          <li>{{ p.batterName }}</li>
          <li>Bat Approach:</li>
          <li>{{ p.batApproachGroup }}</li>
          <li>Cut:</li>
          <li>{{ p.cut }}</li>
          <li>Rise:</li>
          <li>{{ p.rise }}</li>
        </ul>

        <ul>
          <li>
            {{
              pitchResult(p.balls, p.strikes, p.swing, p.miss, p.inStrikeZone)
            }}
          </li>
        </ul>

        <button :index="i" v-on:click="pitchSelect">Select</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pitches: {
      type: Array,
      default: () => [],
    },

    selectedPitch: {
      type: Number,
      default: null,
    },

    displayOptions: {
      type: Object,
      default: function () {
        return {
          showPitches: true,
        };
      },
    },
  },

  data() {
    const min = 4 / 12;
    const max = 56 / 12;
    const coordSystem = {
      minX: 0 - (max - min) / 2,
      maxX: 0 + (max - min) / 2,
      minY: min,
      maxY: max,
      width: max - min,
      height: max - min,
    };

    return {
      height: null,
      svg: null,
      coordSystem,
      strikezoneCoords: {
        x: -8.5 / 12,
        y: 40 / 12,
        width: 17 / 12,
        height: 20 / 12,
      },
    };
  },

  computed: {
    selectableItems() {
      return this.pitches.filter((p) => p.isSelectable);
    },
  },

  methods: {
    changeSortBy(sortBy) {
      this.$emit("changeSortBy", sortBy);
    },

    scaleY(v) {
      return this.coordSystem.maxY - v + this.coordSystem.minY;
    },

    pitchResult(balls, strikes, swing, miss, inStrikeZone) {
      return `The pitch was a ${balls ? "ball" : ""} ${
        strikes ? "strike" : ""
      }${inStrikeZone ? " in the strike zone" : ""}${
        swing ? ", the batter swings" : ""
      } ${miss ? "and missed" : ""}`;
    },

    whatColor(pitchType) {
      switch (pitchType) {
        case "SN":
          return "#FF7F0E";
        case "CH":
          return "#1F77B4";
        case "CT":
          return "#8C564B";
        case "SL":
          return "#E377C2";
        case "FB":
          return "#D62728";
        case "CB":
          return "#9467BD";
        default:
          return "black";
      }
    },

    pitchSelect(el) {
      this.$emit("changeSelectedPitch", el);
    },

    consoleOutput(el) {
      console.log(el);
    },
  },
};
</script>

<style scoped lang="css">
@import "../scss/pitch-list.min.css";
</style>
