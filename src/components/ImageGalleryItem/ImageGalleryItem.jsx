import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import {
  ImageGalleryItemPicture,
  ImageGalleryItemStyle,
} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  // showModal = () => {
  //   this.setState({ isShowModal: true });
  // };
  // onCloseModal = () => {
  //   this.setState({ isShowModal: false });
  // };
  toggleModal = () => {
    this.setState(prevState => ({ isShowModal: !prevState.isShowModal }));
  };
  onImgClick = evt => {
    evt.preventDefault();
    this.toggleModal();
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;

    return (
      <>
        <ImageGalleryItemStyle onClick={this.onImgClick}>
          <ImageGalleryItemPicture
            src={webformatURL}
            alt="pixabay"
            width="360"
            height="240"
            loading="lazy"
          />
        </ImageGalleryItemStyle>
        {this.state.isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            onCloseModal={this.toggleModal}
          />
        )}
      </>
    );
  }
}
