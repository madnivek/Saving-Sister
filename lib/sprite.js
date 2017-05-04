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
      frame = this.selectFrames[0];
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

export default Sprite;
