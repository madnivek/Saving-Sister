class MagicMissile {
  constructor(ctx,resources, url, x, y, dir){
    this.ctx = ctx;
    this.resources = resources;
    this.currentFrame = 0;
    this.animSpeed = 10;
    this.x = x;
    this.y = y;
    this.img = resources.get(url);
    this.height = this.img.height;
    this.width = this.img.width/25;
    this.done = false;
    this.speed = 500;
    this.dir = dir;
    this.index = 0;
  }

  update(dt){
    this.index += dt*this.animSpeed;
    this.currentFrame = Math.floor(this.index);
    this.ctx.clearRect(this.x,this.y,this.width, this.height);

    if(this.dir === "right"){
      this.x += dt*this.speed;
    } else {
      this.x -= dt*this.speed;
    }
  }

  render(){
    if(this.currentFrame === 26) this.done = true;
    const x = this.currentFrame * this.width;
    const y = 0;
    this.ctx.drawImage(
      this.img,
      x,
      y,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    );
  }
}

export default MagicMissile;
