class Bolt{
  constructor(ctx, resources, frames, url, posX){
    this.ctx = ctx;
    this.posX = posX;
    this.posY = -150;
    this.resources = resources;
    this.img = resources.get(url);
    this.bolts = [];
    this.index = 0;
    this.speed = 400;
    this.frames = frames;
  }

  update(dt){
    this.index++;
    this.ctx.clearRect(this.posX, this.posY, 26.33, 120);
    this.posY = this.posY + dt*this.speed;
  }

  render(){
    let  frame = this.frames[this.index % this.frames.length];
    // console.log(frame)
    let x = (26.33 * frame);
    let y = 0;
    this.ctx.drawImage(
      this.img,
      x, y,
      26.33, 120,
      this.posX, this.posY,
      26.33, 120
    )
  }


}

export default Bolt;
