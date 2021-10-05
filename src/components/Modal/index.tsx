import React from 'react';
import { Icon } from 'semantic-ui-react';
import * as s from './styled';

const Modal = (props) => (
    <s.ModalOverlay>
        <s.Modal>
            <s.CloseIcon onClick={props.onClose}>
                <Icon name="close" />
            </s.CloseIcon>
            {props.children}
        </s.Modal>
    </s.ModalOverlay>
);

export default Modal;
