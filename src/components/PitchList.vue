<template>
  <div
    ref="container"
    class="pitch-list-container"
    v-if="displayOptions.showPitches"
  >
    <div class="sort-by">
      <select @change="changeSortBy">
        <option>Pitcher ID</option>
        <option>Game Date</option>
        <option>Game ID</option>
        <option>Pitch Nums</option>
        <option>Pitch Type</option>
        <option>Batter</option>
        <option>Result</option>
      </select>
    </div>
    <ul>
      <li
        v-for="(p, i) in pitches"
        :key="'pitch-' + i"
        :id="'pitch-list-' + i"
        :class="'pitch-list active ' + p.pitchType.toLowerCase()"
      >
        <ul class="columns two">
          <li class="test">pitch #:</li>
          <li>{{ p.pitchNum }}</li>
          <li>gameDate</li>
          <li>{{ p.gameDate }}</li>
          <li>pitchName</li>
          <li>{{ p.pitchName }}</li>
          <li>batApproachGroup</li>
          <li>{{ p.batApproachGroup }}</li>
          <li>cut</li>
          <li>{{ p.cut }}</li>
          <li>rise</li>
          <li>{{ p.rise }}</li>
          <li>balls</li>
          <li>{{ p.balls }}</li>
          <li>strikes:</li>
          <li>{{ p.strikes }}</li>
          <li>swing</li>
          <li>{{ p.swing }}</li>
          <li>miss:</li>
          <li>{{ p.miss }}</li>
          <li>inStrikeZone:</li>
          <li>{{ p.inStrikeZone }}</li>
          <li>batterName:</li>
          <li>{{ p.batterName }}</li>
          <li>result:</li>
          <li>{{ p.result }}</li>
        </ul>
        <button :index="i" v-on:click="pitchSelect">Select</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { selectableMixin } from "../utility/selectable";

export default {
  mixins: [selectableMixin],
  props: {
    backgroundColor: {
      default: "#DFDFDF",
      type: String,
    },

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
    // const allActive = "active";
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
      //selectedPitch: null,
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
    changeSortBy() {
      console.log("changeSortBy");
      this.$emit("changeSortBy");
    },

    scaleY(v) {
      return this.coordSystem.maxY - v + this.coordSystem.minY;
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
