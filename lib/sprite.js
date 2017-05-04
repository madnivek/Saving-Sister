class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.url = options.url;
    this.framePos = options.framePos;
    this.floorYPos = options.pos[1];
    this.animSpeed = 0;
    this.xSpeed = 220;
    this.ySpeed = 0;
    this.gravity = 0.92;
    this.isJumping = false;
    this.isFalling = false;
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
    this.index += this.animSpeed*dt;
    this.ctx.clearRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);

    if(this.isJumping){
      this.moveUp(dt);
    }

    if(this.isFalling){
      this.moveDown(dt);
    }

    if(window.input.isDown('RIGHT')){
      this.moveRight(dt);
    } else if(window.input.isDown('LEFT')){
      this.moveLeft(dt);
    } else {
      this.animSpeed = 0;
    }

    if(window.input.isDown('SPACE')){
      this.jump();
    }
  }

  moveUp(dt){
    if(this.pos[1] >= this.jumpHeight){
      this.pos = [this.pos[0], this.pos[1] - (dt * this.ySpeed)];
      this.ySpeed = this.ySpeed*this.gravity + .92;
    } else {
      this.isJumping = false;
      this.isFalling = true;
    }
  }

  moveDown(dt){
    if(this.pos[1] <= this.floorYPos){
      this.pos = [this.pos[0], this.pos[1] + (dt * this.ySpeed)];
      this.ySpeed = this.ySpeed/this.gravity;
    } else {
      this.isFalling = false;
      this.ySpeed = 0;
    }
  }

  // moveVertical(dt){
  //   if(this.pos[1] >= this.jumpHeight && this.isJumping){
  //     this.ySpeed = this.ySpeed*this.gravity;
  //     this.pos = [this.pos[0], this.pos[1] - (dt*this.ySpeed)];
  //   } else {
  //     this.isJumping = false;
  //     this.isFalling = true;
  //     this.ySpeed = this.ySpeed*this.gravity;
  //     this.pos = [this.pos[0], this.pos[1] + (dt*this.ySpeed)];
  //   }

  moveRight(dt){
    this.pos = [this.pos[0] + (dt*this.xSpeed), this.pos[1]];
    this.animSpeed = 20;
    this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
  }

  moveLeft(dt){
    this.pos = [this.pos[0] - (dt*this.xSpeed), this.pos[1]];
    this.animSpeed = 20;
    this.selectFrames = this.frames.slice(Math.floor(this.frames.length/2));
  }

  jump(){
    if(!this.isJumping && !this.isFalling){
      this.jumpHeight = this.pos[1] - 80;
      this.ySpeed = 400;
      this.isJumping = true;
    }
  }

  render(){
    let frame;
    if(this.animSpeed > 0){
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
