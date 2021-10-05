import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
    width: ${({ width }) => width + 'px'};
    &.ui.button {
        margin: 0;
    }
    &.ui.button:not(:first-child) {
        margin-left: 16px;
    }
`;
