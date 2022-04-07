function init() {

  // Grid

  const grid = document.getElementById('grid')
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []

  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerText = i
      cell.id = i
      cell.classList.add('gridClass')
      grid.appendChild(cell)
      cells.push(cell)
      
    }
  }

  // Score

  let score = 0
  const scoreDisplay = document.querySelector('span')
  scoreDisplay.innerHTML = score


  // Character Setup

  const playerClass = 'player'
  const startPosition = 104
  let currentPosition = startPosition


  // Add/Remove Character

  function addCharacter(position){
    cells[position].classList.add(playerClass)
  }

  function removeCharacter(position){
    cells[position].classList.remove(playerClass)
  }


  // Enemy Setup

  const enemyClass = 'enemy'
  let enemyNumber = [2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27, 28, 29, 30]

  function removeEnemy(){
    enemyNumber.forEach((enemy) => {
      cells[enemy].classList.remove(enemyClass)
    })
  }

  function enemySpawn(){
    enemyNumber.forEach((enemy) => {
      cells[enemy].classList.add(enemyClass)
    })
  }


  // enemy movement and timers

  function moveLeft () {
    enemyNumber = enemyNumber.map(enemy => enemy - 1)
  }

  function moveRight () {
    enemyNumber = enemyNumber.map(enemy => enemy + 1)
  }

  function moveDown () {
    enemyNumber = enemyNumber.map(enemy => enemy + width)
  }


  function enemyMoveTime(){
    const leftWall = (e => e % width === 0)
    const rightWall = (e => e % width === width - 1)
    const enemyMove = setInterval(() => {
      if (enemyNumber.some(leftWall && moveLeft())){
        removeEnemy()
        moveDown()
        enemySpawn()
      } else {
        removeEnemy()
        moveLeft()
        enemySpawn()  
      }

    }, 1000)
  }

  
  // Start Button

  const startButton = document.querySelector('#start')

  function startGame(){
    enemySpawn()
    addCharacter(currentPosition)
    enemyMoveTime()

    // Character Movement

    function handleKeyDown(e){
      const key = e.keyCode
      const left = 37
      const right = 39
      const space = 32

      removeCharacter(currentPosition)

      if (key === left && currentPosition % width !== 0){
        currentPosition--
      } else if (key === right && currentPosition % width !== width - 1){
        currentPosition++
      }
      addCharacter(currentPosition)
    }










    document.addEventListener('keydown', handleKeyDown)
  }

  startButton.addEventListener('click', startGame)











  // Initial Setup

  createGrid()
  scoreDisplay.innerHTML = score
}

window.addEventListener('DOMContentLoaded', init)