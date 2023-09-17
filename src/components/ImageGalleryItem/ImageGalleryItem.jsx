import { ImageGalleryItemPicture } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, showModal }) => {
  return images.map(({ id, webformatURL, largePictureURL }) => (
    <ImageGalleryItem key={id} onClick={() => showModal(largePictureURL)}>
      <ImageGalleryItemPicture src={webformatURL} alt="pixabay" />
    </ImageGalleryItem>
  ));
};
