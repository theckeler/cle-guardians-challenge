<template>
  <div ref="container" class="pitch-plot-container">
    <div class="pitch-plot">
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
        :style="{ 'background-color': backgroundColor }"
        ref="svg"
        @mouseup="mouseupFunc($event)"
        @mousedown="mousedownFunc($event)"
        @mousemove="mousemoveFunc($event)"
      >
        <template v-for="(p, i) in pitches">
          <!-- <circle
            :load="console.log(p)"
            :key="'pitch-' + i"
            v-show="p.isVisible && !p.hidden"
            :class="[
            p.pitchType,
              p.classList,
              { visible: p.isVisible },
              { selected: p.isSelected },
            ]"
            :cx="p.x"
            :cy="scaleY(p.y)"
            :r="p.radius"
            :fill="p.fill"
            :fill-opacity="p.isSelected ? 1 : p.fillOpacity"
            :stroke="p.isSelected ? p.selectedStroke : p.stroke"
            :stroke-opacity="
              p.isSelected ? p.selectedStrokeOpacity : p.strokeOpacity
            "
            :stroke-width="p.isSelected ? p.selectedStrokeWidth : p.strokeWidth"
          /> -->
          <circle
            :key="'pitch-' + i"
            :cx="p.x"
            :cy="scaleY(p.y)"
            :r="1.5 / 12"
            :fill="whatColor(p.pitchType)"
            :pitchType="p.pitchType"
            :class="[
              p.pitchType,
              p.classList,
              {
                visible: p.isVisible,
              },
              { selected: p.isSelected },
            ]"
            :fill-opacity="p.isSelected ? 1 : p.fillOpacity"
            :stroke-width="p.isSelected ? p.selectedStrokeWidth : p.strokeWidth"
          />
        </template>
        <rect
          :x="strikezoneCoords.x"
          :y="scaleY(strikezoneCoords.y)"
          :width="strikezoneCoords.width"
          :height="strikezoneCoords.height"
          stroke="#000000"
          :stroke-width="0.02"
          fill-opacity="0"
        ></rect>

        <rect
          :x="lassoCoords.x"
          :y="lassoCoords.y"
          :width="lassoCoords.width"
          :height="lassoCoords.height"
          stroke="#000000"
          :stroke-width="0.04"
          fill-opacity="0"
        ></rect>
      </svg>
    </div>
  </div>
</template>

<script>
/*

Example pitches 
// [
// 		{
//			x: 0, -- REQUIRED - center of ball - in feet
//			y: 2.17, -- REQUIRED -center of ball - in feet
// 			stroke: 'black',-- REQUIRED - outline color
// 			strokeWidth: .01, -- REQUIRED - outline width - in feet
// 			strokeOpacity: 1, -- REQUIRED - outline opacity
// 			selectedStroke: 'gold', -- OPTIONAL - selected outline color
// 			selectedStrokeWidth: 2,	-- OPTIONAL - selected stroke width - in feet
// 			fillOpacity: 1,	-- REQUIRED - fill opacity
// 			fill: 'blue', -- REQUIRED - fill color
// 			radius: 1.5/12, -- REQUIRED - in feet
// 			isSelected: false, -- OPTIONAL
//			isSelectable: true, -- OPTIONAL (if falsy, balls cannot be selected)
// 			isVisible: true, -- REQUIRED
// 		},
// ]

 */
import { selectableMixin } from "../../utility/selectable";

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
      //console.log("pitchType", pitchType);
      switch (pitchType) {
        case "SN":
          return "red";
        case "CH":
          return "yellow";
        case "CT":
          return "blue";
        case "SL":
          return "orange";
        case "FB":
          return "green";
        case "CB":
          return "pink";

        default:
          return "black";
      }
    },
    consoleLogMe(whatToLog) {
      console.log(whatToLog);
    },
  },
};
</script>

<style scoped lang="css">
@import "../../scss/pitch-plot.min.css";
</style>
