import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyle, OverlayStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDownClick);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownClick);
    document.body.style.overflow = 'auto';
  }

  onKeyDownClick = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  //   onCloseClick = evt => {
  //     this.props.onClose();
  //   };

  render() {
    return createPortal(
      <OverlayStyle onClick={this.onBackdropClick}>
        <ModalStyle>
          {/* <button type='button' onClick={this.onCloseClick}></button> */}
          <img src={this.props.url} alt="Pixabay" />
        </ModalStyle>
      </OverlayStyle>,
      modalRoot
    );
  }
}
