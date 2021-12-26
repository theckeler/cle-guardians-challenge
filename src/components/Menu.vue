<template>
  <header>
    <nav class="menu icons">
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xml:space="preserve"
          viewBox="0 0 144 204"
        >
          <path
            fill="#003263"
            d="M110.5 72.4H144V0h-33.5v7.9l-8-7.9H34.1L0 34v136l34 34h76l33.7-33.7v-38.9h-33.2v24.7l-14.1 14H48.9L34 155.3V48l14.5-14.4h48l14.1 14.1z"
          />
        </svg>
      </div>

      <div class="buttons">
        <h1>{{ playerInfo.fullName }}</h1>
        <button
          v-if="playerID"
          v-on:click="openMenu('mainMenu')"
          v-on:keyup.enter="openMenu('mainMenu')"
          class="main-button"
          :class="mainMenuActive ? 'active' : ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        <button
          v-on:click="openMenu('infoMenu')"
          v-on:keyup.enter="openMenu('infoMenu')"
          class="info-button"
          :class="infoMenuActive ? 'active' : ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"
            />
          </svg>
        </button>

        <button
          v-if="pitchMenu"
          v-on:click="openMenu('pitchMenu')"
          v-on:keyup.enter="openMenu('pitchMenu')"
          class="pitch-button"
          :class="pitchMenuActive ? 'active' : ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM5.61 16.78C4.6 15.45 4 13.8 4 12s.6-3.45 1.61-4.78a5.975 5.975 0 0 1 0 9.56zM12 20c-1.89 0-3.63-.66-5-1.76 1.83-1.47 3-3.71 3-6.24S8.83 7.23 7 5.76C8.37 4.66 10.11 4 12 4s3.63.66 5 1.76c-1.83 1.47-3 3.71-3 6.24s1.17 4.77 3 6.24A7.963 7.963 0 0 1 12 20zm6.39-3.22a5.975 5.975 0 0 1 0-9.56C19.4 8.55 20 10.2 20 12s-.6 3.45-1.61 4.78z"
            />
          </svg>
        </button>

        <button
          v-if="playerID"
          v-on:click="openMenu('playerMenu')"
          v-on:keyup.enter="openMenu('playerMenu')"
          class="player-button"
          :class="playerMenuActive ? 'active' : ''"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"
            />
          </svg>
        </button>
      </div>
    </nav>

    <nav
      class="main pitches"
      v-if="pitchMenu"
      v-bind:class="{ active: pitchMenuActive }"
    >
      <ul class="menu pitches">
        <li v-for="(pitchShort, pitchName) in pitchMenu" :key="pitchShort">
          <input
            type="checkbox"
            :id="pitchShort"
            :name="pitchShort.toLowerCase()"
            v-on:click="changePitchOptions"
            v-on:keyup.enter="changePitchOptions"
            checked
          />
          <label :for="pitchShort">{{ pitchName }}</label>
        </li>
      </ul>
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
            id="showPlayerInfo"
            name="changeOptions"
            v-on:click="changeCookieOptions"
            v-on:keyup.enter="changeCookieOptions"
            :checked="displayOptions.showPlayerInfo"
          />
          <label for="showPlayerInfo">Player Panel</label>
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
        <!-- <li>
          <input
            type="checkbox"
            id="showPitches"
            name="changeOptions"
            v-on:click="changeCookieOptions"
            v-on:keyup.enter="changeCookieOptions"
            :checked="displayOptions.showPitches"
          />
          <label for="showPitches">Player Pitches</label>
        </li> -->
      </ul>
    </nav>

    <nav class="main info" v-bind:class="{ active: infoMenuActive }">
      <PlayerInfo
        :playerInfo="playerInfo"
        :displayOptions="displayOptions"
        :inMenu="true"
        class=""
      />
    </nav>

    <div class="loading" v-on:click="closeMenus"></div>
  </header>
</template>

<script>
import PlayerInfo from "./PlayerInfo.vue";

export default {
  components: {
    PlayerInfo,
  },

  data() {
    return {
      mainMenuActive: false,
      playerMenuActive: false,
      pitchMenuActive: false,
      infoMenuActive: false,
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
    pitchMenu: {
      type: Object,
    },
    playerInfo: {
      type: Object,
    },
  },

  methods: {
    changePitchOptions(e) {
      let selected = document.querySelectorAll(".selected");
      if (selected.length) {
        selected.forEach((check) => {
          check.classList.remove("selected");
        });
      }

      if (e.target.checked) {
        document.querySelectorAll("." + e.target.name).forEach((el) => {
          el.classList.add("active");
          el.setAttribute("r", 0.12);
        });
      } else {
        document.querySelectorAll("." + e.target.name).forEach((el) => {
          el.classList.remove("active");
          el.setAttribute("r", 0);
        });
      }
    },

    openMenu(whatMenu) {
      if (this[whatMenu + "Active"] === true) {
        this.closeMenus();
      } else {
        this.closeMenus();

        this[whatMenu + "Active"] = true;
        document.querySelector("body").classList.add("active");
        document.querySelector("header .loading").classList.add("active");
      }
    },

    closeMenus() {
      this.mainMenuActive = false;
      this.playerMenuActive = false;
      this.pitchMenuActive = false;
      this.infoMenuActive = false;
      document.querySelector("body").classList.remove("active");
      document.querySelector("header .loading").classList.remove("active");
    },

    changePlayer(el) {
      this.$emit("changePlayer", Number(el.target.value));
      document
        .querySelectorAll(".menu.pitches input[type=checkbox]")
        .forEach((el) => (el.checked = true));
      document.querySelector(".pitch-list-container").scrollTop = 0;

      this.closeMenus();
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
