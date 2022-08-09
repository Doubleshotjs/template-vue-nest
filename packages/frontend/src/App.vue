<script setup lang="ts">
import Paint from './components/Paint.vue'

if (window.isElectron) {
  const { useZoomFactor } = window.electron
  const { update: updateZoomFactor } = useZoomFactor()

  setTimeout(() => {
    updateZoomFactor()
  }, 200);

  window.addEventListener('resize', () => {
    updateZoomFactor()
  })
}
</script>

<template>
  <Paint />
</template>

<style>
@import url('https://fonts.font.im/css?family=Dosis:700,600');

body {
  margin: 0;
}

#app {
  font-family: Dosis, Avenir, Helvetica, Arial, sans-serif;
  background-color: rgb(242, 244, 246);
  background-size: cover;
  background-position: center center;
  width: 100vw;
  height: 100vh;
}
</style>
