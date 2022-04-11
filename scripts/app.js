function init() {
  //* Global Variables
  // Grid
  const grid = document.getElementById('grid')
  const width = 11
  const height = 10
  const cellCount = width * height
  const cells = []

  // Score
  let score = 0
  const scoreDisplay = document.querySelector('#score_num')
  scoreDisplay.innerHTML = score

  // Character Setup
  const playerClass = 'player'
  const startPosition = 104
  let currentPosition = startPosition
  let lives = 3
  const playerProjectileClass = 'projectile'
  const explosionClass = 'explosion'

  // Enemy Setup
  let direction = -1
  const enemyClass = 'enemy'
  let enemyNumber = []
  const enemyProjectile = 'enemy_projectile'
  const enemyHit = 'dmg'
  let count = 0
  let shotInterval = 4
  const leftWall = (e => e % width === 0)
  const rightWall = (e => e % width === width - 1)

  // Buttons
  const startButton = document.querySelector('#start')
  const resetButton = document.querySelector('#reset')
  const difficultySwitch = document.getElementById('switch')

  // Hiscore list
  const scores = localStorage.getItem('highscore')
  const scoreName = localStorage.getItem('nameList')
  const scoreList = document.createElement('li')

  // *Functions
  // Grid Creation
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.id = i
      cell.classList.add('gridClass')
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  function createEndGrid(){
    const cell = document.createElement('div')
    cell.id = 'endGrid'
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Player Character
  function addCharacter(position){
    cells[position].classList.add(playerClass)
  }
  function removeCharacter(position){
    cells[position].classList.remove(playerClass)
  }

  function handleKeyDown(e){
    e.preventDefault()
    const key = e.keyCode
    const left = 37
    const right = 39
    const space = 32

    removeCharacter(currentPosition)

    if (key === left && currentPosition % width !== 0){
      currentPosition--
    } else if (key === right && currentPosition % width !== width - 1){
      currentPosition++
    } else if (key === space){
      let playerShot = currentPosition - width
      document.getElementById(playerShot).classList.add(playerProjectileClass)
      const playerShoot = setInterval(() => {
        let currentShot = document.getElementById(playerShot)
        if (playerShot < width && !cells[playerShot].classList.contains(enemyClass)) { //Shots hit top 
          currentShot.classList.remove(playerProjectileClass)
          clearInterval(playerShoot)
        } else if (cells[playerShot].classList.contains(enemyClass)){ //Hitting an enemy
          if (difficultySwitch.classList.contains('extreme')){
            score += 150
          } else {
            score += 100
          }
          scoreDisplay.innerHTML = score
          enemyNumber.splice(enemyNumber.indexOf(playerShot), 1)
          currentShot.classList.add(explosionClass)
          currentShot.classList.remove(enemyClass)
          currentShot.classList.remove(playerProjectileClass)
          clearInterval(playerShoot)
          setTimeout(() => { //Explosion
            currentShot.classList.remove(explosionClass)
          }, 300)
        } else {
          currentShot.classList.remove(playerProjectileClass)
          playerShot = playerShot - width
          currentShot = document.getElementById(playerShot)
          currentShot.classList.add(playerProjectileClass)
        }
      }, 300)
    }
    addCharacter(currentPosition)
  }

  // enemy Movement
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

  function moveDown () {
    removeEnemy()
    enemyNumber = enemyNumber.map(enemy => enemy + width)
    enemySpawn()
  }

  function enemyShoots () {
    // choose a random enemy
    let randomNumber = enemyNumber[Math.floor(Math.random() * enemyNumber.length)]
    let projectileTile = document.getElementById(randomNumber) 
    projectileTile.classList.add(enemyProjectile) 
    const shotTimer = setInterval(() =>{
      projectileTile.classList.remove(enemyProjectile)
      if (randomNumber >= cellCount - width && !cells[randomNumber].classList.contains(playerClass)) {
        clearInterval(shotTimer)
      } else if (cells[randomNumber].classList.contains(playerClass)){
        projectileTile.classList.remove(enemyProjectile)
        clearInterval(shotTimer)
        cells[currentPosition].classList.add(enemyHit)
        setTimeout(() => {
          document.querySelector('.dmg').classList.remove(enemyHit)
        }, 333)
        
        // Lives
        if (lives === 0){
          clearInterval(shotTimer)
          gameOver()
        } else if (lives === 1){
          document.querySelector('#life1').style.display = 'none'
          lives -= 1
        } else if (lives === 2){
          document.querySelector('#life2').style.display = 'none'
          lives -= 1
        } else if (lives === 3){
          document.querySelector('#life3').style.display = 'none'
          lives -= 1
        }
      } else {
        randomNumber = randomNumber + width
        projectileTile = document.getElementById(randomNumber)
        projectileTile.classList.add(enemyProjectile)
      }
    }, 500)
  }

  // Enemy Timers
  function enemyMoveTime(){
    const enemyMove = setInterval(() => {
      if (direction === -1 && enemyNumber.some(leftWall)) {
        moveDown()
        direction = 1
      } else if (direction === 1 && enemyNumber.some(rightWall)){
        moveDown()
        direction = -1
      } else if (enemyNumber.some((e) => e >= cellCount - width)){
        clearInterval(enemyMove)
        gameOver()
      } else {
        removeEnemy()
        enemyNumber = enemyNumber.map(enemy => enemy + direction)
        enemySpawn()
      }
      // Victory
      if (enemyNumber.length === 0){
        clearInterval(enemyMove)
        displayVictory()
      }
      count += 1
      // Enemy Shooting
      if (count === shotInterval){
        enemyShoots()
        count = 0
        shotInterval = Math.floor(Math.random() * 3) + 1
        if (lives === 0 ){
          clearInterval(enemyMove)
          gameOver()
        } 
      }
    }, 800)
  }

  // * Hard Mode

  function hardMode(){
    const enemyMove = setInterval(() => {
      let randomMovement = Math.floor(Math.random() * 3)
      console.log(randomMovement)
      shotInterval = 3
      count = 2
      count += 1
      
      if (enemyNumber.length === 0){
        clearInterval(enemyMove)
        displayVictory()
      } else if (enemyNumber.some((e) => e >= cellCount - width)){
        clearInterval(enemyMove)
        gameOver()
      } else if (randomMovement === 0 && enemyNumber.some(leftWall)){
        randomMovement = 1
      } else if (randomMovement === 1 && enemyNumber.some(rightWall)){
        randomMovement = -1
      } else if (randomMovement === 0){
        removeEnemy()
        direction = -1
        enemyNumber = enemyNumber.map(enemy => enemy + direction)
        enemySpawn()
      } else if (randomMovement === 1) {
        removeEnemy()
        direction = 1
        enemyNumber = enemyNumber.map(enemy => enemy + direction)
        enemySpawn()
      } else if (randomMovement === 2) {
        moveDown()
      }

      // shots
      if (count === shotInterval){
        enemyShoots()
        count = 0
        shotInterval = Math.floor(Math.random() * 3) + 1
        if (lives === 0 ){
          clearInterval(enemyMove)
          gameOver()
        } 
      }
    }, 500)
    
  }


  // Victory display

  function displayVictory(){
    removeCharacter(currentPosition)
    const grids = document.querySelectorAll('.gridClass')
    grids.forEach((grid) => {
      grid.style.display = 'none'
    })
    createEndGrid()
    document.getElementById('endGrid').innerHTML = `You Win! <br><br> Score: ${score}`
    recordScore()
    reorganise()
  }

  // Game Over, Start & Difficulty
  function gameOver () {
    recordScore()
    reorganise()
    removeEnemy()
    removeCharacter(currentPosition)
    const grids = document.querySelectorAll('.gridClass')
    grids.forEach((grid) => {
      grid.style.display = 'none'
    })
    createEndGrid()
    document.getElementById('endGrid').innerHTML = `You Lose! <br><br> Score: ${score}`
  }

  function startGame(){
    startButton.disabled = true
    createGrid()
    currentPosition = startPosition
    addCharacter(currentPosition)
    score = 0

    if (difficultySwitch.classList.contains('extreme')){
      enemyNumber = [2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27, 28, 29, 30]
      enemySpawn()
      hardMode()
    } else {
      enemyNumber = [2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 24, 25, 26, 27, 28, 29, 30]
      enemySpawn()
      enemyMoveTime()
    }
  }

  // Reset Function
  function resetGame(){
    location.reload()
  }

  function toggleDifficulty() {
    difficultySwitch.classList.toggle('easy')
    difficultySwitch.classList.toggle('extreme')
  }

  // hi-scores
  function recordScore () {
    if (score >= scores) {
      const name = window.prompt('Enter Your Name!') 
      localStorage.setItem('highscore', score)
      const highScore = localStorage.getItem('highscore')
      localStorage.setItem('nameList', name)
      scoreList.id = 'list5'
      document.querySelector('ol').appendChild(scoreList)
      scoreList.innerHTML = `${name}: <span class= "score_class" id="${highScore}">${highScore}</span>`
    }
  }

  // recall storage
  scoreList.id = 'list5'
  if (scores || scoreName){
    document.querySelector('ol').appendChild(scoreList)
    scoreList.innerHTML = `${scoreName}: <span class="score_class" id="${scores}">${scores}</span>`
    reorganise()
  }

  // reorganising the list
  function reorganise() {
    const scoresTest = localStorage.getItem('highscore')
    const scoresArray = []
    const scoreOrder = document.querySelector('ol')
    const hiScores = document.querySelectorAll('.score_class')
    hiScores.forEach((e) => {
      const scoreVal = e.id
      scoresArray.push(scoreVal)
    })
    const scoresArraySorted = scoresArray.sort(function(a, b) {
      return a - b
    })
    const playerScore = scoresArraySorted.indexOf(scoresTest)
    const scorePosition = document.getElementById('list5')
    if (playerScore === 3){
      scoreOrder.insertBefore(scorePosition, scoreOrder.children[1])
    } else if (playerScore === 2){
      scoreOrder.insertBefore(scorePosition, scoreOrder.children[2])
    } else if (playerScore === 1){
      scoreOrder.insertBefore(scorePosition, scoreOrder.children[3])
    } 
  }

  // Event Listeners
  startButton.addEventListener('click', startGame)
  resetButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', handleKeyDown)
  difficultySwitch.addEventListener('click', toggleDifficulty)
}

window.addEventListener('DOMContentLoaded', init)