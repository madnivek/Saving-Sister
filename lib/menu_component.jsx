import React from 'react';
import Modal from 'react-modal';


class Menu extends React.Component {
  constructor(props){
    super(props);
    const appElement = document.getElementById('menu');
    Modal.setAppElement(appElement);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openInfo = this.openInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.buttonText = "START";
    this.handleResetKeypress = this.handleResetKeypress.bind(this);

    document.addEventListener("keydown", this.handleResetKeypress);

    this.state = { modalIsOpen: true, infoOpen: false, mute: false};
  }


  openInfo(){
    if(this.props.ssGame.gameOver){
      this.buttonText = "START";
    }  else {
      this.props.ssGame.togglePause();
    }
    this.setState({infoOpen: true});
  }

  openModal(){
    if(this.props.ssGame.gameOver){
      this.buttonText = "START";
    }  else {
      this.props.ssGame.togglePause();
    }
    this.setState({modalIsOpen: true});
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  closeInfo(){
    this.setState({infoOpen:false});
  }

  handleMute(){
    if(this.state.mute){
      window.music.play();
      this.setState({mute: false});
    } else {
      this.setState({mute: true});
      window.music.pause();
    }
  }

  handleStart(){
    if(this.buttonText === "START"){
      this.resetGame();
    } else {
      this.props.ssGame.togglePause();
    }
    this.closeModal();
    this.closeInfo();
  }

  handleResetKeypress(e){
    if(e.key === 'r' && this.props.ssGame.gameOver){
      this.resetGame();
      this.closeModal();
    }
  }

  resetGame(){
    this.props.ssGame.reset();
    this.props.ssGame.init();
    this.buttonText = "CONTINUE";
  }

  render(){

    let muteStatus;
    if(this.state.mute){
      muteStatus =
      <button className="sound-button" onClick={ this.handleMute }>
        <i className="fa fa-volume-off" aria-hidden="true"></i>
      </button>;
    } else {
      muteStatus =
      <button className="sound-button" onClick={ this.handleMute }>
        <i className="fa fa-volume-up" aria-hidden="true"></i>
      </button>;
    }

    return(
      <div id="nav-menu-parent">
        <button className="nav-button" onClick={ this.openModal }>MENU</button>
        <button className="nav-button info" onClick={ this.openInfo }>INFO</button>
        { muteStatus }
        <Modal
          className="nav-menu"
          isOpen={this.state.modalIsOpen}
          contentLabel="Modal"
        >
          <h1>Saving Sister</h1>
          <br/>
          <p>
            Your name is Lyn Pham, a young master wizard. Your twin sister
            Lily has been taken hostage by Lord Voldemort! Get past the dementors
            and the rain of Avada Kedavras to take down Voldemort and rescue your
            dear sister!
          </p>
          <br/>
          <h3>Controls:</h3>
          <br/>
          <ul>
            <li>Move Left: Left Arrow</li>
            <li>Move Right: Right Arrow</li>
            <li>Jump: Up Arrow</li>
            <li>Magic Missile: Space</li>
          </ul>
          <button onClick={ this.handleStart }>{this.buttonText}</button>
        </Modal>

        <Modal
          className="nav-menu"
          isOpen={this.state.infoOpen}
          contentLabel="Modal"
        >
          <div className="info-modal">
            <p>Hello there and thanks for playing Saving Sisters!
              My name is Kevin Dam and I am proud to dedicate this game to my little
              sisters Lyn and Lily, who have always given me inspiration. For more information
              about me and this game, click below!</p>
            <ul>
              <li><a href="http://github.com/madnivek/Saving-Sister">GITHUB</a></li>
              <li><a href="http://kevin-dam.co">PORTFOLIO</a></li>
            </ul>
            <button onClick={ this.handleStart }>{this.buttonText}</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Menu;
