<template>
  <div
    ref="container"
    class="pitch-plot-container"
    v-if="displayOptions.showPitches"
  >
    <svg
      style="display: block"
      :viewBox="
        coordSystem.minX +
        ' ' +
        coordSystem.minY +
        ' ' +
        coordSystem.width +
        ' ' +
        coordSystem.height
      "
      preserveAspectRatio="xMidYMid meet"
      ref="svg"
      id="pitch-plot-svg"
    >
      <rect
        :x="strikezoneCoords.x"
        :y="scaleY(strikezoneCoords.y)"
        :width="strikezoneCoords.width"
        :height="strikezoneCoords.height"
        stroke="#000000"
        :stroke-width="0.02"
        fill-opacity="0"
      ></rect>
      <circle
        v-for="(p, i) in pitches"
        :key="'pitch-' + i"
        :ref="'pitch-' + i"
        :id="'pitch-' + i"
        :cx="p.x"
        :cy="scaleY(p.y)"
        :r="1.5 / 12"
        :fill="whatColor(p.pitchType)"
        :class="[
          'pitch-plot active',
          p.pitchType.toLowerCase(),
          {
            visible: p.isVisible,
          },
          { selected: p.isSelected },
        ]"
        :index="i"
        :pitchNum="p.pitchNum"
        :fill-opacity="p.isSelected ? 1 : p.fillOpacity"
        v-on:click="pitchSelect"
      />
    </svg>
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
      if (el.target.classList.contains("active")) {
        this.$emit("changeSelectedPitch", el);
      }
    },

    consoleOutput(el) {
      console.log(el);
    },
  },
};
</script>

<style lang="scss">
@import "../styles/pitch-plot.scss";
</style>
