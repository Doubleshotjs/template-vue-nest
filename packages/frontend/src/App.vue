<script setup lang="ts">
import Paint from './components/Paint.vue'

if (window.isElectron) {
  // Zoom Factor
  const { getDeviceScaleFactor, setZoomFactor } = window.electron // injected by preload
  const DESIGN_HEIGHT = 1080
  const DESIGN_DPR = 1
  const DESIGN_SCALE_FACTOR = 1
  let scaleFactor = 0
  const updateZoomFactor = async () => {
    const height = window.innerHeight
    const dpr = window.devicePixelRatio
    if (scaleFactor === 0) scaleFactor = (await getDeviceScaleFactor()).data

    const factor = (height / DESIGN_HEIGHT) * (dpr / DESIGN_DPR) * (DESIGN_SCALE_FACTOR / scaleFactor)
    setZoomFactor(factor)
  }

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
