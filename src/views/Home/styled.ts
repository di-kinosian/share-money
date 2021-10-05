import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const AddButton = styled.div`
    position: fixed;
    bottom: 24px;
    right: 24px;
    box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
    border-radius: 100%;
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    font-size: 24px;
    margin: 24px 0;
    font-weight: bold;
`;

export const TitleInput = styled(Input)`
    width: 100%;
`;
