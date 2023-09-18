import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

export const ImageGallery = ({ newPictures, onClick }) => {
  return (
    <ImageGalleryStyle>
      {newPictures.map(({ webformatURL, largeImageURL, id }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ImageGalleryStyle>
  );
};
