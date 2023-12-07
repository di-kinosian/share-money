import styled, { keyframes } from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    width: 100vw;
    top: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
`;

const modalShowAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const modalHideAnimation = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const Modal = styled.div<{ isOpeningAnimation: boolean; zIndex?: number}>`
	position: fixed;
  display: flex;
  flex-direction: column;
  z-index: ${({ zIndex }) => zIndex || 5};
  background-color: #fff;
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

	bottom: 0;
	left: 0;
	width: 100%;
	height: fit-content;
	max-height: calc(100% - 30px );
	border-radius: 8px 8px 0 0;
	animation-name: ${({ isOpeningAnimation }) => isOpeningAnimation ? modalShowAnimation : modalHideAnimation};
`;

export const CloseIcon = styled.div`
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    right: 2px;
    height: 40px;
    width: 40px;
    border-radius: 20px;

    .icon {
        margin: 0;
        line-height: 16px;
    }

    cursor: pointer;
`;

export const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #d8d8d8;
`