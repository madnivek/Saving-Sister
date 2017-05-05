import React from 'react';

class Menu extends React.Component {
  constructor(props){
    super(props);
    this.handleStart = this.handleStart.bind(this);
    this.state = { buttonText: "START"};
  }

  handleStart(){
    this.props.ssGame.togglePause();
    this.props.ssGame.run();
    const buttonText = this.state.buttonText === "START" ? "PAUSE" : "START";
    this.setState({buttonText});
  }

  render(){
    return(
      <div>
        <p >
          Your name is Lyn Pham, a young fledgling wizard. Your twin sister
          Lily has been taken hostage by Lord Voldemort! Reach her while avoiding
          Voldemort's slew of Avada Kedavras to get your sister back!
        </p>
        <button onClick={ this.handleStart }>{this.state.buttonText}</button>
      </div>
    );
  }
}

export default Menu;
