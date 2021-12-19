<template>
  <header>
    <nav class="menu">
      <button
        v-on:click="openMenu('mainMenu')"
        v-on:keyup.enter="openMenu('mainMenu')"
        v-bind:class="{ active: mainMenuActive }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <button
        v-on:click="openMenu('playerMenu')"
        v-on:keyup.enter="openMenu('playerMenu')"
        v-bind:class="{ active: playerMenuActive }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"
          />
        </svg>
      </button>
    </nav>

    <nav
      class="main players"
      v-if="players"
      v-bind:class="{ active: playerMenuActive }"
    >
      <ul class="menu players">
        <li
          v-for="p in players"
          :key="p.playerId"
          v-bind:class="[p.playerId === playerID ? 'active' : '']"
        >
          <button
            v-on:click="changePlayer"
            v-on:keyup.enter="changePlayer"
            :value="p.playerId"
          >
            {{ p.fullName }}
          </button>
        </li>
      </ul>
    </nav>

    <nav class="main options" v-bind:class="{ active: mainMenuActive }">
      <ul class="menu">
        <li>
          <input
            type="checkbox"
            id="showPlayerBanner"
            name="changeOptions"
            v-on:click="changeCookieOptions"
            v-on:keyup.enter="changeCookieOptions"
            :checked="displayOptions.showPlayerBanner"
          />
          <label for="showPlayerBanner">Player Panel</label>
          <ul>
            <li>
              <input
                type="checkbox"
                id="showPhoto"
                name="changeOptions"
                v-on:click="changeCookieOptions"
                v-on:keyup.enter="changeCookieOptions"
                :checked="displayOptions.showPhoto"
              />
              <label for="showPhoto">Player Photo</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="showBio"
                name="changeOptions"
                v-on:click="changeCookieOptions"
                v-on:keyup.enter="changeCookieOptions"
                :checked="displayOptions.showBio"
              />
              <label for="showBio">Player Bio</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="showContractInfo"
                name="changeOptions"
                v-on:click="changeCookieOptions"
                v-on:keyup.enter="changeCookieOptions"
                :checked="displayOptions.showContractInfo"
              />
              <label for="showContractInfo">Player Contract Info</label>
            </li>
          </ul>
        </li>
        <li>
          <input
            type="checkbox"
            id="showPitches"
            name="changeOptions"
            v-on:click="changeCookieOptions"
            v-on:keyup.enter="changeCookieOptions"
            :checked="displayOptions.showPitches"
          />
          <label for="showPitches">Player Pitches</label>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mainMenuActive: false,
      playerMenuActive: false,
      players: {},
    };
  },

  props: {
    playerID: {
      type: Number,
    },
    displayOptions: {
      type: Object,
    },
  },

  methods: {
    openMenu(whatMenu) {
      if (this[whatMenu + "Active"] === true) {
        this[whatMenu + "Active"] = false;
        document.querySelector("body").classList.remove("active");
      } else {
        this[whatMenu + "Active"] = true;
        document.querySelector("body").classList.add("active");
      }
    },

    // playerMenu() {
    //   if (this.playerMenuActive === true) {
    //     this.playerMenuActive = false;
    //     document.querySelector("body").classList.remove("active");
    //   } else {
    //     this.playerMenuActive = true;
    //     document.querySelector("body").classList.add("active");
    //   }
    // },

    // mainMenu() {
    //   if (this.mainMenuActive === true) {
    //     this.mainMenuActive = false;
    //     document.querySelector("body").classList.remove("active");
    //   } else {
    //     this.mainMenuActive = true;
    //     document.querySelector("body").classList.add("active");
    //   }
    // },

    changePlayer(el) {
      this.$emit("changePlayer", Number(el.target.value));
      this.playerMenuActive = false;
      document.querySelector("body").classList.remove("active");
    },

    changeCookieOptions(el) {
      const options = this.selectDeselectAll(el);
      let cookie = {};

      options.forEach((option) => {
        cookie[option.id] = option.checked;
      });
      document.cookie = `displayOptions=${JSON.stringify(cookie)}`;
      this.$emit("changeCookieOptions");
    },

    selectDeselectAll(el) {
      if (el.target.parentElement.childNodes[2]) {
        const childrenNodes =
          el.target.parentElement.childNodes[2].querySelectorAll("input");

        childrenNodes.forEach((child) => {
          child.checked = el.target.checked;
        });
      }
      const options = document.querySelectorAll("input[name='changeOptions']");
      return options;
    },
  },

  mounted() {
    let fetchURL = "https://cle-fe-challenge-services.vercel.app/api/players";
    fetch(fetchURL)
      .then((res) => res.json())
      .then((data) => {
        this.players = data.players;
      });
  },
};
</script>

<style scoped>
@import "../scss/menu.min.css";
</style>
