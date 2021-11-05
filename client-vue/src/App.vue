<template>
  <div id="app">
    <HelloWorld msg="Select state vue version" />
    <Input />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Input from "./components/Input.vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    Input,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 50%;
  margin: auto;
}
</style>
