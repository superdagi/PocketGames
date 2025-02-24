import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface FallingNumber {
  x: number
  y: number
  value: number
  selected: boolean
  flashColor: string | null // NEW: Store flash effect color
}

export function useTenFriendGame(canvasRef: Ref<HTMLCanvasElement | null>) {
  const publicFolder =
    import.meta.env.BASE_URL.length <= 2 ? window.location.origin + '/' : import.meta.env.BASE_URL

  const correctSound = new Audio(publicFolder + '/sounds/correct.wav')
  const failSound = new Audio(publicFolder + '/sounds/fail.mp3')
  const score = ref<number>(0)
  const mistakes = ref<number>(0)

  let fallingNumbers: FallingNumber[] = []
  let selectedNumbers: FallingNumber[] = []
  let ctx: CanvasRenderingContext2D | null = null
  let animationFrameId: number | null = null // Animation loop ID

  /**
   * Get a random number between 1 and 9.
   */
  function getRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1
  }

  /**
   * Spawn exactly three numbers:
   * - Two numbers that sum to 10.
   * - One random distractor.
   */ function spawnNumbers(): void {
    const num1 = getRandomNumber()
    const num2 = 10 - num1

    if (num2 < 1 || num2 > 9) {
      return spawnNumbers() // Retry if invalid
    }

    let distractor = getRandomNumber()
    while (distractor === num1 || distractor === num2) {
      distractor = getRandomNumber()
    }

    const positions: { x: number; y: number }[] = []

    function getNonOverlappingPosition(): { x: number; y: number } {
      let x = 0
      let y = 0
      let valid = false
      while (!valid) {
        x = Math.random() * (canvasRef.value!.width - 40)
        y = -Math.random() * 80 // Random Y position between -80 and 0
        valid = positions.every((pos) => Math.abs(pos.x - x) > 50) // Ensure spacing
      }
      positions.push({ x, y })
      return { x, y }
    }

    const pos1 = getNonOverlappingPosition()
    const pos2 = getNonOverlappingPosition()
    const pos3 = getNonOverlappingPosition()

    fallingNumbers.push(
      { x: pos1.x, y: pos1.y, value: num1, selected: false, flashColor: null },
      { x: pos2.x, y: pos2.y, value: num2, selected: false, flashColor: null },
      { x: pos3.x, y: pos3.y, value: distractor, selected: false, flashColor: null },
    )
  }

  /**
   * Start a new game round with exactly three numbers,
   * ensuring that two of them add up to 10.
   */
  function startGame(): void {
    selectedNumbers = []

    // Clear old numbers and generate new ones
    fallingNumbers = []
    spawnNumbers() // Generate new numbers
  }

  /**
   * Update game logic (falling numbers movement).
   */
  function updateGame(): void {
    fallingNumbers.forEach((num) => (num.y += 0.3))

    // Remove numbers that go off-screen
    fallingNumbers = fallingNumbers.filter((num) => num.y < canvasRef.value!.height)

    // Ensure only three numbers exist at a time
    while (fallingNumbers.length < 3) {
      spawnNumbers()
    }
  }

  /**
   * Draw the game UI on the canvas (continuous loop)
   */
  function drawGame(): void {
    if (!ctx || !canvasRef.value) return

    const canvas = canvasRef.value
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateGame() // Call update before drawing

    // Draw falling numbers
    for (const num of fallingNumbers) {
      if (!ctx) continue

      ctx.beginPath()
      ctx.arc(num.x + 20, num.y + 20, 20, 0, Math.PI * 2)

      // Use flashColor for selection effect
      ctx.fillStyle =
        num.flashColor === 'green'
          ? 'rgba(0, 255, 0, 0.7)'
          : num.flashColor === 'red'
            ? 'rgba(255, 0, 0, 0.7)'
            : num.flashColor === 'yellow'
              ? 'rgba(255, 255, 0, 0.7)'
              : 'rgb(79, 208, 240)'

      ctx.fill()
      ctx.strokeStyle = 'black'
      ctx.stroke()

      ctx.fillStyle = 'black'
      ctx.font = '16px Arial'
      ctx.fillText(num.value.toString(), num.x + 19, num.y + 25)
    }

    // Draw score (top-right)
    ctx.font = '20px Arial'
    ctx.textAlign = 'right'
    ctx.fillStyle = 'blue'
    ctx.fillText(`Poeng: ${score.value}`, canvas.width - 10, 30)

    // Draw mistakes (top-left)
    ctx.textAlign = 'left'
    ctx.fillStyle = 'red'
    ctx.fillText(`Feil: ${mistakes.value}`, 10, 30)

    // Request the next frame (animation loop)
    animationFrameId = requestAnimationFrame(drawGame)
  }
  /**
   * Check if the selected numbers sum to 10.
   */

  function checkMatch(): void {
    if (selectedNumbers.length === 2) {
      if (
        selectedNumbers[0] &&
        selectedNumbers[1] &&
        selectedNumbers[0].value + selectedNumbers[1].value === 10
      ) {
        score.value += 1

        // Flash green for correct selection
        selectedNumbers.forEach((num) => (num.flashColor = 'green'))

        // ✅ Play correct sound
        correctSound.currentTime = 0 // Reset audio to start
        void correctSound.play()

        // Reset game after a short delay
        setTimeout(() => {
          fallingNumbers = []
          selectedNumbers = []
          startGame()
        }, 300)
      } else {
        mistakes.value += 1
        // Flash red for incorrect selection
        selectedNumbers.forEach((num) => (num.flashColor = 'red'))

        // ❌ Play wrong sound
        failSound.currentTime = 0 // Reset audio to start
        void failSound.play()

        // Reset selection after short delay
        setTimeout(() => {
          selectedNumbers.forEach((num) => {
            num.flashColor = null
            num.selected = false
          })
          selectedNumbers = []
        }, 300)
      }
    }
  }

  /**
   * Handle user clicking on numbers in the canvas.
   */
  /**
   * Handle user clicking on numbers in the canvas.
   */
  function handleClick(event: MouseEvent): void {
    if (!canvasRef.value) return

    const rect = canvasRef.value.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    fallingNumbers.forEach((num) => {
      const dx = clickX - (num.x + 20)
      const dy = clickY - (num.y + 20)
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance <= 20 && !num.selected) {
        num.selected = true
        num.flashColor = 'yellow' // First selection is yellow
        selectedNumbers.push(num)

        checkMatch()
      }
    })
  }

  /**
   * Resize the canvas dynamically when the window resizes.
   */
  const resizeCanvas = (): void => {
    if (!canvasRef.value) return
    canvasRef.value.width = window.innerWidth * 0.8
    canvasRef.value.height = window.innerHeight * 0.6
    drawGame() // Redraw after resizing
  }

  onMounted(() => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    if (!ctx) return

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('click', handleClick)

    startGame() // Generate numbers initially
    if (!animationFrameId) {
      drawGame() // Start the game loop only once
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas)
    if (canvasRef.value) {
      canvasRef.value.removeEventListener('click', handleClick)
    }

    // Stop animation loop when unmounting
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  })

  function stopGame(): void {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null // Prevent further animation
    }

    window.removeEventListener('resize', resizeCanvas)
    if (canvasRef.value) {
      canvasRef.value.removeEventListener('click', handleClick)
    }

    // Clear game state
    fallingNumbers = []
    selectedNumbers = []
  }

  return {
    score,
    mistakes,
    startGame,
    stopGame,
    drawGame,
  }
}
