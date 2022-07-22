<script setup lang="ts">
/**
 * modified from https://codepen.io/Lewitje/pen/dXpRmm
 */
import { watch } from 'vue'
import { IconClear, IconSave, IconDoc, IconGithub } from './Icons'
import logo from '../assets/logo.png'

const PAD_WIDTH = 1800
const PAD_HEIGHT = 1200
let selectedColor = $ref('#1abc9c')
let selectedThickness = $ref(24)
let isPressed = false

const drawPad = $ref<HTMLCanvasElement>()
watch(
  () => drawPad,
  (c) => {
    if (!c) return

    const ctx = c.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, c.width, c.height)

    c.width = PAD_WIDTH
    c.height = PAD_HEIGHT

    c.addEventListener('mousemove', (e) => {
      let x = e.offsetX * 2
      let y = e.offsetY * 2

      if (isPressed && ctx) {
        ctx.lineWidth = selectedThickness
        ctx.strokeStyle = selectedColor
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineTo(x, y)
        ctx.stroke()
      }
    })

    c.addEventListener('mousedown', (e) => {
      ctx.beginPath()
      ctx.moveTo(e.offsetX * 2, e.offsetY * 2)
      isPressed = true
    })

    c.addEventListener('mouseup', () => {
      isPressed = false
      ctx.closePath()
    })

    c.addEventListener('mouseleave', () => {
      isPressed = false
      ctx.closePath()
    })

    // Hi!
    ctx.lineWidth = 48
    ctx.strokeStyle = '#24b574'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(600, 350)
    ctx.lineTo(640, 800)

    ctx.moveTo(600, 600)
    ctx.lineTo(800, 580)

    ctx.moveTo(800, 350)
    ctx.lineTo(840, 800)

    ctx.moveTo(1010, 500)
    ctx.lineTo(1000, 800)

    ctx.moveTo(1010, 310)
    ctx.lineTo(1010, 340)

    ctx.moveTo(1210, 310)
    ctx.lineTo(1200, 640)

    ctx.moveTo(1225, 720)
    ctx.lineTo(1180, 820)

    ctx.moveTo(1170, 730)
    ctx.lineTo(1240, 820)

    ctx.closePath()

    ctx.stroke()
  }
)

const COLORS = ['#9b59b6', '#3498db', '#2ecc71', '#1abc9c', '#f1c40f', '#e67e22', '#E73C61']
const changeColor = (color: string) => (selectedColor = color)

const THICKNESSES = [4, 12, 24, 48, 128]
const changeThickness = (thickness: number) => (selectedThickness = thickness)

const clearCanvas = () => {
  const ctx = drawPad.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, PAD_WIDTH, PAD_HEIGHT)
}

const saveImage = () => {
  if (!drawPad) return

  const img = drawPad.toDataURL('image/png')
  if (window.isElectron) {
    window.electron.saveImageToFile(img)
  } else {
    const a = document.createElement('a')
    a.href = img
    a.download = 'paint.png'
    a.click()
  }
}
</script>

<template>
  <div class="paint">
    <img class="logo" :src="logo" alt="Doubleshot Logo" />
    <nav class="thickness-bar">
      <div
        v-for="(thickness, i) in THICKNESSES"
        :key="thickness"
        :class="['thickness', { active: thickness === selectedThickness }]"
        :style="`--size-rate: ${i + 1}`"
        @click="changeThickness(thickness)"
      ></div>

      <div class="button-in-thickness" @click="clearCanvas">
        <IconClear />
      </div>
    </nav>

    <canvas ref="drawPad" class="pad"></canvas>

    <nav class="color-bar">
      <div
        v-for="color in COLORS"
        :key="color"
        :class="['color', { active: color === selectedColor }]"
        :style="`--shadow-color: ${color + '99'};--point-color: ${color}`"
        @click="changeColor(color)"
      ></div>
    </nav>

    <div class="button-bar">
      <div class="button save" @click="saveImage">
        <IconSave />
        Save
      </div>
      <a class="button doc" href="https://github.com/Doubleshotjs/doubleshot" target="_blank">
        <IconDoc />
        Documentation
      </a>
      <a class="button github" href="https://github.com/Doubleshotjs/doubleshot" target="_blank">
        <IconGithub />
        Github
      </a>
    </div>
  </div>
</template>

<style>
.paint {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.logo {
  position: absolute;
  height: 100px;
  transform: translate(-50%, -50%);
  top: calc((100% - v-bind('PAD_HEIGHT / 2 + "px"')) / 4);
  left: 50%;
}

.pad {
  flex: 1 1 0%;
  width: v-bind('PAD_WIDTH / 2 + "px"');
  height: v-bind('PAD_HEIGHT / 2 + "px"');
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.thickness-bar {
  width: calc(50% - v-bind('PAD_WIDTH / 4 + "px"'));
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.thickness,
.button-in-thickness {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 20px 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.thickness:hover,
.button-in-thickness:hover {
  border-color: rgba(0, 0, 0, 0.2);
}

.button-in-thickness svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  color: rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}

.button-in-thickness:hover svg {
  color: rgba(0, 0, 0, 0.5);
}

.thickness:after {
  position: absolute;
  top: 50%;
  left: 50%;
  content: '';
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s;
  width: calc(5px * var(--size-rate));
  height: calc(5px * var(--size-rate));
}

.thickness.active {
  border-color: #3498db;
}

.thickness.active:after {
  background-color: #3498db;
}

.color-bar {
  width: calc(50% - v-bind('PAD_WIDTH / 4 + "px"'));
  display: flex;
  flex-direction: column;
}

.color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  margin: 20px 40px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.1, 2, 0.5, 1);
  background-color: var(--point-color);
  box-shadow: 0 7px 25px var(--shadow-color);
}

.color:hover {
  transform: scale(1.2, 1.2);
}

.color.active {
  transform: scale(1.3, 1.3);
  cursor: default;
}

.button-bar {
  position: absolute;
  width: v-bind('PAD_WIDTH / 2 + "px"');
  height: 100px;
  transform: translate(-50%, 50%);
  bottom: calc((100% - v-bind('PAD_HEIGHT / 2 + "px"')) / 4);
  left: 50%;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-items: center;
  align-items: center;
}

.button {
  width: v-bind('PAD_WIDTH / 6 - 40 + "px"');
  height: 60px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.button svg {
  margin-right: 10px;
}

.button:hover {
  transform: scale(1.1, 1.1);
}

.button.save {
  background-color: #3498db;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.button.doc {
  background-color: #24b574;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.button.github {
  background-color: #24292f;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
