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
    this.ctx.clearRect(this.x, this.y, this.width, this.height);
    this.y = this.y + dt*this.speed;
  }

  render(){
    let  frame = this.frames[this.index % this.frames.length];
    let x = (this.width * frame);
    let y = 0;
    this.ctx.drawImage(
      this.img,
      x, y,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    )
  }


}

export default Bolt;
