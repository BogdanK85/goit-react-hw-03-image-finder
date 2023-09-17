import { LoadMoreBtnStyle } from './Button.styled';

export const LoadMoreBtn = ({ isVisible, onClick }) => {
  return (
    <LoadMoreBtnStyle
      type="button"
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={onClick}
    >
      Load more
    </LoadMoreBtnStyle>
  );
};
