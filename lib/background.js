class Background {
  contructor(ctx, img, x, y, width, height){
    this.ctx = ctx;
    this.img = img;
    this.x = x;
    this.y = y;
  }

  renderBackground(){
    this.ctx.drawImage(this.img, this.x, this.y);
  }
}

export default Background;
