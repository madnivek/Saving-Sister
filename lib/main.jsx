import Resources from './util/resources.js';
import Background from './background.js';
import Sprite from './sprite.js';
import SavingSister from './saving_sister.js';
import setInputListeners from './util/input.js';
import ReactDOM from 'react-dom';
import React from 'react';
import Menu from './menu_component';

document.addEventListener('DOMContentLoaded', () => {
  const resources = new Resources();
  resources.load([
    './assets/backgrounds/world-background.png',
    './assets/character_sprites/lyn_sprite.png',
    './assets/character_sprites/lily_sprite.png',
    './assets/character_sprites/dementor.png',
    './assets/character_sprites/voldemort.png',
    './assets/platforms/grass-left.png',
    './assets/platforms/grass-right.png',
    './assets/platforms/grass-mid.png',
    './assets/platforms/grass-single.png',
    './assets/other/bolt_sprite.png',
    './assets/other/game_over.png',
    './assets/other/game_win.png',
    './assets/other/magic-missile.png'
  ]);

  const audio = {
    jumpSound: new Audio('./assets/audio/jump.ogg'),
    dementorDeath: new Audio('./assets/audio/dementor_death.mp3'),
    missileSound: new Audio('./assets/audio/missile.mp3'),
    gameOver: new Audio('./assets/audio/game_over.mp3'),
  };

  window.music = new Audio('./assets/audio/music.mp3');
  window.music.play();

  setInputListeners();

  resources.onReady( () => {

    const gameCanvas = document.getElementById('game-canvas');
    const gameCtx = gameCanvas.getContext("2d");
    gameCanvas.width = 900;
    gameCanvas.height = 675;

    const ssGame = new SavingSister(gameCtx, gameCanvas, resources, audio);

    ReactDOM.render(<Menu ssGame={ssGame} />, document.getElementById('menu'));


  });
});
