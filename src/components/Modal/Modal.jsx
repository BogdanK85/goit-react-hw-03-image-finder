import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyle, OverlayStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownClickEsc);
    // document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownClickEsc);
    // document.body.style.overflow = 'auto';
  }
  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  onKeyDownClickEsc = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  //   onCloseClick = event => {
  //     this.props.onClose();
  //   };

  render() {
    return createPortal(
      <OverlayStyle onClick={this.onBackdropClick}>
        <ModalStyle>
          <img src={this.props.largeImageURL} alt="Pixabay" />
        </ModalStyle>
      </OverlayStyle>,
      modalRoot
    );
  }
}
