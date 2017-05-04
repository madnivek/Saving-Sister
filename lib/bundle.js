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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_resources_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__background_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprite_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__saving_sister_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_input_js__ = __webpack_require__(5);






document.addEventListener('DOMContentLoaded', () => {
  const resources = new __WEBPACK_IMPORTED_MODULE_0__util_resources_js__["a" /* default */]();
  resources.load([
    './assets/backgrounds/cloudy-day.png',
    './assets/character_sprites/lyn_sprite.png'
  ]);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_input_js__["a" /* default */])();

  resources.onReady( () => {
    const background = document.getElementById('background-canvas')
    background.width = 700;
    background.height = 500;
    const bgCtx = background.getContext("2d");
    const bgPattern = bgCtx.createPattern(resources.get('./assets/backgrounds/cloudy-day.png'), 'repeat');
    bgCtx.fillStyle = bgPattern;
    bgCtx.fillRect(0,0,background.width, background.height);

    // const foreground = document.getElementById('foreground-canvas')
    // const fgCtx = foreground.getContext("2d");

    const gameCanvas = document.getElementById('game-canvas')
    const gameCtx = gameCanvas.getContext("2d");
    gameCanvas.width = 700;
    gameCanvas.height = 500;

    const ssGame = new __WEBPACK_IMPORTED_MODULE_3__saving_sister_js__["a" /* default */](gameCtx, resources);

  });
});


    //
    // const ssGame = new SavingSister(gameCtx, resources);
    //
    // const lynImg = resources.get('./assets/character_sprites/lyn_sprite.png');
    // const lyn = new Sprite(ctx, lynImg, [0,0], 0, 605, 60, 11,0 );
    // setInterval( () => {
    //   ctx.fillStyle = bg;
    //   ctx.fillRect(0,0, canvas.width, canvas.height);
    //   lyn.render();
    // }, 50);
    //
    // main();
//   });
// });



//
//
// // const img = new Image();
// const test = './assets/backgrounds/cloudy-day.png';
//
// document.addEventListener('DOMContentLoaded', () => {
//   resources.onReady( () => {
//     main();
//   });
// });
//
// const main = () => {
//   const canvas = document.getElementById('canvas');
//   const ctx = canvas.getContext("2d");
//   canvas.width = 700;
//   canvas.height = 500;
//
//   const bg = ctx.createPattern(resources.get('./assets/backgrounds/cloudy-day.png'), 'repeat');
//   const lynImg = resources.get('./assets/character_sprites/lyn_sprite.png');
//   const lyn = new Sprite(ctx, lynImg, [0,0], 0, 605, 60, 11,0 );
//   setInterval( () => {
//     ctx.fillStyle = bg;
//     ctx.fillRect(0,0, canvas.width, canvas.height);
//     lyn.render();
//   }, 50);
// };
//
// const renderAll = () => {
//
// }


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.url = options.url;
    this.framePos = options.framePos;
    this.speed = options.speed || 0;
    this.frames = options.frames;
    this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
    this.once = options.once || false;
    this.size = options.size;
    this.resources = options.resources;
    this.pos = options.pos;
    this.index = 0;
    this.render = this.render.bind(this);
  }

  update(dt){
    this.index += this.speed*dt;
    this.ctx.clearRect(this.pos[0],this.pos[1], this.size[0], this.size[1]);
    if(window.input.isDown('RIGHT')){
      this.pos = [this.pos[0] + (dt*this.speed*15), this.pos[1]];
      this.speed = 20;
      this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
    } else if(window.input.isDown('LEFT')){
      this.pos = [this.pos[0] - (dt*this.speed*15), this.pos[1]];
      this.speed = 20;
      this.selectFrames = this.frames.slice(Math.floor(this.frames.length/2));
    } else {
      this.speed = 0;
    }
  }

  render(){
    let frame;
    if(this.speed > 0){
      let idx = Math.floor(this.index);
      frame = this.selectFrames[idx % this.selectFrames.length];

    } else {
      frame = 0;
    }

    let x = this.framePos[0] + (this.size[0] * frame);
    let y = this.framePos[1];
    this.ctx.drawImage(
      this.resources.get(this.url),
      x,
      y,
      this.size[0], this.size[1],
      this.pos[0], this.pos[1],
      this.size[0], this.size[1]
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite_js__ = __webpack_require__(2);


class SavingSister {
  constructor(ctx, resources){
    this.ctx = ctx;
    this.resources = resources;
    this.lasttime = Date.now();
    this.run = this.run.bind(this);
    this.init();
  }

  init(){
    this.player = new __WEBPACK_IMPORTED_MODULE_0__sprite_js__["a" /* default */]({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/lyn_sprite.png',
      pos: [0,400],
      framePos:[0,0],
      size: [53.91,60],
      frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
      dir: [0,1]
    });
    this.run();
  }

  run(){
    let now = Date.now();
    let dt = (now - this.lasttime)/1000.0;
    this.update(dt);
    this.render();
    this.lasttime = now;
    window.requestAnimationFrame(this.run);
  }

  update(dt){
    this.player.update(dt);
  }

  render(){
    this.player.render();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (SavingSister);


/***/ }),
/* 5 */
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
      default:{
        key = String.fromCharCode(code);
      }
    }
    pressedKeys[key] = status;
  };

  document.addEventListener('keydown', e => {
    setKey(e, true);
  });

  document.addEventListener('keyup', e => {
    setKey(e, false);
    debugger
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


/***/ })
/******/ ]);