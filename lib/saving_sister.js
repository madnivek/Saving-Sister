import Sprite from './sprite.js';

class SavingSister {
  constructor(ctx, resources){
    this.ctx = ctx;
    this.resources = resources;
    this.lasttime = Date.now();
    this.run = this.run.bind(this);
    this.init();
  }

  init(){
    this.player = new Sprite({
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

export default SavingSister;
