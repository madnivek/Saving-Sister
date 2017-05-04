
import Platform from './platform.js';

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
