import Sprite from './sprite.js';
import Platform from './platform.js';
import PlatformGenerator from './platform_generator.js';
import Bolt from './bolt.js';

class SavingSister {
  constructor(ctx, canvas, resources){
    this.ctx = ctx;
    this.canvas = canvas;
    this.resources = resources;
    this.lasttime = Date.now();
    this.run = this.run.bind(this);
    this.player = {};
    this.bolts = [];
    this.generateBolts = this.generateBolts.bind(this);
    this.boltTimer = 0;
    this.difficulty = 10;
    this.pause = true;
    this.gameOver = false;
    this.togglePause = this.togglePause.bind(this);
    this.reset = this.reset.bind(this);

    const platformMap = [
      {pos:[0,853], size:38},
      {pos: [1050, 100], size: 4},
      {pos:[0,750], size:6},
      {pos:[300,680], size:6},
      {pos:[600,610], size:6},
      {pos:[900,540], size:6},
      {pos:[600,480], size:6},
      {pos:[300,420], size:6},
      {pos:[0,360], size:6},
      {pos:[0,280], size:6},
      {pos:[0,200], size:6},
      {pos:[300,200], size:6},
      {pos:[600,200], size:6},
      {pos:[900,200], size:6},
    ];

    const platformGenerator = new PlatformGenerator(this.ctx, this.resources, platformMap);

    this.platforms = platformGenerator.getPlatforms();
    debugger
    this.init();
  }

  reset(){
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.player = {};
    this.gameOver = false;
    this.lily = {};
    this.bolts = [];
    this.pause = false;
    this.lasttime = Date.now();
  }

  togglePause(){
    this.pause = !this.pause;
  }

  init(){

    this.lily = new Sprite({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/lyn_sprite.png',
      pos: [1130, 60],
      framePos:[0,0],
      size: [53.91,60],
      speed: 0,
      movable: false,
      frames: [12,13,14,15,16,17,18,19,20,21],
      platforms: this.platforms
    });

    this.voldemort = new Sprite({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/voldemort.png',
      pos: [1050, 50],
      framePos:[0,0],
      size: [70.4,80],
      movable: false,
      speed: 20,
      frames: [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2,1]
    });

    this.player = new Sprite({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/lyn_sprite.png',
      pos: [0,810],
      framePos:[0,0],
      size: [53.91,60],
      movable: true,
      speed: 0,
      frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
      platforms: this.platforms
    });


    this.run();
  }


  generateBolts(num){
    for(let i = 0; i < num; i++){
      const randX = Math.random() * 1200;
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

  run(){
    // console.log(this.bolts.length);
    if(this.gameOver){
      this.reset();
      return;
    }

    if(!this.pause){
      this.boltTimer++;
      if(this.boltTimer === this.difficulty){
        this.generateBolts(1);
        this.boltTimer = 0;
      }

      let now = Date.now();
      let dt = (now - this.lasttime)/1000.0;
      console.log(dt)
      this.update(dt);
      this.render();
      this.lasttime = now;
      window.requestAnimationFrame(this.run);
    }
  }

  update(dt){
    this.player.update(dt);
    this.voldemort.update(dt);
    const boltsToDelete = [];
    this.bolts.forEach( (bolt, index) => {
      if(bolt.y > 1000){
        boltsToDelete.push(index);
      }

      if(this.checkCollision(bolt, this.player)){
        this.gameOver = true;
      }

      bolt.update(dt);
    });

    boltsToDelete.forEach( bolt_index => this.bolts.splice(bolt_index, 1));

  }

  render(){
    this.platforms.forEach( platform => platform.render());
    this.voldemort.render();
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

export default SavingSister;
