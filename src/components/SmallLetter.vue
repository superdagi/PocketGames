<template>
  <q-page>
    <div class="row" style="font-size: 24px">
      <span class="col-2" style="color: blue">Poeng: {{ letterGame.score }}</span>
      <span style="color: red">Feil: {{ letterGame.mistakes }}</span>
    </div>
    <canvas ref="canvasRef" />
  </q-page>
</template>

<script setup lang="ts">
import { useLetterGame } from 'src/composables/games/smallLetter'

import { onMounted, onUnmounted, ref } from 'vue'

// Define canvas reference
const canvasRef = ref<HTMLCanvasElement | null>(null)
const letterGame = useLetterGame(canvasRef)

// Function to resize canvas dynamically
const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.width = window.innerWidth * 0.8 // 90% of the window width
  canvas.height = window.innerHeight * 0.8 // 60% of the window height
}

// Handle setup and cleanup
onMounted(() => {
  resizeCanvas() // Set initial size
  window.addEventListener('resize', resizeCanvas) // Resize on window change
  // startAnimation()
  letterGame.startGame()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}
</style>
