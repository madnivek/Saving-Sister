import Resources from './util/resources.js';
import Background from './background.js';
import Sprite from './sprite.js';
import SavingSister from './saving_sister.js';
import setInputListeners from './util/input.js';

document.addEventListener('DOMContentLoaded', () => {
  const resources = new Resources();
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
    './assets/platforms/grass-single.png'
  ]);

  setInputListeners();

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

    const ssGame = new SavingSister(gameCtx, resources);

  });
});
