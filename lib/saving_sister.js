import Sprite from './sprite.js';
import Platform from './platform.js';
import PlatformGenerator from './platform_generator.js';
import Bolt from './bolt.js';

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

    const platformGen = new PlatformGenerator(this.ctx, this.resources, platformMap);

    this.platforms = platformGen.getPlatforms();

    this.lily = new Sprite({
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

    this.player = new Sprite({
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
    window.requestAnimationFrame(this.run);
  }

  update(dt){
    this.player.update(dt);
    const boltsToDelete = [];
    this.bolts.forEach( (bolt, index) => {
      if(bolt.posY > 1000){
        boltsToDelete.push(index);
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

}

export default SavingSister;
