import { ImageGalleryItemStyle } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import { ImageGalleryStyle } from './ImageGallery.styled';

export const ImageGallery = ({ newPictures, onClick }) => {
  return (
    <ImageGalleryStyle>
      {newPictures.map(({ webformatURL, largeImageURL, id }) => (
        <ImageGalleryItemStyle
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ImageGalleryStyle>
  );
};
