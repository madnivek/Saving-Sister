export const setInputListeners = () => {
  let pressedKeys = {};

  const setKey = (event, status) => {
    const code = event.keyCode;
    let key;

    switch(code){
      case 37:{
        key = 'LEFT';
        break;
      }
      case 39:{
        key = 'RIGHT';
        break;
      }
      default:{
        key = String.fromCharCode(code);
      }
    }
    pressedKeys[key] = status;
  };

  document.addEventListener('keydown', e => {
    setKey(e, true);
  });

  document.addEventListener('keyup', e => {
    setKey(e, false);
    debugger
  });

  window.addEventListener('blur', function() {
      pressedKeys = {};
  });

  window.input = {
    isDown: key => {
      return pressedKeys[key.toUpperCase()];
    }
  };
};

export default setInputListeners;
