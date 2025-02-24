<template>
  <q-page class="flex">
    <canvas ref="canvasRef" />
  </q-page>
</template>

<script setup lang="ts">
import { useTenFriendGame } from 'src/composables/games/tenFriends'
import { useLetterGame } from 'src/composables/games/smallLetter'

import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  gameName: {
    type: String,
    required: false,
    restrict: ['letter', 'tenFriend'],
  },
})

// Define canvas reference
const canvasRef = ref<HTMLCanvasElement | null>(null)

const game = props.gameName == 'tenFriend' ? useTenFriendGame(canvasRef) : useLetterGame(canvasRef)

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
  game.startGame()
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
