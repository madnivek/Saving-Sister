class Bolt{
  constructor(ctx, resources, frames, url, x){
    this.ctx = ctx;
    this.x = x;
    this.y = -150;
    this.resources = resources;
    this.img = resources.get(url);
    this.bolts = [];
    this.index = 0;
    this.speed = 400;
    this.frames = frames;
    this.width = this.img.width/3;
    this.height = this.img.height;
  }

  update(dt){
    this.index++;
    this.ctx.clearRect(this.x, this.y, 26.33, 120);
    this.y = this.y + dt*this.speed;
  }

  render(){
    let  frame = this.frames[this.index % this.frames.length];
    let x = (26.33 * frame);
    let y = 0;
    this.ctx.drawImage(
      this.img,
      x, y,
      26.33, 120,
      this.x, this.y,
      26.33, 120
    )
  }


}

export default Bolt;
