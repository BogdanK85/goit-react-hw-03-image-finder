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

  onKeyDownClickEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  //   onCloseClick = event => {
  //     this.props.onClose();
  //   };

  render() {
    return createPortal(
      <OverlayStyle onClick={this.onBackdropClick}>
        <ModalStyle>
          <img src={this.props.url} alt="Pixabay" />
        </ModalStyle>
      </OverlayStyle>,
      modalRoot
    );
  }
}
