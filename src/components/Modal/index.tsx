import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as s from './styled';
import { FC } from 'react';
import { H4, OverlayStyled } from '../styled';

interface IProps {
  onClose: () => void;
  isOpen: boolean
  onCloseEnd?: () => void
  zIndex?: number
  header?: string
}

const Modal: FC<IProps> = ({ isOpen, onClose, children, onCloseEnd, zIndex, header }) => {
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(null);
  const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsOpeningAnimation(isOpen);

    if (isOpen) {
      setModalOpen(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setModalOpen(false);
      onCloseEnd?.()
    }
  };

  return (isModalOpen ? ReactDOM.createPortal(
    <>
      <OverlayStyled
        isOpeningAnimation={isOpeningAnimation}
        onClick={onClose}
        zIndex={zIndex}
      />
      <s.Modal
        zIndex={zIndex}
        isOpeningAnimation={isOpeningAnimation}
        onAnimationEnd={handleAnimationEnd}
      >
        {header && <s.ModalHeader><H4>{header}</H4></s.ModalHeader>}
        {children}
      </s.Modal>
    </>,
    document.body,
  ) : null)
};

export default Modal;
