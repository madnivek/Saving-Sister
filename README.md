# Saving Sister

### Saving Sister is a game dedicated to my little sisters. The game features a young heroine named Lyn who is on a journey to rescue her younger twin sister (Lily) from the evil clutches of Voldemort. She battles her way through dementors and past Voldemort's spells to save the day!

[Live Game](http://kevin-dam.co/Saving-Sister)

The project is implemented using the following technologies:
- `JavaScript` for game logic
- `HTML5 Canvas` for visual rendering to the page
- Assets are either self-made or obtained from OpenGameArt.com and Kenney.nl

![Screenshot 1](https://github.com/madnivek/Saving-Sister/blob/master/docs/main-menu-screenshot.png)

![Screenshot 2](https://github.com/madnivek/Saving-Sister/blob/master/docs/game-screenshot.png)

### Highlights

#### Updating and rendering

All moving game components were implemented with separate `update(dt)` and `render` methods. The `update` method calculates an objects new position and animation frame at any given timeframe. `dt` is passed to update as a universal time counter that makes sure all game elements are calibrated to the same game timer.

`dt` implementation:

```JavaScript
//saving-sister.js
//constructor sets the initial timer
constructor(){
  ...
  this.lasttime = Date.now();
  ...
}

//run loop will calculate dt based on last time run was called
run(){
    ...
    let now = Date.now();
    let dt = (now - this.lasttime)/1000.0;
    this.update(dt);
    this.render();
    this.lasttime = now;
    window.requestAnimationFrame(this.run);
  }
}
```

As `run` loops, all objects will be updated and subsequently rendered to the canvas.

#### Object Collision

Object collision was implemented using the box model: every object can be represented by a box with a `width` and `height`. If both the range of the width and the range of the height of two objects do not overlap, they are not colliding and vice versa. This implementation relies on every object having an `x`, `y,`, `height`, and `width` attribute.


```JavaScript
checkCollision(obj1, obj2){
  //calculate all corner coordinates of obj1 and obj2
  const obj1_TL_x = obj1.x;
  const obj1_TL_y = obj1.y;
  const obj2_TL_x = obj2.x;
  const obj2_TL_y = obj2.y;

  const obj1_BR_x = obj1.x + obj1.width*.50;
  const obj1_BR_y = obj1.y + obj1.height*.50;
  const obj2_BR_x = obj2.x + obj2.width*.50;
  const obj2_BR_y = obj2.y + obj2.height*.50;

  //check if widths overlap
  if(obj1_BR_x < obj2_TL_x || obj2_BR_x < obj1_TL_x) return false;
  //check if heights overlap
  if(obj1_BR_y < obj2_TL_y || obj2_BR_y < obj1_TL_y) return false;

  return true;
}
```

### Future Additions

* Difficulty options!
* Additional levels
* Item powerups
* "Cover" platforms that protect from Avada Kedavras
