<script setup lang="ts">
import Paint from './components/Paint.vue'
import logo from './assets/logo.png'
import vueLogo from './assets/vue.svg'
import nestjsLogo from './assets/nestjs.svg'

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
  <div class="logo-block">
    <img height="100" :src="logo" alt="Doubleshot Logo" />
    <div class="frame-logos">
      <div class="frame-info">
        <img :src="vueLogo" alt="vue" />
        <span class="vue-name">Vue.js</span>
      </div>
      <span class="with">X</span>
      <div class="frame-info">
        <img :src="nestjsLogo" alt="nest.js" />
        <span class="nestjs-name">Nest.js</span>
      </div>
    </div>
  </div>
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
  --vue-color: #42b883;
  --nestjs-color: #ea2845;
}

.logo-block {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 120px;
  left: 50%;
}

.frame-logos {
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame-logos .with {
  font-size: 30px;
  margin: 0 16px;
  color: #9ca3af;
}

.frame-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.frame-info img {
  width: 30px;
  margin-right: 5px;
}

.vue-name {
  font-weight: 600;
  color: var(--vue-color);
}

.nestjs-name {
  font-weight: 600;
  color: var(--nestjs-color);
}
</style>
