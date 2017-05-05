/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.url = options.url;
    this.framePos = options.framePos;
    this.floorYPos = options.pos[1];
    this.currentFloorYPos = this.floorYPos;
    this.animSpeed = options.speed || 0;
    this.xSpeed = 220;
    this.ySpeed = 0;
    this.gravity = 1.7;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpTimer = 0;
    this.frames = options.frames;
    this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
    this.size = options.size;
    this.resources = options.resources;
    this.pos = options.pos;
    this.index = 0;
    this.render = this.render.bind(this);
    this.platforms = options.platforms;
    this.img = this.resources.get(options.url)
    this.width = this.img.width/this.frames.length;
    this.height = this.img.height;

    const x = this.pos[0];
    const y = this.pos[1];

    this.spriteTL = [x, y];
    this.spriteTR = [x + this.width, y];
    this.spriteBL = [x, y + this.height];
    this.spriteBR = [x + this.width, y + this.height];
  }

  update(dt){
    this.index += this.animSpeed*dt;
    this.ctx.clearRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    const landedOnPlatform = this.checkPlatformLand();

    if(!landedOnPlatform && !this.isJumping){
      this.isFalling = true;
      this.currentFloorYPos = this.floorYPos;
    }

    if(this.isJumping){
      this.moveUp(dt);
    }


    if(this.isFalling){
      this.moveDown(dt);
    }

    if(window.input.isDown('RIGHT')){
      this.moveRight(dt);
    } else if(window.input.isDown('LEFT')){
      this.moveLeft(dt);
    } else {
      this.animSpeed = 0;
    }

    if(window.input.isDown('SPACE')){
      this.jump();
    }

    const x = this.pos[0];
    const y = this.pos[1];

    this.spriteTL = [x, y];
    this.spriteTR = [x + this.width, y];
    this.spriteBL = [x, y + this.height];
    this.spriteBR = [x + this.width, y + this.height];
  }

  moveUp(dt){
    this.jumpTimer++;
    if(this.ySpeed > 0){
      this.pos = [this.pos[0], this.pos[1] - (dt * this.ySpeed)];
      this.ySpeed = this.ySpeed - (this.jumpTimer*this.gravity);
    } else {
      this.ySpeed = 0;
      this.jumpTimer = 0;
      this.isJumping = false;
      this.isFalling = true;
    }
  }

  moveDown(dt){
    this.jumpTimer++
    if(this.pos[1] <= this.currentFloorYPos){
      this.ySpeed = this.ySpeed + (this.jumpTimer*this.gravity);
      this.pos = [this.pos[0], this.pos[1] + (dt * this.ySpeed)];
    } else {
      this.jumpTimer = 0;
      this.isFalling = false;
      this.ySpeed = 0;
    }
  }

  moveRight(dt){
    this.pos = [this.pos[0] + (dt*this.xSpeed), this.pos[1]];
    this.animSpeed = 20;
    this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
  }

  moveLeft(dt){
    this.pos = [this.pos[0] - (dt*this.xSpeed), this.pos[1]];
    this.animSpeed = 20;
    this.selectFrames = this.frames.slice(Math.floor(this.frames.length/2));
  }

  jump(){
    if(!this.isJumping && !this.isFalling){
      this.ySpeed = 400;
      this.isJumping = true;
    }
  }

  render(){
    let frame;
    if(this.animSpeed > 0){
      let idx = Math.floor(this.index);
      frame = this.selectFrames[idx % this.selectFrames.length];

    } else {
      frame = this.selectFrames[2];
    }

    let x = this.framePos[0] + (this.size[0] * frame);
    let y = this.framePos[1];
    this.ctx.drawImage(
      this.img,
      x,
      y,
      this.size[0], this.size[1],
      this.pos[0], this.pos[1],
      this.size[0], this.size[1]
    );
  }

  checkPlatformLand(){
    let platformLand = false;

    this.platforms.forEach( platform => {
      const platformTL = [platform.x, platform.y];
      const platformTR = [platform.x + platform.width, platform.y];
      const platformBL = [platform.x, platform.y + platform.tileHeight];
      const platformBR = [platform.x + platform.width, platform.y + platform.tileHeight];
      const btwnPFWidth = this.spriteTR[0] - 20 > platformTL[0] && this.spriteTL[0] < platformTR[0] - 20;
      const btwnPFHeight = this.spriteBR[1] > platformTL[1] && this.spriteBR[1] < platformBL[1];
      if(btwnPFWidth && btwnPFHeight){
        platformLand = true;
        this.currentFloorYPos = platformTL[1] - 40;
      }
    });
    return platformLand;
  }

  getPos(){
    return this.pos;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform {
  constructor(ctx, resources, pos, numTiles){
    this.ctx = ctx;
    this.x = pos[0];
    this.y = pos[1];
    this.platform_left = resources.get('./assets/platforms/grass-left.png');
    this.platform_right = resources.get('./assets/platforms/grass-right.png');
    this.platform_mid = resources.get('./assets/platforms/grass-mid.png');
    this.platform_single = resources.get('./assets/platforms/grass-single.png');
    this.tileWidth = this.platform_single.width;
    this.tileHeight = this.platform_single.height;
    this.numTiles = numTiles
    this.width = this.tileWidth * numTiles;
  }

  render(){
    const x = this.x;
    const y = this.y;
    if(this.numTiles === 1){
      this.ctx.drawImage(this.platform_single, x, y);
      return;
    } else if (this.numTiles === 2){
      this.ctx.drawImage(this.platform_left, x, y);
      this.ctx.drawImage(this.platform_right, x + this.tileWidth, y);
    } else {
      this.ctx.drawImage(this.platform_left, x, y);
      for(let i = 1; i < this.numTiles - 1; i++){
        this.ctx.drawImage(this.platform_mid, x + (i * this.tileWidth), y);
      }
      this.ctx.drawImage(this.platform_right, x + this.tileWidth * (this.numTiles - 1), y);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Background {
  contructor(ctx, img, x, y, width, height){
    this.ctx = ctx;
    this.img = img;
    this.x = x;
    this.y = y;
  }

  renderBackground(){
    this.ctx.drawImage(this.img, this.x, this.y);
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Background);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_generator_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bolt_js__ = __webpack_require__(6);





class SavingSister {
  constructor(ctx, resources){
    this.ctx = ctx;
    this.resources = resources;
    this.lasttime = Date.now();
    this.run = this.run.bind(this);
    this.bolts = [];
    this.generateBolts = this.generateBolts.bind(this);
    this.init();
    this.boltTimer = 0;
    this.difficulty = 10;
    this.pause = false;
  }

  togglePause(){
    this.pause = true;
  }

  init(){
    const platformMap = [
      {pos:[0,853], size:38},
      {pos: [100,620], size:2},
      {pos: [300,700], size:10},
      {pos: [600,600], size:10},
      {pos: [100,760], size:4},
      {pos: [700,500], size:5},
      {pos: [400,500], size:5},
      {pos: [300,400], size:5},
      {pos: [1100, 100], size: 3},
      {pos: [1000, 200], size: 6},
      {pos: [0, 320], size: 15},
      {pos: [300, 210], size: 18}
    ];

    // this.ctx.drawImage(this.resources.get('./assets/other/bolt_sprite.png'), 10,10)

    const platformGen = new __WEBPACK_IMPORTED_MODULE_2__platform_generator_js__["a" /* default */](this.ctx, this.resources, platformMap);

    this.platforms = platformGen.getPlatforms();

    this.lily = new __WEBPACK_IMPORTED_MODULE_0__sprite_js__["a" /* default */]({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/lyn_sprite.png',
      pos: [1100, 60],
      framePos:[0,0],
      size: [53.91,60],
      speed: 0,
      frames: [12,13,14,15,16,17,18,19,20,21],
      platforms: this.platforms
    });

    this.player = new __WEBPACK_IMPORTED_MODULE_0__sprite_js__["a" /* default */]({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/lyn_sprite.png',
      pos: [0,810],
      framePos:[0,0],
      size: [53.91,60],
      frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
      platforms: this.platforms
    });

    this.run();
  }

  generateBolts(num){
    for(let i = 0; i < num; i++){
      const randX = Math.random() * 1200;
      this.bolts.push(
        new __WEBPACK_IMPORTED_MODULE_3__bolt_js__["a" /* default */](
        this.ctx,
        this.resources,
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2],
        './assets/other/bolt_sprite.png',
        randX
        )
      );
    }

  }

  run(){
    this.boltTimer++;
    if(this.boltTimer === this.difficulty){
      this.generateBolts(1);
      this.boltTimer = 0;
    }

    let now = Date.now();
    let dt = (now - this.lasttime)/1000.0;
    this.update(dt);
    this.render();
    this.lasttime = now;
    if(!this.pause){
      window.requestAnimationFrame(this.run);
    }
  }

  update(dt){
    this.player.update(dt);

    const boltsToDelete = [];
    this.bolts.forEach( (bolt, index) => {
      if(bolt.posY > 1000){
        boltsToDelete.push(index);
      }

      const test = {
        x: this.player.getPos()[0],
        y: this.player.getPos()[1],
        width: this.player.width,
        height: this.player.height
      };

      if(this.checkCollision(bolt, test)){
        this.togglePause();
      }

      bolt.update(dt);
    });

    boltsToDelete.forEach( bolt_index => this.bolts.splice(bolt_index, 1));
  }

  render(){
    this.platforms.forEach( platform => platform.render());
    this.lily.render();
    this.player.render();
    this.bolts.forEach( bolt => bolt.render());
  }

  checkCollision(obj1, obj2){

    const obj1_TL_x = obj1.x;
    const obj1_TL_y = obj1.y;
    const obj2_TL_x = obj2.x;
    const obj2_TL_y = obj2.y;

    const obj1_BR_x = obj1.x + obj1.width*.50;
    const obj1_BR_y = obj1.y + obj1.height*.50;
    const obj2_BR_x = obj2.x + obj2.width*.50;
    const obj2_BR_y = obj2.y + obj2.height*.50;

    if(obj1_BR_x < obj2_TL_x || obj2_BR_x < obj1_TL_x) return false;
    if(obj1_BR_y < obj2_TL_y || obj2_BR_y < obj1_TL_y) return false;
    return true;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (SavingSister);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const setInputListeners = () => {
  let pressedKeys = {};

  const setKey = (event, status) => {
    const code = event.keyCode;
    let key;

    switch(code){
      case 37:{
        key = 'LEFT';
        break;
      }
      case 39:{
        key = 'RIGHT';
        break;
      }
      case 32:{
        key = 'SPACE';
        break;
      }
      default:{
        key = String.fromCharCode(code);
      }
    }
    pressedKeys[key] = status;
  };

  document.addEventListener('keydown', e => {
    e.preventDefault()
    setKey(e, true);
  });

  document.addEventListener('keyup', e => {
    e.preventDefault()
    setKey(e, false);
  });

  window.addEventListener('blur', function() {
      pressedKeys = {};
  });

  window.input = {
    isDown: key => {
      return pressedKeys[key.toUpperCase()];
    }
  };
};
/* unused harmony export setInputListeners */


/* harmony default export */ __webpack_exports__["a"] = (setInputListeners);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Resources {
  constructor(){
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];
  }

  get(url){
    return this.resourceCache[url];
  }

  isReady(){
    let ready = true;
    for(let el in this.resourceCache){
      if(this.resourceCache.hasOwnProperty(el) &&
      !this.resourceCache[el]){
        ready = false;
      }
    }
    return ready;
  }

  _load(url){
    if(this.resourceCache[url]) {
      return this.resourceCache[url];
    } else {
      let img = new Image();
      img.onload = () => {
        this.resourceCache[url] = img;
        if(this.isReady()){
          this.readyCallbacks.forEach(callback => callback());
        }
      };
      this.resourceCache[url] = false;
      img.src = url;
    }
  }

  load(urls){
    if(urls instanceof Array){
      urls.forEach( url => this._load(url));
    } else {
      this._load(urls);
    }
  }

  onReady(callback){
    this.readyCallbacks.push(callback);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Resources);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Bolt{
  constructor(ctx, resources, frames, url, x){
    this.ctx = ctx;
    this.x = x;
    this.y = -150;
    this.resources = resources;
    this.img = resources.get(url);
    this.bolts = [];
    this.index = 0;
    this.speed = 400;
    this.frames = frames;
    this.width = this.img.width/3;
    this.height = this.img.height;
  }

  update(dt){
    this.index++;
    this.ctx.clearRect(this.x, this.y, 26.33, 120);
    this.y = this.y + dt*this.speed;
  }

  render(){
    let  frame = this.frames[this.index % this.frames.length];
    let x = (26.33 * frame);
    let y = 0;
    this.ctx.drawImage(
      this.img,
      x, y,
      26.33, 120,
      this.x, this.y,
      26.33, 120
    )
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Bolt);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_resources_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__background_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprite_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__saving_sister_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_input_js__ = __webpack_require__(4);






document.addEventListener('DOMContentLoaded', () => {
  const resources = new __WEBPACK_IMPORTED_MODULE_0__util_resources_js__["a" /* default */]();
  resources.load([
    // './assets/backgrounds/cloudy-day.png',
    // './assets/backgrounds/cloudy_castle.jpg',
    // './assets/backgrounds/trees.png',
    // './assets/backgrounds/background.jpg',
    './assets/backgrounds/world-background.png',
    './assets/character_sprites/lyn_sprite.png',
    './assets/platforms/grass-left.png',
    './assets/platforms/grass-right.png',
    './assets/platforms/grass-mid.png',
    './assets/platforms/grass-single.png',
    './assets/other/bolt_sprite.png'
  ]);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_input_js__["a" /* default */])();

  resources.onReady( () => {
    const background = document.getElementById('background-canvas')
    background.width = 1200;
    background.height = 900;
    const bgCtx = background.getContext("2d");
    const bgPattern = bgCtx.createPattern(resources.get('./assets/backgrounds/world-background.png'), 'repeat');
    bgCtx.fillStyle = bgPattern;
    bgCtx.fillRect(0,0,background.width, background.height);

    const gameCanvas = document.getElementById('game-canvas')
    const gameCtx = gameCanvas.getContext("2d");
    gameCanvas.width = 1200;
    gameCanvas.height = 900;

    const ssGame = new __WEBPACK_IMPORTED_MODULE_3__saving_sister_js__["a" /* default */](gameCtx, resources);

  });
});


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_js__ = __webpack_require__(1);



class PlatformGenerator {
  constructor(ctx, resources, platformMap){
    this.ctx = ctx;
    this.resources = resources;
    this.platformMap = platformMap;
    this.platforms = [];
    this.generatePlatforms();
  }

  generatePlatforms(){
    this.platformMap.forEach( map => {
      const platform = new __WEBPACK_IMPORTED_MODULE_0__platform_js__["a" /* default */](
        this.ctx, this.resources, map.pos, map.size
      );
      this.platforms.push(platform);
    });
  }

  getPlatforms(){
    return this.platforms;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PlatformGenerator);


/***/ })
/******/ ]);