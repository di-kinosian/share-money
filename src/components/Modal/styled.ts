import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    width: 100vw;
    top: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
`;

export const Modal = styled.div`
    border-radius: 8px;
    padding: 20px 40px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: fit-content;
    width: fit-content;
`;

export const CloseIcon = styled.div`
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    height: 40px;
    width: 40px;
    border-radius: 20px;

    .icon {
        margin: 0;
        line-height: 16px;
    }

    &:hover {
        background: rgba(0, 0, 0, 0.07);
    }
    cursor: pointer;
`;
