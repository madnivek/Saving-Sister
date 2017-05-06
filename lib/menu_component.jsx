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
    this.state = { buttonText: "START", modalIsOpen: true};
  }

  openModal(){
    this.setState({modalIsOpen: true});
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  handleStart(){
    this.closeModal();
    this.props.ssGame.reset();
    this.props.ssGame.init();
    const buttonText = this.state.buttonText === "START" ? "PAUSE" : "START";
    this.setState({buttonText});
  }

  render(){
    return(
      <div className="nav-menu-parent">
        <button className="nav-button" onClick={ this.openModal }>MENU</button>
        <Modal
          className="nav-menu"
          overlayClassName='nav-menu-overlay'
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
        >
          <p >
            Your name is Lyn Pham, a young fledgling wizard. Your twin sister
            Lily has been taken hostage by Lord Voldemort! Reach her while avoiding
            Voldemort's slew of Avada Kedavras to get your sister back!
          </p>
          <button onClick={ this.handleStart }>{this.state.buttonText}</button>
        </Modal>
      </div>
    );
  }
}

export default Menu;
