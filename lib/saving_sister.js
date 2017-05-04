import Sprite from './sprite.js';
import Platform from './platform.js';
import PlatformGenerator from './platform_generator.js';

class SavingSister {
  constructor(ctx, resources){
    this.ctx = ctx;
    this.resources = resources;
    this.lasttime = Date.now();
    this.run = this.run.bind(this);
    this.init();
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
      {pos: [1100, 100], size: 3}
    ];

    const platformGen = new PlatformGenerator(this.ctx, this.resources, platformMap);

    this.platforms = platformGen.getPlatforms();

    this.lily = new Sprite({
      ctx: this.ctx,
      resources: this.resources,
      url: './assets/character_sprites/lyn_sprite.png',
      pos: [1100, 100],
      framePos:[0,0],
      size: [53.91,60],
      frames: [12,13,14,15,16,17,18,19,20,21],
      dir: [0,1],
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
      dir: [0,1],
      platforms: this.platforms
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
    this.platforms.forEach( platform => platform.render());
    this.lily.render();
    this.player.render();
  }

}

export default SavingSister;
