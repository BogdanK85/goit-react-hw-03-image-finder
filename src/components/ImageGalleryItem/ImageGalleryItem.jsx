import { Component } from 'react';
import {
  ImageGalleryItemPicture,
  ImageGalleryItemStyle,
} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    largeImageURL: this.props.largeImageURL,
  };
  handleImgClick = () => {
    this.props.onClick(this.state);
  };
  render() {
    const { webformatURL, largeImageURL } = this.props;

    return (
      <ImageGalleryItemStyle onClick={this.handleImgClick}>
        <a href={largeImageURL}>
          <ImageGalleryItemPicture
            src={webformatURL}
            alt="pixabay"
            width="360"
            height="240"
            loading="lazy"
          />
        </a>
      </ImageGalleryItemStyle>
    );
  }
}
