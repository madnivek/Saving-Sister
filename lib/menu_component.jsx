import React from 'react';
import Modal from 'react-modal';


class Menu extends React.Component {
  constructor(props){
    super(props);
    const appElement = document.getElementById('canvas');
    Modal.setAppElement(appElement);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMute = this.handleMute.bind(this);
    this.buttonText = "START";
    this.state = { modalIsOpen: true, mute: false};
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
      this.props.ssGame.reset();
      this.props.ssGame.init();
      this.buttonText = "CONTINUE";
    } else {
      this.props.ssGame.togglePause();
    }
    this.closeModal();
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
      <div className="nav-menu-parent">
        <button className="nav-button" onClick={ this.openModal }>MENU</button>
        { muteStatus }
        <Modal
          className="nav-menu"
          overlayClassName='nav-menu-overlay'
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
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
      </div>
    );
  }
}

export default Menu;
