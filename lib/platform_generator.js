
import Platform from './platform.js';

const levels = {
  1:[
    {pos:[0,853], size:38},
    {pos: [100,620], size:2},
    {pos: [300,700], size:10},
    {pos: [600,600], size:10},
    {pos: [100,760], size:4},
    {pos: [700,500], size:5},
    {pos: [400,500], size:5},
    {pos: [300,400], size:5},
    {pos: [1050, 100], size: 4},
    {pos: [1000, 200], size: 6},
    {pos: [0, 320], size: 15},
    {pos: [300, 210], size: 18}
  ],
};


class PlatformGenerator {
  constructor(ctx, resources, platformMap){
    this.ctx = ctx;
    this.resources = resources;
    this.platformMap = platformMap;
    this.platforms = [];
    this.generatePlatforms();
  }

  generatePlatforms(){
    this.platformMap.forEach( map => {
      const platform = new Platform(
        this.ctx, this.resources, map.pos, map.size
      );
      this.platforms.push(platform);
    });
  }

  getPlatforms(){
    return this.platforms;
  }
}

export default PlatformGenerator;
