<template>
  <div>
    <gmap-map :zoom="3" :center="center" style="width: 100%; height: 600px">
      <gmap-marker :position="center"></gmap-marker>
    </gmap-map>
    <h1>{{ center }}</h1>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    center: Object,
  },
};
</script>