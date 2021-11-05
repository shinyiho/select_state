<template>
  <div class="inputSelect">
    <input
      v-on:click="setOpenChoicesList"
      v-on:keydown="handleEnter"
      v-model="input"
      placeholder="select state"
    />
    <ul
      v-if="openChoicesList && filteredState.length !== 0"
      class="choicesList"
    >
      <div :key="state.name" v-for="state in filteredState">
        <li v-on:click="getCenter">{{ state }}</li>
      </div>
    </ul>
    <Map :center="center" />
  </div>
</template>

<script>
import Map from "./Map.vue";
export default {
  name: "StateInput",
  components: { Map },
  data() {
    return {
      openChoicesList: false,
      input: "",
      center: { lat: 10, lng: 20 },
      filteredState: [],
    };
  },
  methods: {
    handleEnter: function (e) {
      if (e.key === "Enter") this.getCenter(e);
    },
    getCenter: function (e) {
      const input = e.target.innerHTML || e.target.value;
      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query GetCenter($input: String) {
          centers(query: $input) {
            lat
            lng
          }
        }`,
          variables: { input },
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          this.center = res.data.centers;
          this.input = input;
        });
    },
    setOpenChoicesList: function () {
      this.openChoicesList = true;
    },
  },
  watch: {
    input: function () {
      const input = this.input;
      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query GetStates($input: String) {
          states(query: $input)
        }`,
          variables: { input },
        }),
      })
        .then((r) => r.json())
        .then((res) => {
          this.filteredState = res.data.states;
        });
    },
  },
};
</script>

<style scoped>
*:focus {
  outline: none;
}
li {
  list-style-type: none;
}

.choicesList {
  position: absolute;
  background-color: white;
  z-index: 10;
  width: 150px;
  height: auto;
  max-height: 300px;
  border: solid 1px;
  overflow: scroll;
  padding-inline-start: 0px;
  margin: 0;
  border-radius: 3px;
}

.inputSelect {
  width: 100%;
  margin-bottom: 50px;
}

input {
  display: flex;
  justify-self: left;
  width: 300px;
}

li:hover {
  background-color: pink;
}
</style>
