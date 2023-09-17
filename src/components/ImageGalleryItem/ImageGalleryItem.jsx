import {
  ImageGalleryItemPicture,
  ImageGalleryItemStyle,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onClick,
}) => {
  return (
    <ImageGalleryItemStyle key={id}>
      <span>foto</span>
      {/* <ImageGalleryItemPicture
        src={webformatURL}
        alt="pixabay"
        width="360"
        height="240"
        loading="lazy"
        onClick={() => {
          onClick(largeImageURL);
        }}
      /> */}
    </ImageGalleryItemStyle>
  );
};
