class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.url = options.url;
    this.framePos = options.framePos;
    this.floorYPos = options.pos[1];
    this.currentFloorYPos = this.floorYPos;
    this.animSpeed = options.speed || 0;
    this.xSpeed = 220;
    this.ySpeed = 0;
    this.gravity = 1.7;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpTimer = 0;
    this.frames = options.frames;
    this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
    this.size = options.size;
    this.resources = options.resources;
    this.pos = options.pos;
    this.index = 0;
    this.render = this.render.bind(this);
    this.platforms = options.platforms;
    this.img = this.resources.get(options.url)
    this.width = this.img.width/this.frames.length;
    this.height = this.img.height;

    const x = this.pos[0];
    const y = this.pos[1];

    this.spriteTL = [x, y];
    this.spriteTR = [x + this.width, y];
    this.spriteBL = [x, y + this.height];
    this.spriteBR = [x + this.width, y + this.height];
  }

  update(dt){
    this.index += this.animSpeed*dt;
    this.ctx.clearRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    const landedOnPlatform = this.checkPlatformLand();

    if(!landedOnPlatform && !this.isJumping){
      this.isFalling = true;
      this.currentFloorYPos = this.floorYPos;
    }

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

    const x = this.pos[0];
    const y = this.pos[1];

    this.spriteTL = [x, y];
    this.spriteTR = [x + this.width, y];
    this.spriteBL = [x, y + this.height];
    this.spriteBR = [x + this.width, y + this.height];
  }

  moveUp(dt){
    this.jumpTimer++;
    if(this.ySpeed > 0){
      this.pos = [this.pos[0], this.pos[1] - (dt * this.ySpeed)];
      this.ySpeed = this.ySpeed - (this.jumpTimer*this.gravity);
    } else {
      this.ySpeed = 0;
      this.jumpTimer = 0;
      this.isJumping = false;
      this.isFalling = true;
    }
  }

  moveDown(dt){
    this.jumpTimer++
    if(this.pos[1] <= this.currentFloorYPos){
      this.ySpeed = this.ySpeed + (this.jumpTimer*this.gravity);
      this.pos = [this.pos[0], this.pos[1] + (dt * this.ySpeed)];
    } else {
      this.jumpTimer = 0;
      this.isFalling = false;
      this.ySpeed = 0;
    }
  }

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
      frame = this.selectFrames[2];
    }

    let x = this.framePos[0] + (this.size[0] * frame);
    let y = this.framePos[1];
    this.ctx.drawImage(
      this.img,
      x,
      y,
      this.size[0], this.size[1],
      this.pos[0], this.pos[1],
      this.size[0], this.size[1]
    );
  }

  checkPlatformLand(){
    let platformLand = false;

    this.platforms.forEach( platform => {
      const platformTL = [platform.x, platform.y];
      const platformTR = [platform.x + platform.width, platform.y];
      const platformBL = [platform.x, platform.y + platform.tileHeight];
      const platformBR = [platform.x + platform.width, platform.y + platform.tileHeight];
      const btwnPFWidth = this.spriteTR[0] - 20 > platformTL[0] && this.spriteTL[0] < platformTR[0] - 20;
      const btwnPFHeight = this.spriteBR[1] > platformTL[1] && this.spriteBR[1] < platformBL[1];
      if(btwnPFWidth && btwnPFHeight){
        platformLand = true;
        this.currentFloorYPos = platformTL[1] - 40;
      }
    });
    return platformLand;
  }

  getPos(){
    return this.pos;
  }

}

export default Sprite;
