import Sprite from './sprite.js';
import Platform from './platform.js';
import PlatformGenerator from './platform_generator.js';
import MagicMissile from './magic_missile.js';
import Bolt from './bolt.js';


class SavingSister {
  constructor(ctx, canvas, resources, audio){
    this.ctx = ctx;
    this.canvas = canvas;
    this.resources = resources;
    this.lasttime = Date.now();
    this.run = this.run.bind(this);
    this.player = {};
    this.bolts = [];
    this.missiles = [];
    this.missile_time_delay = 50;
    this.dementors = [];
    this.boltTimer = 0;
    this.dementorTimer = 0;
    this.difficulty = 45;
    this.pause = true;
    this.gameOver = false;
    this.gameWin = false;
    this.togglePause = this.togglePause.bind(this);
    this.reset = this.reset.bind(this);
    this.generateBolts = this.generateBolts.bind(this);
    this.generateDementors = this.generateDementors.bind(this);
    this.audio = audio;

    const platformMap = [
      {pos:[0,640], size:38},
      {pos: [787.5, 75], size: 4},
      {pos:[0,550], size: 5},
      {pos:[200, 500], size: 5},
      {pos:[400, 450], size: 5},
      {pos:[600, 400], size: 5},
      {pos:[400, 350], size: 5},
      {pos:[200, 300], size: 5},
      {pos:[0, 250], size: 5},
      {pos:[200, 150], size: 35}
    ];

    const platformGenerator = new PlatformGenerator(this.ctx, this.resources, platformMap);

    this.platforms = platformGenerator.getPlatforms();

  }

  reset(){
    this.player = {};
    this.lily = {};
    this.bolts = [];
    this.missiles = [];
    this.dementors = [];
    this.pause = false;
    this.lasttime = Date.now();
  }

  togglePause(){
    if(this.pause){
      this.pause = false;
      this.run();
    } else {
      this.pause = true;
    }
  }

  init(){
    this.gameOver = false;
    this.gameWin = false;
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

    const lilyImg = this.resources.get('./assets/character_sprites/lily_sprite.png');
    this.lily = new Sprite({
      ctx: this.ctx,
      img: lilyImg,
      pos: [840, 30],
      framePos:[0,0],
      size: [lilyImg.width/30,lilyImg.height],
      speed: 20,
      movable: false,
      frames: frameRange(15,29)
    });

    const voldemortImg = this.resources.get('./assets/character_sprites/voldemort.png');
    this.voldemort = new Sprite({
      ctx: this.ctx,
      img: voldemortImg,
      pos: [787, 37.5],
      framePos:[0,0],
      size: [voldemortImg.width/10,voldemortImg.height],
      movable: false,
      speed: 20,
      frames: frameRange(0,9).concat(frameRange(1,8).reverse())
    });

    const lynImg = this.resources.get('./assets/character_sprites/lyn_sprite.png')
    this.player = new Sprite({
      ctx: this.ctx,
      img: lynImg,
      pos: [0,607],
      framePos:[0,0],
      size: [lynImg.width/20, lynImg.height],
      movable: true,
      speed: 0,
      frames: frameRange(0,19),
      platforms: this.platforms,
      jumpSound: this.audio.jumpSound
    });

    lynImg.addEventListener('click', () => this.player.jump() );

    this.run();
  }


  generateBolts(num){
    for(let i = 0; i < num; i++){
      const randX = Math.random() * 900;
      this.bolts.push(
        new Bolt(
        this.ctx,
        this.resources,
        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2],
        './assets/other/bolt_sprite.png',
        randX
        )
      );
    }
  }

  generateDementors(num){
    const dementorImg = this.resources.get('./assets/character_sprites/dementor.png');
    for(let i = 0; i < num; i++){

      let position;
      if(i % 2 === 0){
        position = [1000, Math.random()*650];
      } else {
        position = [Math.random(900), -100];
      }

      this.dementors.push(new Sprite({
        ctx: this.ctx,
        img: dementorImg,
        pos: position,
        framePos:[0,0],
        size: [dementorImg.width/26, dementorImg.height],
        movable: false,
        speed: 10,
        followSpeed: 100,
        frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        followed_object: this.player
      }));
    }
  }

  checkMissiles(){
    if(window.input.isDown('SPACE') && this.missile_time_delay <= 0){
      this.audio.missileSound.play();
      this.missile_time_delay = 50;
      this.missiles.push(
        new MagicMissile(
          this.ctx,
          this.resources,
          './assets/other/magic-missile.png',
          this.player.x - this.player.width/2,
          this.player.y,
          this.player.dir
        )
      );
    } else {
      this.missile_time_delay--;
    }

    this.missiles.forEach( (missile, index) =>{
      if(missile.done === true){
        this.missiles.splice(index,1);
      }
    });
  }

  run(){
    if(this.gameOver && this.gameWin !== true){
      this.displayGameOver();
      this.reset();
      return;
    } else if(this.gameWin === true){
      this.displayGameWin();
      this.reset();
      return;
    }


    if(!this.pause){
      this.checkMissiles();

      this.boltTimer++;
      if(this.boltTimer === this.difficulty){
        this.generateBolts(1);
        this.boltTimer = 0;
      }

      this.dementorTimer++;
      if(this.dementorTimer === 250){
        this.generateDementors(2);
        this.dementorTimer = 0;
      }

      let now = Date.now();
      let dt = (now - this.lasttime)/1000.0;
      this.update(dt);
      this.render();
      this.lasttime = now;
      window.requestAnimationFrame(this.run);
    }
  }

  update(dt){
    this.lily.update(dt);
    this.player.update(dt);
    this.voldemort.update(dt);
    this.updateMissiles(dt);
    this.updateBolts(dt);
    this.updateDementors(dt);
  }



  updateDementors(dt){
    this.dementors.forEach((dementor, index) => {
      if(this.checkCollision(this.player, dementor)){
        this.triggerGameOver();
      }

      this.missiles.forEach( missile => {
        if(this.checkCollision(missile, dementor)){
          this.audio.dementorDeath.play();
          this.ctx.clearRect(dementor.x, dementor.y, dementor.width, dementor.height);
          this.dementors.splice(index, 1);
        }
      });

      dementor.update(dt);
    });
  }

  updateBolts(dt){
    const boltsToDelete = [];
    this.bolts.forEach( (bolt, index) => {
      if(bolt.y > 1000){
        boltsToDelete.push(index);
      }

      if(this.checkCollision(bolt, this.player)){
        this.triggerGameOver();
      }
      bolt.update(dt);
    });
    boltsToDelete.forEach( bolt_index => this.bolts.splice(bolt_index, 1));
  }

  updateMissiles(dt){
    this.missiles.forEach( missile => {
      missile.update(dt);
      if(this.checkCollision(missile, this.voldemort)){
        this.gameOver = true;
        this.gameWin = true;
      }
    });
  }

  render(){
    this.platforms.forEach( platform => platform.render());
    this.voldemort.render();
    this.lily.render();
    this.player.render();
    this.bolts.forEach( bolt => bolt.render());
    this.missiles.forEach( missile => missile.render());
    this.dementors.forEach( dementor => dementor.render());
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

  triggerGameOver(){
    this.gameOver = true;
    this.audio.gameOver.play();
  }

  displayGameOver(){
    const img = this.resources.get('./assets/other/game_over.png');
    this.ctx.drawImage(img, 90, 70);
  }

  displayGameWin(){
    const img = this.resources.get('./assets/other/game_win.png');
    this.ctx.drawImage(img, 90, 70);
  }
}

const frameRange = (a,b) => {
  const arr = [];
  for(let i = a; i <= b; i++){
    arr.push(i);
  }
  return arr;
};

export default SavingSister;
