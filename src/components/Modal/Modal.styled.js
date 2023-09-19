import { styled } from 'styled-components';

export const OverlayStyle = styled.div`
  position: fixed;
  top: 550;
  left: 550;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalStyle = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
