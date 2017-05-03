# Sample JS Project Proposal: Saving Sister

### Saving Sister is a game inspired by classic side scrollers such as Super Mario World. The game features a young heroine named Lily who is on a journey to rescue her younger twin sister (Lyn) from the evil clutches of Voldemort.

### Functionality & MVP

In this game, users will be able to:

- [ ] Start a new game with one level
- [ ] Move a character sprite using arrow key commands
- [ ] Come into contact with "enemy" sprites
- [ ] Navigate through at least 1 player level

This project will also include:
- [ ] A information pane/modal that will describe game rules/info
- [ ] An about section, about the developer and relevent links
- [ ] A production readme

### Wireframes

The game will consist of a single game screen and all controls will be handled via the keyboard. Main controls include moving left and right, and jumping. Time permitting, a "shoot" button/feature will also be implemented.

### Architecture and Technologies

The project will be implemented using the following technologies:
- `JavaScript` for game logic
- `HTML5 Canvas` for visual rendering to the page
- `Express.js` to host a local web server to run and test the game
- `Tile` to build the art environment from free open-source sprite resources such as http://kenney.nl

The main entry file will be a `game.js` file which will be loaded into an index.html file via a script tag. Util files will handle different pieces of the game such as `sprite.js` which will handle rendering spritesheets and sprite movements and `input.js` which will handle user input.

### Implementation Timeline

**Day 1**: Setup all the necessary modules and dependencies and assets.
Goals:
- Find all basic assets (sprite sheets, background environment, and background) on open-source websites such as http://kenney.nl.
- Create the basic structure for a Canvas game and setup the local web server using Express.js
- Dedicate most of the day to learning how to draw asset files and spritesheets to canvas
- Ideally, get a working background and sprite on the game canvas

**Day 2**: Add more sprites to canvas, implement simple sprite physics

- Implement jump physics/logic
- Program listeners for keypresses and movement
- Goal is to get a moving sprite on keypress and a relatively smooth "jump"

**Day 3**: Sprite Interaction
- Implement simple collision detection this will probably take the most time
- Program sprites that can interact with other sprites - i.e. jumping on platforms, enemies (items are a bonus)
- Goal is to have a moving character that can jump on platforms, and will trigger game-over when an enemy character is touched

**Day 4**: Game logic
- Implement overall start game, game reset, and game-over logic - e.g. start game on button press, have a reset button, etc...
- Add instructions side-section, start and pause buttons
- Add info sections containing links to personal pages
- Production README

###Bonus Features
- A "shoot" feature to attack enemies
- Additional level
- Multiple lives
- Scoring System
- Difficuly Settings
