class Sprite {
  constructor(options){
    this.ctx = options.ctx;
    this.framePos = options.framePos;
    this.floorYPos = options.pos[1];
    this.currentFloorYPos = this.floorYPos;
    this.animSpeed = options.speed;
    this.xSpeed = 220;
    this.ySpeed = 0;
    this.gravity = 1.7;
    this.isJumping = false;
    this.isFalling = false;
    this.jumpTimer = 0;
    this.frames = options.frames;
    this.selectFrames = this.frames;
    this.size = options.size;
    this.index = 0;
    this.render = this.render.bind(this);
    this.platforms = options.platforms;
    this.img = options.img;
    this.width = this.img.width/this.frames.length;
    this.height = this.img.height;
    this.movable = options.movable;
    this.dir = "right";
    this.jumpSound = options.jumpSound;

    this.followed_object = options.followed_object || false;
    this.dX = 0;
    this.dY = 0;
    this.followSpeed = options.followSpeed;

    this.x = options.pos[0];
    this.y = options.pos[1];

  }

  update(dt){
    this.index += (dt * this.animSpeed);
    this.ctx.clearRect(this.x, this.y, this.size[0], this.size[1]);

    if(this.movable){
      const landedOnPlatform = this.checkPlatformLand();
      if(!landedOnPlatform && !this.isJumping){
        this.isFalling = true;
        this.currentFloorYPos = this.floorYPos;
      }
      this.updateMovements(dt);
    }

    if(this.followed_object){
      this.updateFollow(dt);
    }

  }

  updateMovements(dt){
    if(this.isJumping){
      this.moveUp(dt);
    }

    if(this.isFalling){
      this.moveDown(dt);
    }

    if(window.input.isDown('RIGHT')){
      this.dir = "right";
      this.moveRight(dt);
    } else if(window.input.isDown('LEFT')){
      this.dir = "left";
      this.moveLeft(dt);
    } else {
      this.animSpeed = 0;
    }

    if(window.input.isDown('UP')){
      this.jumpSound.play();
      this.jump();
    }
  }

  updateFollow(dt){
    const dX = (this.x - this.followed_object.x);
    const dY = (this.y - this.followed_object.y);
    const slope = Math.abs(dX/dY);

    if(dX < 5){
      this.selectFrames = this.frames.slice(Math.floor(this.frames.length/2));
    } else {
      this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
    }

    if(dX > 1){
      this.x -= dt*this.followSpeed;
    } else if (dX < -1) {
      this.x += dt*this.followSpeed;
    }

    if(dY > -40){
      this.y -= dt*this.followSpeed;
    } else if (dY < -45) {
      this.y += dt*this.followSpeed;
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
      this.x, this.y,
      this.size[0], this.size[1]
    );
  }

  moveUp(dt){
    this.jumpTimer++;
    if(this.ySpeed > 0){
      this.y -= (dt * this.ySpeed);
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
    if(this.y <= this.currentFloorYPos){
      this.ySpeed = this.ySpeed + (this.jumpTimer*this.gravity);
      this.y += (dt * this.ySpeed);
    } else {
      this.jumpTimer = 0;
      this.isFalling = false;
      this.ySpeed = 0;
    }
  }

  moveRight(dt){
    this.x += (dt*this.xSpeed);
    if(this.x > 870) this.x = 0;
    this.animSpeed = 20;
    this.selectFrames = this.frames.slice(0, Math.floor(this.frames.length/2));
  }

  moveLeft(dt){
    this.x -= (dt*this.xSpeed);
    if(this.x < -10) this.x = 900;
    this.animSpeed = 20;
    this.selectFrames = this.frames.slice(Math.floor(this.frames.length/2));
  }

  jump(){
    if(!this.isJumping && !this.isFalling){
      this.ySpeed = 400;
      this.isJumping = true;
    }
  }

  checkPlatformLand(){
    let platformLand = false;

    this.spriteTL = [this.x, this.y];
    this.spriteTR = [this.x + this.width, this.y];
    this.spriteBL = [this.x, this.y + this.height];
    this.spriteBR = [this.x + this.width, this.y + this.height];

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
}

export default Sprite;
