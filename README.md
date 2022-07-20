# Bug CATastrophe

[Link to project](https://robertwmorgan.github.io/Projectone/)

Bug Catastrophe is a game that is based on Space Invaders. You have to shoot all the enemies that are moving side to side on the screen without getting hit to win. The project took a full week to make and is my first ever project.

### Project Brief

Timeframe: 1 week
Team size: Solo

The project was to create a grid-based game within a week using HTML, CSS and JavaScript. We were able to pick from a variety of games such as tetris or minesweeper, etc. I chose to create Space Invaders as I enjoyed playing the game growing up and I thought it would help me practice timings in JS.

Space Invaders is a game with 3 buttons, space to shoot and left & right arrows to move. The enemies would go left to right until they reached the edge then go down one whilst shooting at the player. The enemies would win once they either shot the player and eliminated all their lives or reached the very bottom of the screen.

### Technologies Used

#### HTML

I used HTML to create the general structure of the game.

- Different sections for each part of the page.
- Grid container.
- All of the static text.
- Start, Reset and Difficulty buttons.
- Audio elements for all the audio that plays.

#### CSS

I used CSS for all of the styling and applying the different characters of the game.

- Flex-box for most of the formatting.
- Saving different characters as separate styles to apply to the grid.
- General styling of page.
- Button hover effects.

#### JavaScript

JavaScript was used to make the game work.

- keyDown was used to move the characters and shoot.
- setInterval was used to move the enemies and time their shots.
- Added source and played audio depending on the interaction.
- Displaying and Hiding different overlays.
- Generating the game grid.
- Score counting and Hi-score sorting.
- Game-over, Start & Difficulty button functionality.


### The Approach:

#### Day 1

This was my first project and I wasn’t too sure how to proceed. I started by creating a basic wireframe and adding all the main deliverables, how I would approach certain problems and some stretch goals for if I had extra time.

I created the general structure of the site in HTML and made the function to create the game grid in JS.

I also created the player character movement and got it to move around the game grid correctly. I did this by storing the keycode value of the keypress and using if statements to react to the player input.


![JS movement function](assets/Readme%20Images/Screenshot%202022-06-20%20at%2014.51.27.png)

The shooting mechanics were a little more complicated. I used an interval timer to time the movement of the projectile along the grid.

![JS Shoot mechanic](assets/Readme%20Images/Screenshot%202022-06-20%20at%2015.10.39.png)

#### Day 2

I focused on adding enemies and some basic css here to get a better feel for my game. Again I used interval timers to time their movements and an if statement to change their direction and move down the grid once they got to the end. I also added enemy shooting mechanics by using math.random to generate a random interval for them to shoot at and which random enemy to shoot.

![JS Enemy movement and shooting mechanics](assets/Readme%20Images/Screenshot%202022-06-20%20at%2015.12.25.png)

#### Day 3

I finished on the last of the main deliverables of the game. I added a score counter, a hi-score table & sorting function, added event listeners to the start and reset buttons to get them to work and created different overlays for win/loss screens.

I also did the final CSS for this project.

#### Day 4

I added a second difficulty level that had faster enemies & a button to toggle difficulties. Sound was also added using JS to change the audio source depending on the situation.

I also started on a bonus boss fight that would take place if the player beat the harder difficulty. This boss-fight would be made more difficult than regular stages by having the boss moving randomly instead of following the traditional space-invaders movement.

#### Day 5

I finished the boss-fight stage & added images as my face for the enemies and did as much testing and bug solving as I could before the deadline. 

### Game Start

- Background music starts to play.
- Enemies spawn and start moving left.
- The counter that is increased each increment is checked against the random number to see if it should shoot. If it does shoot, it then picks a random enemy to shoot. 
- Player is spawned on grid.
- Game is constantly checking to see if a grid tile contains both projectiles and either the player character or enemies for collision detection.

![Game Start]( assets/Readme%20Images/game_start.PNG)

### Player Win/Loss

- The game grid’s display is set to none and a new grid is generated.
- The text shown is based on if the player wins or loses.
- An input field is opened where you can enter your name for the hi-scores

![Game end screen](assets/Readme%20Images/game_over.PNG)


After a win or loss you can input your name for it to appear on the hi-scores. This is saved using local storage

![game over screen](assets/Readme%20Images/end_screen.PNG)

### Key Learnings

- Learned how to use intervals in JS to simulate time
- Learned the basics of local storage
- Learned how to join multiple technologies together to create a finished project

### Challenges

- Getting the different screens to popup at the correct times
- Getting the enemies to move cleanly and keep the empty space when disappearing
- Getting local storage save data and display correctly

### Future Improvements

- One of the improvements I’d want to make is fixing the boss fight. There’s a bug where sometimes the images go out of order when shot. I ran out of time during the project to fix this and would like to revisit this.
- Another future improvement would be refactoring my code. It is not very dry and very messy. One of the big ways to solve this would be writing more general functions that could be reused instead of writing specific ones that can only be used once.
