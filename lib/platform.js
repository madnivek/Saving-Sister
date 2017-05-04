class Platform {
  constructor(ctx, resources, pos, numTiles){
    this.ctx = ctx;
    this.x = pos[0];
    this.y = pos[1];
    this.platform_left = resources.get('./assets/platforms/grass-left.png');
    this.platform_right = resources.get('./assets/platforms/grass-right.png');
    this.platform_mid = resources.get('./assets/platforms/grass-mid.png');
    this.platform_single = resources.get('./assets/platforms/grass-single.png');
    this.tileWidth = this.platform_single.width;
    this.tileHeight = this.platform_single.height;
    this.numTiles = numTiles
    this.width = this.tileWidth * numTiles;
  }

  render(){
    const x = this.x;
    const y = this.y;
    if(this.numTiles === 1){
      this.ctx.drawImage(this.platform_single, x, y);
      return;
    } else if (this.numTiles === 2){
      this.ctx.drawImage(this.platform_left, x, y);
      this.ctx.drawImage(this.platform_right, x + this.tileWidth, y);
    } else {
      this.ctx.drawImage(this.platform_left, x, y);
      for(let i = 1; i < this.numTiles - 1; i++){
        this.ctx.drawImage(this.platform_mid, x + (i * this.tileWidth), y);
      }
      this.ctx.drawImage(this.platform_right, x + this.tileWidth * (this.numTiles - 1), y);
    }
  }
}

export default Platform
