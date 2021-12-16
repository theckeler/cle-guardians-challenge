<template>
  <section class="panel">
    <!-- <h2>All Pitches</h2> -->
    <form v-on:submit.prevent>
      <button
        class="all"
        id="all"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        All
      </button>
      <button
        class="sn"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        SN
      </button>
      <button
        class="ch"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        CH
      </button>
      <button
        class="ct"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        CT
      </button>
      <button
        class="sl"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        SL
      </button>
      <button
        class="fb"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        FB
      </button>
      <button
        class="cb"
        v-on:click="onClickButton"
        v-on:keyup.enter="onClickButton"
      >
        CB
      </button>
    </form>
    <div class="panel-content">
      <slot name="top-content"></slot>
      <slot></slot>
      <slot name="bottom-content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      default: "Panel Title",
      type: String,
    },
    titleBackgroundColor: {
      default: null,
      type: String,
    },
    titleTextColor: {
      default: "white",
      type: String,
    },
  },
  //data() {},
  methods: {
    onClickButton: function (e) {
      // e.preventDefault();
      console.log(e);
      console.log(e.target);
    },
  },
};
</script>

<style scoped lang="css">
@import "../../scss/panel.min.css";
</style>
