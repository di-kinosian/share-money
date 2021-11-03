import React from 'react';
import { Icon } from 'semantic-ui-react';
import * as s from './styled';
import { FC } from 'react';

interface IProps {
    onClose: () => void;
}

const Modal: FC<IProps> = (props) => {
    return (
        <s.ModalOverlay>
            <s.Modal>
                <s.CloseIcon onClick={props.onClose}>
                    <Icon name="close" />
                </s.CloseIcon>
                {props.children}
            </s.Modal>
        </s.ModalOverlay>
    );
};

export default Modal;
