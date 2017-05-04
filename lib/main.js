import Resources from './util/resources.js';
import Background from './background.js';
import Sprite from './sprite.js';
import SavingSister from './saving_sister.js';
import setInputListeners from './util/input.js';

document.addEventListener('DOMContentLoaded', () => {
  const resources = new Resources();
  resources.load([
    './assets/backgrounds/cloudy-day.png',
    './assets/character_sprites/lyn_sprite.png'
  ]);

  setInputListeners();

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

    const ssGame = new SavingSister(gameCtx, resources);

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
