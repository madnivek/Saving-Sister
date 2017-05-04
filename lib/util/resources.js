class Resources {
  constructor(){
    this.resourceCache = {};
    this.loading = [];
    this.readyCallbacks = [];
  }

  get(url){
    return this.resourceCache[url];
  }

  isReady(){
    let ready = true;
    for(let el in this.resourceCache){
      if(this.resourceCache.hasOwnProperty(el) &&
      !this.resourceCache[el]){
        ready = false;
      }
    }
    return ready;
  }

  _load(url){
    if(this.resourceCache[url]) {
      return this.resourceCache[url];
    } else {
      let img = new Image();
      img.onload = () => {
        this.resourceCache[url] = img;
        if(this.isReady()){
          this.readyCallbacks.forEach(callback => callback());
        }
      };
      this.resourceCache[url] = false;
      img.src = url;
    }
  }

  load(urls){
    if(urls instanceof Array){
      urls.forEach( url => this._load(url));
    } else {
      this._load(urls);
    }
  }

  onReady(callback){
    this.readyCallbacks.push(callback);
  }
}

export default Resources;
