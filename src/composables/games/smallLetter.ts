import { ref, onMounted, onUnmounted, type Ref } from 'vue'

interface Position {
  x: number
  y: number
  letter: string
}

// Define the alphabet (including Norwegian letters)
const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYÆØÅ'.split('')

export function useLetterGame(canvasRef: Ref<HTMLCanvasElement | null>) {
  const publicFolder =
    import.meta.env.BASE_URL.length <= 2 ? window.location.origin + '/' : import.meta.env.BASE_URL
  const score = ref<number>(0)
  const mistakes = ref<number>(0)
  let correctLetter = ''
  let options: string[] = []
  let positions: Position[] = []
  let ctx: CanvasRenderingContext2D | null = null
  const correctSound = new Audio(publicFolder + '/sounds/correct.wav')
  const failSound = new Audio(publicFolder + '/sounds/fail.mp3')
  let animationFrameId: number | null = null // Animation ID

  /**
   * Get a random letter from the alphabet.
   */
  function getRandomLetter(): string {
    return alphabet[Math.floor(Math.random() * alphabet.length)] ?? 'A'
  }

  /**
   * Generate answer choices (1 correct + 4 random letters).
   */
  function generateOptions(correct: string): string[] {
    const optionSet = new Set<string>()
    optionSet.add(correct.toLowerCase())

    while (optionSet.size < 5) {
      optionSet.add(String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    }

    return Array.from(optionSet).sort(() => Math.random() - 0.5)
  }

  /**
   * Draw the game UI on the canvas (continuous loop)
   */
  function drawGame(): void {
    if (!ctx || !canvasRef.value) return

    const canvas = canvasRef.value
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw large letter (question)
    ctx.font = '80px Arial'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText(correctLetter, canvas.width / 2, 80)

    // Draw score (top-right)
    ctx.font = '20px Arial'
    ctx.textAlign = 'right'
    ctx.fillStyle = 'blue'
    ctx.fillText(`Poeng: ${score.value}`, canvas.width - 10, 30)

    // Draw mistakes (top-left)
    ctx.textAlign = 'left'
    ctx.fillStyle = 'red'
    ctx.fillText(`Feil: ${mistakes.value}`, 10, 30)

    // Draw small letters (answer options)
    ctx.font = '40px Arial'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    positions = []

    options.forEach((letter, index) => {
      const x = 50 + index * 70
      const y = 200
      positions.push({ x, y, letter })
      ctx?.fillText(letter, x, y)
    })

    // Request the next frame (keeps game running)
    animationFrameId = requestAnimationFrame(drawGame)
  }

  /**
   * Start a new game round with a new random letter.
   */
  function startGame(): void {
    correctLetter = getRandomLetter()
    options = generateOptions(correctLetter)
    drawGame() // Start animation loop
  }

  /**
   * Handle user clicking on letters in the canvas.
   */
  function handleClick(event: MouseEvent): void {
    if (!canvasRef.value) return

    const rect = canvasRef.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    positions.forEach((pos) => {
      if (
        mouseX > pos.x - 20 &&
        mouseX < pos.x + 20 &&
        mouseY > pos.y - 40 &&
        mouseY < pos.y + 10
      ) {
        if (pos.letter === correctLetter.toLowerCase()) {
          score.value++
          setTimeout(startGame, 500) // Wait and restart
          void correctSound.play() // Play correct sound
        } else {
          void failSound.play() // Play fail sound
          mistakes.value++
        }
      }
    })
  }

  /**
   * Resize the canvas dynamically when the window resizes.
   */
  const resizeCanvas = (): void => {
    if (!canvasRef.value) return
    canvasRef.value.width = window.innerWidth * 0.8 // 80% of the window width
    canvasRef.value.height = window.innerHeight * 0.6 // 60% of the window height
    drawGame() // Redraw after resizing
  }

  // Lifecycle hooks
  onMounted(() => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    if (!ctx) return

    resizeCanvas() // Set initial size
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('click', handleClick)
    startGame()
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

  return {
    score,
    mistakes,
    startGame,
  }
}
