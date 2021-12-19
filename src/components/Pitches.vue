<template>
  <div
    ref="container"
    class="pitch-plot-container"
    v-if="displayOptions.showPitches"
  >
    <div class="pitch-plot">
      <!-- <svg
        @mouseup="mouseupFunc($event)"
        @mousedown="mousedownFunc($event)"
        @mousemove="mousemoveFunc($event)"
      > -->
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
        <template v-for="(p, i) in pitches">
          <!-- <circle
            :load="consoleOutput(p)"
          /> -->
          <circle
            :key="'pitch-' + i"
            :cx="p.x"
            :cy="scaleY(p.y)"
            :r="1.5 / 12"
            :fill="whatColor(p.pitchType)"
            :class="[
              p.pitchType.toLowerCase(),
              'active',
              {
                visible: p.isVisible,
              },
              { selected: p.isSelected },
            ]"
            :id="'pitch-' + i"
            :index="i"
            :pitchNum="p.pitchNum"
            :fill-opacity="p.isSelected ? 1 : p.fillOpacity"
            :stroke-width="p.isSelected ? p.selectedStrokeWidth : p.strokeWidth"
            v-on:click="pitchSelect"
          />
        </template>
      </svg>
    </div>

    <div class="pitch-info" v-if="selectedPitch">
      <ul class="columns two">
        <li>batApproachGroup</li>
        <li>{{ selectedPitch.batApproachGroup }}</li>
        <li>batterName</li>
        <li>{{ selectedPitch.batterName }}</li>
        <li>cut</li>
        <li>{{ selectedPitch.cut }}</li>
        <li>gameDate</li>
        <li>{{ selectedPitch.gameDate }}</li>
        <li>inStrikeZone</li>
        <li>{{ selectedPitch.inStrikeZone }}</li>
        <li>miss</li>
        <li>{{ selectedPitch.miss }}</li>
        <li>pitchName</li>
        <li>{{ selectedPitch.pitchName }}</li>
        <li>result</li>
        <li>{{ selectedPitch.result }}</li>
        <li>rise</li>
        <li>{{ selectedPitch.rise }}</li>
        <li>strikes</li>
        <li>{{ selectedPitch.strikes }}</li>
        <li>swing</li>
        <li>{{ selectedPitch.swing }}</li>
      </ul>
    </div>

    <nav class="pi">
      <form v-on:submit.prevent>
        <ul>
          <li class="sn">
            <input
              type="checkbox"
              id="sn"
              name="sn"
              v-on:click="onClickButton"
              v-on:keyup.enter="onClickButton"
              checked
            />
            <label for="sn">SN</label>
          </li>
          <li class="ch">
            <input
              type="checkbox"
              id="ch"
              name="ch"
              v-on:click="onClickButton"
              v-on:keyup.enter="onClickButton"
              checked
            />
            <label for="ch">CH</label>
          </li>
          <li class="ct">
            <input
              type="checkbox"
              id="ct"
              name="ct"
              v-on:click="onClickButton"
              v-on:keyup.enter="onClickButton"
              checked
            />
            <label for="ct">CT</label>
          </li>
          <li class="sl">
            <input
              type="checkbox"
              id="sl"
              name="sl"
              v-on:click="onClickButton"
              v-on:keyup.enter="onClickButton"
              checked
            />
            <label for="sl">SL</label>
          </li>
          <li class="fb">
            <input
              type="checkbox"
              id="fb"
              name="fb"
              v-on:click="onClickButton"
              v-on:keyup.enter="onClickButton"
              checked
            />
            <label for="fb">FB</label>
          </li>
          <li class="cb">
            <input
              type="checkbox"
              id="cb"
              name="cb"
              v-on:click="onClickButton"
              v-on:keyup.enter="onClickButton"
              checked
            />
            <label for="cb">CB</label>
          </li>
        </ul>
      </form>
    </nav>
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
      selectedPitch: null,
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
    onClickButton(e) {
      if (e.target.checked) {
        document.querySelectorAll("." + e.target.name).forEach((el) => {
          el.classList.add("active");
        });
      } else {
        document.querySelectorAll("." + e.target.name).forEach((el) => {
          el.classList.remove("active");
        });
      }
    },
    pitchSelect(el) {
      //console.log(this.pitches[el.target.attributes.index.value]);
      console.log(el.target.attributes.index.value);
      this.selectedPitch = this.pitches[el.target.attributes.index.value];
      // console.log(this.pitches[el.target.attributes.index.value]);
    },
    consoleOutput(el) {
      console.log(el);
    },
  },
};
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
</script>

<style scoped lang="css">
@import "../scss/pitches.min.css";
</style>
